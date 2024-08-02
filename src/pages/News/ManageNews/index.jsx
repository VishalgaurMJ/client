// import React, {useState} from 'react'
// import ManageNews from './ManageNews'

// function MainManageNews() {
//     const [activeTab, setActiveTab] = useState('news');

//   return (
//     <div className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] xl:rtl:mr-[248px]" id="content_wrapper">
//     <div className="page-content bg-blue-50">
//       <div id="content_layout">
//         {/* <!-- BEGIN: Breadcrumb --> */}
//         <div className="mb-5" >
//           <ul className="m-0 p-0 list-none">
//             <li className="inline-block relative top-[3px] text-base text-primary-500 font-Inter">
//               <a href="index.php">
//                 <iconify-icon icon="heroicons-outline:home"></iconify-icon>
//                 <iconify-icon icon="heroicons-outline:chevron-right" className="relative text-slate-500 text-sm rtl:rotate-180"></iconify-icon>
//               </a>
//             </li>
//             <li className="inline-block relative text-sm text-primary-500 font-Inter" style={{color:'black'}}>
//               News
//               <iconify-icon icon="heroicons-outline:chevron-right" className="relative top-[3px] text-slate-500 rtl:rotate-180"></iconify-icon>
//             </li>
//             <li className="inline-block relative text-sm text-slate-500 font-Inter dark:text-black" style={{color:'black'}} >
//               Manage News
//               </li>

//           </ul>
//         </div>
//         {/* <!-- END: BreadCrumb --> */}
//         <div className="space-y-5" style={{marginTop:'-30px'}}>
//           <div className="grid grid-cols-1">
//             <div className="card">
//               <div className="card-body flex flex-col p-6">
//                 <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
//                   <div className="flex-1">
//                     <div className="card-title text-slate-900 dark:text-white" style={{color:'black', marginBottom:'-100px'}}>
//                       Manage News <iconify-icon icon="heroicons:exclamation-triangle" style={{ display: 'inline-block', marginLeft: '5px' }}></iconify-icon>
//                     </div>
//                   </div>
//                 </header>
//                 <div className="card-text h-full" >
//                   <div className="active" style={{marginTop:'-30px'}}>

//                     <div className="tab-content" id="tabs-tabContent">

//                     <div className={`tab-pane fade ${activeTab === 'news' ? 'show active' : ''}`} id="news" role="tabpanel" aria-labelledby="news-tab">
//                       <ManageNews/>
//                       </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default MainManageNews
import React, { useState, useMemo, Fragment } from "react";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";
import ManageNews from "./ManageNews";
// import Modal from "@/components/ui/Modal"; // Assuming Modal component exists
// import ModalTable from "@/components/ui/ModalTable"; // Assuming ModalTable component exists

function MainManageNews() {
  const buttons = [
    // {
    //   title: "Entrance Exam",
    //   icon: "heroicons-outline:home",
    // },
    // {
    //   title: "Recruitment",
    //   icon: "heroicons-outline:user",
    // },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  return (
    <>
      <Card noborder>
        <div className="grid xl:grid-cols-1 grid-cols-1 gap-6 bg-white dark:bg-slate-800">
          <Tab.Group>
            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
              {buttons.map((item, i) => (
                <Tab as={Fragment} key={i}>
                  {({ selected }) => (
                    <button
                      style={{ marginLeft: "20px", marginTop: "20px" }}
                      className={`text-sm font-medium mb-7 capitalize bg-white
                          dark:bg-slate-800 ring-0 focus:ring-0 focus:outline-none px-2
                          transition duration-150 before:transition-all before:duration-150 relative 
                          before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-success-500 
                          before:-translate-x-1/2 
                          ${
                            selected
                              ? "text-success-500 before:w-full"
                              : "text-slate-500 before:w-0 dark:text-slate-300"
                          }`}
                    >
                      {item.title}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              <Tab.Panel>
                <ManageNews />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Card>
      {/* <div className="space-xy-5">
        <Modal
          title="Exam Name Pages"
          label="Large modal"
          labelClass="btn-outline-dark"
          uncontrol
          className="max-w-5xl"
        >
          <ModalTable />
        </Modal>
      </div> */}
    </>
  );
}

export default MainManageNews;
