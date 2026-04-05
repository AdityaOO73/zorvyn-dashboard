import {
  ResponsiveContainer,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Bar,
  Line,
  Legend,
} from "recharts";

import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function BalanceChart({ data }) {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const map = {};

  (data || []).forEach((t) => {
    if (!map[t.date]) {
      map[t.date] = { date: t.date, income: 0, expense: 0 };
    }

    if (t.type === "income") {
      map[t.date].income += Number(t.amount) || 0;
    } else {
      map[t.date].expense += Number(t.amount) || 0;
    }
  });

  const chartData = Object.values(map).sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  if (!chartData.length) {
    return <div className="text-center opacity-60">No data</div>;
  }

  return (
    <div className="w-full h-64 sm:h-72 lg:h-80">
      <ResponsiveContainer>
        <ComposedChart data={chartData}>
          <CartesianGrid
            stroke={COLORS.border}
            strokeDasharray="2 6"
            opacity={0.3}
          />

          <XAxis
            dataKey="date"
            tick={{ fill: COLORS.muted, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            height={50}
          />

          <YAxis
            tick={{ fill: COLORS.muted, fontSize: 10 }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            contentStyle={{
              background: COLORS.surface,
              border: `0px solid ${COLORS.border}`,
              borderRadius: "12px",
              color: COLORS.text,
            }}
            formatter={(value, name) => [
              `${TEXTS.currency}${value}`,
              TEXTS[name] || name,
            ]}
          />

          <Legend wrapperStyle={{ fontSize: "12px" }} />

          <Bar
            dataKey="expense"
            fill={COLORS.danger}
            radius={[6, 6, 0, 0]}
            barSize={16}
          />

          <Line
            type="monotone"
            dataKey="income"
            stroke={COLORS.primary}
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 5 }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
}
