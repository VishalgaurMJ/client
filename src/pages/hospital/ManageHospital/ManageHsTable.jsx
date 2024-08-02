import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Link } from 'react-router-dom';  
import SubHsPage from './SubHsPage'

function ManageHsTable() {

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
        console.log("Inside Manage Hospital Page")
        try {
          const response = await axios.get('http://localhost:4000/api/gethsdetails');
          console.log(response.data)
          if (response.status === 200) {
            const { insDetails, insoverdetails } = response.data[0];
            // Merge colgendetails and coloverdetails based on a unique identifier, e.g., id
            const combinedData = insDetails.map(detail => ({
              ...detail,
              ...insoverdetails.find(overview => overview.hosover === detail.hosfull)
            }));
            setManageData(combinedData);
            setFilterRec(combinedData); 
            console.log(combinedData)
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
  
        const response = await axios.put(`http://localhost:4000/api/updatehsstatus/${row.hosfull}`);
        
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
            selector: (row)=>row.hosfull,
            sortable: true,
            width: '400px' 
          },
          {
            name: 'Name',
            selector:(row)=>row.hosshort,
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
                <Link to={`/addHospital/${row.hosfull}`}  
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
           style={{padding:'12px', border:'black'}}/>
      </div>
      <DataTable columns={column} 
      data={manageData} 
      pagination paginationServer></DataTable>
      {modal && <SubHsPage onClose={closepage}/>}
      {/* {detaildata && (
        <Link to={{ pathname: "/addexam", state: { detailData: detaildata } }}>Add Exam</Link>
      )} */}
      

    </div>
  )
}

export default ManageHsTable
