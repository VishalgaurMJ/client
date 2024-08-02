import React from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';  


function ExamFaqpu({onClose}) {

    const showpages=()=>{
        
    }

    const column = [
        {
          name: 'Page Name',
          selector: (row)=>row.name,
          sortable: true,
          width:'150px'
        },
        {
            name:'Actions',
            cell: (row) => (
              <div>
                <Link to={`/addfaq/${row.name}`}>
                   <button style={{ backgroundColor: '#3CB371', borderRadius: '5px', width: '50px', color: 'white', paddingBottom:'3px', paddingTop:'3px' }} onClick={showpages}>Modify</button>
                </Link>
              </div>
              ),  
          }
      ];
    
      const kkkk = [
        { name: 'Overview' },
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

export default ExamFaqpu
