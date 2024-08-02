// import React, {useState} from 'react'
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AddNewsPage from './AddNewsPage';

// function MainPageNews() {

//     const [activeTab, setActiveTab] = useState('news');

//      const toastiii=()=>{
//       toast("Article Saved Submitted");
//     }

//     const toastyyy=()=>{
//       toast("Article Drafted Successfully");
//     }

//       const handleLive=()=>{
//         toastiii()
//     }

//     const handleDraft=()=>{
//       toastyyy()
//     }

//   return (
//     <div className="content-wrapper transition-all duration-150 xl:ltr:ml-[248px] xl:rtl:mr-[248px]" id="content_wrapper">
//       <div className="page-content bg-blue-50">
//         <div className="mb-5" id="content_layout">
//           {/* <!-- BEGIN: Breadcrumb --> */}
//           <div className="mb-5" >

//           </div>
//           {/* <!-- END: BreadCrumb --> */}
//           <div className="space-y-5" style={{marginTop:'-30px'}}>
//             <div className="grid grid-cols-1">
//               <div className="card">
//                 <div className="card-body flex flex-col p-6">
//                   <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
//                     <div className="flex-1">
//                       <div className="card-title text-slate-900 dark:text-white" style={{color:'black', marginBottom:'-100px'}}>
//                         Add News <div style={{ display: 'inline-block', marginLeft: '5px', cursor:'pointer' }}>
//                         <iconify-icon icon="heroicons:exclamation-triangle" ></iconify-icon>
//                       </div>
//                         </div>
//                     </div>
//                   </header>

//                   <div className="card-text h-full" >
//                     <div className="active" style={{marginTop:'-30px'}}>

//                       <div className="tab-content" id="tabs-tabContent">

//                       <div className={`tab-pane fade ${activeTab === 'news' ? 'active show' : ''}`} id="news" role="tabpanel" aria-labelledby="news-tab">

//                           {/* <MainSection onLive={handleLive} onDraft={handleDraft}/> */}
//                           <AddNewsPage onLive={handleLive} onDraft={handleDraft}/>
//                         </div>
//                           <ToastContainer />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//   )
// }

// export default MainPageNews
import React, { useState, Fragment } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddNewsPage from "./AddNewsPage";
import Card from "@/components/ui/Card";
import { Tab } from "@headlessui/react";

function MainPageNews() {
  const [activeTab, setActiveTab] = useState("news");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toastiii = () => {
    toast("Article Saved Submitted");
  };

  const toastyyy = () => {
    toast("Article Drafted Successfully");
  };

  const handleLive = () => {
    toastiii();
  };

  const handleDraft = () => {
    toastyyy();
  };

  const buttons = [
    // Add other tabs here if needed
  ];

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-7">
      <Card>
        <h4
          className="card-title mb-14"
          style={{
            fontFamily: "Open Sans, sans-serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          Add News
        </h4>

        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
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
              <AddNewsPage onLive={handleLive} onDraft={handleDraft} />
            </Tab.Panel>
            {/* Add other Tab.Panels here if needed */}
          </Tab.Panels>
        </Tab.Group>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default MainPageNews;
