// import React, {useState} from 'react'
// import General from './General'
// import Overview from './Overview';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function CorePage() {
//     const [activeTab, setActiveTab] = useState('exam-listing');
//     const[colname, setColname]=useState('');

//     const toastii = ()=>{
//       toast("College Listing Submitted Successfully");
//     }
//     const toastiyy = ()=>{
//       toast("College Overview Submitted");
//     }

//     const shiftpage=()=>{
//        setActiveTab('exam-overview')
//     }

//     const handleGeneralSubmit=()=>{
//       toastii();
//     }

//     const handleOverviewSubmit=()=>{
//       console.log("Inside Handle Overview Function")
//        toastiyy();
//     }

//   return (
//     <div className="content-wrapper transition-all duration-150" id="content_wrapper">
//       <div className="page-content bg-blue-50">
//         <div className="mb-5" id="content_layout">
//           {/* <!-- BEGIN: Breadcrumb --> */}

//           {/* <!-- END: BreadCrumb --> */}
//           <div className="space-y-5" style={{marginTop:'-30px'}}>
//             <div className="grid grid-cols-1">
//               <div className="card">
//                 <div className="card-body flex flex-col p-6">
//                   <header className="flex mb-5 items-center border-b border-slate-100 dark:border-slate-700 pb-5 -mx-6 px-6">
//                     <div className="flex-1">
//                       <div className="card-title text-slate-900 dark:text-white" style={{color:'black'}}>
//                         College Details <div style={{ display: 'inline-block', marginLeft: '5px', cursor:'pointer' }}>
//                         <iconify-icon icon="heroicons:exclamation-triangle" ></iconify-icon>
//                       </div>
//                         </div>
//                     </div>
//                   </header>

//                   <div className="card-text h-full" >
//                     <div className="active" style={{marginTop:'-30px'}}>
//                       <ul className="nav nav-tabs flex flex-col md:flex-row flex-wrap list-none border-b-0 pl-0 mb-4 menu-open" id="tabs-tab" role="tablist">
//                         <li className="nav-item" role="presentation">
//                           <a href="#exam-listing" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 active" id="exam-listing-tab" data-bs-toggle="pill" data-bs-target="#exam-listing" role="tab" aria-controls="exam-listing" aria-selected="true">
//                             General Update
//                           </a>
//                         </li>
//                         <li className="nav-item" role="presentation">
//                           <a href="#exam-overview" className="nav-link w-full block font-medium text-sm font-Inter leading-tight capitalize border-x-0 border-t-0 border-b border-transparent px-4 pb-2 my-2 hover:border-transparent focus:border-transparent dark:text-slate-300 " id="exam-overview-tab" data-bs-toggle="pill" data-bs-target="#exam-overview" role="tab" aria-controls="exam-overview" aria-selected="false">
//                             Overview
//                           </a>
//                         </li>
//                       </ul>
//                       <div className="tab-content" id="tabs-tabContent">

//                       <div className={`tab-pane fade ${activeTab === 'exam-listing' ? 'active show' : ''}`} id="exam-listing" role="tabpanel" aria-labelledby="exam-listing-tab">

//                           <General onShift={shiftpage} setColname={setColname} onSubmit={handleGeneralSubmit}/>
//                         </div>

//                         <div className={`tab-pane fade ${activeTab === 'exam-overview' ? 'active show' : ''}`} id="exam-overview" role="tabpanel" aria-labelledby="exam-overview-tab">

//                           <Overview colname={colname} onSubmitt={handleOverviewSubmit}/>
//                           </div>

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

// export default CorePage

// import React, { useState } from "react";
// import { useForm, useFieldArray } from "react-hook-form";

// import Button from "@/components/ui/Button";
// import Textinput from "@/components/ui/Textinput";
// import Flatpickr from "react-flatpickr";
// import { Icon } from "@iconify/react";
// import Modal from "@/components/ui/Modal";

// const NotificationForm = () => {
//   const [showModal, setShowModal] = useState(false); // State to manage modal visibility

//   const handleItemClick = () => {
//     setShowModal(true);
//   };

//   const { register, handleSubmit, control } = useForm();
//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: "notifications",
//   });
//   const [picker, setPicker] = useState([]);
//   const onSubmit = (data) => {
//     console.log("Form Data:", data); // Log raw form data

//     // Transform data to the desired format
//     const transformedData = data.notifications.map((item, index) => ({
//       date: picker[index] || null, // Use picker state to get the date
//       text: item.notificationText,
//       link: item.notificationLink,
//     }));

