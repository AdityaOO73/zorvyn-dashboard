import { useState } from "react";
import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

import { FiSend, FiUser, FiZap } from "react-icons/fi";

export default function QuickTransaction() {
  const [selected, setSelected] = useState(0);
  const [amount, setAmount] = useState("");

  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  const users = [
    { name: "A", label: TEXTS.userAlex },
    { name: "B", label: TEXTS.userBen },
    { name: "C", label: TEXTS.userCody },
    { name: "D", label: TEXTS.userDaisy },
  ];

  const quickAmounts = [500, 1000, 2000];

  return (
    <div
      className="p-4 sm:p-5 rounded-2xl space-y-4 sm:space-y-5 w-full"
      style={{
        background: COLORS.card,
        border: `1px solid ${COLORS.border}`,
        boxShadow: `0 10px 30px ${COLORS.shadow || "rgba(0,0,0,0.08)"}`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center">
        <h3
          className="font-semibold flex items-center gap-2 text-sm sm:text-base"
          style={{ color: COLORS.text }}
        >
          <FiSend size={16} />
          {TEXTS.quickTransfer}
        </h3>

        <span
          className="text-xs sm:text-sm cursor-pointer hover:underline"
          style={{ color: COLORS.primary }}
        >
          {TEXTS.viewAll}
        </span>
      </div>

      {/* Users */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-2">
        {users.map((u, i) => {
          const active = selected === i;

          return (
            <div
              key={i}
              onClick={() => setSelected(i)}
              className="text-center cursor-pointer shrink-0"
            >
              <div
                className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center"
                style={{
                  background: active
                    ? `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.purple})`
                    : COLORS.surface,
                  color: active ? "#fff" : COLORS.text,
                  transform: active ? "scale(1.1)" : "scale(1)",
                }}
              >
                <FiUser size={18} />
              </div>

              <p
                className="text-[10px] sm:text-xs mt-1 truncate w-14"
                style={{
                  color: active ? COLORS.primary : COLORS.muted,
                }}
              >
                {u.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="relative">
        <span
          className="absolute left-3 top-2 text-sm"
          style={{ color: COLORS.muted }}
        >
          ₹
        </span>

        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          placeholder={TEXTS.enterAmount}
          className="w-full pl-7 pr-10 py-2 text-sm sm:text-base rounded-lg outline-none"
          style={{
            background: COLORS.surface,
            border: `1px solid ${COLORS.border}`,
            color: COLORS.text,
          }}
        />

        <FiZap
          className="absolute right-3 top-2"
          size={14}
          color={COLORS.primary}
        />
      </div>

      {/* Quick Amount */}
      <div className="flex gap-2 flex-wrap">
        {quickAmounts.map((amt) => (
          <button
            key={amt}
            onClick={() => setAmount(amt)}
            className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg"
            style={{
              background: COLORS.surface,
              color: COLORS.text,
              border: `1px solid ${COLORS.border}`,
            }}
          >
            ₹{amt}
          </button>
        ))}
      </div>

      {/* Send */}
      <button
        className="w-full py-2 text-sm sm:text-base rounded-lg font-medium flex items-center justify-center gap-2"
        style={{
          background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.purple})`,
          color: "#fff",
        }}
      >
        <FiSend size={14} />
        {TEXTS.sendMoney}
      </button>

      <p
        className="text-[10px] sm:text-xs text-center flex items-center justify-center gap-1"
        style={{ color: COLORS.muted }}
      >
        <FiZap size={10} />
        Instant & secure transfer
      </p>
    </div>
  );
}
