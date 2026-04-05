import { useSelector } from "react-redux";
import { getColors } from "../constants/colors";
import SummaryCards from "../components/dashboard/SummaryCards"; 
import BalanceChart from "../components/dashboard/BalanceChart";
import CategoryChart from "../components/dashboard/CategoryChart";
import QuickTransaction from "../components/dashboard/QuickTransaction";
import TransactionHistory from "../components/dashboard/TransactionHistory";
import MyCard from "../components/dashboard/MyCard";
import TEXTS from "../local/english.json";

export default function Dashboard() {
  const data = useSelector((s) => s.transactions);
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const income = data
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);

  const expense = data
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);

  // const balance = income - expense;

  return (
    <div
      style={{ minHeight: "100vh" }}
      className="w-full xl:ml-0 lg:ml-0 grid grid-cols-1 xl:grid-cols-4 gap-6 p-4"
    >
      <div className="xl:col-span-3 space-y-6">
        <SummaryCards income={income} expense={expense} />

        <div className="grid lg:grid-cols-2 gap-6">
          <div
            className="p-5 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: COLORS.card,
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.5)"
                : "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: COLORS.text }} className="mb-3 font-semibold">
              {TEXTS.spendingBreakdown}
            </h2>
            <CategoryChart data={data} />
          </div>

          <div
            className="p-5 rounded-2xl transition-all duration-300 hover:scale-[1.01]"
            style={{
              background: COLORS.card,
              boxShadow: isDark
                ? "0 10px 30px rgba(0,0,0,0.5)"
                : "0 10px 25px rgba(0,0,0,0.08)",
            }}
          >
            <h2 style={{ color: COLORS.text }} className="mb-3 font-semibold">
              {TEXTS.finances}
            </h2>
            <BalanceChart data={data} />
          </div>
        </div>

        <TransactionHistory data={data} />
      </div>

      <div className="space-y-6">
        <MyCard />
        <QuickTransaction />

        <div
          className="p-5 rounded-2xl border"
          style={{ backgroundColor: COLORS.card, borderColor: COLORS.border }}
        >
          <h3 style={{ color: COLORS.text }} className="mb-4 font-semibold">
            {TEXTS.myGoals}
          </h3>

          <Goal title="iMac" percent={50} COLORS={COLORS} />
          <Goal title="Macbook" percent={70} COLORS={COLORS} />
        </div>
      </div>
    </div>
  );
}

const Goal = ({ title, percent, COLORS }) => (
  <div className="mb-3">
    <p style={{ color: COLORS.text }}>{title}</p>

    <div style={{ background: COLORS.border }} className="h-2 rounded mt-1">
      <div
        style={{ width: `${percent}%`, background: COLORS.primary }}
        className="h-2 rounded"
      />
    </div>
  </div>
);
