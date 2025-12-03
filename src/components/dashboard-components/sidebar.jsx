import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { BookIcon, CalendarIcon, ChartBarIcon, ChevronDown, DollarSignIcon, FileQuestionIcon, HomeIcon, MegaphoneIcon, TicketIcon, UsersIcon } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';


const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState([0, 6]);
  const location = useLocation()
  const menuItems = [
    {
      name: 'Dashboard',
      icon: <HomeIcon />,
      link: '/admin/dashboard',
      badge: null
    },
    {
      name: 'Courses Management',
      icon: <BookIcon />,
      link: '/admin/courses-management',
      children: [
        { name: 'Course Builder', link: '/admin/courses-management/builder' },
        { name: 'Live Sessions Schedule', link: '/admin/courses-management/live-sessions' },
        { name: 'Attendance & Progress', link: '/admin/courses-management/attendance' }
      ]
    },
    {
      name: 'User Management',
      icon: <UsersIcon />,
      link: '/admin/user-management'
    },
    {
      name: 'Class Scheduling',
      icon: <CalendarIcon />,
      link: '/admin/scheduling',
      badge: 3
    },
    {
      name: 'Announcements',
      icon: <MegaphoneIcon />,
      link: '/admin/announcements'
    },
    {
      name: 'Payments & Refunds',
      icon: <DollarSignIcon />,
      link: '/admin/payments'
    },
    {
      name: 'Support Tickets',
      icon: <TicketIcon />,
      link: '/admin/tickets'
    },
    {
      name: 'Analytics',
      icon: <ChartBarIcon />,
      link: '/admin/analytics'
    },
    {
      name: 'Help and Support',
      icon: <FileQuestionIcon />,
      link: '/admin/help',
      children: [
        { name: 'Message Center', link: '/admin/help/messages' },
        { name: 'Teacher & Student Chat', link: '/admin/help/chat' },
        { name: 'Reviews', link: '/admin/help/reviews' },
        { name: 'FAQs', link: '/admin/help/faqs' }
      ]
    }
  ];

  const toggleExpand = (index) => {
    setExpandedItems(prev =>
      prev.includes(index)
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <div className="w-full h-full bg-[#1a5850] text-white flex flex-col">

      <div className="p-3 sm:p-6 sm: mx-auto border-b border-white/10 cursor-pointer" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        {isSidebarOpen ? <img src="/icons/logo.png" onClick={() => setIsSidebarOpen(!isSidebarOpen)} alt="Darul Quran" className=' w-36 h-36' />
          : (
            <img src="/icons/logo-icon.png" onClick={() => setIsSidebarOpen(!isSidebarOpen)} alt="Darul Quran" className=' w-8 h-8' />
          )}
      </div>

      <div className='fixed'></div>
      <div className="flex-1 overflow-y-auto no-scrollbar py-4">
        <ul className="space-y-1">
          {menuItems.map((item, idx) => (
            <li key={idx}>
              <Link to={item.link}
                onClick={() => {
                  setActiveIndex(idx);
                  if (item.children) {
                    toggleExpand(idx);
                    setIsSidebarOpen(true);
                  }
                }}
                className={`
                  relative flex items-center justify-between px-6 py-3 cursor-pointer transition-all
                  ${activeIndex === idx ? 'bg-[#d4e5e3]/20 text-white' : 'text-[#b8d4d0] hover:bg-white/5'}
                `}
              >
                {activeIndex === idx  && (
                  <motion.div
                    layoutId="active-indicator"
                    className="absolute left-0 top-0 h-full w-1 bg-[#d4e5e3]"
                    initial={false}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                  />
                )}

                <div className="flex items-center  gap-3 flex-1">
                  <span className="w-5 h-5">{item.icon}</span>
                  {isSidebarOpen && <span className="text-sm font-medium">{item.name}</span>}
                </div>

                {item.badge && isSidebarOpen && (
                  <span className="px-2 py-0.5 text-xs bg-[#EBD4C9] text-[#06574C] rounded-full min-w-5 text-center">
                    {item.badge}
                  </span>
                )}
              </Link>

              <AnimatePresence>
                {item.children && expandedItems.includes(idx) && isSidebarOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    {item.children.map((child, childIdx) => (
                      <li
                        key={childIdx}
                        className={`pl-14 pr-6 relative text-sm ${location.pathname===child.link?'text-white':'text-[#b8d4d0] '} hover:text-white cursor-pointer transition-colors`}
                      >
                        <Link to={child.link}>
                          <div className="flex items-center  py-2 gap-2">
                            <span className={`absolute rounded-xs ${location.pathname===child.link?'border-white':'border-white/30 '} -top-4 left-9 w-3 h-9 border-l-2 border-b-2 `}></span>
                            {child.name}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>

      {isSidebarOpen && (
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-pink-400 to-orange-300 flex items-center justify-center text-white font-bold">
              JP
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">Jenny Patron</div>
              <div className="text-xs text-[#b8d4d0] truncate">jenny@gmail.com</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;