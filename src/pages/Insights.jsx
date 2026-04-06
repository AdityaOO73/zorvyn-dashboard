import { useSelector } from "react-redux";
import { getColors } from "../constants/colors";
import StatsCards from "../components/insights/StatsCards";
import ExpenseChart from "../components/insights/ExpenseChart";
import CategoryBreakdown from "../components/insights/CategoryBreakdown";
import SmartInsights from "../components/insights/SmartInsights";

export default function Insights() {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  return (
    <div
      className="p-6 space-y-6 min-h-screen font-poppins"
      style={{
        color: COLORS.text,
        fontFamily: "Poppins",
      }}
    >
      <StatsCards />

      <div className="grid md:grid-cols-2 gap-6">
        <ExpenseChart />
        <CategoryBreakdown />
      </div>

      <SmartInsights />
    </div>
  );
}