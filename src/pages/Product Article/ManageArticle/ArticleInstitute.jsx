import React,{useState, useEffect} from 'react'
import DataTable from 'react-data-table-component'
import axios from 'axios';
import { Link } from 'react-router-dom';  


function ArticleInstitute() {
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
        const response = await axios.get(`http://localhost:4000/api/getExamsarticledetails`);
        if (response.status === 200) {
          const combinedData = response.data[0]
          console.log(combinedData)
          setManageData(combinedData);
          setFilterRec(combinedData); 
          console.log("Manage Data",manageData)
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

      const response = await axios.put(`http://localhost:4000/api/updatecolstatus/${row.id}`);
      
      if (response.data.success) {

        const updatedData = manageData.map(data => {
          if (data.id === row.id) {

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

  const staticData = [
    { id: 1, ptype: 'Article 1', status: 'true' },
    { id: 2, ptype: 'Article 2', status: 'false' },
    { id: 3, ptype: 'Article 3', status: 'true' },
    // Add more objects as needed
  ];
  

  const column = [
    {
      name: 'UniqueId.',
      selector: (row) =>row.id, 
      sortable: true,
      width: '90px',
    },
    {
      name: 'Title',
      selector: (row)=>row.ptype,
      sortable: true,
      width: '400px' 
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
          <Link to={`/addCollege/${row.id}`}  
          >
              <button 
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
      {/* {modal && <SubCollegePage onClose={closepage}/>} */}
      {/* {detaildata && (
        <Link to={{ pathname: "/addexam", state: { detailData: detaildata } }}>Add Exam</Link>
      )} */}
      
      
    </div>
  )
}

export default ArticleInstitute
