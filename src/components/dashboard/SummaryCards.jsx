import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

import { FiTrendingUp, FiTrendingDown, FiCreditCard } from "react-icons/fi";

export default function SummaryCards({ income, expense }) {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const balance = income - expense;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 font-poppins">
      <Card
        title={TEXTS.balance}
        value={balance}
        color={COLORS.primary}
        COLORS={COLORS}
        icon={<FiCreditCard size={20} />}
      />

      <Card
        title={TEXTS.income}
        value={income}
        color={COLORS.success}
        COLORS={COLORS}
        icon={<FiTrendingUp size={20} />}
      />

      <Card
        title={TEXTS.expense}
        value={expense}
        color={COLORS.danger}
        COLORS={COLORS}
        icon={<FiTrendingDown size={20} />}
      />
    </div>
  );
}

function Card({ title, value, color, COLORS, icon }) {
  return (
    <div
      className="relative p-4 sm:p-5 rounded-2xl overflow-hidden font-poppins"
      style={{
        background: COLORS.surface,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 10px 30px ${COLORS.shadow || "rgba(0,0,0,0.08)"}`,
        fontFamily: "Poppins",
      }}
    >
      <div
        className="absolute -top-10 -right-10 w-28 h-28 rounded-full blur-3xl opacity-20"
        style={{ background: color }}
      />

      <div className="flex justify-between items-center relative z-10">
        <div>
          <p
            className="text-xs sm:text-sm mb-1"
            style={{ color: COLORS.muted, fontFamily: "Poppins" }}
          >
            {title}
          </p>

          <h1
            className="text-lg sm:text-2xl font-bold"
            style={{ color, fontFamily: "Poppins" }}
          >
            {TEXTS.currency}
            {value}
          </h1>
        </div>

        <div
          className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-xl"
          style={{
            background: `${color}20`,
            color: color,
            fontFamily: "Poppins",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}