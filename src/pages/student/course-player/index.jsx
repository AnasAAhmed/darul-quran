/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, Spinner } from "@heroui/react";
import { ArrowLeft, PlayCircle, CheckCircle } from "lucide-react";

import { successMessage } from "../../../lib/toast.config";

const CoursePlayer = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [completedLessons, setCompletedLessons] = useState([]);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        fetchCourse();
        fetchEnrollment();
    }, [id]);

    const fetchEnrollment = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/check-enrollment/${id}`, { credentials: 'include' });
            const data = await res.json();
            if (data.success && data.enrollment) {
                let cl = [];
                try {
                    cl = typeof data.enrollment.completedLessons === 'string'
                        ? JSON.parse(data.enrollment.completedLessons)
                        : data.enrollment.completedLessons || [];
                } catch (e) { cl = []; }

                setCompletedLessons(cl);
                setProgress(Number(data.enrollment.progressStatus) || 0);
            }
        } catch (e) { console.error(e); }
    };

    const fetchCourse = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/getCourseById/${id}`, {
                headers: { 'Accept': 'application/json' },
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success && data.course) {
                setCourse(data.course);
                if (data.course.lesson_video && data.course.lesson_video.length > 0) {
                    setCurrentLesson(data.course.lesson_video[0]);
                }
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleVideoEnd = async () => {
        if (!currentLesson) return;
        const lid = currentLesson.id;
        // Don't mark if already completed
        if (completedLessons.includes(lid)) return;

        try {
            const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/mark-complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({ courseId: id, lessonId: lid })
            });
            const data = await res.json();
            if (data.success) {
                setCompletedLessons(data.completedLessons);
                setProgress(data.progress || 0);
                successMessage("Lesson Completed!");
            }
        } catch (e) { console.error(e); }
    };

    if (loading) return <div className="h-screen flex items-center justify-center"><Spinner size="lg" /></div>;
    if (!course) return <div className="p-10 text-center">Course not found</div>;

    const lessons = course.lesson_video || [];

    return (
        <div className="flex flex-col h-screen bg-gray-50 overflow-hidden">
            {/* Header */}
            <header className="h-16 bg-white border-b flex items-center px-4 justify-between shrink-0 z-10 shadow-sm">
                <div className="flex items-center gap-3">
                    <Button variant="light" isIconOnly onPress={() => navigate("/student/dashboard")}>
                        <ArrowLeft size={20} />
                    </Button>
                    <div className="flex flex-col">
                        <h1 className="text-lg font-bold truncate max-w-xl text-[#06574C]">{course.courseName}</h1>
                        <span className="text-xs text-gray-500">Back to Dashboard</span>
                    </div>
                </div>
                <div>
                    <div className="text-sm font-medium text-[#06574C]">Your Progress: {progress}%</div>
                    <div className="w-32 h-2 bg-gray-200 rounded-full mt-1 overflow-hidden">
                        <div className="h-full bg-[#06574C] transition-all duration-500" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
            </header>

            {/* Content Area */}
            <div className="flex flex-1 overflow-hidden">
                {/* Left: Main Player */}
                <div className="flex-1 flex flex-col overflow-y-auto bg-black/5">
                    <div className="bg-black w-full aspect-video flex-shrink-0 relative shadow-lg">
                        {currentLesson ? (
                            <video
                                key={currentLesson.url || currentLesson.src || currentLesson.thumbnail}
                                src={currentLesson.url || currentLesson.src || currentLesson.thumbnail}
                                controls
                                autoPlay
                                className="w-full h-full"
                                controlsList="nodownload"
                                onEnded={handleVideoEnd}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-white/50">
                                Select a lesson from the right to start learning
                            </div>
                        )}
                    </div>

                    <div className="p-6 max-w-4xl mx-auto w-full">
                        <h2 className="text-2xl font-bold mb-2 text-gray-800">{currentLesson?.title || course.courseName}</h2>
                        <div className="prose max-w-none text-gray-600 mb-8 p-4 bg-white rounded-lg shadow-sm">
                            <h3 className="text-lg font-semibold mb-2">About this lesson</h3>
                            <p className="whitespace-pre-wrap">{course.description}</p>
                        </div>
                    </div>
                </div>

                {/* Right: Sidebar */}
                <div className="w-80 md:w-96 bg-white border-l flex flex-col shrink-0 shadow-lg z-0">
                    <div className="p-4 border-b font-bold text-lg bg-gray-50 text-[#06574C]">Course Content</div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {lessons.length > 0 ? (
                            lessons.map((lesson, idx) => {
                                const isCompleted = completedLessons.includes(lesson.id);
                                const isCurrentById = currentLesson && currentLesson.id === lesson.id;

                                return (
                                    <div
                                        key={idx}
                                        onClick={() => setCurrentLesson(lesson)}
                                        className={`p-3 rounded-lg cursor-pointer flex items-start gap-3 transition-all duration-200 border ${isCurrentById
                                                ? "bg-[#06574C]/10 border-[#06574C] shadow-sm transform scale-[1.02]"
                                                : "hover:bg-gray-50 border-transparent hover:border-gray-200"
                                            }`}
                                    >
                                        <div className="mt-1 shrink-0">
                                            {isCompleted ? (
                                                <CheckCircle size={18} className="text-green-500 fill-green-100" />
                                            ) : isCurrentById ? (
                                                <PlayCircle size={18} className="text-[#06574C]" />
                                            ) : (
                                                <PlayCircle size={18} className="text-gray-300" />
                                            )}
                                        </div>
                                        <div>
                                            <div className={`text-sm font-semibold ${isCurrentById ? "text-[#06574C]" : "text-gray-700"} ${isCompleted ? "line-through text-gray-400" : ""}`}>
                                                {lesson.name || lesson.title || `Lesson ${idx + 1}`}
                                            </div>
                                            <div className="text-xs text-gray-400 mt-1">
                                                {lesson.duration ? `${lesson.duration} min` : "Video Lesson"}
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        ) : (
                            <div className="text-center text-gray-500 mt-10 p-4">
                                <p>No video lessons available for this course yet.</p>
                            </div>
                        )}
                    </div>
                    <div className="p-4 border-t bg-gray-50 text-xs text-center text-gray-400">
                        Darul Quran Online Learning
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoursePlayer;
