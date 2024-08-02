import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UnGeneral from './UnGeneral';
import UnOverview from './UnOverview';

function UnCorePage() {

    const [activeTab, setActiveTab] = useState('university-listing');
    const[unname, setUnname]=useState('');

    const toastii = ()=>{
      toast("University Listing Submitted Successfully");
    }
    const toastiyy = ()=>{
      toast("University Overview Submitted");
    }

    const shiftpage=()=>{
       setActiveTab('university-overview')
    }
    
    const handleGeneralSubmit=()=>{
      toastii();
    }

    const handleOverviewSubmit=()=>{
      console.log("Inside Handle Overview Function")
       toastiyy();
    }


  return (
    <div className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] xl:rtl:mr-[248px]" id="content_wrapper">
      <div className="page-content bg-blue-50">
        <div className="mb-5" id="content_layout">
          {/* <!-- BEGIN: Breadcrumb --> */}
          <div className="mb-5" >
            
          </div>
          {/* <!-- END: BreadCrumb --> */}
          <div className="space-y-5" style={{marginTop:'-30px'}}>
            <div className="grid grid-cols-1">
              <div className="card">
                <div className="card-body flex flex-col p-6">
                  <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                    <div className="flex-1">
                      <div className="card-title text-slate-900 dark:text-white" style={{color:'black', marginBottom:'-100px'}}>
                        University Details <div style={{ display: 'inline-block', marginLeft: '5px', cursor:'pointer' }}>
                        <iconify-icon icon="heroicons:exclamation-triangle" ></iconify-icon>
                      </div>
                        </div>
                    </div>
                  </header>
                  
                  <div className="card-text h-full" >
                    <div className="active" style={{marginTop:'-30px'}}>
                      <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 menu-open" id="tabs-tab" role="tablist">
                        <li className="nav-item" role="presentation">
                          <a href="#university-listing" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 active" id="university-listing-tab" data-bs-toggle="pill" data-bs-target="#university-listing" role="tab" aria-controls="university-listing" aria-selected="true">
                            General Update
                          </a>
                        </li>
                        <li className="nav-item" role="presentation">
                          <a href="#university-overview" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="university-overview-tab" data-bs-toggle="pill" data-bs-target="#university-overview" role="tab" aria-controls="university-overview" aria-selected="false">
                            Overview
                          </a>
                        </li>
                      </ul>
                      <div className="tab-content" id="tabs-tabContent">
                        
                      <div className={`tab-pane fade ${activeTab === 'university-listing' ? 'active show' : ''}`} id="university-listing" role="tabpanel" aria-labelledby="university-listing-tab">
                          
                          <UnGeneral onShift={shiftpage} setUnname={setUnname} onSubmit={handleGeneralSubmit}/>
                          {/* <General onShift={shiftpage} setColname={setColname} onSubmit={handleGeneralSubmit}/> */}
                        </div>

                        


                        <div className={`tab-pane fade ${activeTab === 'university-overview' ? 'active show' : ''}`} id="university-overview" role="tabpanel" aria-labelledby="university-overview-tab">
                        <UnOverview unname={unname} onSubmitt={handleOverviewSubmit}/>
                          {/* <Overview colname={colname} onSubmitt={handleOverviewSubmit}/> */}
                          </div>
                          
                          <ToastContainer />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  )
}

export default UnCorePage
