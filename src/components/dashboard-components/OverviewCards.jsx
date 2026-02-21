import { Skeleton } from "@heroui/react";

/**
 * OverviewCards Component
 *
 * Renders horizontal scrollable statistic cards on mobile
 * and a full-width responsive grid on larger screens.
 *
 * @param {Object} props
 * @param {Array<{
 *   title: string,
 *   value: string | number,
 *   icon: string,
 *   changeText: string,
 *   changeColor: string
 * }>} props.data - Array of card objects to display.
 *
 * @example
 * const cardsData = [
 *   {
 *     title: "Total Enrollments",
 *     value: "12,847",
 *     icon: "/icons/user-medal.png",
 *     changeText: "+12.5% from last month",
 *     changeColor: "text-[#38A100]",
 *   }
 * ];
 *
 * <OverviewCards data={cardsData} />
 */
const OverviewCards = ({ data = [], isLoading }) => {
    return (
        <div className="py-4 gap-5  overflow-x-auto grid grid-cols-1 sm:grid-cols-4">
            {isLoading ? [...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-center">
                    <Skeleton
                        className="w-full h-40 min-w-[15em] bg-white sm:min-w-0 flex-1 space-y-4 rounded-lg p-4 shadow-lg"
                        count={4}
                    />
                </div>
            )) : data.map((item, index) => (
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
                        </div>
                    </div>

                    <p className={item.changeColor}>{item.changeText}</p>
                </div>
            ))}
        </div>
    );
};

export default OverviewCards;
