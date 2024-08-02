import React, { useState, useEffect, createRef } from "react";
import axios from "axios";
import Fileinput from "@/components/ui/Fileinput";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
const CourseGeneral = ({
  onsubmit,
  TITLE,
  setId,
  setUnique_id,
  id,
  settitless,
  unique_id,
}) => {
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
  const optionscandidtae = [
    { value: "After 10th", label: "After 10th" },
    { value: "After 12th", label: "After 12th" },
    { value: "After UG", label: "After UG" },
    { value: "After PG", label: "After PG" },
  ];
  const [_id, set_Id] = useState();
  const [title, settitle] = useState("");
  const [category, setCategory] = useState("");
  const [tranding, setTranding] = useState("");
  const [candidate_level, setCandidate_level] = useState("");
  const [file, setFile] = useState("");
  const [imgsize, setImgsize] = useState("");

  const uploadImage = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("id", id);
      formData.append("unique_id", unique_id);
      formData.append("file", file);
      formData.append("title", title);
      formData.append("tranding", tranding);
      formData.append("category", category);
      formData.append("candidate_level", candidate_level);
      const currentDate = new Date();
      formData.append("added_on", currentDate);
      formData.append("updated_on", currentDate);
      const data = Object.fromEntries(formData);
      console.log(data);

      setImgsize("");
      if (file && file.size > 200 * 1024) {
        setImgsize("Size must be less than 200KB");
        imginput.current.value = null;
        return;
      }
      const formData1 = new FormData();
      formData1.append("title", title);
      // const currentDate = new Date();
      formData1.append("updated_on", currentDate);
      const data1 = Object.fromEntries(formData1);

      const response = await axios.post(
        "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/coursegeneral",
        formData
      );
      const responses = await axios.put(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/addcoursedetails/${_id}`,
        data1
      );
      settitless(title);
      onsubmit();
      console.log("Success:", responses);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Exam Already Exists");
    }
  };

  const optionsfir = Array.isArray(TITLE)
    ? [
        ...TITLE.map((title) => ({ value: title, label: title })),
        { value: "createYourOwn", label: "Create Your Own" },
      ]
    : [{ value: "createYourOwn", label: "Create Your Own" }];

  const options = [
    { value: "1", label: "Paramedical" },
    { value: "2", label: "Medical" },
    { value: "3", label: "Pharmacy" },
    { value: "4", label: "Dental" },
    { value: "5", label: "Science" },
    { value: "6", label: "Veterinary" },
    { value: "7", label: "Ayurveda" },
  ];
  const [courseDetails, setCourseDetails] = useState({});
  const fetchDetailsByName = async (selectedName) => {
    try {
      const response = await axios.get(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getcoursedetailsbytitle/${selectedName}`
      );
      if (response.data && response.data.length > 0) {
        setCourseDetails(response.data[0]);
      } else {
        setCourseDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };
  const handleChangeName = (selectedOption) => {
    if (selectedOption) {
      settitle(selectedOption.value); // Set the name state
      fetchDetailsByName(selectedOption.value); // Fetch details by name
    } else {
      // Clear details if no name is selected
      setCourseDetails({});
    }
  };

  useEffect(() => {
    set_Id(courseDetails._id);
    setId(courseDetails.id);
    setUnique_id(courseDetails.unique_id);
    settitle(courseDetails.title || "");
    setCategory(courseDetails.category || []);
  }, [courseDetails]);

  return (
    <div>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
          <div className="flex flex-wrap items-center space-x-10 -mt-18 -ml-8 mb-8">
            <label
              htmlFor="status"
              className="block capitalize form-label mt-18 ml-10"
            >
              Tranding Course<span className="text-red-500">*</span>
            </label>
            <Radio
              label="Yes"
              htmlFor="Online"
              id="Online"
              name="status"
              value="1"
              checked={tranding === 1}
              onChange={(e) => setTranding(Number(e.target.value))}
            />
            <Radio
              label="No"
              htmlFor="Offline"
              id="Offline"
              name="status"
              value="2"
              checked={tranding === 2}
              onChange={(e) => setTranding(Number(e.target.value))}
            />
          </div>

          <div className="w-full lg:w-11/12">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Course Title<span className="text-red-500">*</span>
            </label>
            <Select
              id="first-select"
              options={optionsfir}
              value={optionsfir.find(
                (selectedOption) => selectedOption.value === title
              )}
              onChange={handleChangeName}
              isSearchable
              placeholder="Select or enter course name"
            />
          </div>

          <div className="w-full lg:w-11/12">
            <label htmlFor="select" className="block capitalize form-label">
              Course Category<span className="text-red-500">*</span>
            </label>
            <Select
              isClearable={false}
              id="first-select"
              styles={styles}
              isMulti
              name="select"
              options={options}
              className="react-select"
              classNamePrefix="select"
              value={
                typeof category === "string"
                  ? category
                      .split(",")
                      .map((index) => parseInt(index, 10))
                      .filter((index) => index >= 1 && index <= options.length)
                      .map((index) => options[index - 1])
                  : options.filter((option) => category == option.value)
              }
              onChange={(selectedOptions) =>
                setCategory(selectedOptions.map((option) => option.value))
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Candidate Level<span className="text-red-500">*</span>
            </label>
            <Select
              id="first-select"
              options={optionscandidtae}
              isSearchable
              placeholder="Select candidate level"
              value={optionscandidtae.find(
                (option) => option.value === candidate_level
              )}
              onChange={(selectedOption) =>
                setCandidate_level(selectedOption.value)
              }
            />
          </div>

          <div className="w-full lg:w-2/3">
            <label
              htmlFor="exampleFormControlFile1"
              className="block capitalize form-label"
            >
              Feature Image <span className="text-red-500">*</span>
            </label>
            <Fileinput
              id="exampleFormControlFile1"
              accept=".jpg, .jpeg, .png"
              minSize="150kb"
              required
              name="basic"
              selectedFile={file}
            />
            {imgsize && (
              <div className="error-message text-red-500 text-xs mt-1">
                {imgsize}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-wrap mt-6 gap-4 xl:gap-24">
          <Button text="Go to Overview" className="btn-success" type="submit" />
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CourseGeneral;
