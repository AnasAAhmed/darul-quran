// "use client";
// import React, { useEffect, useState } from "react";
// import { Button, Form, Input, Pagination, Select, SelectItem, Skeleton, Spinner } from "@heroui/react";
// import { RiCheckDoubleLine } from "react-icons/ri";
// import { DashHeading } from "@/components/dashboard-components/heading";
// import { motion, useReducedMotion } from "framer-motion";
// import { useDispatch, useSelector } from "react-redux";
// import { deleteReadNotifications, getAllNotifications, updateNotification } from "@/redux/actions/noificationsAction";
// import { formatDistanceToNow } from "date-fns";
// import { BiSolidMessageRoundedError, BiSort } from "react-icons/bi";
// import { FiSearch, FiX } from "react-icons/fi";
// import { useTranslation } from "react-i18next";
// import NotificationType from "@/components/dashboard-components/NotificationType";
// import Swal from "sweetalert2";
// import Link from "next/link";
// import { useTopLoader } from "nextjs-toploader";
// import { getLocalizedText } from "@/lib/utils";
// const container = {
//     hidden: { opacity: 0 },
//     show: {
//         opacity: 1,
//         transition: { staggerChildren: 0.08, delayChildren: 0.05 },
//     },
// };
// const item = {
//     hidden: { opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" },
//     show: (i = 0) => ({
//         opacity: 1,
//         y: 0,
//         scale: 1,
//         filter: "blur(0px)",
//         transition: {
//             type: "spring",
//             stiffness: 340,
//             damping: 26,
//             delay: i * 0.03,
//         },
//     }),
// };
// const NotificationsCenter = () => {
//     const prefersReduced = useReducedMotion();
//     const { notifications, deleteLoading, pagination, loading } = useSelector((state) => state.notifications);
//     const topLoader = useTopLoader()
//     const [page, setPage] = useState(1);
//     const [searchQuery, setSearchQuery] = useState("");
//     const [isReadSort, setIsReadSort] = useState('');
//     const [type, setType] = useState('');
//     const dispatch = useDispatch();
//     const { t, i18n } = useTranslation();

//     const isFilter = page > 1 || searchQuery || isReadSort || type;


//     useEffect(() => {
//         setPage(1)
//     }, [isReadSort, searchQuery, type])

//     useEffect(() => {
//         const handleFetch = async () => {
//             try {
//                 if (isFilter) {
//                     topLoader.start();
//                 }
//                 await dispatch(getAllNotifications(searchQuery, page, isReadSort, type));
//             } catch (error) { console.log(error) }
//             finally { topLoader.done(); window.scrollTo(0, 0); };
//         }
//         handleFetch();
//     }, [dispatch, page, isReadSort, searchQuery, type]);



//     const onDelete = async () => {
//         const { isConfirmed } = await Swal.fire({
//             title: t("pages.admin_contact.swal.title"),
//             text: t("notifications.delete_text"),
//             icon: "warning",
//             showCancelButton: true,
//             confirmButtonText: t("pages.admin_contact.swal.confirm_button"),
//             cancelButtonText: t("pages.admin_contact.swal.cancel_button"),
//             confirmButtonColor: "red",
//             cancelButtonColor: '#406c65',
//             buttonsStyling: false,
//             customClass: {
//                 confirmButton: "z-0 cursor-pointer group relative inline-flex items-center justify-center box-border appearance-none select-none whitespace-nowrap font-normal  bg-[#406c65] border-1 rounded-md text-white px-4 min-w-20 h-10 text-small mr-2 ",
//                 cancelButton: "z-0 group cursor-pointer relative inline-flex items-center justify-center box-border appearance-none select-none px-4 min-w-20 h-10 text-small gap-2  whitespace-nowrap font-normal  bg-white border-1 rounded-md text-[#406c65] border-[#406c65]"
//             }

//         });

//         if (!isConfirmed) return;
//         dispatch(deleteReadNotifications());
//     }

