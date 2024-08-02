import React, { useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import { Link } from 'react-router-dom';  
import axios from 'axios'
import { BrowserRouter } from 'react-router-dom';
import ExamFaqpu from './ExamFaqpu';

function ExamFAQPage() {

    const [manageData, setManageData] = useState([]);
    const [loading, setLoading] = useState(true);
    const[filterrec, setFilterRec]=useState([]);
    const[detailsData1, setDetailsData1]=useState({});
    const[detailsData2, setDetailsData2]=useState({});
    const[modal, setModal]=useState(false);
  

    const showpages=()=>{
        console.log("heliuuu")
      setModal(true)
    }
    const closepage=()=>{
      setModal(false)
    }
    
    const column = [
      {
        name: 'SNo.',
        selector: (row, index) => index + 1, 
        sortable: true,
        width: '90px',
      },
      {
        name: 'Full Name',
        selector: (row)=>row.examfullname,
        sortable: true,
        width: '400px' 
      },
      {
        name:'Actions',
        cell: (row) => (
          <div>
             <button style={{ backgroundColor: '#3CB371', borderRadius: '5px', width: '50px', color: 'white', paddingBottom:'3px', paddingTop:'3px' }} onClick={showpages}>Pages</button>
          </div>
          ),  
      }
    ];
    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:4000/api/getdetails');
          if (response.status === 200) {
            const { examDetails, overviewDetails } = response.data[0];
            // Merge examDetails and overviewDetails based on a unique identifier, e.g., id
            const combinedData = examDetails.map(detail => ({
              ...detail,
              ...overviewDetails.find(overview => overview.examName === detail.name)
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
    
    
  
  
    const handlefilter = (event)=>{
      const newData = filterrec.filter(row=> row.name.toLowerCase().includes(event.target.value.toLowerCase()));
      setManageData(newData);
    }


  return (
    <div>
      <div style={{display:'flex', justifyContent:'right'}}>
          <input type='text' placeholder='Search...' onChange={handlefilter} style={{padding:'12px', border:'black'}}/>
      </div>
      <DataTable columns={column} data={manageData} pagination paginationServer></DataTable>
      {modal && <ExamFaqpu onClose={closepage}/>}
    </div>
  )
}

export default ExamFAQPage
