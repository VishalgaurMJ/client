import React,{useState} from 'react'
import AddFAQ from './AddFAQ';
import { useParams } from 'react-router-dom';

function FAQ() {
    const [activeTab, setActiveTab] = useState('exam');
    const{title}=useParams

  return (
    <div className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] xl:rtl:mr-[248px]" id="content_wrapper">
      <div className="page-content bg-blue-50">
        <div id="content_layout">
          {/* <!-- BEGIN: Breadcrumb --> */}
          <div className="mb-5" >
            <ul className="m-0 p-0 list-none">
              
              

            </ul>
          </div>
          {/* <!-- END: BreadCrumb --> */}
          <div className="space-y-5" style={{marginTop:'-30px'}}>
            <div className="grid grid-cols-1">
              <div className="card">
                <div className="card-body flex flex-col p-6">
                  <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
                    <div className="flex-1">
                      <div className="card-title text-slate-900 dark:text-white" style={{color:'black', marginBottom:'-100px'}}>
                        FAQ Details | {title} <iconify-icon icon="heroicons:exclamation-triangle" style={{ display: 'inline-block', marginLeft: '5px' }}></iconify-icon>
                      </div>
                    </div>
                  </header>
                  <div className="card-text h-full" >
                    <div className="active" style={{marginTop:'-30px'}}>
                    <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 menu-open" id="tabs-tab" role="tablist">
                          <li className="nav-item" role="presentation">
                            <a href="#exam" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 active" id="exam-tab" data-bs-toggle="pill" data-bs-target="#exam" role="tab" aria-controls="exam" aria-selected="true">
                              Overview
                            </a>
                          </li>
                         </ul>

                      <div className="tab-content" id="tabs-tabContent">
                        
                      <div className={`tab-pane fade ${activeTab === 'exam' ? 'show active' : ''}`} id="exam" role="tabpanel" aria-labelledby="exam-tab">
                        <AddFAQ/>
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
      </div>
  )
}

export default FAQ
