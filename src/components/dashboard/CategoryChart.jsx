import {
  PieChart,
  Pie,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function CategoryChart({ data }) {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const PIE_COLORS = [
    COLORS.primary,
    COLORS.danger,
    COLORS.success,
    COLORS.warning,
    COLORS.purple,
  ];

  const categoryData = Object.values(
    (data || []).reduce((acc, curr) => {
      if (curr.type === "expense") {
        if (!acc[curr.category]) {
          acc[curr.category] = {
            name: curr.category,
            value: 0,
            fill:
              PIE_COLORS[
                Object.keys(acc).length % PIE_COLORS.length
              ],
          };
        }
        acc[curr.category].value += Number(curr.amount) || 0;
      }
      return acc;
    }, {})
  );

  const total = categoryData.reduce((sum, item) => sum + item.value, 0);

  if (!categoryData.length) {
    return <div className="text-center opacity-60 font-poppins">No data</div>;
  }

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4 h-auto lg:h-72 font-poppins">
      <div className="w-full lg:w-[45%] h-64 lg:h-full flex items-center justify-center px-2">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              dataKey="value"
              cx="50%"
              cy="50%"
              innerRadius={45}
              outerRadius={70}
              paddingAngle={3}
              stroke="none"
            />

            <text
              x="50%"
              y="50%"
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontSize: "14px",
                fontWeight: "600",
                fill: COLORS.text,
                fontFamily: "Poppins",
              }}
            >
              {TEXTS.currency}{total}
            </text>

            <Tooltip
              formatter={(value) => [
                `${TEXTS.currency}${value}`,
                TEXTS.amount,
              ]}
              contentStyle={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                borderRadius: "12px",
                color: COLORS.text,
                fontFamily: "Poppins",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full lg:w-[55%] max-h-64 lg:max-h-full overflow-y-auto pr-2 space-y-4">
        {categoryData.map((item, index) => {
          const percent = ((item.value / total) * 100).toFixed(1);

          return (
            <div key={index}>
              <div className="flex justify-between text-sm mb-1">
                <span className="truncate">{item.name}</span>
                <span className="opacity-70">{percent}%</span>
              </div>

              <div className="w-full h-2 rounded-full bg-gray-300/30 overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${percent}%`,
                    background: item.fill,
                  }}
                />
              </div>

              <div className="text-xs opacity-60 mt-1">
                {TEXTS.currency}{item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}