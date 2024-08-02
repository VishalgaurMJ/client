// import React,{useState, useEffect} from 'react'
// import DataTable from 'react-data-table-component'
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// function ManageNews() {

//   const [manageData, setManageData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const[filterrec, setFilterRec]=useState([]);
//   const[modal, setModal]=useState(false);

//   const showpages=()=>{
//     setModal(true)
//   }
//   const closepage=()=>{
//     setModal(false)
//   }

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get('http://localhost:4000/api/getallnews');
//         if (response.status === 200) {
//           const newsdetails = response.data[0];
//           console.log(newsdetails)
//           setManageData(newsdetails);
//           setFilterRec(newsdetails);
//         } else {
//           console.error('Error fetching data:', response.statusText);
//         }
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleStatusChange=async(row)=>{
//     try {

//       const response = await axios.put(`http://localhost:4000/api/updatenewsstatus/${row.id}`);

//       if (response.data.success) {

//         const updatedData = manageData.map(data => {
//           if (data.id === row.id) {

//             data.status = data.status === 'true' ? 'false' : 'true';
//           }
//           return data;
//         });

//         setManageData(updatedData);
//       } else {
//         console.error('Failed to toggle status:', response.data.message);
//       }
//     } catch (error) {
//       console.error('Error toggling status:', error);
//     }
//   }

//     const column = [
//         {
//           name: 'UniqueId.',
//           selector: (row) =>row.id,
//           sortable: true,
//           width: '90px',
//         },
//         {
//           name: 'Full Name',
//           selector: (row)=>row.news,
//           sortable: true,
//           width: '400px'
//         },
//         {
//           name: 'Name',
//           selector:(row)=>row.relnews,
//           sortable: true,
//           width: '150px'
//         },
//         {
//           name: 'Added On',
//           selector: (row)=>row.added_on,
//           sortable: true,
//           width: '120px'
//         },
//         {
//           name: 'Status',
//           cell: (row) => (
//             <button
//               style={{  backgroundColor: row.status === 'true' ? '#3CB371' : '#FF6961', borderRadius: '5px', width: '50px', marginRight: '20px', color: 'white', paddingBottom: '3px', paddingTop: '3px' }}
//               onClick={() => handleStatusChange(row)}
//             >
//               {row.status === 'true' ? 'Live' : 'Draft'}
//             </button>
//           ),
//           width: '150px',
//         },
//         {
//           name:'Actions',
//           cell: (row) => (
//             <div>
//               <Link to={`/addnews/${row.id}`}>
//                   <button
//                   style={{ backgroundColor: '#FFD700', borderRadius: '5px', width: '25px', marginRight: '5px', color: 'white', paddingBottom: '3px', paddingTop: '3px' }}>M</button>
//                </Link>
//                <button style={{ backgroundColor: '#3CB371', borderRadius: '5px', width: '50px', color: 'white', paddingBottom:'3px', paddingTop:'3px' }}
//                onClick={showpages}
//                >Pages</button>
//             </div>
//             ),
//         }
//       ];

//       const handlefilter = (event)=>{
//         const newData = filterrec.filter(row=> row.colshort.toLowerCase().includes(event.target.value.toLowerCase()));
//         setManageData(newData);
//       }

//   return (
//     <div>
//       <div style={{display:'flex', justifyContent:'right'}}>
//           <input type='text' placeholder='Search...'
//           onChange={handlefilter}
//            style={{padding:'12px', border:'black'}}/>
//       </div>
//       <DataTable columns={column}
//       data={manageData}
//       pagination paginationServer></DataTable>
//       {/* {modal && <SubCollegePage onClose={closepage}/>} */}
//     </div>
//   )
// }

// export default ManageNews
import React, { useMemo, Fragment } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Tooltip from "@/components/ui/Tooltip";
import GlobalFilter from "../../table/react-tables/GlobalFilter";
import { manageNewsTable } from "@/constant/managenewsdata-table";

const actions = [
  {
    name: "view",
    icon: "heroicons-outline:eye",
  },
  {
    name: "edit",
    icon: "heroicons:pencil-square:",
  },
];

const COLUMNS = [
  {
    Header: "Id",
    accessor: "id",
    Cell: ({ cell: { value } }) => <span>{value}</span>,
  },
  {
    Header: "Title",
    accessor: "title",
    Cell: ({ cell: { value } }) => (
      <div>
        <span className="inline-flex items-center">
          <a
            href={
              value && value.name ? `https://example.com/${value.name}` : "#"
            }
            className="text-sm text-slate-600 dark:text-slate-300 capitalize hover:text-blue-500 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {value && value.name ? value.name : "N/A"}
          </a>
        </span>
      </div>
    ),
  },

  {
    Header: "PublishedDate",
    accessor: "publisheddate",
    id: "publisheddate", // Ensure each column has a unique ID
    Cell: ({ cell: { value } }) => <span>{value}</span>,
  },
  {
    Header: "status",
    accessor: "status",
    Cell: (row) => {
      return (
        <span className="block w-full">
          <span
            className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
              row?.cell?.value === "Live"
                ? "text-success-500 bg-success-500"
                : ""
            } 
          ${
            row?.cell?.value === "Draft"
              ? "text-warning-500 bg-warning-500"
              : ""
          }
           `}
          >
            {row?.cell?.value}
          </span>
        </span>
      );
    },
  },
  {
    Header: "Highlight",
    accessor: "highlight",
    Cell: ({ cell: { value } }) => (
      <div>
        <span className="inline-flex items-center">
          <span className="text-sm text-slate-600 dark:text-slate-300 capitalize">
            {/* {value && value.name ? value.name : "N/A"} */}
          </span>
        </span>
      </div>
    ),
  },
  {
    Header: "Action",
    accessor: "action",
    Cell: () => (
      <div className="flex space-x-3 rtl:space-x-reverse">
        <Tooltip content="View" placement="top" arrow animation="shift-away">
          <button className="action-btn" type="button">
            <Icon icon="heroicons:eye" />
          </button>
        </Tooltip>
        <Tooltip content="Edit" placement="top" arrow animation="shift-away">
          <button className="action-btn" type="button">
            <Icon icon="heroicons:pencil-square" />
          </button>
        </Tooltip>
      </div>
    ),
  },
];

const ManageNews = ({ title = "" }) => {
  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => manageNewsTable, []);

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: 10,
      },
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

  return (
    <Card>
      <div className="md:flex justify-between items-center mb-6">
        <h4 className="card-title">{title}</h4>
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
                    {headerGroup.headers.map((column) => {
                      const { key, ...rest } = column.getHeaderProps(
                        column.getSortByToggleProps()
                      );
                      return (
                        <th
                          key={key}
                          {...rest}
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
                      );
                    })}
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
                    <Fragment key={row.id}>
                      <tr {...row.getRowProps()}>
                        {row.cells.map((cell) => (
                          <td
                            key={cell.column.id}
                            {...cell.getCellProps()}
                            className="table-td"
                          >
                            {cell.render("Cell")}
                          </td>
                        ))}
                      </tr>
                    </Fragment>
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
  );
};

export default ManageNews;
