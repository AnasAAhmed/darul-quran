import { Button, Link, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { DashHeading } from '../../../components/dashboard-components/DashHeading'
import { Edit, ExternalLink, ListFilterIcon, Plus, Trash2 } from 'lucide-react';
import { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

const Attendance = () => {

    const [events, setEvents] = useState([
        { title: "iOS Workshop", date: "2025-11-02" },
        { title: "React Basics", date: "2025-11-06", color: "#f0e68c" },
        { title: "Python Basics", date: "2025-11-09", color: "#dcd0ff" },
        { title: "Marketing Research", date: "2025-11-14", color: "#90ee90" },
        { title: "iOS Workshop", date: "2025-11-18", color: "#ffcccc" },
        { title: "JS Workshop", date: "2025-11-18", color: "#ffebcc" },
        { title: "React Basics", date: "2025-11-22", color: "#f0e68c" },
        { title: "iOS Workshop", date: "2025-11-22", color: "#ffcccc" },
        { title: "React Basics", date: "2025-11-28", color: "#f0e68c" },
        { title: "iOS Workshop", date: "2025-11-28", color: "#ffcccc" },
        { title: "JS Workshop", date: "2025-11-28", color: "#ffebcc" },
        { title: "Python Basics", date: "2025-11-28", color: "#dcd0ff" },
    ]);
   const classes = [
        {
            id: 1,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'draft',
            date:"2025-11-27"
        },
        {
            id: 2,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-26"
        },
        {
            id: 3,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Draft',
            date:"2025-11-17"
        },
        {
            id: 4,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-16"
        },
        {
            id: 5,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-15"
        },
        {
            id: 6,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-12"
        },
        {
            id: 7,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-03"
        },
        {
            id: 8,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-29"
        },
        {
            id: 9,
            name: 'React Hooks Deep Dive',
            desc: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            enrolled: '1296', enrollment_limit: 1300,
            price: 199,
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            date:"2025-11-22"
        },

    ];
    const handleDateClick = (info) => {
        alert("Clicked on date: " + info.dateStr);
    };

    const statuses = [
        { key: "all", label: "All Status" },
        { key: "draft", label: "Draft" },
        { key: "published", label: "Published" },
    ];

    const filters = [
        { key: "all", label: "Filter" },
    ];

    return (
        <div className='bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 px-2 sm:px-5'>

            <DashHeading title={'Attendance & Progress'} desc={'Track student attendance and course progress'} />
            <div className="bg-[#EBD4C9] flex-wrap gap-2 p-2 sm:p-4 rounded-lg my-3 flex justify-between items-center">
                <div className="flex  items-center gap-2">
                    <Select
                        isRequired
                        className="md:min-w-[120px]"
                        radius="sm"
                        defaultSelectedKeys={["all"]}
                        placeholder="Select an status"
                    >
                        {statuses.map((status) => (
                            <SelectItem key={status.key}>{status.label}</SelectItem>
                        ))}
                    </Select>
                    <Select
                        isRequired
                        radius="sm"
                        className="md:min-w-[120px]"
                        defaultSelectedKeys={["all"]}
                        selectorIcon={<ListFilterIcon />}
                        placeholder="Select an animal"
                    >
                        {filters.map((filter) => (
                            <SelectItem key={filter.key}>{filter.label}</SelectItem>
                        ))}
                    </Select>
                </div>
                <Button radius="sm" startContent={<Plus color="white" size={15} />} className="bg-[#06574C] text-white py-4 px-3 sm:px-8">
                    Create Course
                </Button>
            </div>
            <div className="max-sm:hidden overflow-hidden">
                <Table>
                    <TableHeader >
                        <TableColumn className='bg-[#EBD4C9]/30'>Course</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Category</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Teacher</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Price</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Enrolled</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Status</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Reviews</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Actions</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {classes.map((classItem) => (
                            <TableRow key={classItem.id} >
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900">{classItem.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{classItem.desc}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.category}</p>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{classItem.teacher}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{classItem.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">${classItem.price}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">{classItem.enrolled}</span>
                                </TableCell>
                                <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.status}</p>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium truncate max-w-56">{classItem.reviews}</span>
                                </TableCell>
                                <TableCell className="flex items-center gap-2">

                                    <Button radius="sm" className="bg-[#06574C] text-white" startContent={<Trash2 color="white" />}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className='py-4 space-y-3'>
              

            </div>
        </div>
    )
}

export default Attendance
