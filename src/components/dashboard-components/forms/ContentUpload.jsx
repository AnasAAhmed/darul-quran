import { useState, useEffect } from "react";

import { Download, Trash2, Eye, Clock, Menu, Edit, List, Loader, File, Play, ExternalLink } from "lucide-react";
import FileDropzone from "../dropzone";
import { Button, Select, SelectItem, Input, addToast } from "@heroui/react";
import { PiFile, PiFilePdf } from "react-icons/pi";
import { errorMessage, successMessage } from "../../../lib/toast.config";
import { formatForInput } from "../../../lib/utils";
import { Link } from "react-router-dom";
import { IntervalInput } from "./IntervalInput";

const formatTime = (seconds) => {
    if (!seconds) return "00:00";
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    if (h > 0) return `${h}h ${m}m ${s}s`;
    return `${m}m ${s}s`;
};

const deleteDocument = async (id, setFiles, setIsDeleting) => {
    try {
        setIsDeleting(id);
        const response = await fetch(
            `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/course-files/${id}`,
            { method: "DELETE", credentials: "include" }
        );
        const data = await response.json();

        if (data.success) {
            setFiles((prev) => prev.filter((doc) => doc.id !== id));
            successMessage("Document deleted successfully");
        } else {
            errorMessage("Failed to delete document");
        }
    } catch (err) {
        errorMessage("Error deleting document: " + err?.message);
    } finally {
        setIsDeleting(null);
    }
};
const getVideoDuration = (file) => {
    return new Promise((resolve) => {
        try {
            const video = document.createElement('video');
            video.preload = 'metadata';
            video.onloadedmetadata = function () {
                window.URL.revokeObjectURL(video.src);
                resolve(video.duration);
            };
            video.onerror = function (e) {
                console.log(e);

                resolve(0);
            };
            video.src = URL.createObjectURL(file);
        } catch (e) {
            resolve(0);
        }
    });
};

export const countPdfPagesLight = async (file) => {
    if (file.type !== "application/pdf") return;
    const arrayBuffer = await file.arrayBuffer();
    const text = new TextDecoder("utf-8").decode(arrayBuffer);

    // Count /Type /Page occurrences
    const matches = text.match(/\/Type\s*\/Page\b/g);
    return matches ? matches.length : 0;
};

const handleUploadFile = async ({ title, file, fileType, courseId, duration = 0, pages = 0 }) => {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("title", title || file.name);
        formData.append("fileType", fileType);
        formData.append("courseId", courseId);
        if (duration) formData.append("duration", duration);
        if (pages) formData.append("pages", pages);

        const res = await fetch(`${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/course-files`, {
            method: "PATCH",
            body: formData,
            credentials: "include",
        });
        const data = await res.json();

        if (!data.success) {
            throw new Error(data.message || "Upload failed");
        }
        return data.file;
    } catch (err) {
        console.error("Upload failed", err);
        throw new Error("Failed to upload files: " + err?.message);
    }
};

