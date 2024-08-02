import React, { useMemo, useState, useEffect } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { Link } from "react-router-dom";
import axios from "axios";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import Modal from "@/components/ui/Modal";
import ModalTable from "./ModalTable";
import Tooltip from "@/components/ui/Tooltip";
import { ToastContainer, toast } from "react-toastify";

const RecruitmentExam = () => {
  const [manageData, setManageData] = useState([]);
  const [filterChild, setfilterChild] = useState(true);
  const [loading, setLoading] = useState(true);
  const [filterrec, setFilterRec] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [detailsData1, setDetailsData1] = useState({});
  const [detailsData2, setDetailsData2] = useState({});

  const handleItemClick = (value) => {
    setfilterChild(value.action);
    setShowModal(true);
  };

  const handleStatusChange = async (row) => {
    try {
      const response = await axios.put(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/updatestatus/${row.original.shortname}`
      );
      if (response.data.success) {
        const updatedData = manageData.map((data) => {
          if (data.examName === row.examName) {
            data.status = data.status === "true" ? "false" : "true";
          }
          return data;
        });
        setManageData(updatedData);
        await fetchData();
      } else {
        console.error("Failed to toggle status:", response.data.message);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  const handleDetailsClick = async (value) => {
    try {
      const response = await axios.get(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getcompletedinfo/${value.shortname}`
      );
      console.log("Response", response);

      if (response.status === 200) {
        const detailsArray = response.data;

        if (Array.isArray(detailsArray) && detailsArray.length === 2) {
          const [array1, array2] = detailsArray;

          if (array1.length > 0) {
            setDetailsData1(array1[0]);
            console.log("detailsData1", detailsData1);
          } else {
            console.warn("Warning: First inner array is empty");
          }

          if (array2.length > 0) {
            setDetailsData2(array2[0]);
            console.log("detailsData2", detailsData2);
          } else {
            console.warn("Warning: Second inner array is empty");
          }
        } else {
          console.error(
            "Error: Unexpected structure of detailsArray",
            detailsArray
          );
        }
      } else {
        console.error("Error fetching details:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const COLUMNS = [
    {
      Header: "ShortName",
      accessor: "shortname",
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
      Header: "LastModified",
      accessor: "lastmodified",
      Cell: ({ cell: { value } }) => <span>{value}</span>,
    },
    {
      Header: "status",
      accessor: "status",
      Cell: ({ cell: { value }, row }) => (
        <span className="block w-full">
          <span
            className={`inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              value === "true"
                ? "text-success-500 bg-success-500"
                : "text-warning-500 bg-warning-500"
            }`}
            onClick={() => handleStatusChange(row)}
          >
            {value === "true" ? "Live" : "Draft"}
          </span>
        </span>
      ),
    },
    {
      Header: "action",
      accessor: "action",
      Cell: ({ row }) => {
        const value = row.original;
        return (
          <div className="flex space-x-3 rtl:space-x-reverse">
            <Tooltip
              content="View"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button className="action-btn" type="button">
                <Icon icon="heroicons:eye" />
              </button>
            </Tooltip>
            <Link
              to={`/addexam/${value.action}`}
              onClick={(e) => {
                handleDetailsClick(value);
              }}
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
            <Tooltip
              content="pages"
              placement="top"
              arrow
              animation="shift-away"
            >
              <button
                className="action-btn"
                type="button"
                onClick={() => handleItemClick(value)}
              >
                <Icon icon="heroicons:clipboard-document-list" />
              </button>
            </Tooltip>
          </div>
        );
      },
    },
  ];

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => manageData, [manageData]);

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
  } = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const { globalFilter, pageIndex } = state;

  const filterexam = (formattedData) => {
    const filteredExams = formattedData.filter((item) => item.examType === 2);
    setManageData(filteredExams);
    setFilterRec(filteredExams);
  };

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getdetails"
      );
      if (response.status === 200) {
        const { examDetails, overviewDetails } = response.data[0];
        const combinedData = examDetails.map((detail) => ({
          ...detail,
          ...overviewDetails.find(
            (overview) => overview.examName === detail.name
          ),
        }));

        // Reverse the combinedData before mapping
        const formattedData = combinedData.reverse().map((item, index) => ({
          id: index + 1,
          shortname: item.name, // Adjust if the structure is different
          action: item.name,
          examType: item.examType,
          lastmodified: new Date(item.added_on).toLocaleString() || "N/A", // Adjust if the date field is different
          status: item.status || "N/A",
        }));
        filterexam(formattedData);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilter = (event) => {
    const newData = filterrec.filter((row) =>
      row.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setManageData(newData);
  };

  const toastii = () => {
    toast("deleted Successfully");
  };

  const handleDelete = async (value) => {
    try {
      // Use itemToDelete.name to construct the URL
      const response = await axios.delete(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/deletedetails/${value.action}`
      );
      toastii();
      if (response.status === 200) {
        console.log("Item deleted successfully");

        fetchData(); // Optionally refetch the data
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

  return (
    <div>
      <Card>
        <div className="md:flex justify-between items-center mb-6">
          <h4 className="card-title text-slate-900 dark:text-white"></h4>
          <div>
            <GlobalFilter
              filter={globalFilter}
              setFilter={setGlobalFilter}
              onClick={handleFilter}
            />
          </div>
        </div>
        <div className="overflow-x-auto -mx-6">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <table
                data={manageData}
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

        {showModal && (
          <div className="hidden">
            <Modal
              title="Exam Name Pages"
              label="Large modal"
              labelClass="btn-outline-dark"
              uncontrol
              className="max-w-5xl"
              showModal={showModal}
              setShowModal={setShowModal}
            >
              <ModalTable filterChild={filterChild} />
            </Modal>
          </div>
        )}
      </Card>
      <ToastContainer />
    </div>
  );
};

export default RecruitmentExam;
