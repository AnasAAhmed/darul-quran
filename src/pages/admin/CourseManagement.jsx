import { DashHeading } from "../../components/dashboard-components/DashHeading"
import { Button, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@heroui/react'
import { BookIcon, MegaphoneIcon, PlusIcon, UsersIcon } from 'lucide-react'

const CourseManagement = () => {
    const classes = [
        {
            id: 1,
            name: 'React Hooks Deep Dive',
            subtitle: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            time: 'Today, 2:00 PM',
            enrolled: '1296',
            price: '$199',
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'draft',
            statusColor: 'success'
        },
        {
            id: 2,
            name: 'React Hooks Deep Dive',
            subtitle: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            time: 'Today, 3:00 PM',
            enrolled: '1296',
            price: '$199',
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            statusColor: 'default'
        },
        {
            id: 3,
            name: 'React Hooks Deep Dive',
            subtitle: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            time: 'Today, 4:00 PM',
            enrolled: '1296',
            price: '$199',
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Draft',
            statusColor: 'default'
        },
        {
            id: 4,
            name: 'React Hooks Deep Dive',
            subtitle: 'Advanced JavaScript Course',
            teacher: 'John Davis',
            email: 'john.davis@email.com',
            time: 'Today, 5:00 PM',
            enrolled: '1296',
            price: '$199',
            reviews: 'Great course, I learned a lot...',
            category: 'Web Development',
            status: 'Published',
            statusColor: 'default'
        }
    ];
    const cardsData = [
        {
            title: "Total Enrollments",
            value: "12,847",
            icon: "/icons/user-medal.png",
            changeText: "+12.5% from last month",
            changeColor: "text-[#38A100]"
        },
        {
            title: "Revenue",
            value: "$89,432",
            icon: "/icons/pie-chart.png",
            changeText: "+8.2% from last month",
            changeColor: "text-[#38A100]"
        },
        {
            title: "Active Users",
            value: "3,847",
            icon: "/icons/users.png",
            changeText: "-2.1% from last week",
            changeColor: "text-[#E8505B]"
        },
        {
            title: "Live Classes Today",
            value: "24",
            icon: "/icons/camera.png",
            changeText: "6 upcoming sessions",
            changeColor: "text-[#06574C]"
        }
    ];
    return (
        <div className='bg-white sm:bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 h-screen px-2 sm:px-3'>
            <DashHeading desc={'Manage and monitor course catalog'} />

            <div className="max-sm:hidden overflow-hidden">
                <div className="flex items-center justify-between py-4 ">
                    <h2 className="text-xl font-medium text-gray-900">Upcoming Live Classes</h2>
                    <Button
                        startContent={<PlusIcon />}
                        className="text-sm bg-[#06574C] text-white"
                    >
                        Schedule New
                    </Button>
                </div>

                <Table >
                    <TableHeader >
                        <TableColumn className='bg-[#EBD4C9]/30'>Class</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Teacher</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Time</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Enrolled</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Price</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Reviews</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Category</TableColumn>
                        <TableColumn className='bg-[#EBD4C9]/30'>Status</TableColumn>
                    </TableHeader>

                    <TableBody>
                        {classes.map((classItem) => (
                            <TableRow key={classItem.id} >
                                <TableCell>
                                    <div>
                                        <div className="font-medium text-gray-900">{classItem.name}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{classItem.subtitle}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div>
                                        <div className="font-medium">{classItem.teacher}</div>
                                        <div className="text-xs text-gray-500 mt-0.5">{classItem.email}</div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">{classItem.time}</span>
                                </TableCell>
                                <TableCell>
                                    <span className="font-medium">{classItem.enrolled}</span>
                                </TableCell>
                                <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.status}</p>
                                </TableCell>
                                  <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.price}</p>
                                </TableCell>
                                  <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.reviews}</p>
                                </TableCell>
                                  <TableCell>
                                    <p className='p-2 w-full text-center rounded-md text-[#06574C] bg-[#95C4BE]/20'>{classItem.category}</p>
                                </TableCell>

                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}

export default CourseManagement
