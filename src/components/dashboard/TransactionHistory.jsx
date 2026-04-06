import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";
import { useNavigate } from "react-router-dom";

export default function TransactionHistory({ data }) {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);
  const navigate = useNavigate();

  const latest = [...data]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5);

  return (
    <div
      className="p-4 sm:p-5 rounded-2xl border backdrop-blur-md w-full font-poppins"
      style={{
        background: COLORS.card,
        borderColor: COLORS.border,
        fontFamily: "Poppins",
      }}
    >
      <div className="flex justify-between items-center mb-4 sm:mb-5">
        <h2
          className="text-base sm:text-lg font-semibold tracking-wide"
          style={{ color: COLORS.text, fontFamily: "Poppins" }}
        >
          {TEXTS.transactionHistory}
        </h2>

        <button
          className="text-xs sm:text-sm hover:underline transition cursor-pointer font-bold"
          style={{ color: COLORS.primary, fontFamily: "Poppins" }}
          onClick={() => navigate("/transactions")}
        >
          {TEXTS.viewAll}
        </button>
      </div>

      <div className="space-y-2 sm:space-y-3 max-h-72 sm:max-h-80 overflow-y-auto pr-1">
        {latest.map((t) => {
          const isIncome = t.type === "income";

          return (
            <div
              key={t.id}
              className="
                flex items-center justify-between 
                gap-2 sm:gap-3
                p-2.5 sm:p-3 rounded-xl 
                transition-all duration-300 
                hover:-translate-y-0.5 hover:shadow-md
                font-poppins
              "
              style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                fontFamily: "Poppins",
              }}
            >
              <div className="flex items-center gap-2 sm:gap-3 min-w-0">
                <div
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold shrink-0"
                  style={{
                    background: isIncome
                      ? `linear-gradient(135deg, ${COLORS.success}, ${COLORS.primary})`
                      : `linear-gradient(135deg, ${COLORS.danger}, ${COLORS.purple})`,
                    fontFamily: "Poppins",
                  }}
                >
                  {isIncome ? "↑" : "↓"}
                </div>

                <div className="min-w-0">
                  <p
                    className="text-xs sm:text-sm font-semibold truncate"
                    style={{ color: COLORS.text, fontFamily: "Poppins" }}
                  >
                    {t.category}
                  </p>

                  <p
                    className="text-[10px] sm:text-xs truncate"
                    style={{ color: COLORS.muted, fontFamily: "Poppins" }}
                  >
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <p
                  className="text-xs sm:text-sm font-bold"
                  style={{
                    color: isIncome ? COLORS.success : COLORS.danger,
                    fontFamily: "Poppins",
                  }}
                >
                  {isIncome ? "+" : "-"}
                  {TEXTS.currency}
                  {t.amount}
                </p>

                <p
                  className="text-[9px] sm:text-[10px] uppercase tracking-wide"
                  style={{ color: COLORS.muted, fontFamily: "Poppins" }}
                >
                  {isIncome ? "Income" : "Expense"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}