import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MainSection from './MainSection';


function MainFile() {

    const [activeTab, setActiveTab] = useState('exam-listing');


     const toastiii=()=>{
      toast("Article Saved Submitted");     
    }

    const toastyyy=()=>{
      toast("Article Drafted Successfully");
    }
   
      const handleLive=()=>{
        toastiii()
    }

    const handleDraft=()=>{
      toastyyy()
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
                        Product Article Details <div style={{ display: 'inline-block', marginLeft: '5px', cursor:'pointer' }}>
                        <iconify-icon icon="heroicons:exclamation-triangle" ></iconify-icon>
                      </div>
                        </div>
                    </div>
                  </header>
                  
                  <div className="card-text h-full" >
                    <div className="active" style={{marginTop:'-30px'}}>
                      
                      <div className="tab-content" id="tabs-tabContent">
                        
                      <div className={`tab-pane fade ${activeTab === 'exam-listing' ? 'active show' : ''}`} id="exam-listing" role="tabpanel" aria-labelledby="exam-listing-tab">
                          
                          <MainSection onLive={handleLive} onDraft={handleDraft}/>
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

export default MainFile
