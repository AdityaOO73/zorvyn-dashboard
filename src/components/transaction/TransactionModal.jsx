import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function TransactionModal({
  open,
  onClose,
  onSubmit,
  initialData,
}) {
  const [form, setForm] = useState(null);

  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  useEffect(() => {
    setForm(initialData);
  }, [initialData]);

  if (!open || !form) return null;

  const handleSubmit = () => {
    onSubmit(form);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50"
      style={{ background: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="w-350px rounded-2xl overflow-hidden shadow-xl"
        style={{ backgroundColor: COLORS.card }}
      >
        <div
          className="flex justify-between items-center px-5 py-4 border-b"
          style={{ borderColor: COLORS.border }}
        >
          <h2 className="text-lg font-semibold" style={{ color: COLORS.text }}>
            {form.id ? TEXTS.editTransaction : TEXTS.addTransaction}
          </h2>

          <button onClick={onClose} style={{ color: COLORS.muted }}>
            ✕
          </button>
        </div>

        <div className="p-5 space-y-4">
          <div>
            <p className="text-sm mb-1" style={{ color: COLORS.muted }}>
              {TEXTS.type}
            </p>

            <select
              value={form.type}
              onChange={(e) => setForm({ ...form, type: e.target.value })}
              className="w-full px-3 py-2 rounded-lg focus:outline-none"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
              }}
            >
              <option value="income">{TEXTS.income}</option>
              <option value="expense">{TEXTS.expense}</option>
            </select>
          </div>

          <div>
            <p className="text-sm mb-1" style={{ color: COLORS.muted }}>
              {TEXTS.category}
            </p>

            <input
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              placeholder="e.g. Groceries"
              className="w-full px-3 py-2 rounded-lg focus:outline-none"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
              }}
            />
          </div>

          <div>
            <p className="text-sm mb-1" style={{ color: COLORS.muted }}>
              {TEXTS.amount}
            </p>

            <div className="relative">
              <span
                className="absolute left-3 top-2.5 text-sm"
                style={{ color: COLORS.muted }}
              >
                ₹
              </span>

              <input
                type="number"
                value={form.amount}
                min="0"
                onChange={(e) => {
                  const value = +e.target.value;
                  if (value < 0) return;
                  setForm({ ...form, amount: value });
                }}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 rounded-lg focus:outline-none"
                style={{
                  backgroundColor: COLORS.surface,
                  border: `1px solid ${COLORS.border}`,
                  color: COLORS.text,
                }}
              />
            </div>
          </div>

          <div>
            <p className="text-sm mb-1" style={{ color: COLORS.muted }}>
              {TEXTS.date}
            </p>

            <input
              type="date"
              value={form.date}
              onChange={(e) => setForm({ ...form, date: e.target.value })}
              className="w-full px-3 py-2 rounded-lg focus:outline-none"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
              }}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 px-5 py-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg"
            style={{ color: COLORS.muted }}
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded-lg font-medium"
            style={{
              background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.purple})`,
              color: "#fff",
            }}
          >
            {form.id ? "Update" : "Create Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
}
