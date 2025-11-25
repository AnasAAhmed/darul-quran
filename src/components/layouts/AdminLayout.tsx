import { Link, Outlet } from "react-router-dom";
import Sidebar from "../dashboard-components/sidebar";
import { useState } from "react";
import { motion } from 'framer-motion'
import { Button, Chip, Input, Popover, PopoverContent, PopoverTrigger } from "@heroui/react";
import { Bell, Search } from "lucide-react";

export default function AdminLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <>
            <main className="flex h-screen w-screen overflow-x-hidden">
                {/* Sidebar */}
                <motion.aside
                    animate={{ width: isSidebarOpen ? 270 : 79 }} // 64 = w-64, 80 = w-20
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="h-full max-w-[352psx] fixed overflow-hidden! z-10"
                >
                    <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
                </motion.aside>
                <div
                    className={`flex flex-col flex-1 h-full transition-all z-20 duration-300 ${isSidebarOpen ? "ml-56 xl:ml-68" : "ml-20"}`}
                >
                    <header className="bg-linear-to-r from-[#f7f7f7] via-[#ffffff] to-[#ffffff]  gap-3 flex p-2 justify-end shadow-sm ">
                        <Popover className="relative">
                            <PopoverTrigger >
                                <button
                                    // onClick={() => dispatch(getAllNotifications())}
                                    type="button"
                                    className="relative inline-flex items-center justify-center p-3 bg-white rounded-full shadow-sm hover:shadow-md"
                                    aria-label="Notifications"
                                >
                                    <Bell color="#406C65" size={20} />
                                    <span className="pointer-events-none absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#637381] text-white text-[10px] font-semibold leading-none ring-2 ring-white z-10">
                                       3
                                    </span>
                                </button>
                            </PopoverTrigger>
                            <PopoverContent className="absolute right-0 mt-3 w-[320px] bg-white rounded-xl shadow-lg ring-opacity-5 z-20">
                                <div className=" py-3 px-2  flex w-full  justify-between">
                                    <div>
                                        <h4 className="text-sm font-semibold text-gray-800">
                                            Notifications
                                        </h4>
                                    </div>
                                    <div className="flex justify-between ml-2">
                                        <Chip
                                            size="sm"
                                            variant="flat"
                                            className="bg-[#637381] text-white font-bold"
                                        >
                                          3  {/* {unreadNotifications.length} */}
                                        </Chip>
                                    </div>
                                </div>
                                <div className=" py-2 border-t border-gray-100 h-[300px] overflow-scroll no-scrollbar">
                                    <div>
                                            <div>
                                                <Link to={'#'} className="block w-full">
                                                    <div className="flex items-center gap-4 py-3 justify-center w-full cursor-pointer">
                                                        <div className="flex items-center gap-3 shadow-md hover:bg-gray-100 p-3 rounded-lg w-[95%] transition-colors">
                                                            <div className="flex flex-col px-2">
                                                                <div className="text-sm font-semibold">
                                                                   anything
                                                                </div>
                                                                <div className="text-xs text-gray-500">
                                                                    anything  anything anything anything anythin ganything anything
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                    </div>
                                </div>
                                <div className=" py-3 border-t border-gray-100  w-full px-4">
                                    <Button
                                        variant="bordered"
                                        color="success"
                                        className="w-full"
                                        onPress={() => {
                                            // router.push("/admin/notifications-center");
                                        }}
                                    >
                                        View all
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                        <Input endContent={<Search color="#9A9A9A" />} type="search" className="max-w-md" placeholder="Search here..." />
                    </header>
                    <Outlet />
                </div>
            </main>
        </>
    );
}
