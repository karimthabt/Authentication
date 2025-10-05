import React from "react";
import { tableHeaders } from "./constants";
import { useTheme } from "@mui/material/styles";

export default function UserTableHeader() {
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === "dark";

  return (
    <thead className={isDarkMode ? "bg-gray-800" : "bg-gray-50"}>
      <tr>
        {tableHeaders.map((header, index) => (
          <th
            key={index}
            scope="col"
            className={`px-6 py-3 text-center text-xs font-medium uppercase tracking-wider ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            <div className="flex items-center justify-center">
              {header.icon}
              {header.text}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
}
