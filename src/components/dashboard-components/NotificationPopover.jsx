'use client'
import { dateFormatter, getLocalizedText } from '@/lib/utils'
import { getAllNotifications } from '@/redux/actions/noificationsAction'
import { Button, Chip, Popover, PopoverContent, PopoverTrigger } from '@heroui/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaRegBell } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'

const NotificationPopover = ({ isHomeMob = false }) => {
    const pathname = usePathname();
    const dispatch = useDispatch();
    const { t, i18n } = useTranslation();
    const fetchedRef = useRef(false);
    const { user } = useSelector(
        (state) => state?.auth || {}
    );

    const { unreadNotifications, unreadCount } = useSelector(
        (state) => state?.notifications
    );
    const currentUser = user?.[0] || {};
    const userId = user?.[0]?.id;
    const userPermissions = currentUser?.permissions
        ?.replace(/[{}"]/g, "")
        .split(",")
        .map((p) => p.trim());
    const canAccessNotifications =
        (currentUser?.role === 'admin' && userPermissions?.includes('notifications-center')) ||
        (currentUser?.role === 'user');
    useEffect(() => {
        if (!userId || fetchedRef.current) return;
        fetchedRef.current = true;
        const userPermissions = currentUser?.permissions
            ?.replace(/[{}"]/g, "")
            .split(",")
            .map((p) => p.trim());
        const canAccessNotifications =
            (currentUser?.role === 'admin' && userPermissions?.includes('notifications-center')) ||
            (currentUser?.role === 'user');
        if (canAccessNotifications) {
            dispatch(getAllNotifications(undefined, undefined, undefined, undefined, 'true', false));
        }

    }, [dispatch]);
    const isHome = [
        "/",
        "/property-listing",
        "/faqs",
        "/contact",
        "/available-properties",
    ];
    const handleRoute = () => {
        if (currentUser?.role === "admin") {
            return ("/admin/notifications-center");
        } else if (currentUser?.role === "user" && currentUser?.is_hostVerify === 'approved') {
            return ("/host/notifications-center");
        } else {
            return ("/guest/notifications-center");
        }
    };
    if (!canAccessNotifications) {
        return null;
    }
    return (
        <Popover className="relative">
            {(
                (currentUser?.role === 'admin' && userPermissions?.includes('notifications-center')) ||
                currentUser?.role === 'user'
            ) && <PopoverTrigger>
                    <button
                        onClick={() => dispatch(getAllNotifications(undefined, undefined, undefined, undefined, 'true', false))}
                        type="button"
                        className="relative cursor-pointer inline-flex items-center justify-center p-1 rounded-full"
                        aria-label="Notifications"
                    >
                        <FaRegBell
                            // className={`size-[25px]`}
                            // color={
                            //     (isHome.includes(pathname) && !isHomeMob)
                            //         ? "white"
                            //         : "#406C65"
                            // }
                            className={(isHome.includes(pathname) && !isHomeMob)
                                ? "text-white"
                                : " text-[#406C65]"
                            }
                            size={20}
                        />
                        {(unreadCount || unreadNotifications.length) > 0 && < span className="pointer-events-none absolute -top-1 -right-0.5 flex items-center justify-center min-w-[18px] h-[18px] px-1.2 rounded-full bg-[#637381] text-white text-[10px] font-semibold leading-none ring-2 ring-white z-10">
                            {unreadCount || unreadNotifications.length}
                        </span>}
                    </button>
                </PopoverTrigger>}

            <PopoverContent className="max-w-[260px] min-w-[260px] sm:max-w-[320px]">
                <div className=" py-3 px-2  flex w-full  justify-between">
                    <div>
                        <h4 className="text-sm font-semibold text-gray-800">
                            {t('notifications.label', { defaultValue: 'Notifications' })}
                        </h4>
                    </div>
                    <div className="flex justify-between ml-2">
                        <Chip
                            size="sm"
                            variant="flat"
                            className="bg-[#d0ded7] text-white font-bold"
                        >
                            {unreadCount?.toString() || unreadNotifications.length}
                        </Chip>
                    </div>
                </div>

                {unreadNotifications.length !== 0 ? (
                    <div className=" py-2 border-t border-gray-100 max-h-[300px] overflow-scroll no-scrollbar w-full">
                        <div>
                            {unreadNotifications.map((notification, index) => (
                                <div key={index}>
                                    <div className="flex items-center gap-4 py-3 justify-center w-full ">
                                        <div className="flex flex-col items-start gap-2 shadow-md hover:bg-gray-100 p-2 rounded-lg w-[95%]">
                                            <div className="flex flex-col px-2">
                                                <div className="text-sm font-semibold">
                                                    {/* {notification.title} */}
                                                    {getLocalizedText(notification.title, i18n.language)}
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {/* {notification.content} */}
                                                    {getLocalizedText(notification.content, i18n.language)}
                                                </div>
                                                <div className="flex items-center gap-2 justify-between">
                                                    {notification?.url && (
                                                        <Link
                                                            // target="_blank"
                                                            href={notification.url}
                                                            className="underline text-[12px] text-[#406c65] hover:opacity-80 transition-opacity"
                                                        >
                                                            {t("notifications.view", { defaultValue: "View" })}
                                                        </Link>
                                                    )}
                                                    <span className='text-xs text-[#406c65]'>{dateFormatter(notification.created_at,true)}</span>
                                                </div>
                                            </div>
                                            {/* <div className={`flex items-center text-[12px] ${notification.is_read ?"text-[#8A8A8A]":"text-blue-500"}`}>
                                                <span className="hidden sm:inline mr-2">•</span>
                                                {notification.is_read ? t("notifications.read") : t("notifications.unread")}
                                            </div> */}
                                        </div>
                                        {/* <BsArrowRight className="w-4 h-4 text-gray-400" /> */}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-gray-500 font-bold py-10">
                        {t('notifications.no_new_notifications', { defaultValue: 'No New notifications' })}

                    </div>
                )}

                <div className=" py-3 border-t border-gray-100  w-full px-4">
                    <Button
                        variant="bordered"
                        color="success"
                        className="w-full"
                        as={Link}
                        href={handleRoute()}
                    >

                        {t('notifications.view_all', { defaultValue: 'View All' })}

                    </Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}

export default NotificationPopover
