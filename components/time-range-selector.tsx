import { Button } from "@/components/ui/button";

interface TimeRangeSelectorProps {
    timeRange: "short_term" | "medium_term" | "long_term";
    onTimeRangeChange: (range: "short_term" | "medium_term" | "long_term") => void;
}

const options = [
    { label: "Last Month", value: "short_term" },
    { label: "Last 6 Months", value: "medium_term" },
    { label: "Last Year", value: "long_term" },
] as const;

export default function TimeRangeSelector({ timeRange, onTimeRangeChange }: TimeRangeSelectorProps) {
    return (
        <div className="flex gap-4 sm:space-x-4 mt-4 flex-col sm:flex-row">
            {options.map(({ label, value }) => (
                <Button
                    key={value}
                    onClick={() => onTimeRangeChange(value)}
                    className={`w-full ${timeRange === value ? "border-green-500 border-2" : ""}`}
                >
                    {label}
                </Button>
            ))}
        </div>
    );
}