const handleUpdateFile = async (fileId, updates) => {
    try {
        const res = await fetch(
            `${import.meta.env.VITE_PUBLIC_SERVER_URL}/api/course/course-files/${fileId}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(updates),
            }
        );
        const data = await res.json();
        if (!data.success) {
            throw new Error(data.message || "Update failed");
        }
        return data.file;
    } catch (err) {
        console.error("Update failed", err);
        throw new Error("Failed to update file: " + err?.message);
    }
};

export default function Videos({ files, setFiles, courseId }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [newFiles, setNewFiles] = useState([]);
    const [isDeleting, setIsDeleting] = useState(null);
    const updateDocument = async (id, field, value) => {
        const prevFiles = [...files];
        setFiles((prev) =>
            prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
        );

        if (courseId) {
            try {
                await handleUpdateFile(id, { [field]: value });
            } catch (err) {
                errorMessage("Failed to update document");
                setFiles(prevFiles);
            }
        }
    };

    const handleUpload = async () => {
        const newFile = newFiles[0];
        if (!newFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 95) return prev;
                    return prev + 5;
                });
            }, 500);
            const duration = await getVideoDuration(newFile?.file);
            const fileRes = await handleUploadFile({
                title: newFile.name,
                file: newFile?.file,
                fileType: "lesson_video",
                courseId,
                duration,
            });

            clearInterval(interval);
            setUploadProgress(100);
            successMessage("Lesson video uploaded successfully");
            setFiles((prev) => [...prev, fileRes]);
        } catch (err) {
            console.error("Upload failed", newFile.name);
            errorMessage("Upload failed: " + err?.message);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            setNewFiles([]);
        }
    };

    useEffect(() => {
        if (newFiles.length > 0) {
            handleUpload();
        }
    }, [newFiles]);


    const lessonVideos = files?.filter((f) => f.fileType === "lesson_video");
    return (
        <div className="bg-white rounded-lg my-2 w-full">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    Lesson Videos
                    <span className="flex items-center text-sm text-gray-600 gap-1">
                        <Menu />
                        Total Lessons: {lessonVideos?.length}
                    </span>
                </h1>

            </div>
            <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6">
                <div className="space-y-4 my-4">
                    {lessonVideos?.map((document) => (
                        <div
                            key={document.id}
                            className={`rounded-lg p-4 sm:p-6 transition-all ${document.status === "scheduled"
                                ? "bg-[#F5E3DA]"
                                : "bg-[#95C4BE33]"
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                <video className="h-22 w-44 rounded-xl" controls>
                                    <source src={document.url} />
                                </video>
                                {/* <Play color="#06574C" className="bg-[#F5F5F5] p-3 rounded-full size-16" /> */}

                                <div className="flex flex-1 flex-col justify-between gap-1">
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document.title}
                                        className="text-lg outline-none font-semibold sm:text-xl"
                                        onBlur={(e) => {
                                            if (document.title === e.target.value) return;
                                            updateDocument(document.id, "title", e.target.value)
                                        }}
                                    />
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document?.description}
                                        className="outline-none"
                                        placeholder="Add a description"
                                        onBlur={(e) => {
                                            if (document.description === e.target.value) return;
                                            updateDocument(document.id, "description", e.target.value)
                                        }}
                                    />
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        {document?.file?.size && <span className="inline-flex items-center gap-1">{((document.file.size / 1024) / 1024).toLocaleString()} MB</span>}
                                        {document.file?.duration && <span className="inline-flex items-center gap-1">
                                            <Clock className="size-3.5" /> {document.file.duration.toLocaleString() || 0}ms duration
                                        </span>}
                                        {document?.views && <span className="inline-flex items-center gap-1">
                                            <Eye className="h-4 w-4" /> {document?.views.toLocaleString()} views
                                        </span>}
                                        <span className="inline-flex items-center gap-1">{document.status}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 items-end sm:items-center">
                                    <IntervalInput
                                        initialValue={document?.releasedAt}
                                        onUpdate={(interval) => updateDocument(document.id, "releasedAt", interval)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Button as={Link} target="_blank" to={document.url} radius="sm" variant="flat" color="default" isIconOnly>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            radius="sm"
                                            variant="flat"
                                            isIconOnly
                                            color="danger"
                                            isLoading={isDeleting === document.id}
                                            isDisabled={isDeleting === document.id}
                                            onPress={() => deleteDocument(document.id, setFiles, setIsDeleting)}
                                        >
                                            <Trash2 color="#fb2c36" className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload New Video</h3>
                    {isUploading ? (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-4">
                            <Loader className="animate-spin h-8 w-8 text-[#06574C] mb-2" />
                            <div className="w-full max-w-md flex justify-between text-gray-600 mb-1 text-sm font-medium">
                                <span>Uploading files...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#06574C] transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <FileDropzone
                            files={newFiles}
                            setFiles={setNewFiles}
                            label="Drag & Drop Videos"
                            text="or click to upload. Supports multiple files."
                            height="300px"
                            fileType="video"

                        />
                    )}
                </div>
            </div>
        </div>
    );
}



export function PdfAndNotes({ files, setFiles, courseId }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [newFiles, setNewFiles] = useState([]);
    const [isDeleting, setIsDeleting] = useState(null);
    const updateDocument = async (id, field, value) => {
        const prevFiles = [...files];
        setFiles((prev) =>
            prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
        );

        // Call API to update
        if (courseId) {
            try {
                await handleUpdateFile(id, { [field]: value });
            } catch (err) {
                errorMessage("Failed to update document");
                setFiles(prevFiles);
            }
        }
    };

    const handleUpload = async () => {
        const newFile = newFiles[0];
        if (!newFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 95) return prev;
                    return prev + 5;
                });
            }, 500);
            const pages = await countPdfPagesLight(newFile?.file);

            const fileRes = await handleUploadFile({
                title: newFile.name,
                file: newFile?.file,
                fileType: "pdf_notes",
                courseId,
                pages
            });

            clearInterval(interval);
            setUploadProgress(100);
            successMessage("PDF/Note uploaded successfully");
            setFiles((prev) => [...prev, fileRes]);
        } catch (err) {
            console.error("Upload failed", newFile.name);
            errorMessage("Upload failed: " + err?.message);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            setNewFiles([]);
        }
    };

    useEffect(() => {
        if (newFiles.length > 0) {
            handleUpload();
        }
    }, [newFiles]);


    const pdfFiles = files?.filter((f) => f.fileType === "pdf_notes");

    return (
        <div className="bg-white rounded-lg my-2 w-full">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8 flex justify-between items-center">
                <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">
                    PDFs & Notes
                </h1>

            </div>

            <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6">
                <div className="space-y-4 my-4">
                    {pdfFiles?.map((document) => (
                        <div
                            key={document.id}
                            className={`rounded-lg p-4 sm:p-6 transition-all ${document.status === "scheduled"
                                ? "bg-[#F5E3DA]"
                                : "bg-[#95C4BE33]"
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                {document?.file?.mimetype?.includes("pdf") ? (
                                    <PiFilePdf color="#06574C" className="bg-[#F5F5F5] p-3 rounded-full size-16" />
                                ) : (
                                    <PiFile color="#06574C" className="bg-[#F5F5F5] p-3 rounded-full size-16" />
                                )}

                                <div className="flex flex-1 flex-col justify-between gap-1">
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document.title}
                                        className="text-lg outline-none font-semibold sm:text-xl"
                                        onBlur={(e) => {
                                            if (document.title === e.target.value) return;
                                            updateDocument(document.id, "title", e.target.value)
                                        }}
                                    />
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document?.description}
                                        className="outline-none"
                                        placeholder="Add a description"
                                        onBlur={(e) => {
                                            if (document.description === e.target.value) return;
                                            updateDocument(document.id, "description", e.target.value)
                                        }}
                                    />
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        {document?.file?.size && <span className="inline-flex items-center gap-1">{((document.file.size / 1024) / 1024).toLocaleString()} MB</span>}
                                        {document.file?.pages && <span className="inline-flex items-center gap-1">
                                            <File className="size-3.5" /> {document.file.pages.toLocaleString() || 0} pages
                                        </span>}
                                        {document?.views && <span className="inline-flex items-center gap-1">
                                            <Eye className="h-4 w-4" /> {document?.views.toLocaleString() || 0} views
                                        </span>}
                                        <span className="inline-flex items-center gap-1">{document.status}</span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-3 items-end sm:items-center">
                                    <IntervalInput
                                        initialValue={document?.releasedAt}
                                        onUpdate={(interval) => updateDocument(document.id, "releasedAt", interval)}
                                    />

                                    <div className="flex items-center gap-2">
                                        <Button as={Link} target="_blank" to={document.url} radius="sm" variant="flat" color="default" isIconOnly>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            radius="sm"
                                            variant="flat"
                                            isIconOnly
                                            color="danger"
                                            isLoading={isDeleting === document.id}
                                            isDisabled={isDeleting === document.id}
                                            onPress={() => deleteDocument(document.id, setFiles, setIsDeleting)}
                                        >
                                            <Trash2 color="#fb2c36" className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload PDF/Notes</h3>
                    {isUploading ? (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-4">
                            <Loader className="animate-spin h-8 w-8 text-[#06574C] mb-2" />
                            <div className="w-full max-w-md flex justify-between text-gray-600 mb-1 text-sm font-medium">
                                <span>Uploading files...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#06574C] transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <FileDropzone
                            files={newFiles}
                            setFiles={setNewFiles}
                            showFilesThere={false}
                            label="Drag & Drop PDF/Notes"
                            text="or click to upload. Supports multiple files."
                            height="300px"
                            fileType="pdf"
                        />
                    )}
                </div>
            </div>
        </div >
    );
}

export function Assignments({ files, setFiles, courseId }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [newFiles, setNewFiles] = useState([]);
    const [isDeleting, setIsDeleting] = useState(null);
    const updateDocument = async (id, field, value) => {
        const prevFiles = [...files];
        setFiles((prev) =>
            prev.map((doc) => (doc.id === id ? { ...doc, [field]: value } : doc))
        );

        // Call API to update
        if (courseId) {
            try {
                await handleUpdateFile(id, { [field]: value });
            } catch (err) {
                errorMessage("Failed to update document");
                setFiles(prevFiles);
            }
        }
    };


    const handleUpload = async () => {
        const newFile = newFiles[0];
        if (!newFile) return;

        setIsUploading(true);
        setUploadProgress(0);

        try {
            const interval = setInterval(() => {
                setUploadProgress((prev) => {
                    if (prev >= 95) return prev;
                    return prev + 5;
                });
            }, 500);
            const pages = await countPdfPagesLight(newFile?.file);
            const fileRes = await handleUploadFile({
                title: newFile.name,
                file: newFile?.file,
                fileType: "assignments",
                courseId,
                pages
            });

            clearInterval(interval);
            setUploadProgress(100);
            successMessage("Assignments uploaded successfully");
            setFiles((prev) => [...prev, fileRes]);
        } catch (err) {
            console.error("Upload failed", newFile.name);
            errorMessage("Upload failed: " + err?.message);
        } finally {
            setIsUploading(false);
            setUploadProgress(0);
            setNewFiles([]);
        }
    };

    useEffect(() => {
        if (newFiles.length > 0) {
            handleUpload();
        }
    }, [newFiles]);

    const assignments = files?.filter((f) => f.fileType === "assignments");
    return (
        <div className="bg-white rounded-lg my-2 w-full">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Assignments</h1>
                    </div>


                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 pb-3 sm:px-6">
                <div className="space-y-4 my-4">
                    {assignments?.map((document) => (
                        <div
                            key={document.id}
                            className={`rounded-lg p-4 sm:p-6 transition-all ${document.status === "scheduled"
                                ? "bg-[#F5E3DA]"
                                : "bg-[#95C4BE33]"
                                }`}
                        >
                            <div className="flex flex-col sm:flex-row sm:gap-6">
                                {document?.file?.mimetype?.includes("pdf") ? (
                                    <PiFilePdf color="#06574C" className="bg-[#F5F5F5] p-3 rounded-full size-16" />
                                ) : (
                                    <PiFile color="#06574C" className="bg-[#F5F5F5] p-3 rounded-full size-16" />
                                )}

                                <div className="flex flex-1 flex-col justify-between gap-1">
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document.title}
                                        className="text-lg outline-none font-semibold sm:text-xl"
                                        onBlur={(e) => {
                                            if (document.title === e.target.value) return;
                                            updateDocument(document.id, "title", e.target.value)
                                        }}
                                    />
                                    <input
                                        variant="light"
                                        type="text"
                                        defaultValue={document?.description}
                                        className="outline-none"
                                        placeholder="Add a description"
                                        onBlur={(e) => {
                                            if (document.description === e.target.value) return;
                                            updateDocument(document.id, "description", e.target.value)
                                        }}
                                    />
                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        {document?.file?.size && <span className="inline-flex items-center gap-1">{((document.file.size / 1024) / 1024).toLocaleString()} MB</span>}
                                        {document.file?.pages && <span className="inline-flex items-center gap-1">
                                            <File className="size-3.5" /> {document.file.pages.toLocaleString() || 0} pages
                                        </span>}
                                        {document?.views && <span className="inline-flex items-center gap-1">
                                            <Eye className="h-4 w-4" /> {document?.views.toLocaleString() || 0} views
                                        </span>}
                                        <span className="inline-flex items-center gap-1">{document.status}</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 items-end sm:items-center">
                                    <IntervalInput
                                        initialValue={document?.releasedAt}
                                        onUpdate={(interval) => updateDocument(document.id, "releasedAt", interval)}
                                    />
                                    <div className="flex items-center gap-2">
                                        <Button as={Link} target="_blank" to={document.url} radius="sm" variant="flat" color="default" isIconOnly>
                                            <ExternalLink className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            radius="sm"
                                            variant="flat"
                                            isIconOnly
                                            color="danger"
                                            isLoading={isDeleting === document.id}
                                            isDisabled={isDeleting === document.id}
                                            onPress={() => deleteDocument(document.id, setFiles, setIsDeleting)}
                                        >
                                            <Trash2 color="#fb2c36" className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Assignment</h3>
                    {isUploading ? (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-4">
                            <Loader className="animate-spin h-8 w-8 text-[#06574C] mb-2" />
                            <div className="w-full max-w-md flex justify-between text-gray-600 mb-1 text-sm font-medium">
                                <span>Uploading files...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div className="w-full max-w-md h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-[#06574C] transition-all duration-300 ease-out"
                                    style={{ width: `${uploadProgress}%` }}
                                />
                            </div>
                        </div>
                    ) : (
                        <FileDropzone
                            files={newFiles}
                            setFiles={setNewFiles}
                            showFilesThere={false}
                            label="Drag & Drop Assignment Files"
                            text="or click to upload. Supports multiple files."
                            height="300px"
                            fileType="assignment"
                        />
                    )}
                </div>
            </div>
        </div>
    );
}


export function Quizzes({ quizzes = [], setQuizzes, onSave }) {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const updateQuiz = (id, field, value) => {
        const updatedList = quizzes.map((quiz) =>
            quiz.id === id ? { ...quiz, [field]: value } : quiz
        );
        setQuizzes(updatedList);
        if (onSave) onSave(updatedList);
    };

    const deleteQuiz = (id) => {
        const updatedList = quizzes.filter((quiz) => quiz.id !== id);
        setQuizzes(updatedList);
        if (onSave) onSave(updatedList);
    };

    const handleUpload = async (files) => {
        if (!files || files.length === 0) return;
        setIsUploading(true);
        setUploadProgress(0);

        // Simulated Progress
        const interval = setInterval(() => {
            setUploadProgress((prev) => {
                if (prev >= 95) return prev;
                return prev + 5;
            });
        }, 500);

        try {
            const res = await startUpload(files);

            clearInterval(interval);
            setUploadProgress(100);

            const newQs = files.map((fileObj, i) => ({
                id: Date.now() + i + Math.random(),
                title: fileObj.name,
                description: "Uploaded Quiz File",
                duration: "15",
                question: 0,
                thumbnail: URL.createObjectURL(fileObj.file), // Create object URL for preview
                status: "Draft",
                passing: 70,
                is_attached: false,
                releaseDate: "0",
                // Store file metadata for later upload
                file: fileObj.file,
                name: fileObj.name,
                size: fileObj.size,
                type: fileObj.type
            }));
            const updatedList = [...quizzes, ...newQs];
            setQuizzes(updatedList);
            if (onSave) onSave(updatedList);
            successMessage("Quiz(s) Added");
        } catch (e) {
            errorMessage("Upload error");
        } finally {
            clearInterval(interval);
            setTimeout(() => {
                setUploadProgress(0);
                setIsUploading(false);
            }, 1000);
        }
    };
    const Interval = [
        { key: "0", label: "Release Immediately" },
        { key: "1", label: "After 1 Days" },
        { key: "3", label: "After 3 Days" },
    ];
    const AtachOrNot = [
        { key: "true", label: "Attach To Lesson" },
        { key: "false", label: "Deattach To Lesson" },
    ];
    return (
        <div className=" bg-white rounded-lg my-2 w-full">
            {/* Header */}
            <div className="">
                <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold text-gray-900 sm:text-3xl">Course Quizzes</h1>

                        </div>


                        <Button
                            radius="sm"
                            variant="solid"
                            className="bg-white text-[#06574C] border border-[#06574C]"
                            startContent={<Download className="h-4 w-4" />}
                        >
                            Download
                        </Button>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-2 pb-3 sm:px-4">
                <div className="space-y-4 my-4">
                    {quizzes.map((quiz) => (
                        <div
                            key={quiz.id}
                            className={`rounded-lg p-4 sm:p-6 transition-all ${quiz.status === "scheduled"
                                ? "bg-[#F5E3DA]"
                                : "bg-[#95C4BE33] "
                                }`}
                        >
                            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6">
                                <span className="bg-[#F5F5F5] p-2 flex justify-center items-center rounded-full size-16">
                                    <img src="/icons/quiz-buld.png" title="quiz bulb" alt="quiz bulb" />
                                </span>

                                <div className="flex flex-1 flex-col justify-between gap-1">
                                    <div className="space-y-2">
                                        <h3 className="text-lg font-semibold text-gray-900 sm:text-xl">{quiz.title}</h3>
                                        <p className="text-sm text-gray-600 sm:text-base">{quiz.description}</p>
                                    </div>

                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                                        <span className="inline-flex items-center gap-1">
                                            <List />
                                            {// quiz.question might be number, so toLocaleString safe if number
                                                Number(quiz.question || 0).toLocaleString()
                                            } Questions
                                        </span>
                                        <span className="inline-flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {quiz.duration} minutes
                                        </span>
                                        <Button
                                            radius="sm"
                                            size="sm"
                                            className="bg-white text-[#06574C]"
                                        >
                                            Passing {quiz.passing.toLocaleString()}%
                                        </Button>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-3 items-end sm:items-center">
                                    <Select
                                        radius="sm"
                                        className="w-50"
                                        variant="bordered"
                                        selectedKeys={[`${quiz.is_attached}`]}
                                        onSelectionChange={(keys) => updateQuiz(quiz.id, "is_attached", Array.from(keys)[0] === 'true')}
                                        placeholder="Attach?"
                                    >
                                        {AtachOrNot.map((filter) => (
                                            <SelectItem key={filter.key}>{filter.label}</SelectItem>
                                        ))}
                                    </Select>

                                    <div className="flex items-center gap-2">
                                        <Button
                                            radius="sm"
                                            variant="flat"
                                            color="default"
                                            isIconOnly
                                            className="bg-white"
                                        >
                                            <Edit color="#06574C" className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            radius="sm"
                                            variant="flat"
                                            isIconOnly
                                            color="danger"
                                            onPress={() => deleteQuiz(quiz.id)}
                                        >
                                            <Trash2 color="#fb2c36" className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Upload Quiz</h3>
                    {/* {isUploading ? (
                        <div className="w-full h-[300px] flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 px-4">
                            <Loader className="animate-spin h-8 w-8 text-[#06574C] mb-2" />
                            <div className="w-full max-w-md flex justify-between text-gray-600 mb-1 text-sm font-medium">
                                <span>Uploading files...</span>
                                <span>{Math.round(uploadProgress)}%</span>
                            </div>
                            <div
                                className="h-full bg-[#06574C] transition-all duration-300 ease-out"
                                style={{ width: `${uploadProgress}%` }}
                            />
                        </div>
                    ) : (
                        <FileDropzone
                            files={[]}
                            setFiles={handleUpload}
                            label="Drag & Drop Quiz Files"
                            text="or click to upload. Supports multiple files."
                            height="300px"
                            
                        />
                    )} */}
                </div>
            </div>


        </div>
    );
}
