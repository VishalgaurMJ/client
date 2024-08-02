import React, { useState, useEffect, useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import axios from "axios";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
const toastii = () => {
  toast("child deleted Successfully");
};
const split = (value) => {
  return value.action.split(" ")[0];
};
const handleDelete = async (value) => {
  const _id = split(value);

  try {
    const response = await axios.delete(
      `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/deletecoursechilds/${_id}`
    );
    toastii();
    if (response.status === 200) {
      console.log("Item deleted successfully");
      // await fetchData(); // Optionally refetch the data
    } else {
      console.error("Error deleting item:", response.statusText);
    }
  } catch (error) {
    console.error("Error in deleting data:", error);
  }
  // } else {
  //   console.error("Item to delete not found:", value.action);
  // }
};

const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Cell: ({ cell: { value } }) => <span>{value}</span>,
  },
  {
    Header: "Child Name",
    accessor: "ChildName",
    Cell: ({ cell: { value } }) => (
      <div>
        <span className="inline-flex items-center">
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {value}
          </span>
        </span>
      </div>
    ),
  },
  {
    Header: "Date",
    accessor: "Date",
    Cell: ({ cell: { value } }) => <span>{value}</span>,
  },
  // {
  //   Header: "status",
  //   accessor: "status",
  //   Cell: ({ cell: { value }, row }) => (
  //     <span className="block w-full">
  //       <span
  //         className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
  //           value === "true"
  //             ? "text-success-500 bg-success-500"
  //             : "text-warning-500 bg-warning-500"
  //         }`}
  //         onClick={() => handleStatusChange(row.original)}
  //       >
  //         {value === "true" ? "Live" : "Draft"}
  //       </span>
  //     </span>
  //   ),
  // },
  {
    Header: "action",
    accessor: "action",
    Cell: ({ row }) => {
      const value = row.original;
      return (
        <div className="flex space-x-3 rtl:space-x-reverse">
          <Tooltip content="View" placement="top" arrow animation="shift-away">
            <button className="action-btn" type="button">
              <Icon icon="heroicons:eye" />
            </button>
          </Tooltip>
          <Link
            to={`/addcourse/${value.action
              .replace(/^[a-f0-9]+ /i, "")
              .replace(/ [a-z]+$/i, "")
              .replace(/ /g, "-")}`}
          >
            <Tooltip
              content="Edit"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:pencil-square" />
              </button>
            </Tooltip>
          </Link>
          <Tooltip
            content="Delete"
            placement="top"
            arrow
            animation="shift-away"
            theme="danger"
          >
            <button
              className="action-btn"
              type="button"
              onClick={() => handleDelete(value)}
            >
              <Icon
                icon="heroicons:trash"
                onClick={() => handleDelete(value)}
              />
            </button>
          </Tooltip>
        </div>
      );
    },
  },
];

const ModalTable = ({ filterChild }) => {
  const [manageData, setManageData] = useState([]);
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => manageData, [manageData]);

  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state,
    gotoPage,
    setGlobalFilter,
    prepareRow,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;

  useEffect(() => {
    fetchData();
  }, [filterChild]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api//allcoursechildpagedetails"
      );
      if (response.status === 200) {
        const childDetails = response.data;

        // Ensure childDetails is an array

        if (Array.isArray(childDetails)) {
          // Filter the childDetails based on filterChild
          const itemsToShow = childDetails.filter(
            (item) => filterChild === item.title // Match against each item's name
          );

          // Map the filtered items to the desired format
          const formattedData = itemsToShow.map((item, index) => ({
            id: index + 1,
            ChildName: item.ct, // Adjust if the structure is different
            action: `${item._id} ${item.title} ${item.sl}` || "N/A",
            Date: new Date(item.added_on).toLocaleString() || "N/A",
          }));

          setManageData(formattedData); // Set the state with formatted data
        } else {
          console.error("Expected an array but got:", childDetails);
        }
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title text-slate-900 dark:text-white"></h4>
          <div>
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
                {...getTableProps()}
              >
                <thead className="border-t border-slate-100 dark:border-slate-800">
                  {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                      {headerGroup.headers.map((column) => (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                          scope="col"
                          className="table-th"
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? " 🔽"
                                : " 🔼"
                              : ""}
                          </span>
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody
                  className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                  {...getTableBodyProps()}
                >
                  {page.map((row) => {
                    prepareRow(row);
                    return (
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td {...cell.getCellProps()} className="table-td">
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <span className="flex space-x-2 rtl:space-x-reverse items-center">
              <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                Showing
              </span>
              <span>
                <input
                  type="number"
                  className="form-control py-2"
                  defaultValue={pageIndex + 1}
                  onChange={(e) => {
                    const pageNumber = e.target.value
                      ? Number(e.target.value) - 1
                      : 0;
                    gotoPage(pageNumber);
                  }}
                  style={{ width: "50px" }}
                />
              </span>
            </span>
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              entries {pageIndex + 1} of {pageOptions.length}
            </span>
          </div>
          <ul className="flex items-center space-x-3 rtl:space-x-reverse">
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${
                  !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => previousPage()}
                disabled={!canPreviousPage}
              >
                <Icon icon="heroicons-outline:chevron-left" />
              </button>
            </li>
            {pageOptions.map((pageIdx) => (
              <li key={pageIdx}>
                <button
                  aria-current="page"
                  className={`${
                    pageIdx === pageIndex
                      ? "bg-slate-900 dark:bg-slate-600 dark:text-slate-200 text-white font-medium"
                      : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900 font-normal"
                  } text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150`}
                  onClick={() => gotoPage(pageIdx)}
                >
                  {pageIdx + 1}
                </button>
              </li>
            ))}
            <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
              <button
                className={`${
                  !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                }`}
                onClick={() => nextPage()}
                disabled={!canNextPage}
              >
                <Icon icon="heroicons-outline:chevron-right" />
              </button>
            </li>
          </ul>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default ModalTable;
