import React, { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Radio from "@/components/ui/Radio";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";

function Form1({ onSubmit }) {
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
  const [officialWebsiteError, setofficialWebsiteError] = useState("");

  const [imgsize, setImgsize] = useState("");
  const { register } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("name", name);
      formData.append("examFullName", examFullName);
      formData.append("examType", examType);
      formData.append("examMode", examMode);
      formData.append("examCase", examCase);
      formData.append("examCategory", examCategory);
      formData.append("courseMapping", courseMapping);
      formData.append("formLink", formLink);
      formData.append("officialWebsite", officialWebsite);
      formData.append("applicationDate", applicationDate);
      formData.append("startDateEnd", startDateEnd);
      formData.append("resultAnnounce", resultAnnounce);
      formData.append("general", general);
      formData.append("notes", notes);
      formData.append("female", female);
      formData.append("foreigner", foreigner);
      formData.append("sc", sc);
      formData.append("pwd", pwd);
      formData.append("others", others);

      const currentDate = new Date();
      formData.append("updated_on", currentDate);
      setFormLinkError("");
      if (!formLink.startsWith("https")) {
        setformLinkError('Invalid link format. Link must start with "https".');
        return;
      }

      setofficialWebsiteError("");
      if (!officialWebsite.startsWith("https")) {
        setofficialWebsiteError(
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
      const response = await axios.put(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/details/${name}`,
        formData
      );
      onSubmit();
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { name } = useParams();
  const [Exam_Genaral, setExam_Genaral] = useState({});
  const [loading, setLoading] = useState(true);
  const [namee, setNamee] = useState("");
  const [examFullName, setExamFullName] = useState("");
  const [examCategory, setExamCategory] = useState("");
  const [examType, setExamType] = useState("");
  const [examMode, setExamMode] = useState("");
  const [examCase, setExamCase] = useState("");
  const [formLink, setFormLink] = useState("");
  const [courseMapping, setCourseMapping] = useState("");
  const [formLinkError, setFormLinkError] = useState("");
  const [officialWebsite, setOfficialWebsite] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [startDateEnd, setstartDateEnd] = useState("");
  const [resultAnnounce, setresultAnnounce] = useState("");
  const [general, setgeneral] = useState("");
  const [female, setFemale] = useState("");
  const [foreigner, setforeigner] = useState("");
  const [sc, setSc] = useState("");
  const [pwd, setPwd] = useState("");
  const [others, setOthers] = useState("");
  const [notes, setNotes] = useState("");

  const [file, setFile] = useState("");
  const [img, setImg] = useState("");

  const imginput = createRef();

  useEffect(() => {
    const fetchExam_Genaral = async () => {
      try {
        const response = await fetch(
          `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getcompletedinfo/${name}`
        );
        if (response.ok) {
          const data = await response.json();

          setNamee(data.Exam_Genaral[0].name);
          setExamFullName(data.Exam_Genaral[0].examFullName);
          setExamCategory(data.Exam_Genaral[0].examCategory);
          setExamType(data.Exam_Genaral[0].examType);
          setExamMode(data.Exam_Genaral[0].examMode);
          setExamCase(data.Exam_Genaral[0].examCase);
          setFormLink(data.Exam_Genaral[0].formLink);
          setCourseMapping(data.Exam_Genaral[0].courseMapping);
          setOfficialWebsite(data.Exam_Genaral[0].officialWebsite);
          setApplicationDate(data.Exam_Genaral[0].applicationDate);
          setstartDateEnd(data.Exam_Genaral[0].startDateEnd);
          setresultAnnounce(data.Exam_Genaral[0].resultAnnounce);
          setgeneral(data.Exam_Genaral[0].general);
          setFemale(data.Exam_Genaral[0].female);
          setforeigner(data.Exam_Genaral[0].foreigner);
          setNotes(data.Exam_Genaral[0].notes);
          setSc(data.Exam_Genaral[0].sc);
          setPwd(data.Exam_Genaral[0].pwd);
          setOthers(data.Exam_Genaral[0].others);
          setImg(data.Exam_Genaral[0].img);
        } else {
          console.error("Error fetching exam details:", response.statusText);
        }
      } catch (error) {
        console.error("Error in Fetching Exam Details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExam_Genaral();
  }, [name]);

  const fetchDetailsByName = async (selectedName) => {
    try {
      const response = await axios.get(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getnamedetails/${selectedName}`
      );
      if (response.data && response.data.length > 0) {
        setExam_Genaral(response.data[0]);
        console.log(response.data); // Assuming the response is an array of details
      } else {
        setExam_Genaral({});
      }
    } catch (error) {
      console.error("Error fetching details:", error);
    }
  };

  const [shortNames, setShortNames] = useState([]);

  useEffect(() => {
    const fetchShortNames = async () => {
      try {
        const response = await axios.get(
          "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getallnames"
        );
        setShortNames(response.data.shortNames);
      } catch (error) {
        console.error("Error fetching short names:", error);
      }
    };

    fetchShortNames();
  }, []);

  const optionssec = [
    { value: 1, label: "Paramedical" },
    { value: 2, label: "Medical" },
    { value: 3, label: "Pharmacy" },
    { value: 4, label: "Dental" },
    { value: 5, label: "Science" },
    { value: 6, label: "Veterinary" },
    { value: 7, label: "Ayurveda" },
  ];
  const [mapcourses, setMapCourses] = useState([]);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getallcourses"
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

            <Textinput
              name="name"
              id="name"
              value={name}
              defaultValue={name}
              register={register}
              required
              disabled={true}
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
            <div className="flex sm:flex-row gap-9">
              <Radio
                id="Entrance Exam"
                name="status"
                htmlFor="Entrance Exam"
                value="1"
                label="Entrance Exam"
                checked={examType === 1}
                onChange={(e) => setExamType(Number(e.target.value))}
              />

              <Radio
                id="Recruitment Exam"
                name="status"
                htmlFor="Recruitment Exam"
                value="2"
                label="Recruitment Exam"
                checked={examType === 2}
                onChange={(e) => setExamType(Number(e.target.value))}
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
              name="examFullName"
              id="examFullName"
              defaultValue={examFullName}
              placeholder="Exam Full Name"
              register={register}
              disabled={true}
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
              // onChange={uploadImage}
              required
              name="basic"
              // selectedFile={file}
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
              value="1"
              onChange={(e) => setExamMode(Number(e.target.value))}
              checked={examMode === 1}
            />

            <Radio
              label="Offline"
              htmlFor="Offline"
              id="Offline"
              name="status"
              defaultValue="Offline"
              value="2"
              onChange={(e) => setExamMode(Number(e.target.value))}
              checked={examMode === 2}
            />

            <Radio
              label="Online & Offline Both"
              htmlFor="OnlineAndOfflineBoth"
              id="OnlineAndOfflineBoth"
              name="status"
              defaultValue="Online and Offline Both"
              value="3"
              onChange={(e) => setExamMode(Number(e.target.value))}
              checked={examMode === 3}
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
              defaultValue="National Exam"
              value="1"
              onChange={(e) => setExamCase(Number(e.target.value))}
              checked={examCase === 1}
            />

            <Radio
              label="State Exam"
              htmlFor="StateExam"
              id="StateExam"
              name="status"
              defaultValue="State Exam"
              value="2"
              onChange={(e) => setExamCase(Number(e.target.value))}
              checked={examCase === 2}
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
              value={optionssec.filter((option) =>
                examCategory.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                if (selectedOptions) {
                  setExamCategory(
                    selectedOptions.map((option) => option.value)
                  );
                } else {
                  setExamCategory([]);
                }
              }}
              required
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
              value={optionsmap.filter((option) =>
                courseMapping.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                if (selectedOptions) {
                  setCourseMapping(
                    selectedOptions.map((option) => option.value)
                  );
                } else {
                  setCourseMapping([]);
                }
              }}
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
              value={formLink}
              defaultValue={formLink}
              register={register}
              onChange={(e) => setFormLink(e.target.value)}
              required
            />

            {formLinkError && (
              <div className="error-message text-red-500 text-xs mt-1">
                {formLinkError}
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
              value={officialWebsite}
              defaultValue={officialWebsite}
              register={register}
              onChange={(e) => setOfficialWebsite(e.target.value)}
              required
            />
            {officialWebsiteError && (
              <div className="error-message text-red-500 text-xs mt-1">
                {officialWebsiteError}
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
              value={applicationDate}
              defaultValue={applicationDate}
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
              value={startDateEnd}
              defaultValue={startDateEnd}
              onChange={(e) => setstartDateEnd(e.target.value)}
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
              value={resultAnnounce}
              defaultValue={resultAnnounce}
              onChange={(e) => setresultAnnounce(e.target.value)}
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
              defaultValue={general}
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
              defaultValue={female}
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
              defaultValue={sc}
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
              defaultValue={pwd}
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
              defaultValue={others}
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
              defaultValue={notes}
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
              defaultValue={foreigner}
              onChange={(e) => setforeigner(e.target.value)}
            />
          </div>
        </div>
        <Button text="Go to Overview" className="btn-success" type="submit" />
      </form>
    </div>
  );
}

export default Form1;