//     return (
//         <div className="py-3">
//             <motion.div
//                 initial={{ opacity: 0, y: -10, filter: "blur(4px)" }}
//                 animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
//                 transition={{ type: "spring", stiffness: 300, damping: 22 }}
//                 className="flex flex-col md:flex-row md:items-center justify-between gap-3"
//             >
//                 <DashHeading title={t("notifications.title")} desc={t("notifications.desc")} />
//                 <div className="flex max-sm:flex-col gap-3 md:gap-x-4 md:justify-center items-start">
//                     <Form
//                         onSubmit={(e) => {
//                             e.preventDefault();
//                             const formData = new FormData(e.currentTarget);
//                             setSearchQuery(formData.get('search'))
//                         }}
//                     >
//                         <Input
//                             type="text"
//                             placeholder={t("notifications.search_placeholder")}
//                             size="md"
//                             aria-label="Search Notifications"
//                             radius="md"
//                             variant="bordered"
//                             className="w-full sm:w-[260px]"
//                             classNames={{
//                                 input: "text-sm",
//                                 inputWrapper: "bg-white border border-gray-300 pr-1 shadow-none",
//                             }}
//                             defaultValue={searchQuery}
//                             name='search'
//                             onBlur={(e) => setSearchQuery(e.target.value)}
//                             endContent={
//                                 searchQuery ? (
//                                     <Button
//                                         color="danger"
//                                         isIconOnly
//                                         variant="light"
//                                         size="sm"
//                                         onPress={() => {
//                                             setSearchQuery("");
//                                         }}
//                                     >
//                                         <FiX size={16} />
//                                     </Button>
//                                 ) : (
//                                     <span className="mx-2">
//                                         <FiSearch color="#406c65" size={16} />
//                                     </span>
//                                 )
//                             }
//                         />
//                     </Form>
//                     {notifications?.some(n => !n.is_read) && (
//                         <motion.div whileTap={{ scale: 0.98 }}>
//                             <Button
//                                 startContent={<RiCheckDoubleLine color="#8CB59F" size={25} />}
//                                 className="bg-white border-1 rounded-md text-[#8CB59F] border-[#8CB59F]"
//                                 onPress={() => dispatch(updateNotification({ is_read: true }))}
//                             >
//                                 {t("notifications.mark_all_read")}
//                             </Button>
//                         </motion.div>
//                     )}
//                     <Button
//                         isLoading={deleteLoading}
//                         // startContent={<FaRegTrashAlt color="white" />}
//                         color="success"
//                         radius="sm"
//                         // isIconOnly
//                         title={t('notifications.delete_read', { defaultValue: 'Delete Read' })}
//                         onPress={onDelete}
//                     >
//                         {t('notifications.delete_read', { defaultValue: 'Delete Read' })}
//                     </Button>

//                 </div>
//             </motion.div>
//             <div className="flex max-sm:flex-col my-2 item-center gap-2">
//                 <select
//                     name="noti_sort"
//                     aria-label="Select a read or unread"
//                     onChange={(e) => setIsReadSort(e.target.value)}
//                     className="max-w-[180px] px-3 py-1 text-[14px] text-[#406c65] border-2 border-[#8CB59F] rounded-md focus:outline-none focus:ring-0 transition-all"
//                 >
//                     <option value="">{t("pages.admin_payouts.sort_options.latest", { defaultValue: 'Latest' })}</option>
//                     <option value="true">{t("notifications.read")}</option>
//                     <option value="false">{t("notifications.unread")}</option>
//                 </select>
//                 {/* <select
//                     name="type"
//                     aria-label="Select a Type"
//                     onChange={(e) => setType(e.target.value)}
//                     className="max-w-[180px] px-3 py-1 text-[14px] text-[#406c65] border-2 border-[#8CB59F] rounded-md focus:outline-none focus:ring-0 transition-all"
//                 >
//                     <option value="">{t("notifications.all", { defaultValue: 'All' })}</option>
//                     <option value="property">Property</option>
//                     <option value="message">Message</option>
//                     <option value="payment">Payment</option>
//                     <option value="refund_request">Refund Request</option>
//                     <option value="refund_processed">Refund Processed</option>
//                     <option value="refund_rejected">Refund Rejected</option>
//                     <option value="refund_approved">Refund Approved</option>
//                     <option value="host">Host</option>
//                 </select> */}
//             </div>
//             <motion.div
//                 variants={prefersReduced ? undefined : container}
//                 initial="hidden"
//                 animate="show"
//                 className="w-full flex min-h-[450px]  flex-col overflow-hidden px-2 justify-start"
//             >
//                 {loading && !isFilter ?
//                     Array.from({ length: 6 }).map((i, _) => (
//                         <Skeleton className="w-full rounded-md mt-2 h-56 sm:h-24" key={_}></Skeleton>
//                     ))
//                     :
//                     notifications?.length > 0 ?
//                         notifications?.map((i, idx) => (
//                             <motion.div
//                                 key={i.id}
//                                 custom={idx}
//                                 initial={{ opacity: 0, y: 18, scale: 0.98, filter: "blur(6px)" }}
//                                 animate={{
//                                     opacity: 1,
//                                     y: 0,
//                                     scale: 1,
//                                     filter: "blur(0px)",
//                                     transition: {
//                                         type: "spring",
//                                         stiffness: 340,
//                                         damping: 26,
//                                         delay: idx * 0.03,
//                                     },
//                                 }}
//                                 className="relative rounded-md mt-2"
//                             >
//                                 <div className="bubble-glow pointer-events-none" />
//                                 <div className="bg-white shadow-sm flex flex-row justify-center sm:justify-between w-full relative rounded-md z-10 p-4">
//                                     <div className="flex max-sm:flex-col items-center gap-2">
//                                         <NotificationType type={i.type} />

