import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";

export default function StatsCards() {
  const data = useSelector((s) => s.transactions);
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);
  const income = data
    .filter((t) => t.type === "income")
    .reduce((a, b) => a + b.amount, 0);
  const expense = data
    .filter((t) => t.type === "expense")
    .reduce((a, b) => a + b.amount, 0);
  const savings = income - expense;
  const savingsRate = income ? (savings / income) * 100 : 0;
  const cibilScore = Math.min(
    900,
    Math.max(300, 650 + Math.floor(savingsRate)),
  );

  const getCibilColor = () => {
    if (cibilScore > 750) return COLORS.success;
    if (cibilScore > 600) return "#f59e0b"; // yellow
    return COLORS.danger;
  };

  const tips = {
    income: income > expense ? TEXTS.incomeGood : TEXTS.incomeLow,

    expense: expense > income * 0.7 ? TEXTS.expenseHigh : TEXTS.expenseOk,

    savings:
      savingsRate > 30
        ? TEXTS.savingsGreat
        : savingsRate > 10
          ? TEXTS.savingsAverage
          : TEXTS.savingsLow,

    cibil:
      cibilScore > 750
        ? TEXTS.cibilExcellent
        : cibilScore > 600
          ? TEXTS.cibilAverage
          : TEXTS.cibilLow,
  };

  const cards = [
    {
      title: TEXTS.totalIncome,
      value: income,
      tip: tips.income,
      icon: <FiTrendingUp size={20} />,
      color: COLORS.success,
      isCurrency: true,
    },
    {
      title: TEXTS.totalExpense,
      value: expense,
      tip: tips.expense,
      icon: <FiTrendingDown size={20} />,
      color: COLORS.danger,
      isCurrency: true,
    },
    {
      title: TEXTS.netSavings,
      value: savings,
      tip: tips.savings,
      icon: <FiDollarSign size={20} />,
      color: COLORS.primary,
      isCurrency: true,
    },
    {
      title: TEXTS.cibilScore,
      value: cibilScore,
      tip: tips.cibil,
      icon: <FiActivity size={20} />,
      color: getCibilColor(),
      isCurrency: false,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className="p-4 rounded-xl border backdrop-blur-md transition-all duration-300 hover:scale-[1.02] hover:shadow-lg relative overflow-hidden min-h-140px"
          style={{
            background: COLORS.card,
            borderColor: COLORS.border,
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              background: `radial-gradient(circle at top right, ${card.color}, transparent)`,
            }}
          />

          <div className="flex items-center justify-between mb-3 relative z-10">
            <div
              className="p-2.5 rounded-lg"
              style={{
                background: `${card.color}20`,
                color: card.color,
              }}
            >
              {card.icon}
            </div>

            <span
              className="text-xs px-2 py-0.5 rounded-md font-medium"
              style={{
                background: COLORS.hover,
                color: COLORS.muted,
              }}
            >
              {TEXTS.thisMonth}
            </span>
          </div>

          <p
            className="text-sm font-medium mb-1"
            style={{ color: COLORS.muted }}
          >
            {card.title}
          </p>

          <h2
            className="text-xl font-bold tracking-wide"
            style={{ color: card.color }}
          >
            {card.isCurrency
              ? `${TEXTS.currency}${card.value.toLocaleString()}`
              : card.value}
          </h2>

          <p
            className="text-sm mt-2 leading-relaxed"
            style={{ color: COLORS.muted }}
          >
            {card.tip}
          </p>
        </div>
      ))}
    </div>
  );
}
