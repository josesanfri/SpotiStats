import { Button } from "@/components/ui/button";

interface TimeRangeSelectorProps {
    timeRange: "short_term" | "medium_term" | "long_term";
    onTimeRangeChange: (
        range: "short_term" | "medium_term" | "long_term"
    ) => void;
}

const TimeRangeSelector: React.FC<TimeRangeSelectorProps> = ({
    timeRange,
    onTimeRangeChange,
}) => {
    return (
        <div className="flex gap-4 sm:space-x-4 mt-4 flex-col sm:flex-row">
            <Button
                onClick={() => onTimeRangeChange("short_term")}
                className={
                    `w-full ${
                        timeRange === "short_term" ? "border-green-500 border-2" : ""
                    }`
                }
            >
                Last Month
            </Button>
            <Button
                onClick={() => onTimeRangeChange("medium_term")}
                className={
                    `w-full ${
                        timeRange === "medium_term" ? "border-green-500 border-2" : ""
                    }`
                }
            >
                Last 6 Months
            </Button>
            <Button
                onClick={() => onTimeRangeChange("long_term")}
                className={
                    `w-full ${
                        timeRange === "long_term" ? "border-green-500 border-2" : ""
                    }`
                }
            >
                Last Year
            </Button>
        </div>
    );
};

export default TimeRangeSelector;
