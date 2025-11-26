import { useLocation } from "react-router-dom";

export const DashHeading = ({ title, desc }) => {
    const location = useLocation();
    const segments = location.pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "Dashboard";
    const heading = lastSegment
        .replace(/-/g, " ") // kebab-case to spaces
        .replace(/\b\w/g, (c) => c.toUpperCase()); // capitalize first letter
    return (
        <div className="px-2 sm:px-4 py-4 sm:py-8">
            <p className="text-2xl text-nowrap sm:text-3xl font-bold text-[#333333]">{title ? title : heading}</p>
            <p className="text-[13px] w-40 sm:w-full sm:text-[16px] text-[#666666]">{desc}</p>
        </div>
    );
};