import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import SubCollegePage from './SubCollegePage';
import { Link } from 'react-router-dom';  


function ManageCollegeTable() {

  const [manageData, setManageData] = useState([]);
  const [loading, setLoading] = useState(true);
  const[filterrec, setFilterRec]=useState([]);
  const[modal, setModal]=useState(false);

  const showpages=()=>{
    setModal(true)
  }
  const closepage=()=>{
    setModal(false)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getcoldetails');
        if (response.status === 200) {
          const { colgendetails, coloverdetails } = response.data[0];
          // Merge colgendetails and coloverdetails based on a unique identifier, e.g., id
          const combinedData = colgendetails.map(detail => ({
            ...detail,
            ...coloverdetails.find(overview => overview.colover === detail.colfull)
          }));
          setManageData(combinedData);
          setFilterRec(combinedData); 
        } else {
          console.error('Error fetching data:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);

  const handleStatusChange=async(row)=>{
    try {

      const response = await axios.put(`http://localhost:4000/api/updatecolstatus/${row.colfull}`);
      
      if (response.data.success) {

        const updatedData = manageData.map(data => {
          if (data.colfull === row.colfull) {

            data.status = data.status === 'true' ? 'false' : 'true';
          }
          return data;
        });
  
        setManageData(updatedData);
      } else {
        console.error('Failed to toggle status:', response.data.message);
      }
    } catch (error) {
      console.error('Error toggling status:', error);
    }
  }


    const column = [
        {
          name: 'UniqueId.',
          selector: (row) =>row.UniqueId, 
          sortable: true,
          width: '90px',
        },
        {
          name: 'Full Name',
          selector: (row)=>row.colfull,
          sortable: true,
          width: '400px' 
        },
        {
          name: 'Name',
          selector:(row)=>row.colshort,
          sortable: true,
          width: '150px' 
        },
        {
          name: 'Added On',
          selector: (row)=>row.added_on,
          sortable: true,
          width: '120px' 
        },
        {
          name: 'Status',
          cell: (row) => (
            <button
              style={{  backgroundColor: row.status === 'true' ? '#3CB371' : '#FF6961', borderRadius: '5px', width: '50px', marginRight: '20px', color: 'white', paddingBottom: '3px', paddingTop: '3px' }}
              onClick={() => handleStatusChange(row)}
            >
              {row.status === 'true' ? 'Live' : 'Draft'}
            </button>
          ),
          width: '150px',
        },
        {
          name:'Actions',
          cell: (row) => (
            <div>
              <Link to={`/addCollege/${row.colfull}`}  
              // onClick={(e) => {handleDetailsClick(row)}}
              >
                  <button 
                //   onClick={() => handleDetailsClick(row)} 
                  style={{ backgroundColor: '#FFD700', borderRadius: '5px', width: '25px', marginRight: '5px', color: 'white', paddingBottom: '3px', paddingTop: '3px' }}>M</button>
               </Link>
               <button style={{ backgroundColor: '#3CB371', borderRadius: '5px', width: '50px', color: 'white', paddingBottom:'3px', paddingTop:'3px' }} 
               onClick={showpages}
               >Pages</button>
            </div>
            ),  
        }
      ];
     
      const handlefilter = (event)=>{
        const newData = filterrec.filter(row=> row.colshort.toLowerCase().includes(event.target.value.toLowerCase()));
        setManageData(newData);
      }


  return (
    <div>
      <div style={{display:'flex', justifyContent:'right'}}>
          <input type='text' placeholder='Search...' 
          onChange={handlefilter}
           style={{padding:'12px', border:'black',marginBottom:"20px"}}/>
      </div>
      <DataTable columns={column} 
      data={manageData} 
      pagination paginationServer></DataTable>
      {modal && <SubCollegePage onClose={closepage}/>}
    </div>
  )
}

export default ManageCollegeTable
