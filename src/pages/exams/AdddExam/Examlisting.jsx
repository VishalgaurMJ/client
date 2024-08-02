import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Radio from "@/components/ui/Radio";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import { ToastContainer, toast } from "react-toastify";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";

const Examlisting = ({
  onSubmit,
  setExamName,
  shortNames,
  setId,
  setUnique_id,
  id,
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
  const { register } = useForm();
  const [_id, set_Id] = useState();
  const [name, setName] = useState("");
  const [examfullname, setExamFullname] = useState("");
  const [examtype, setExamType] = useState("");
  const [exammode, setExamMode] = useState("");
  const [examcase, setExamCase] = useState("");
  const [examcategory, setExamCategory] = useState([]);
  const [coursemapping, setCourseMapping] = useState([]);
  const [formlink, setFormLink] = useState("");
  const [officialwebsite, setOfficialWebsite] = useState("");
  const [applicationdate, setApplicationDate] = useState("");
  const [startenddate, setStartEndDate] = useState("");
  const [resultannounce, setResultAnnounce] = useState("");
  const [general, setGeneral] = useState("");
  const [female, setFemale] = useState("");
  const [notes, setNotes] = useState("");
  const [sc, setSc] = useState("");
  const [pwd, setPwd] = useState("");
  const [others, setOthers] = useState("");
  const [file, setFile] = useState("");
  const [formlinkError, setFormLinkError] = useState("");
  const [officialwebsiteError, setOfficialWebsiteError] = useState("");
  const [imgsize, setImgsize] = useState("");
  const [foreigner, setForeigner] = useState("");

  // const imginput = useRef();
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
      formData.append("name", name);
      formData.append("examfullname", examfullname);
      formData.append("examtype", examtype);
      formData.append("exammode", exammode);
      formData.append("examcase", examcase);
      formData.append("examcategory", examcategory);
      formData.append("coursemapping", coursemapping.join(","));
      formData.append("formlink", formlink);
      formData.append("officialwebsite", officialwebsite);
      formData.append("applicationdate", applicationdate);
      formData.append("startenddate", startenddate);
      formData.append("resultannounce", resultannounce);
      formData.append("general", general);
      formData.append("female", female);
      formData.append("sc", sc);
      formData.append("pwd", pwd);
      formData.append("others", others);
      formData.append("foreigner", foreigner);
      formData.append("notes", notes);
      const currentDate = new Date();
      formData.append("added_on", currentDate);
      formData.append("updated_on", currentDate);
      const data = Object.fromEntries(formData);

      setFormLinkError("");
      if (!formlink.startsWith("https")) {
        setFormLinkError('Invalid link format. Link must start with "https".');
        return;
      }

      setOfficialWebsiteError("");
      if (!officialwebsite.startsWith("https")) {
        setOfficialWebsiteError(
          'Invalid link format. Link must start with "https".'
        );
        return;
      }

      setImgsize("");
      if (file && file.size > 200 * 1024) {
        setImgsize("Size must be less than 200KB");
        imginput.current.value = null;
        return;
      }
      const formData1 = new FormData();
      formData1.append("full_name", examfullname);
      formData1.append("updated_on", currentDate);
      const data1 = Object.fromEntries(formData1);

      const response = await axios.post(
        "https://server-dashboard-zeta.vercel.app/api/details",
        formData
      );
      const responses = await axios.put(
        `https://server-dashboard-zeta.vercel.app/api/adddetails/${_id}`,
        data1
      );

      setExamName(name);
      onSubmit();

      console.log("Success:", responses);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Exam Already Exists");
    }
  };

  const optionsfir = [
    ...shortNames.map((name) => ({ value: name, label: name })),
    { value: "createYourOwn", label: "Create Your Own" },
  ];

  const optionssec = [
    { value: 1, label: "Paramedical" },
    { value: 2, label: "Medical" },
    { value: 3, label: "Pharmacy" },
    { value: 4, label: "Dental" },
    { value: 5, label: "Science" },
    { value: 6, label: "Veterinary" },
    { value: 7, label: "Ayurveda" },
  ];
  const [examDetails, setExamDetails] = useState({});
  const fetchDetailsByName = async (selectedName) => {
    try {
      const response = await axios.get(
        `https://server-dashboard-zeta.vercel.app/api/getnamedetails/${selectedName}`
      );
      if (response.data && response.data.length > 0) {
        setExamDetails(response.data[0]);
      } else {
        setExamDetails({});
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const handleChangeName = (selectedOption) => {
    if (selectedOption) {
      setName(selectedOption.value); // Set the name state
      fetchDetailsByName(selectedOption.value); // Fetch details by name
    } else {
      setExamDetails({});
    }
  };

  useEffect(() => {
    set_Id(examDetails._id);
    setId(examDetails.id);
    setUnique_id(examDetails.unique_id);
    setExamFullname(examDetails.full_name || "");
    setExamType(examDetails.type || "");
    setExamMode(examDetails.mode || "");
    setExamCase(examDetails.exam_type || "");
    setExamCategory(examDetails.category || []);
  }, [examDetails]);

  const [mapcourses, setMapCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://server-dashboard-zeta.vercel.app/api/getallcourses"
        );
        setMapCourses(response.data.courses || []);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  const optionsmap = [
    ...mapcourses.map((courses) => ({ value: courses, label: courses })),
  ];

  return (
    <div>
      <form
        className="space-y-4"
        action="/details"
        encType="multipart/form-data"
        onSubmit={handleSubmit}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-2">
          <div className="space-y-3 w-11/12">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Exam Short Name<span style={{ color: "red" }}>*</span>
            </label>

            <Select
              id="first-select"
              options={optionsfir}
              value={optionsfir.find(
                (selectedOption) => selectedOption.value === name
              )}
              onChange={handleChangeName}
              isSearchable
              placeholder="Select or enter exam short name"
            />
          </div>
          <div
            className="space-x-10 -ml-9  -mt-6 xl:-mt-16 xl:mr-44 xl:mb-8"
            style={{ marginTop: "-3.5rem" }}
          >
            <label
              htmlFor="status"
              className="block capitalize form-label mt-4 ml-10 xl:mt-16 xl:ml-9"
            >
              Exam List Type<span style={{ color: "red" }}>*</span>
            </label>
            <div className="flex sm:flex-row gap-9 ">
              <Radio
                id="Entrance Exam"
                name="status"
                htmlFor="Entrance Exam"
                value="Entrance Exam"
                label="Entrance Exam"
                checked={examtype === "1"}
                onChange={(e) => setExamType(e.target.value)}
              />

              <Radio
                id="Recruitment Exam"
                name="status"
                htmlFor="Recruitment Exam"
                value="Recruitment Exam"
                label="Recruitment Exam"
                checked={examtype === "2"}
                onChange={(e) => setExamType(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Exam Full Name<span style={{ color: "red" }}>*</span>
            </label>

            <Textinput
              name="examfullname"
              id="examfullname"
              value={examfullname}
              defaultValue={examfullname}
              placeholder="Enter Exam Full Name"
              register={register}
              onChange={(e) => setExamFullname(e.target.value)}
              required
            />
          </div>

          <div className="w-9/12">
            <label
              htmlFor="exampleFormControlFile1"
              className="block capitalize form-label  "
            >
              Exam logo<span style={{ color: "red" }}>*</span>
            </label>

            <Fileinput
              id="exampleFormControlFile1"
              accept=".jpg, .jpeg, .png"
              minSize="150kb"
              // ref={imginput}
              onChange={uploadImage}
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            className="flex flex-wrap space-x-10 "
            style={{
              marginTop: "-4.5rem",
              marginLeft: "-2rem",
              marginBottom: "2rem",
            }}
          >
            <label
              htmlFor="status"
              className="block capitalize form-label"
              style={{ marginTop: "4.5rem", marginLeft: "2.3rem" }}
            >
              Exam Mode<span style={{ color: "red" }}>*</span>
            </label>
            <Radio
              label="Online"
              htmlFor="Online"
              id="Online"
              name="status"
              value="Online"
              onChange={(e) => setExamMode(e.target.value)}
              checked={exammode === "1"}
            />

            <Radio
              label="Offline"
              htmlFor="Offline"
              id="Offline"
              name="status"
              value="Offline"
              onChange={(e) => setExamMode(e.target.value)}
              checked={exammode === "2"}
            />

            <Radio
              label="Online & Offline Both"
              htmlFor="OnlineAndOfflineBoth"
              id="OnlineAndOfflineBoth"
              name="status"
              value="Online and Offline Both"
              onChange={(e) => setExamMode(e.target.value)}
              checked={exammode === "3"}
            />
          </div>
          <div className="flex flex-wrap space-x-10 -ml-9  -mt-6 xl:-mt-16 xl:-ml-4 xl:mb-8">
            <label
              htmlFor="status"
              className="block capitalize form-label mt-4 ml-10 xl:mt-16 xl:ml-9"
            >
              Exam Type<span style={{ color: "red" }}>*</span>
            </label>
            <Radio
              label="National Exam"
              htmlFor="NationalExam"
              id="NationalExam"
              name="status"
              value="National Exam"
              onChange={(e) => setExamCase(e.target.value)}
              checked={examcase === 1}
            />

            <Radio
              label="State Exam"
              htmlFor="StateExam"
              id="StateExam"
              name="status"
              value="State Exam"
              onChange={(e) => setExamCase(e.target.value)}
              checked={examcase === 2}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label htmlFor="select" className="block capitalize form-label  ">
              Exam Category<span style={{ color: "red" }}>*</span>
            </label>

            <Select
              isClearable={false}
              id="first-select"
              styles={styles}
              isMulti
              name="select"
              options={optionssec}
              className="react-select"
              classNamePrefix="select"
              value={
                typeof examcategory === "string"
                  ? examcategory
                      .split(",")
                      .map((index) => parseInt(index, 10))
                      .filter(
                        (index) => index >= 1 && index <= optionssec.length
                      )
                      .map((index) => optionssec[index - 1])
                  : optionssec.filter((option) => examcategory == option.value)
              }
              onChange={(selectedOptions) =>
                setExamCategory(selectedOptions.map((option) => option.value))
              }
            />
          </div>

          <div className="w-full">
            <label htmlFor="select" className="block capitalize form-label  ">
              Course Mapping
            </label>

            <Select
              isClearable={false}
              id="second-select"
              styles={styles}
              isMulti
              name="select"
              options={optionsmap}
              placeholder="Select options..."
              className="react-select"
              classNamePrefix="select"
              value={optionsmap.find(
                (selectedOption) => selectedOption.value === coursemapping
              )}
              onChange={(selectedOptions) =>
                setCourseMapping(selectedOptions.map((option) => option.value))
              }
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Application Form Link
            </label>
            <Textinput
              type="text"
              name="Application Form Link"
              id="Application Form Link"
              placeholder=""
              value={formlink}
              register={register}
              onChange={(e) => setFormLink(e.target.value)}
              required
            />

            {formlinkError && (
              <div className="error-message text-red-500 text-xs mt-1">
                {formlinkError}
              </div>
            )}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Official Website<span style={{ color: "red" }}>*</span>
            </label>
            <Textinput
              type="text"
              name="Official Website"
              id="Official Website"
              placeholder=""
              value={officialwebsite}
              register={register}
              onChange={(e) => setOfficialWebsite(e.target.value)}
              required
            />
            {officialwebsiteError && (
              <div className="error-message text-red-500 text-xs mt-1">
                {officialwebsiteError}
              </div>
            )}
          </div>

          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Application Date<span style={{ color: "red" }}>*</span>
            </label>
            <Textinput
              type="text"
              name="Application Date"
              id="Application Date"
              placeholder="Yet to be announce"
              register={register}
              value={applicationdate}
              onChange={(e) => setApplicationDate(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Start & End Date<span style={{ color: "red" }}>*</span>
            </label>
            <Textinput
              type="text"
              name="startanddate"
              id="tartanddate"
              placeholder="Yet to be announce"
              register={register}
              value={startenddate}
              onChange={(e) => setStartEndDate(e.target.value)}
              required
            />
          </div>
          {/* </div>
        <div className="mt-6 flex flex-wrap" style={{ gap: "1rem" }}> */}
          <div className="-mt-2 w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Result Announce<span style={{ color: "red" }}>*</span>
            </label>
            <Textinput
              type="text"
              name="Result Announce"
              id="Result Announce"
              placeholder="Yet to be announce"
              register={register}
              value={resultannounce}
              onChange={(e) => setResultAnnounce(e.target.value)}
              required
            />
          </div>
        </div>

        <label
          htmlFor="largeInput"
          className="block capitalize form-label"
          style={{ marginBottom: "-0.7rem" }}
        >
          Exam Fee
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              General
            </label>
            <Textinput
              type="text"
              name="general"
              id="general"
              register={register}
              placeholder=""
              value={general}
              onChange={(e) => setGeneral(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Women
            </label>
            <Textinput
              type="text"
              name="female"
              id="female"
              placeholder=""
              register={register}
              value={female}
              onChange={(e) => setFemale(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              SC
            </label>
            <Textinput
              type="text"
              name="SC"
              id="SC"
              placeholder=""
              register={register}
              value={sc}
              onChange={(e) => setSc(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              PWD
            </label>
            <Textinput
              type="text"
              name="PWD"
              id="PWD"
              placeholder=""
              register={register}
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Other
            </label>
            <Textinput
              type="text"
              name="others"
              id="others"
              placeholder=""
              register={register}
              value={others}
              onChange={(e) => setOthers(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Notes
            </label>
            <Textinput
              type="text"
              name="notes"
              id="notes"
              placeholder=""
              register={register}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Foreigner
            </label>
            <Textinput
              type="text"
              name="Foreigner"
              id="Foreigner"
              placeholder=""
              register={register}
              value={foreigner}
              onChange={(e) => setForeigner(e.target.value)}
            />
          </div>
        </div>
        <Button text="Go to Overview" className="btn-success" type="submit" />
      </form>
      <ToastContainer />
    </div>
  );
};

export default Examlisting;
