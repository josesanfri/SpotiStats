import TimeRangeSelector from "@/components/time-range-selector";

interface GenreHeaderProps {
    timeRange: "short_term" | "medium_term" | "long_term";
    setTimeRange: (range: "short_term" | "medium_term" | "long_term") => void;
}

const GenreHeader = ({ timeRange, setTimeRange }: GenreHeaderProps) => (
    <section>
        <h1 className="text-2xl sm:text-3xl font-bold">
            Top Genres -{" "}
            {
                {
                    short_term: "Last Month",
                    medium_term: "Last 6 Months",
                    long_term: "Last Year",
                }[timeRange]
            }
        </h1>
        <TimeRangeSelector timeRange={timeRange} onTimeRangeChange={setTimeRange} />
    </section>
);

export default GenreHeader;
