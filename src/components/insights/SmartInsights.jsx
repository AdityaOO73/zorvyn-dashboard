import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function SmartInsights() {
  const data = useSelector((s) => s.transactions);
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);
  const monthlyData = {};

  data.forEach((t) => {
    const d = new Date(t.date);
    const key = `${d.getFullYear()}-${d.getMonth()}`;

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 };
    }

    if (t.type === "income") monthlyData[key].income += t.amount;
    else monthlyData[key].expense += t.amount;
  });

  const months = Object.keys(monthlyData).sort();

  const formatted = months.map((key) => {
    const [year, month] = key.split("-");
    const name = new Date(year, month).toLocaleString("default", {
      month: "short",
    });

    const income = monthlyData[key].income;
    const expense = monthlyData[key].expense;
    const balance = income - expense;
    const rate = income ? ((balance / income) * 100).toFixed(0) : 0;

    return { name, income, expense, balance, rate };
  });

  const formatMoney = (v) => {
    if (v >= 100000) return `₹${(v / 100000).toFixed(1)}L`;
    if (v >= 1000) return `₹${(v / 1000).toFixed(1)}K`;
    return `₹${v}`;
  };

  return (
    <div className="space-y-6 font-poppins" style={{ fontFamily: "Poppins" }}>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <div
          className="p-5 rounded-2xl border"
          style={{
            background: COLORS.card,
            borderColor: COLORS.border,
            fontFamily: "Poppins",
          }}
        >
          <h2
            style={{ color: COLORS.text, fontFamily: "Poppins" }}
            className="font-semibold"
          >
            Net Balance by Month
          </h2>
          <p
            style={{
              color: COLORS.muted,
              fontSize: 12,
              fontFamily: "Poppins",
            }}
          >
            Monthly savings trend
          </p>

          <div style={{ height: "340px", width: "100%" }} className="mt-4">
            <ResponsiveContainer>
              <LineChart data={formatted}>
                <XAxis
                  dataKey="name"
                  stroke={COLORS.muted}
                  tick={{ fontFamily: "Poppins" }}
                />
                <YAxis
                  stroke={COLORS.muted}
                  tick={{ fontFamily: "Poppins" }}
                />
                <Tooltip contentStyle={{ fontFamily: "Poppins" }} />

                <Line
                  type="linear"
                  dataKey="balance"
                  stroke={COLORS.success}
                  strokeWidth={3}
                  strokeDasharray="6 6"
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="p-5 rounded-2xl border"
          style={{
            background: COLORS.card,
            borderColor: COLORS.border,
            fontFamily: "Poppins",
          }}
        >
          <h2
            style={{ color: COLORS.text, fontFamily: "Poppins" }}
            className="font-semibold"
          >
            Monthly Comparison
          </h2>
          <p
            style={{
              color: COLORS.muted,
              fontSize: 12,
              fontFamily: "Poppins",
            }}
          >
            Income vs Expenses per month
          </p>

          <div style={{ height: "340px", width: "100%" }} className="mt-4">
            <ResponsiveContainer>
              <LineChart data={formatted}>
                <XAxis
                  dataKey="name"
                  stroke={COLORS.muted}
                  tick={{ fontFamily: "Poppins" }}
                />
                <YAxis
                  stroke={COLORS.muted}
                  tick={{ fontFamily: "Poppins" }}
                />
                <Tooltip contentStyle={{ fontFamily: "Poppins" }} />

                <Line
                  type="monotone"
                  dataKey="income"
                  stroke={COLORS.success}
                  strokeWidth={4}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="expense"
                  stroke={COLORS.danger}
                  strokeWidth={4}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div
        className="p-4 sm:p-5 rounded-2xl border"
        style={{
          background: COLORS.card,
          borderColor: COLORS.border,
          fontFamily: "Poppins",
        }}
      >
        <h2
          style={{ color: COLORS.text, fontFamily: "Poppins" }}
          className="font-semibold text-base sm:text-lg"
        >
          Month-by-Month Summary
        </h2>

        <p
          style={{ color: COLORS.muted, fontFamily: "Poppins" }}
          className="text-xs sm:text-sm mt-1"
        >
          Detailed income, expenses, and net savings
        </p>

        <div className="mt-4 overflow-x-auto">
          <table
            className="w-full text-xs sm:text-sm min-w-600px font-poppins"
            style={{ fontFamily: "Poppins" }}
          >
            <thead>
              <tr
                style={{
                  color: COLORS.muted,
                  letterSpacing: "0.05em",
                  fontFamily: "Poppins",
                }}
                className="text-[11px] sm:text-xs uppercase"
              >
                <th className="text-left py-2 px-3">MONTH</th>
                <th className="text-left py-2 px-3">INCOME</th>
                <th className="text-left py-2 px-3">EXPENSES</th>
                <th className="text-left py-2 px-3">NET SAVINGS</th>
                <th className="text-left py-2 px-3">RATE</th>
              </tr>
            </thead>

            <tbody>
              {formatted.map((m, i) => (
                <tr
                  key={i}
                  style={{
                    borderTop: `1px solid ${COLORS.border}`,
                    fontFamily: "Poppins",
                  }}
                >
                  <td
                    style={{ color: COLORS.text, fontFamily: "Poppins" }}
                    className="py-3 whitespace-nowrap"
                  >
                    {m.name} 25
                  </td>

                  <td
                    style={{ color: COLORS.success, fontFamily: "Poppins" }}
                    className="whitespace-nowrap"
                  >
                    {formatMoney(m.income)}
                  </td>

                  <td
                    style={{ color: COLORS.danger, fontFamily: "Poppins" }}
                    className="whitespace-nowrap"
                  >
                    {formatMoney(m.expense)}
                  </td>

                  <td
                    style={{ color: COLORS.success, fontFamily: "Poppins" }}
                    className="whitespace-nowrap"
                  >
                    +{formatMoney(m.balance)}
                  </td>

                  <td>
                    <span
                      className="px-2 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs whitespace-nowrap"
                      style={{
                        background: `${COLORS.success}20`,
                        color: COLORS.success,
                        fontFamily: "Poppins",
                      }}
                    >
                      {m.rate}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}