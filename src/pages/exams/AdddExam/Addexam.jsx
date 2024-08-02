import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Radio from "@/components/ui/Radio";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
function Addexam({ fetchShortNames }) {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle item click (e.g., "Pages" action)
  const handleItemClick = () => {
    setShowModal(false);
  };
  const styles = {
    multiValue: (base, state) => {
      return state.data.isFixed ? { ...base, opacity: "0.5" } : base;
    },
    multiValueLabel: (base, state) => {
      return state.data.isFixed
        ? { ...base, color: "#626262", paddingRight: 6 }
        : base;
    },
    multiValueRemove: (base, state) => {
      return state.data.isFixed ? { ...base, display: "none" } : base;
    },
    option: (provided, state) => ({
      ...provided,
      fontSize: "14px",
    }),
  };
  const { register } = useForm();
  const [short_name, setshort_name] = useState("");
  const [full_name, setfull_name] = useState("");
  const [category, setCategory] = useState([]);
  const [mode, setMode] = useState("");
  const [type, setType] = useState("");
  const [exam_type, setexam_type] = useState("");

  const options = [
    { value: "1", label: "Paramedical" },
    { value: "2", label: "Medical" },
    { value: "3", label: "Pharmacy" },
    { value: "4", label: "Dental" },
    { value: "5", label: "Science" },
    { value: "6", label: "Veterinary" },
    { value: "7", label: "Ayurveda" },
  ];

  const handleChangeCategory = (selectedOptions) => {
    setCategory(selectedOptions);
  };

  const submitpage = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        short_name,
        full_name,
        mode,
        type,
        exam_type,
        category: category.map((option) => option.value).join(","),
        added_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
      };

      console.log("Request Data:", requestData);

      const response = await axios.post(
        "https://server-dashboard-zeta.vercel.app/api/adddetails",
        requestData
      );
      await fetchShortNames();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Modal
        title=""
        label="Add Exam Detail"
        labelClass="btn-outline-dark"
        uncontrol
        className="max-w-5xl"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="h-[55rem] lg:h-[31rem]">
          <form className="space-y-4" onSubmit={submitpage}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              <div className="space-y-3 w-full">
                <label
                  htmlFor="largeInput"
                  className="block capitalize form-label"
                >
                  Exam Short Name<span className="text-red-500">*</span>
                </label>
                <Textinput
                  type="text"
                  name="short_name"
                  id="short_name"
                  register={register}
                  value={short_name}
                  issearchable="true"
                  placeholder="Select or enter exam short name"
                  onChange={(e) => setshort_name(e.target.value)}
                />
              </div>

              <div className="space-y-3 w-full">
                <label
                  htmlFor="largeInput"
                  className="block capitalize form-label"
                >
                  Exam Full Name<span className="text-red-500">*</span>
                </label>
                <Textinput
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={full_name}
                  onChange={(e) => setfull_name(e.target.value)}
                  placeholder="Enter exam full name"
                  register={register}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
              <div className="space-y-3 w-full flex flex-col">
                <label htmlFor="status" className="block capitalize form-label">
                  Exam List Type<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Radio
                    htmlFor="Entrance Exam"
                    label="Entrance Exam"
                    checked={type === 1}
                    id="tentative"
                    name="examListType"
                    value="1"
                    onChange={(e) => setType(Number(e.target.value))}
                    required
                  />
                  <Radio
                    htmlFor="Recruitment Exam"
                    label="Recruitment Exam"
                    checked={type === 2}
                    id="yetToBeAnnounced"
                    name="examListType"
                    value="2"
                    onChange={(e) => setType(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
              <div className="space-y-3 w-full flex flex-col">
                <label htmlFor="status" className="block capitalize form-label">
                  Exam Mode<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Radio
                    label="Online"
                    htmlFor="Online"
                    id="Online"
                    name="examMode"
                    value="1"
                    checked={mode === 1}
                    onChange={(e) => setMode(Number(e.target.value))}
                    required
                  />
                  <Radio
                    label="Offline"
                    htmlFor="Offline"
                    id="Offline"
                    name="examMode"
                    value="2"
                    checked={mode === 2}
                    onChange={(e) => setMode(Number(e.target.value))}
                    required
                  />
                  <Radio
                    label="Online & Offline Both"
                    htmlFor="OnlineAndOfflineBoth"
                    id="OnlineAndOfflineBoth"
                    name="examMode"
                    value="3"
                    checked={mode === 3}
                    onChange={(e) => setMode(Number(e.target.value))}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-4">
              <div className="space-y-3 w-full flex flex-col">
                <label htmlFor="status" className="block capitalize form-label">
                  Exam Type<span className="text-red-500">*</span>
                </label>
                <div className="flex space-x-4">
                  <Radio
                    label="National Exam"
                    htmlFor="NationalExam"
                    id="NationalExam"
                    name="examType"
                    value="1"
                    checked={exam_type === 1}
                    onChange={(e) => setexam_type(Number(e.target.value))}
                    required
                  />
                  <Radio
                    label="State Exam"
                    htmlFor="StateExam"
                    id="StateExam"
                    name="examType"
                    value="2"
                    checked={exam_type === 2}
                    onChange={(e) => setexam_type(Number(e.target.value))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-3 w-full z-10">
                <label htmlFor="select" className="block capitalize form-label">
                  Exam Category<span className="text-red-500">*</span>
                </label>
                <Select
                  id="first-select"
                  styles={styles}
                  name="select"
                  className="react-select z-10"
                  classNamePrefix="select"
                  options={options}
                  isMulti
                  closeMenuOnSelect={false}
                  placeholder="Select options..."
                  value={category}
                  onChange={handleChangeCategory}
                />
              </div>
            </div>

            <div className="flex justify-between mt-6">
              <Button
                text="Go to Examlisting"
                className="btn-success"
                type="submit"
                onClick={handleItemClick}
              />
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Addexam;
