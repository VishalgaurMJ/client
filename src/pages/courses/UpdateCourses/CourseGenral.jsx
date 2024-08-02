import React, { useState, useEffect, createRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Select from "react-select";
import Radio from "@/components/ui/Radio";
import Fileinput from "@/components/ui/Fileinput";
import Button from "@/components/ui/Button";
import { useForm } from "react-hook-form";
import Textinput from "@/components/ui/Textinput";

function CourseGeneral({ onSubmiter }) {
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

  const [imgsize, setImgsize] = useState("");
  const { register } = useForm();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("title", formattedTitle);
      formData.append("category", category);
      formData.append("tranding", tranding);
      formData.append("candidate_level", candidate_level);

      const currentDate = new Date();
      formData.append("updated_on", currentDate);

      setImgsize("");
      if (file && file.size > 200 * 1024) {
        setImgsize("Size must be less than 200KB");
        imginput.current.value = null;
        return;
      }
      const response = await axios.put(
        `https://server-dashboard-zeta.vercel.app/api/coursegeneral/${formattedTitle}`,
        formData
      );
      onSubmiter();
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const { title } = useParams();
  const [Course_General, setCourse_General] = useState({});
  const [loading, setLoading] = useState(true);
  const [namee, setNamee] = useState("");
  const [category, setCategory] = useState([]);
  const [tranding, setTranding] = useState("");
  const [candidate_level, setCandidate_level] = useState("");
  const [file, setFile] = useState("");

  const imginput = createRef();
  const formattedTitle = title.replace(/-/g, " ");

  useEffect(() => {
    const fetchExam_Genaral = async () => {
      try {
        console.log("Name", title);
        const response = await fetch(
          `https://server-dashboard-zeta.vercel.app/api/getcompletecourseinfo/${formattedTitle}`
        );
        if (response.ok) {
          const data = await response.json();
          console.log("Exam course Details:", data);

          const courseGeneral = data.Course_Genaral[0];
          setNamee(courseGeneral.title);
          setTranding(courseGeneral.tranding);
          setCategory(courseGeneral.course_Category);
          setCandidate_level(courseGeneral.candidate_level);
          setFile(courseGeneral.file);
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
  }, [formattedTitle]);

  const [courseName, setcourseName] = useState([]);

  useEffect(() => {
    const fetchcourseName = async () => {
      try {
        const response = await axios.get(
          "https://server-dashboard-zeta.vercel.app/api/getallcoursenames"
        );
        setcourseName(response.data.title);
      } catch (error) {
        console.error("Error fetching course title:", error);
      }
    };

    fetchcourseName();
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
  const options = [
    { value: "After 10th", label: "After 10th" },
    { value: "After 12th", label: "After 12th" },
    { value: "After UG", label: "After UG" },
    { value: "After PG", label: "After PG" },
  ];
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
            <Textinput
              name="title"
              id="title"
              value={formattedTitle}
              defaultValue={formattedTitle}
              register={register}
              required
              disabled={true}
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
              options={optionssec}
              className="react-select"
              classNamePrefix="select"
              value={optionssec.filter((option) =>
                category.includes(option.value)
              )}
              onChange={(selectedOptions) => {
                if (selectedOptions) {
                  setCategory(selectedOptions.map((option) => option.value));
                } else {
                  setCategory([]);
                }
              }}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Candidate Level<span className="text-red-500">*</span>
            </label>
            <Select
              isClearable={false}
              name="select"
              options={options}
              className="react-select"
              classNamePrefix="select"
              value={options.find((option) => option.value === candidate_level)}
              onChange={(selectedOption) => {
                setCandidate_level(selectedOption ? selectedOption.value : "");
              }}
              required
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
              // selectedFile={file}
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
    </div>
  );
}

export default CourseGeneral;
