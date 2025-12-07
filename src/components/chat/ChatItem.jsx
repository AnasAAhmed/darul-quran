
const roleBadgeColors = {
    Student: "bg-orange-100 text-orange-primary font-medium text-xs",
    Teacher: "bg-teal-light bg-opacity-20 text-teal-accent font-medium text-xs",
};

export default function ChatItem({
    avatar,
    name,
    role,
    message,
    time,
    isActive = false,
    isUnread = false,
}) {
    return (
        <div
            className={`
                flex items-start gap-3 px-4 py-4 cursor-pointer transition-colors hover:bg-gray-50 border-b border-b-gray-200 
                ${isActive ? "bg-[#EBD4C9] border-l-4 border-l-teal-accent" : ''}`
            }
        >
            <div className="shrink-0">{avatar}</div>
            <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-bold text-sm text-gray-800">{name}</h3>
                    <span
                        className={
                            "text-xs capitalize font-medium px-2 py-1 rounded-md"
                        }
                        style={{
                            backgroundColor: role === 'student' ? "#FBF4EC" : "#8bc0b956",
                            color: role === 'student' ? '#D28E3D' : '#06574C'
                        }}
                    >
                        {role}
                    </span>
                </div>
                <p className="text-sm text-gray-600 truncate">{message}</p>
            </div>
            <div className="shrink-0 text-xs text-gray-400">{time}</div>
        </div>
    );
}
