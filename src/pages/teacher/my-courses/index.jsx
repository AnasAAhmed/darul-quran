import { Button, Progress } from "@heroui/react";
import {
  BookIcon,
  ChartPie,
  Clock,
  Edit,
  MapPin,
  MegaphoneIcon,
  PlusIcon,
  UsersIcon,
  UsersRound,
  UserStar,
  Video,
} from "lucide-react";
import {
  AiOutlineBook,
  AiOutlineEye,
  AiOutlineLineChart,
} from "react-icons/ai";
import { LuClock4 } from "react-icons/lu";
import { RiGroupLine } from "react-icons/ri";
import OverviewCards from "../../../components/dashboard-components/OverviewCards";
import { IoBulbOutline } from "react-icons/io5";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";

const MyCourses = () => {
  const cardsData = [
    {
      title: "Total Courses ",
      value: "24",
      icon: <AiOutlineBook color="#06574C" size={22} />,
      changeText: "8%",
      changeColor: "text-[#38A100]",
    },
    {
      title: "Attendance Rate",
      value: "$89,432",
      icon: <AiOutlineLineChart color="#06574C" size={22} />,
      changeText: "5%",
      changeColor: "text-[#38A100]",
    },
    {
      title: "Total Students",
      value: "3,847",
      icon: <UsersRound color="#06574C" size={22} />,
      changeText: "12%",
      changeColor: "text-[#E8505B]",
    },
    {
      title: "Active Quizzes",
      value: "24",
      icon: <IoBulbOutline color="#06574C" size={22} />,
      changeText: "-0%",
      changeColor: "text-[#9A9A9A]",
    },
  ];

  const courseCard = [
    {
      id: 1,
      Status: "Active",
      course: "Advanced Web Development",
      students: "32",
      role: "Student",
      time: "Nov 11, 10:00 AM",
      value: 70,
    },
    {
      id: 2,
      Status: "Active",
      course: "Advanced Web Development",
      students: "32",
      role: "Student",
      time: "Nov 11, 10:00 AM",
      value: 70,
    },
    {
      id: 3,
      Status: "Active",
      course: "Advanced Web Development",
      students: "32",
      role: "Student",
      time: "Nov 11, 10:00 AM",
      value: 70,
    },
  ];

  const upcomingClasses = [
    {
      id: 1,
      day: "11",
      month: "Nov",
      time: "10:00 AM - 11:30 AM",
      Title: "Advanced Web Development",
      students: "32",
      role: "Student",
      status: "Online",
      course: "Python",
      location: "Join Zoom",
    },
    {
      id: 2,
      day: "11",
      month: "Nov",
      time: "10:00 AM - 11:30 AM",
      Title: "Advanced Web Development",
      students: "32",
      role: "Student",
      status: "Online",
      course: "Python",
    },
    {
      id: 3,
      day: "11",
      month: "Nov",
      time: "10:00 AM - 11:30 AM",
      Title: "Advanced Web Development",
      students: "32",
      role: "Student",
      status: "Online",
      course: "Python",
      location: "Join Zoom",
    },
  ];
  return (
    <div className="bg-white bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 h-scrseen px-2 sm:px-3">
      {/* banner */}
      {/* <div className="space-y-4 mt-3 w-full bg-[url('/images/banner.png')] p-4 rounded-lg bg-center bg-no-repeat bg-cover">
        <h1 className="text-xl sm:text-3xl text-white font-semibold ">
          Upload your class materials 24 hours before the <br /> session to give
          students time to prepare. <br />
        </h1>
        <Button size="sm" className="bg-[#06574C] text-white rounded-md">
          Learn More
        </Button>
      </div> */}
      <DashHeading
        title={"Advanced Web Development"}
        desc={"32 Students Enrolled"}
      />

      {/* <OverviewCards data={cardsData} /> */}
      <div className="pb-4 gap-5  overflow-x-auto grid grid-cols-1 sm:grid-cols-4">
        {cardsData.map((item, index) => (
          <div
            key={index}
            className="bg-[#F1E0D9] sm:bg-white min-w-[15em] sm:min-w-0 flex-1 space-y-4 rounded-lg p-4"
          >
            <h1 className="font-semibold text-[#333333]">{item.title}</h1>

            <div className="flex items-center gap-2 justify-start">
              <div className="rounded-full p-3 bg-[#95C4BE]/20">
                {item.icon}
              </div>
              <div>
                <p className="text-2xl font-semibold">{item.value}</p>
                <p className={`${item.changeColor} text-sm`}>
                  {item.changeText}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* <div>
        <div className="grid grid-cols-12 gap-3 pb-4">
          {courseCard.map((item, index) => (
            <div className="col-span-12 md:col-span-6 lg:col-span-4 ">
              <div className="w-full bg-white rounded-lg">
                <div className="bg-[linear-gradient(110.57deg,rgba(241,194,172,0.25)_0.4%,rgba(149,196,190,0.25)_93.82%)]  rounded-lg p-3 ">
                  <Button
                    size="sm"
                    radius="sm"
                    className="bg-white text-[#06574C] px-4"
                  >
                    {item.Status}
                  </Button>
                  <div className="">
                    <span className=" flex justify-center items-center py-6 text-2xl font-semibold ">
                      {item.course}
                    </span>
                  </div>
                </div>
                <div className="p-3 space-y-3">
                  <div className="flex justify-between items-center ">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-[#95C4BE33] flex items-center justify-center text-white font-bold text-sm  shrink-0">
                        <RiGroupLine size={22} color="#06574C" />
                      </div>
                      <div>
                        <p className="font-semibold text-[#06574C] text-lg leading-tight">
                          {item.students}
                        </p>
                        <p className="text-sm text-[#666666]">{item.role}</p>
                      </div>
                    </div>
                    <div className="text-end">
                      <p className="font-semibold text-black text-sm leading-tight">
                        Next Class
                      </p>
                      <p className="text-sm text-[#666666]">{item.time}</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-[#6B7280]">
                      <span>Progress</span>
                      <span>{item.value}%</span>
                    </div>
                    <Progress
                      color="success"
                      value={item.value}
                      size="sm"
                    ></Progress>
                  </div>
                  <div>
                    <Button
                      size="sm"
                      className="bg-[#06574C] text-white rounded-md w-full mt-2"
                      startContent={<AiOutlineEye size={22} />}
                    >
                      View Course
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div> */}

      <div className=" bg-white rounded-lg mb-3 ">
        <h1 className="p-3 text-xl text-[#333333]">Upcoming Classes</h1>
        <div className="flex flex-col gap-3">
          {upcomingClasses.map((item, index) => (
            <div
              className={`${
                item.location === "Join Zoom" ? "bg-[#EAF3F2]" : "bg-[#F5E3DA]"
              } `}
            >
              <div className="flex flex-col md:flex-row gap-4 md:justify-between p-4 md:items-center">
                <div className="flex flex-col md:flex-row gap-3 md:items-center justify-center">
                  <div className="h-20 w-20 rounded-full shadow-xl flex flex-col items-center justify-center bg-white">
                    <p className="text-xl text-[#06574C] font-semibold">
                      {item.day}
                    </p>
                    <p className="text-sm text-[#06574C] font-semibold">
                      {item.month}
                    </p>
                  </div>
                  <div>
                    <div className="text-lg text-[#06574C] font-semibold">
                      {item.Title}
                    </div>
                    <div className="flex flex-wrap max-md:my-3 md:items-center mb-2 gap-5 text-sm text-[#666666]">
                      <div className="flex items-center gap-1 ">
                        <Clock size={20} />
                        {item.time}
                      </div>
                      <div className="flex items-center gap-1 ">
                        <MapPin size={20} />
                        {item.status}
                      </div>
                      <div className="flex items-center gap-1 ">
                        <Video size={20} />
                        {item.students} {item.role}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button size="sm" className="bg-white text-[#06574C]">
                        {item.course}
                      </Button>
                      <Button size="sm" className="bg-white text-[#D28E3D]">
                        Join Now
                      </Button>
                    </div>
                  </div>
                </div>
                <div>
                  <Button
                    startContent={
                      item.location === "Join Zoom" ? (
                        <Edit size={20} />
                      ) : (
                        <AiOutlineEye size={22} />
                      )
                    }
                    size="sm"
                    className={`${
                      item.location === "Join Zoom"
                        ? "bg-[#1570E8]"
                        : "bg-[#06574C]"
                    } w-32 text-white rounded-md`}
                  >
                    {item.location || "View Details"}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="px-3 sm:px-6 py-4 rounded-lg bg-white my-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button
            variant="solid"
            color="primary"
            startContent={<PlusIcon />}
            className="w-full py-4 bg-[#06574C] text-white"
          >
            New Announcement
          </Button>
          <Button
            variant="solid"
            color="primary"
            startContent={<PlusIcon />}
            className="w-full py-4 bg-[#06574C] text-white"
          >
            Shedule New Class
          </Button>
          <Button
            variant="flat"
            startContent={<PlusIcon />}
            className="w-full py-4 bg-[#06574C] text-white font-semibold"
          >
            Create Quiz
          </Button>
        </div>
      </div>
    </div>
  );
};
const ClassCard = ({ classItem }) => {
  return (
    <div className="bg-[#F1E0D9] rounded-2xl border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors">
      <div className="flex items-start gap-3">
        <div className="w-12 h-12 rounded-full bg-linear-to-br from-teal-400 to-emerald-500 flex items-center justify-center text-white font-bold text-sm  shrink-0">
          {classItem.teacher
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 ">
            <h3 className="font-semibold text-[#06574C] text-sm leading-tight">
              {classItem.name}
            </h3>
            <span className="px-2.5 py-1 text-xs rounded-md text-[#06574C] bg-[#95C4BE]/20 whitespace-nowrap font-medium">
              {classItem.status}
            </span>
          </div>

          <p className="text-xs text-gray-500 ">{classItem.subtitle}</p>

          <div className="s">
            <div className="flex text-gray-500 items-center gap-1 text-xs">
              <span className="">With</span>
              <span className="font-medium">{classItem.teacher}</span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center gap-1">
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span className="text-gray-600">{classItem.time}</span>
              </div>

              <div className="flex items-center gap-1">
                <UsersIcon />
                <span className="text-gray-600 font-medium">
                  {classItem.enrolled}
                </span>
                <span className="text-gray-400">Enrolled</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MyCourses;
