import TimeRangeSelector from "@/components/time-range-selector";

interface ArtistHeaderProps {
    timeRange: "short_term" | "medium_term" | "long_term";
    onTimeRangeChange: (value: "short_term" | "medium_term" | "long_term") => void;
}

const ArtistHeader = ({ timeRange, onTimeRangeChange }: ArtistHeaderProps) => {
    return (
        <section>
            <h1 className="text-2xl sm:text-3xl font-bold">
                Top Artist - { 
                    { short_term: "Last Month", medium_term: "Last 6 Months", long_term: "Last Year" }[timeRange]
                }
            </h1>
            <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={onTimeRangeChange} />
        </section>
    );
}

export default ArtistHeader;