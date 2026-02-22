import { useEffect, useState } from "react";
import { parseInterval } from "../../../lib/utils";

export const IntervalInput = ({
    initialValue,
    onUpdate,
    label = "Released Interval",
    inputWidth = 80,
    className = 'flex flex-col sm:flex-row sm:items-center gap-2',
    units = ["hour", "day", "month"],
}) => {
    const [numberValue, setNumberValue] = useState("");
    const [unitValue, setUnitValue] = useState('released_immediately');

    useEffect(() => {
        if (initialValue) {
            const { number, unit } = parseInterval(initialValue);
            setNumberValue(number);
            setUnitValue(unit || 'released_immediately');
        }
    }, [initialValue]);
    const handleUpdate = () => {
        if (unitValue === "released_immediately") {
            onUpdate("null");
            return;
        }
        if (!numberValue || !unitValue) return;
        if ((numberValue === initialNumber) || (unitValue === initialType)) return;
        const interval = `${numberValue} ${numberValue < 2 ? unitValue?.replace('s', '') : unitValue}`;
        onUpdate(interval);
    };

    return (
        <div className={className}>
            <span className="text-[16px] font-normal text-gray-700 sms-36">
                {label}
            </span>

            <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 flex-1">
                <input
                    type="number"
                    style={{ width: `${inputWidth}px` }}
                    className="p-2 border disabled:opacity-45 cursor-not-allowed border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#406c65] focus:border-[#406c65] transition-colors text-sm"
                    value={numberValue}
                    min={1}
                    placeholder="Period Number"
                    disabled={!unitValue || unitValue === "released_immediately"}
                    title="Period Number"
                    max={unitValue === "hours" ? 24 : 31}
                    onChange={(e) => setNumberValue(Number(e.target.value))}
                    onBlur={handleUpdate}
                />

                <select
                    className="p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#406c65] focus:border-[#406c65] transition-colors"
                    value={unitValue}
                    placeholder="Period Unit Type"
                    title="Period Unit Type"
                    onChange={(e) => setUnitValue(e.target.value)}
                    onBlur={handleUpdate}
                >
                    {units.map((unit) => (
                        <option key={unit} value={unit}>
                            {unit}(s)
                        </option>
                    ))}
                    <option className="capitalize" value={'released_immediately'}>
                        Released immediately
                    </option>
                </select>
            </div>
        </div>

    );
};