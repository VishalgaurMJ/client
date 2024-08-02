import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import { useForm } from "react-hook-form";
function AddCourse({ fetchcourseNames }) {
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
  const [title, setTitle] = useState("");

  const [category, setCategory] = useState([]);

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
        title,
        category: category.map((option) => option.value).join(","),
        added_on: new Date().toISOString(),
        updated_on: new Date().toISOString(),
      };

      console.log("Request Data:", requestData);
      const response = await axios.post(
        "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/addcoursedetails",
        requestData
      );
      await fetchcourseNames();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Modal
        title=""
        label="Add Course Detail"
        labelClass="btn-outline-dark"
        uncontrol
        className="max-w-5xl"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div className="lg:h-[31rem]">
          <form className="space-y-4" onSubmit={submitpage}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-1">
              <div className="w-full lg:w-11/12">
                <label
                  htmlFor="largeInput"
                  className="block capitalize form-label"
                >
                  Course Title<span className="text-red-500">*</span>
                </label>

                <Textinput
                  type="text"
                  name="title"
                  id="title"
                  register={register}
                  issearchable="true"
                  value={title}
                  placeholder="Enter Course Name"
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="w-full lg:w-11/12">
                <label htmlFor="select" className="block capitalize form-label">
                  Course Category<span className="text-red-500">*</span>
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
                text="Go to Courselisting"
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

export default AddCourse;