//                                         <div className="flex flex-col px-4 max-sm:w-full max-sm:items-center max-sm:text-center">
//                                             <p className="text-black text-sm sm:text-xl">
//                                                 {getLocalizedText(i.title, i18n.language)}
//                                             </p>

//                                             <span className="text-[12px] text-[#8A8A8A]">
//                                                 {getLocalizedText(i.content, i18n.language)}
//                                             </span>

//                                             <div className="flex flex-wrap items-center gap-x-4 gap-y-2 max-sm:flex-col max-sm:justify-center">
//                                                 {i?.url && (
//                                                     <Link
//                                                         target="_blank"
//                                                         href={i.url}
//                                                         className="underline text-[12px] text-[#406c65] hover:opacity-80 transition-opacity"
//                                                     >
//                                                         {t("notifications.view", { defaultValue: "View" })}
//                                                     </Link>
//                                                 )}
//                                                 {!i.is_read && (
//                                                     <Button
//                                                         size="sm"
//                                                         className="h-auto p-0 text-blue-500 underline bg-transparent shadow-none min-w-0"
//                                                         onPress={() => dispatch(updateNotification({ id: i.id, is_read: true }))}
//                                                     >
//                                                         {t("notifications.mark_as_read")}
//                                                     </Button>
//                                                 )}
//                                                 <div className="flex items-center text-[12px] text-[#8A8A8A]">
//                                                     <span className="hidden sm:inline mr-2">•</span>
//                                                     {i.is_read ? t("notifications.read") : t("notifications.unread")}
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="max-sm:hidden text-[12px] flex gap-3 justify-center items-center text-[#8A8A8A]">
//                                         {i.created_at
//                                             ? `${formatDistanceToNow(new Date(i.created_at), { addSuffix: true })}`
//                                             : t("notifications.just_now", { defaultValue: "Just now" })}
//                                     </div>
//                                 </div>
//                             </motion.div>
//                         )) : <div className="w-full h-full flex flex-col justify-center items-center gap-3">
//                             <BiSolidMessageRoundedError size={60} color="#406C65" />
//                             <span className="text-gray-500 text-md font-semibold">{t("notifications.no_notifications")}</span>
//                         </div>
//                 }

//             </motion.div>
//             <Pagination
//                 showControls
//                 total={pagination.totalPages}
//                 size="sm"
//                 variant="faded"
//                 page={page}
//                 onChange={setPage}
//                 color="success"
//                 className="max-w-[300px] my-2"
//             />
//         </div >
//     );
// };
// export default NotificationsCenter;


// // for if ssr render
// // const updateUrlWithFilters = (page, query, isRead) => {
// //     const newParams = new URLSearchParams();
// //     if (typeof window === 'undefined') return;
// //     if (page > 1) newParams.set('page', page.toString());
// //     else newParams.delete('page');

// //     if (query) newParams.set('search', query);
// //     else newParams.delete('search');

// //     if (isRead) newParams.set('is_read', isRead);
// //     else newParams.delete('is_read');

// //     const queryString = newParams.toString();
// //     const newUrl = `${window.location.pathname}${queryString ? '?' + queryString : ''}`;

// //     router.push(newUrl)
// // };

// // useEffect(() => {
// //     updateUrlWithFilters(page, searchQuery, isReadSort);
// // }, [page, searchQuery, isReadSort]);