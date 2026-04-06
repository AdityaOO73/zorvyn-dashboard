export default function ComingSoon({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh] font-poppins">
      <div className="text-center px-6 py-10 rounded-2xl border border-(--border) bg-(--card) shadow-sm">

        {/* Title */}
        <h1 className="text-2xl font-semibold mb-3 text-(--text)">
          {title}
        </h1>

        {/* Message */}
        <p className="text-(--muted) text-sm">
          This feature is currently under development and will be available soon.
        </p>

        {/* Indicator */}
        <div className="mt-6 flex justify-center">
          <div className="w-16 h-1 rounded-full bg-(--primary) opacity-70 animate-pulse"></div>
        </div>

      </div>
    </div>
  );
}