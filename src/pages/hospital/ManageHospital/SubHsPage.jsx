import React from 'react'
import DataTable from 'react-data-table-component'

function SubHsPage({onClose}) {
    const column = [
        {
          name: 'Page Name',
          selector: (row)=>row.name,
          sortable: true,
          width:'150px'
        },
        {
          name: 'Date',
          selector: (row)=>row.date,
          sortable: true,
          width:'150px'
        },
        {
          name: 'Status',
          selector: (row)=>row.status,
          sortable: true,
          width:'150px'
        },
        {
          name: 'Action',
          selector: (row)=>row.action,
          sortable: true,
          width:'150px'
        }
      ];

      const kkkk = [
        { name: 'IIT JAM', date: '2024-02-15', status: 'Active' },
        { name: 'BITSAT', date: '2024-02-14', status: 'Inactive' },
        { name: 'CUET', date: '2024-02-13', status: 'Active' },
        { name: 'CUET', date: '2024-02-13', status: 'Active' },
        { name: 'CUET', date: '2024-02-13', status: 'Active' }
      ];
    


  return (
    <div className='fixed inset-0 bg-black bg-opacity-10 backdrop-blur-sm flex justify-center items-center'>
      <div className='mt-10 flex flex-col gap-5 bg-white rounded-xl px-20 py-10 felx flex-col'>
           <button className='place-self-end' onClick={onClose}>Close</button>
        <div>
           <h1 className='text-xl '>Exam Name Pages</h1>
        </div>
        <DataTable columns={column} data={kkkk} noHeader={false} pagination paginationServer></DataTable>

      </div>
    </div>
  )
}

export default SubHsPage
