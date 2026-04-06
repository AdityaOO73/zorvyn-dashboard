import { useMemo } from "react";
import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  Legend,
} from "recharts";

import TEXTS from "../../local/english.json";

export default function ExpenseChart() {
  const data = useSelector((s) => s.transactions);
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const chartData = useMemo(() => {
    const colors = [
      "#22c55e",
      "#3b82f6",
      "#f59e0b",
      "#ef4444",
      "#a855f7",
      "#14b8a6",
    ];

    const map = {};

    data.forEach((t) => {
      if (t.type === "expense") {
        map[t.category] = (map[t.category] || 0) + t.amount;
      }
    });

    const arr = Object.keys(map).map((k, i) => ({
      category: k,
      amount: map[k],
      fill: colors[i % colors.length],
    }));

    return arr.map((item, i) => ({
      ...item,
      trend:
        i === 0
          ? item.amount
          : (item.amount + arr[i - 1].amount) / 2,
    }));
  }, [data]);

  const renderBar = (props) => {
    const { x, y, width, height, payload } = props;

    return (
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={6}
        fill={payload.fill}
      />
    );
  };

  return (
    <div
      className="p-5 rounded-2xl border font-poppins"
      style={{
        background: COLORS.card,
        borderColor: COLORS.border,
        fontFamily: "Poppins",
      }}
    >
      <h2
        className="text-sm font-semibold mb-4"
        style={{ color: COLORS.text, fontFamily: "Poppins" }}
      >
        {TEXTS.expenseBreakdown}
      </h2>

      <ResponsiveContainer width="100%" height={260}>
        <BarChart data={chartData}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={COLORS.border}
          />

          <XAxis
            dataKey="category"
            tick={{ fill: COLORS.muted, fontSize: 12, fontFamily: "Poppins" }}
          />
          <YAxis
            tick={{ fill: COLORS.muted, fontSize: 12, fontFamily: "Poppins" }}
          />

          <Tooltip
            contentStyle={{
              background: COLORS.card,
              border: `1px solid ${COLORS.border}`,
              borderRadius: "10px",
              color: COLORS.text,
              fontFamily: "Poppins",
            }}
          />

          <Legend wrapperStyle={{ fontFamily: "Poppins" }} />

          <Bar
            dataKey="amount"
            name={TEXTS.expense}
            shape={renderBar}
          />

          <Line
            type="monotone"
            dataKey="amount"
            name={TEXTS.flow}
            stroke="#22c55e"
            strokeWidth={2}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="trend"
            name={TEXTS.trend}
            stroke="#f59e0b"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 3 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}