import { useSelector } from "react-redux";
import { getColors } from "../../constants/colors";
import TEXTS from "../../local/english.json";

export default function MyCard() {
  const isDark = useSelector((s) => s.ui.isDark);
  const COLORS = getColors(isDark);

  return (
    <div
      className="p-4 sm:p-5 rounded-2xl space-y-4 w-full font-poppins"
      style={{ backgroundColor: COLORS.card, fontFamily: "Poppins" }}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{ color: COLORS.text, fontFamily: "Poppins" }}
          className="font-semibold text-sm sm:text-base"
        >
          {TEXTS.myCard || "My Cards"}
        </h3>

        <button
          className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-lg"
          style={{
            background: COLORS.surface,
            color: COLORS.text,
            border: `1px solid ${COLORS.border}`,
            fontFamily: "Poppins",
          }}
        >
          + Add Card
        </button>
      </div>

      <div className="relative h-40 sm:h-44">
        <div
          className="absolute top-3 left-3 w-[95%] h-full rounded-2xl opacity-70"
          style={{ backgroundColor: COLORS.border }}
        />

        <div
          className="relative p-4 sm:p-5 rounded-2xl shadow-xl h-full flex flex-col justify-between text-white"
          style={{
            background: `linear-gradient(135deg, ${COLORS.primary}, ${COLORS.purple})`,
            fontFamily: "Poppins",
          }}
        >
          <div className="flex justify-between items-center">
            <div
              className="text-xs sm:text-sm opacity-80"
              style={{ fontFamily: "Poppins" }}
            >
              Debit Card
            </div>
            <div className="w-8 sm:w-10 h-6 sm:h-7 bg-yellow-300 rounded-md" />
          </div>

          <div
            className="tracking-widest text-sm sm:text-lg font-semibold"
            style={{ fontFamily: "Poppins" }}
          >
            1234 5678 9012 3456
          </div>

          <div
            className="flex justify-between items-center text-[10px] sm:text-sm"
            style={{ fontFamily: "Poppins" }}
          >
            <div>
              <p className="opacity-70" style={{ fontFamily: "Poppins" }}>
                Card Holder
              </p>
              <p style={{ fontFamily: "Poppins" }}>Aditya Roy</p>
            </div>

            <div>
              <p className="opacity-70" style={{ fontFamily: "Poppins" }}>
                Expires
              </p>
              <p style={{ fontFamily: "Poppins" }}>12/28</p>
            </div>

            <div
              className="text-sm sm:text-xl font-bold"
              style={{ fontFamily: "Poppins" }}
            >
              VISA
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}