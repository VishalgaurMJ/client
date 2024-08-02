import React, { Fragment, useState, useEffect } from "react";
import Card from "@/components/ui/Card";
import { Tab, Disclosure, Transition } from "@headlessui/react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AddCourse from "./AddCourse";
import CourseGenral from "./CourseGenral";
import CourseOverview from "./CourseOverview";
const buttons = [
  {
    title: "General Update",
    icon: "heroicons-outline:home",
  },
  {
    title: "Overview",
    icon: "heroicons-outline:home",
  },
];

function AddExam() {
  const navigate = useNavigate();
  const [examListingSubmitted, setExamListingSubmitted] = useState(false);
  const [title, settitle] = useState("");
  const [id, setId] = useState();
  const [unique_id, setUnique_id] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const toastii = () => {
    toast("Course Listing Submitted Successfully");
  };

  const toastiyy = () => {
    toast("Overview Submitted");
  };

  const handleCourseListingSubmit = () => {
    setExamListingSubmitted(true);
    setSelectedIndex(1); // Change to the Overview tab
    toastii();
  };

  const handleCourseOverviewSubmit = () => {
    toastiyy();
    navigate("/managecourses");
  };

  const [TITLE, setTITLE] = useState([]);

  useEffect(() => {
    fetchTITLE();
  }, []);
  const fetchTITLE = async () => {
    try {
      const response = await axios.get(
        "https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getallcoursenames"
      );
      setTITLE(response.data.TITLE);
    } catch (error) {
      console.error("Error fetching short names:", error);
    }
  };

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-7">
      <Card>
        <h4
          className="card-title mb-4"
          style={{
            fontFamily: "Open Sans sans-serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          Add Courses
        </h4>
        <div className="absolute right-14 top-40">
          <AddCourse fetchTITLE={fetchTITLE} />
        </div>
        <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
          <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
            {buttons.map((item, i) => (
              <Tab as={Fragment} key={i}>
                {({ selected }) => (
                  <button
                    className={` text-sm font-medium mb-7 capitalize bg-white
             dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
              transition duration-150 before:transition-all before:duration-150 relative 
              before:absolute before:left-1/2 before:bottom-[-6px] before:h-[1.5px] before:bg-success-500 
              before:-translate-x-1/2 
              
              ${
                selected
                  ? "text-success-500 before:w-full"
                  : "text-slate-500 before:w-0 dark:text-slate-300"
              }
              `}
                  >
                    {item.title}
                  </button>
                )}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels>
            <Tab.Panel>
              {examListingSubmitted ? (
                <CourseGenral
                  settitless={settitle}
                  setTITLE={setTITLE}
                  TITLE={TITLE}
                  setId={setId}
                  setUnique_id={setUnique_id}
                  id={id}
                  unique_id={unique_id}
                />
              ) : (
                <CourseGenral
                  onsubmit={handleCourseListingSubmit}
                  TITLE={TITLE}
                  handleCourseListingSubmit={handleCourseListingSubmit}
                  settitless={settitle}
                  setTITLE={setTITLE}
                  setId={setId}
                  setUnique_id={setUnique_id}
                  id={id}
                  unique_id={unique_id}
                />
              )}
            </Tab.Panel>
            <Tab.Panel>
              <CourseOverview
                onSubmitt={handleCourseOverviewSubmit}
                title={title}
                id={id}
                unique_id={unique_id}
              />
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default AddExam;
