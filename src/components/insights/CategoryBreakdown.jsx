import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
} from "recharts";

export default function CategoryBreakdown() {
  const data = useSelector((s) => s.transactions);
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const map = {};
  data.forEach((t) => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });

  const sorted = Object.entries(map)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  const max = sorted[0]?.[1] || 1;

  const chartData = sorted.map(([cat, amt]) => ({
    category: cat,
    value: amt,
  }));

  const gradients = [
    "from-green-400 to-green-600",
    "from-blue-400 to-blue-600",
    "from-yellow-400 to-yellow-500",
    "from-red-400 to-red-500",
    "from-purple-400 to-purple-600",
    "from-cyan-400 to-cyan-500",
  ];

  const icons = {
    Food: "🍔",
    Shopping: "🛒",
    Bills: "💡",
    Transport: "🚗",
    Health: "💊",
    Entertainment: "🎮",
  };

  return (
    <div
      className="p-6 rounded-2xl border grid grid-cols-1 md:grid-cols-2 gap-6 backdrop-blur-md"
      style={{
        background: COLORS.card,
        borderColor: COLORS.border,
      }}
    >
      <div>
        <h2
          className="text-base font-semibold mb-4"
          style={{ color: COLORS.text }}
        >
          {TEXTS.topCategories}
        </h2>

        {sorted.map(([cat, amt], i) => (
          <div key={cat} className="mb-5">
            <div className="flex justify-between items-center mb-1">
              <span
                className="text-sm font-medium flex items-center gap-2"
                style={{ color: COLORS.text }}
              >
                <span>{icons[cat] || ""}</span>
                {cat}
              </span>

              <span
                className="text-sm font-semibold"
                style={{ color: COLORS.text }}
              >
                {TEXTS.currency}
                {amt}
              </span>
            </div>

            <div
              className="h-2.5 rounded-full overflow-hidden"
              style={{ background: COLORS.border }}
            >
              <div
                className={`h-2.5 rounded-full bg-linear-to-r ${gradients[i % gradients.length]} transition-all duration-700`}
                style={{
                  width: `${(amt / max) * 100}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="h-64 relative">
        <div className="absolute inset-0 bg-green-500/10 blur-2xl rounded-full" />

        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <PolarGrid stroke={COLORS.border} />
            <PolarAngleAxis
              dataKey="category"
              stroke={COLORS.muted}
              tick={{ fontSize: 12 }}
            />
            <Radar
              dataKey="value"
              stroke="#22c55e"
              fill="#22c55e"
              fillOpacity={0.5}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
