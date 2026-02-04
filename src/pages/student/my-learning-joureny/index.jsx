/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { DashHeading } from "../../../components/dashboard-components/DashHeading";
import { FaUserGraduate } from "react-icons/fa";
import { Button, Progress, Spinner } from "@heroui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const MyLearning = () => {
  const { user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview"); // overview, recordings, history
  const [courses, setCourses] = useState([]);
  const [history, setHistory] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingHistory, setLoadingHistory] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/my-courses`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setCourses(data.courses);
    } catch (e) { console.error(e); }
    finally { setLoadingCourses(false); }
  };

  const fetchHistory = async () => {
    if (history.length > 0) return; // already fetched
    setLoadingHistory(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/attendance/history`, { credentials: 'include' });
      const data = await res.json();
      if (data.success) setHistory(data.history);
    } catch (e) { console.error(e); }
    finally { setLoadingHistory(false); }
  };

  useEffect(() => {
    if (activeTab === 'history') fetchHistory();
  }, [activeTab]);

  const overallProgress = courses.length > 0
    ? Math.round(courses.reduce((acc, c) => acc + (Number(c.progress) || 0), 0) / courses.length)
    : 0;

  return (
    <div className="bg-white bg-linear-to-t from-[#F1C2AC]/50 to-[#95C4BE]/50 h-screen px-2 sm:px-3 overflow-y-auto">
      <DashHeading title={"My Learning Journey"} desc={"See & continue your learning journey"} />

      {/* Header Card */}
      <div className="p-4 rounded-xl mb-3" style={{ backgroundImage: "url(/images/student-banner.png)", backgroundSize: 'cover' }}>
        <div className="p-3 bg-white rounded-lg shadow-sm">
          <div className="flex gap-3 flex-col md:flex-row items-center">
            <div className="h-15 w-15 rounded-full bg-[#FBF4EC] flex justify-center items-center">
              <FaUserGraduate size={30} color="#D28E3D" />
            </div>
            <div>
              <h1 className="text-2xl font-semibold">{user?.firstName} {user?.lastName}</h1>
              <div className="flex gap-3 items-center mt-1">
                <p className="text-xs text-[#06574C] bg-[#95C4BE33] w-20 py-2 rounded-lg text-center">Level {user?.level || 1}</p>
                <p className="text-xs text-[#D28E3D] bg-[#FBF4EC] w-25 py-2 rounded-lg text-center">{overallProgress}% Complete</p>
              </div>
            </div>
          </div>
          <p className="text-md my-3 text-gray-600">Track your learning journey and unlock new achievements as you progress.</p>
          <Progress
            classNames={{ indicator: "bg-[#06574C]" }}
            showValueLabel
            className="mt-3"
            label="Overall Progress"
            size="sm"
            value={overallProgress}
          />
        </div>

        {/* Tabs */}
        <div className="flex flex-col md:flex-row md:justify-between items-center gap-3 mt-3">
          <Button
            size="md" radius="sm"
            className={`w-full ${activeTab === 'overview' ? 'bg-[#06574C] text-white' : 'bg-white text-gray-700'}`}
            onPress={() => setActiveTab('overview')}
          >
            Journey Overview
          </Button>
          <Button
            size="md" radius="sm"
            variant={activeTab === 'recordings' ? "solid" : "bordered"}
            color={activeTab === 'recordings' ? "primary" : "success"}
            className={`w-full ${activeTab === 'recordings' ? 'bg-[#06574C] text-white' : 'bg-white text-gray-700'}`}
            onPress={() => setActiveTab('recordings')}
          >
            Recordings
          </Button>
          <Button
            size="md" radius="sm"
            variant={activeTab === 'history' ? "solid" : "bordered"}
            color={activeTab === 'history' ? "primary" : "success"}
            className={`w-full ${activeTab === 'history' ? 'bg-[#06574C] text-white' : 'bg-white text-gray-700'}`}
            onPress={() => setActiveTab('history')}
          >
            Session History
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white mb-3 rounded-lg overflow-hidden min-h-[400px]">
        {activeTab === 'overview' && (
          <div className="p-6">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-xl font-semibold">Level {user?.level || 1}</p>
                <p className="text-xs text-center py-1 w-24 rounded-md bg-[#95C4BE33] text-[#06574C]">Current Level</p>
              </div>
              <p className="py-3 text-sm text-[#333333]">Currently on Level {user?.level || 1} - Master the fundamentals</p>
              {/* Level specific progress? For now use overall */}
              <Progress classNames={{ indicator: "bg-[#06574C]" }} showValueLabel label="Level Progress" size="sm" value={overallProgress} />
            </div>

            <div className="mt-4 grid grid-cols-12 gap-3">
              {loadingCourses ? <div className="col-span-12 flex justify-center py-10"><Spinner /></div> :
                courses.length === 0 ? <div className="col-span-12 text-center text-gray-500">No courses enrolled.</div> :
                  courses.map((item) => (
                    <div key={item.id} className="col-span-12 md:col-span-6 lg:col-span-4 bg-[linear-gradient(110.57deg,rgba(241,194,172,0.25)_0.4%,rgba(149,196,190,0.25)_93.82%)] rounded-lg p-4 w-full border-1 border-[#B3B3B333]">
                      <div className="flex justify-between items-start mb-2">
                        <p className="bg-white text-[#06574C] text-center text-xs font-bold py-1 px-2 rounded-md">
                          {Number(item.progress) === 100 ? "Completed" : Number(item.progress) > 0 ? "In Progress" : "Active"}
                        </p>
                      </div>
                      <div className="my-3 cursor-pointer" onClick={() => navigate(`/student/course/${item.id}/learn`)}>
                        <p className="text-lg text-[#333333] font-semibold line-clamp-1">{item.courseName}</p>
                        <p className="text-xs text-gray-600 line-clamp-2 mt-1">{item.description}</p>
                      </div>
                      <div>
                        <Progress
                          classNames={{ indicator: "bg-[#06574C]" }}
                          showValueLabel
                          label="Progress"
                          size="sm"
                          value={Number(item.progress) || 0}
                        />
                      </div>
                      <Button size="sm" className="w-full mt-3 bg-white text-[#06574C] border border-[#06574C]/20" onPress={() => navigate(`/student/course/${item.id}/learn`)}>
                        Continue
                      </Button>
                    </div>
                  ))
              }
            </div>
          </div>
        )}

        {activeTab === 'recordings' && (
          <div className="p-10 text-center text-gray-500">
            <p>No recordings available yet.</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="p-6">
            <h3 className="text-lg font-bold mb-4">Past Sessions</h3>
            {loadingHistory ? <div className="flex justify-center"><Spinner /></div> :
              history.length === 0 ? <div className="text-center text-gray-500">No session history found.</div> :
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200 border">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Title</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {history.map((h) => (
                        <tr key={h.id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(h.date).toLocaleDateString()} {h.startTime}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{h.courseName}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{h.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${h.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                              {h.status === 'Completed' ? 'Attended' : h.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
            }
          </div>
        )}
      </div>
    </div>
  );
};
export default MyLearning;
