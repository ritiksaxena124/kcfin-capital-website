export const PerformanceMetrics = () => {
  return (
    <div className="w-full grid grid-cols-3 gap-2 md:gap-4">
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {" "}
          &lt;2 mins
        </h2>
        <p className="text-zinc-600 text-center text-sm md:text-base">
          Instant Eligibility
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center"> 95%</h2>
        <p className="text-zinc-600 text-center text-sm md:text-base">
          Success Rate
        </p>
      </div>
      <div className="flex flex-col items-center">
        <h2 className="text-2xl md:text-4xl font-bold text-center">
          {" "}
          24 hours
        </h2>
        <p className="text-zinc-600 text-center text-sm md:text-base">
          Processing Time
        </p>
      </div>
    </div>
  );
};