//     // Log the transformed data
//     console.log("Data to send:", transformedData);
//   };
//   return (
//     <Modal
//       title="Add Latest Notification"
//       label="Add Notification"
//       labelClass="btn-outline-success"
//       uncontrol
//       className="max-w-5xl"
//       onClick={() => setShowModal(true)}
//       showModal={showModal}
//       setShowModal={setShowModal}
//     >
//       <div className="flex justify-end">
//         <Button
//           text="Add more"
//           icon="heroicons-outline:plus"
//           className="btn-light"
//           onClick={() => append({ notificationText: "", notificationLink: "" })}
//         />
//       </div>
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {fields.map((item, index) => (
//           <div
//             className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
//             key={item.id}
//           >
//             <div>
//               <label
//                 htmlFor={`notification-${index}`}
//                 id={`date-notification-${index}`}
//                 className="block capitalize form-label"
//               >
//                 Date<span style={{ color: "red" }}>*</span>
//               </label>
//               <Flatpickr
//                 className="form-control py-2"
//                 onChange={(date) => {
//                   const newPicker = [...picker];
//                   newPicker[index] = date[0]; // Use selected date
//                   setPicker(newPicker);
//                 }}
//                 value={picker[index]}
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor={`notificationText-${index}`}
//                 className="block capitalize form-label"
//               >
//                 Notification Text<span style={{ color: "red" }}>*</span>
//               </label>
//               <Textinput
//                 label=""
//                 type="text"
//                 id={`notificationText-${index}`}
//                 placeholder=""
//                 register={register}
//                 name={`notifications[${index}].notificationText`}
//                 required
//               />
//             </div>
//             <div className="flex justify-between items-end space-x-5">
//               <div className="flex-1">
//                 <label
//                   htmlFor={`notificationLink-${index}`}
//                   className="block capitalize form-label"
//                 >
//                   Notification Link
//                   <span style={{ color: "red" }}>*</span>
//                 </label>
//                 <Textinput
//                   type="text"
//                   id={`notificationLink-${index}`}
//                   placeholder=""
//                   register={register}
//                   name={`notifications[${index}].notificationLink`}
//                   required
//                 />
//               </div>
//               <div className="flex-none relative">
//                 <button
//                   onClick={() => remove(index)}
//                   type="button"
//                   className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
//                 >
//                   <Icon icon="heroicons-outline:trash" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         <div className="ltr:text-right rtl:text-left">
//           <Button type="submit" text="Submit" className="btn-dark" />
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default NotificationForm;

import React, { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
import { Icon } from "@iconify/react";
import Modal from "@/components/ui/Modal";

const NotificationForm = () => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      notifications: [{ notificationText: "", notificationLink: "", date: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "notifications",
  });

  const [picker, setPicker] = useState([]);

  const onSubmit = (data) => {
    console.log("Form Data:", data); // Log raw form data

    // Transform data to the desired format
    const transformedData = data.notifications.map((item, index) => ({
      date: picker[index] || null, // Use picker state to get the date
      text: item.notificationText,
      link: item.notificationLink,
    }));

    // Log the transformed data
    console.log("Data to send:", transformedData);
  };

  return (
    <Modal
      title="Add Latest Notification"
      label="Add Notification"
      labelClass="btn-outline-success"
      uncontrol
      className="max-w-5xl"
      onClick={() => setShowModal(true)}
      showModal={showModal}
      setShowModal={setShowModal}
    >
      <div className="flex justify-end">
        <Button
          text="Add more"
          icon="heroicons-outline:plus"
          className="btn-light"
          onClick={() =>
            append({ notificationText: "", notificationLink: "", date: "" })
          }
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div
            className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
            key={item.id}
          >
            <div>
              <label
                htmlFor={`notification-${index}`}
                id={`date-notification-${index}`}
                className="block capitalize form-label"
              >
                Date<span style={{ color: "red" }}>*</span>
              </label>
              <Controller
                name={`notifications[${index}].date`}
                control={control}
                render={({ field }) => (
                  <Flatpickr
                    className="form-control py-2"
                    onChange={(date) => {
                      const newPicker = [...picker];
                      newPicker[index] = date[0]; // Use selected date
                      setPicker(newPicker);
                      setValue(`notifications[${index}].date`, date[0]); // Update the value in react-hook-form
                    }}
                    value={picker[index] || ""}
                  />
                )}
              />
            </div>
            <div>
              <label
                htmlFor={`notificationText-${index}`}
                className="block capitalize form-label"
              >
                Notification Text<span style={{ color: "red" }}>*</span>
              </label>
              <Controller
                name={`notifications[${index}].notificationText`}
                control={control}
                render={({ field }) => (
                  <Textinput
                    label=""
                    type="text"
                    id={`notificationText-${index}`}
                    placeholder=""
                    {...field}
                    required
                  />
                )}
              />
            </div>
            <div className="flex justify-between items-end space-x-5">
              <div className="flex-1">
                <label
                  htmlFor={`notificationLink-${index}`}
                  className="block capitalize form-label"
                >
                  Notification Link
                  <span style={{ color: "red" }}>*</span>
                </label>
                <Controller
                  name={`notifications[${index}].notificationLink`}
                  control={control}
                  render={({ field }) => (
                    <Textinput
                      type="text"
                      id={`notificationLink-${index}`}
                      placeholder=""
                      {...field}
                      required
                    />
                  )}
                />
              </div>
              <div className="flex-none relative">
                <button
                  onClick={() => remove(index)}
                  type="button"
                  className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                >
                  <Icon icon="heroicons-outline:trash" />
                </button>
              </div>
            </div>
          </div>
        ))}
        <div className="ltr:text-right rtl:text-left">
          <Button type="submit" text="Submit" className="btn-dark" />
        </div>
      </form>
    </Modal>
  );
};

export default NotificationForm;
