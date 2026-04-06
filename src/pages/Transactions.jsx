import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useSelector, useDispatch } from "react-redux";
import { setFilter, setSearch } from "../redux/slices/uiSlice";
import {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from "../redux/slices/transactionSlice";
import { FiEdit2, FiTrash2 } from "react-icons/fi";
import TransactionModal from "../components/transaction/TransactionModal";
import { getColors } from "../constants/colors";

export default function Transactions() {
  const dispatch = useDispatch();

  const data = useSelector((s) => s.transactions);
  const { role, filter, search, isDark } = useSelector((s) => s.ui);

  const COLORS = getColors(isDark);

  const [open, setOpen] = useState(false);
  const [modalData, setModalData] = useState(null);

  const filteredData = useMemo(() => {
    return data.filter(
      (t) =>
        (filter === "all" || t.type === filter) &&
        t.category.toLowerCase().includes(search.toLowerCase()),
    );
  }, [data, filter, search]);

  const downloadCSV = () => {
    const headers = ["Date", "Amount", "Category", "Type"];

    const rows = filteredData.map((t) => [
      t.date,
      t.amount,
      t.category,
      t.type,
    ]);

    let csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((e) => e.join(",")).join("\n");

    const link = document.createElement("a");
    link.href = encodeURI(csvContent);
    link.download = "transactions.csv";
    link.click();
  };

  const columns = [
    { accessorKey: "date", header: "Date" },

    {
      accessorKey: "amount",
      header: "Amount",
      Cell: ({ cell }) => (
        <span
          style={{
            color: COLORS.text,
            fontWeight: 600,
            fontFamily: "Poppins",
          }}
        >
          ₹{cell.getValue()}
        </span>
      ),
    },

    { accessorKey: "category", header: "Category" },

    {
      accessorKey: "type",
      header: "Type",
      Cell: ({ cell }) => {
        const isIncome = cell.getValue() === "income";

        return (
          <span
            style={{
              backgroundColor: isIncome
                ? `${COLORS.success}20`
                : `${COLORS.danger}20`,
              color: isIncome ? COLORS.success : COLORS.danger,
              padding: "4px 10px",
              borderRadius: "999px",
              fontSize: "12px",
              fontFamily: "Poppins",
            }}
          >
            {isIncome ? "Income" : "Expense"}
          </span>
        );
      },
    },

    ...(role === "admin"
      ? [
          {
            header: "Action",
            Cell: ({ row }) => (
              <div className="flex gap-3 items-center font-poppins">
                <FiEdit2
                  onClick={() => {
                    setModalData(row.original);
                    setOpen(true);
                  }}
                  style={{
                    cursor: "pointer",
                    color: COLORS.primary,
                  }}
                  size={18}
                />
                <FiTrash2
                  onClick={() => {
                    if (window.confirm("Delete this transaction?")) {
                      dispatch(deleteTransaction(row.original.id));
                    }
                  }}
                  style={{
                    cursor: "pointer",
                    color: COLORS.danger,
                  }}
                  size={18}
                />
              </div>
            ),
          },
        ]
      : []),
  ];

  const table = useMaterialReactTable({
    columns,
    data: filteredData,
    enablePagination: true,

    muiTablePaperProps: {
      elevation: 0,
      sx: {
        width: "100%",
        borderRadius: "16px",
        border: `1px solid ${COLORS.border}`,
        backgroundColor: COLORS.card,
        fontFamily: "Poppins",
      },
    },

    muiTableContainerProps: {
      sx: {
        maxHeight: "500px",
        overflowY: "auto",
        backgroundColor: COLORS.card,
        fontFamily: "Poppins",
      },
    },

    muiTableHeadRowProps: {
      sx: {
        backgroundColor: COLORS.surface,
      },
    },

    muiTableHeadCellProps: {
      sx: {
        fontWeight: "600",
        backgroundColor: COLORS.surface,
        color: COLORS.text,
        borderBottom: `1px solid ${COLORS.border}`,
        fontFamily: "Poppins",
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiTableBodyProps: {
      sx: {
        backgroundColor: COLORS.card,
        fontFamily: "Poppins",
      },
    },

    muiTableBodyCellProps: {
      sx: {
        backgroundColor: COLORS.card,
        color: COLORS.text,
        borderBottom: `1px solid ${COLORS.border}`,
        fontFamily: "Poppins",
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiTableBodyRowProps: {
      sx: {
        "&:hover": {
          backgroundColor: COLORS.surface,
        },
      },
    },

    muiTopToolbarProps: {
      sx: {
        backgroundColor: COLORS.card,
        color: COLORS.text,
        borderBottom: `1px solid ${COLORS.border}`,
        fontFamily: "Poppins",
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiSearchTextFieldProps: {
      sx: {
        input: { color: COLORS.text, fontFamily: "Poppins" },
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiFilterTextFieldProps: {
      sx: {
        input: { color: COLORS.text, fontFamily: "Poppins" },
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiPaginationProps: {
      sx: {
        color: COLORS.text,
        fontFamily: "Poppins",
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiBottomToolbarProps: {
      sx: {
        backgroundColor: COLORS.card,
        borderTop: `1px solid ${COLORS.border}`,
        fontFamily: "Poppins",
        "& .MuiSvgIcon-root": {
          color: COLORS.text,
        },
      },
    },

    muiTableFooterProps: {
      sx: {
        backgroundColor: COLORS.card,
        fontFamily: "Poppins",
      },
    },
  });

  return (
    <>
      <div
        className="w-full mt-4 rounded-2xl p-4 shadow-sm border min-w-0 font-poppins"
        style={{
          backgroundColor: COLORS.card,
          borderColor: COLORS.border,
          fontFamily: "Poppins",
        }}
      >
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4 min-w-0">
          <div className="flex gap-3 min-w-0">
            <input
              placeholder="Search..."
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="px-4 py-2 rounded-lg min-w-0 font-poppins"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                fontFamily: "Poppins",
              }}
            />

            <select
              onChange={(e) => dispatch(setFilter(e.target.value))}
              className="px-4 py-2 rounded-lg font-poppins"
              style={{
                backgroundColor: COLORS.surface,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.text,
                fontFamily: "Poppins",
              }}
            >
              <option value="all">All</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              onClick={downloadCSV}
              className="px-4 py-2 rounded-lg text-sm font-poppins"
              style={{
                backgroundColor: COLORS.surface,
                color: COLORS.text,
                fontFamily: "Poppins",
              }}
            >
              Export CSV
            </button>

            {role === "admin" && (
              <button
                className="px-5 py-2 rounded-lg text-white font-poppins"
                style={{
                  background: `linear-gradient(to right, ${COLORS.primary}, ${COLORS.purple})`,
                  fontFamily: "Poppins",
                }}
                onClick={() => {
                  setModalData({
                    amount: 0,
                    category: "",
                    type: "expense",
                    date: "",
                  });
                  setOpen(true);
                }}
              >
                + Add Transaction
              </button>
            )}
          </div>
        </div>

        <div className="w-full overflow-x-auto">
          <MaterialReactTable table={table} />
        </div>
      </div>

      <TransactionModal
        open={open}
        onClose={() => setOpen(false)}
        initialData={modalData}
        onSubmit={(data) => {
          if (data.id) dispatch(updateTransaction(data));
          else dispatch(addTransaction(data));
        }}
      />
    </>
  );
}