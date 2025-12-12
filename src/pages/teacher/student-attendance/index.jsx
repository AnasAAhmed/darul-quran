import React from "react";
import {
  Button,
  Progress,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import { Eye } from "lucide-react";

const StudentAttendance = () => {
  const Attendance = [
    {
      id: 1,
      name: "React Hooks Deep Dive",
      desc: "Advanced JavaScript Course",
      studentname: "John Davis",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-27",
    },
    {
      id: 2,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-26",
    },
    {
      id: 3,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-17",
    },
    {
      id: 4,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-16",
    },
    {
      id: 5,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-15",
    },
    {
      id: 6,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-12",
    },
    {
      id: 7,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-03",
    },
    {
      id: 8,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-29",
    },
    {
      id: 9,
      name: "React Hooks Deep Dive",
      studentname: "John Davis",
      desc: "Advanced JavaScript Course",
      enrollments: "1,247",
      email: "john.davis@email.com",
      attendance_rate: 75,
      category: "Nov 20, 2025",
      status: "Active",
      date: "2025-11-22",
    },
  ];
  return (
    <div className="bg-white bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 h-scrseen px-2 sm:px-3">
      <DashHeading
        title={"Student Attendance"}
        desc={"Track and monitor student performance"}
      />
      <div className="mb-3">
        <Table
          isHeaderSticky
          selectionMode="multiple"
          aria-label="Pending approvals table"
          removeWrapper
          classNames={{
            base: "bg-white rounded-lg overflow-x-scroll w-full no-scrollbar",
            th: "font-bold p-4 text-md text-[#333333] capitalize tracking-widest bg-[#EBD4C936]",
            td: "py-3 items-center whitespace-nowrap",
            tr: "border-b border-default-200",
          }}
        >
          <TableHeader>
            <TableColumn>Student</TableColumn>
            <TableColumn>Course</TableColumn>
            <TableColumn>Attendance Rate</TableColumn>
            <TableColumn>Status</TableColumn>
            <TableColumn>Action</TableColumn>
          </TableHeader>

          <TableBody>
            {Attendance.map((classItem) => (
              <TableRow key={classItem.id}>
                <TableCell className="px-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {classItem.studentname}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {classItem.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="px-4">
                  <div>
                    <div className="font-medium text-gray-900">
                      {classItem.name}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5">
                      {classItem.desc}
                    </div>
                  </div>
                </TableCell>

                <TableCell>
                  <div className="flex justify-between items-center gap-2">
                    <Progress
                      classNames={{ indicator: "bg-[#95C4BE]" }}
                      // showValueLabel
                      size="sm"
                      value={classItem.attendance_rate}
                    />
                    <p className="text-end">{classItem.attendance_rate}%</p>
                  </div>
                </TableCell>
                <TableCell>
                  <p className="p-2 bg-[#95C4BE33] rounded-lg text-center text-[#06574C]">
                    {classItem.status}
                  </p>
                </TableCell>
                <TableCell>
                  <Button
                    radius="sm"
                    className="bg-[#06574C] text-white"
                    startContent={<Eye size={18} color="white" />}
                  >
                    View Detail
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default StudentAttendance;
