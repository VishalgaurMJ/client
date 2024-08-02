import React, { Fragment, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Child from "./Child";
import Card from "@/components/ui/Card";
import { Tab } from "@headlessui/react";
import Overview from "./Overview";
import Examlisting from "./Examlisting";
import { ToastContainer, toast } from "react-toastify";
import Submenu from "./Submenu";
import Button from "@/components/ui/Button";
import { useNavigate } from "react-router-dom";

const initialButtons = [
  {
    title: "General Update",
    icon: "heroicons-outline:home",
  },
  {
    title: "Overview",
    icon: "heroicons-outline:user",
  },
];

function PageUpdate() {
  const navigate = useNavigate();
  const { name } = useParams();
  const { slug } = useParams();
  const [namee, setNamee] = useState("");
  const [id, setId] = useState("");
  const [unique_id, setUnique_id] = useState("");
  const [loading, setLoading] = useState(true);
  const [modal, setModal] = useState(false);
  const [overviewTabs, setOverviewTabs] = useState(["overview"]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [examName, setExamName] = useState("");
  const [child, setChild] = useState({});
  const [buttons, setButtons] = useState(initialButtons);
  const [examListingSubmitted, setExamListingSubmitted] = useState(false);

  const toastii = () => {
    toast("Exam Listing updated Successfully");
  };

  const toastiyy = () => {
    toast("Overview updated Submitted");
  };

  const handleExamListingSubmit = () => {
    setExamListingSubmitted(true);
    setSelectedIndex(1); // Change to the Overview tab
    toastii();
  };

  const handleExamOverviewSubmit = (data) => {
    toastiyy();
    navigate("/manageexam");
  };

  const showsubpage = () => {
    setModal(true);
  };

  const closesubpage = () => {
    setModal(false);
  };

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await fetch(
          `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/getcompletedinfo/${name}`
        );
        if (response.ok) {
          const data = await response.json();
          setNamee(data.Exam_Genaral[0].name);
          setId(data.Exam_Genaral[0].id);
          setUnique_id(data.Exam_Genaral[0].unique_id);
        } else {
          console.error("Error fetching exam details:", response.statusText);
        }
      } catch (error) {
        console.error("Error in Fetching Exam Details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [name]);

  useEffect(() => {
    fetchChildDetails();
  }, [name]);
  const fetchChildDetails = async () => {
    try {
      const response = await fetch(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/allchildpagedetails`
      );
      if (response.ok) {
        const data = await response.json();
        const matchingChildren = data.filter(
          (child) => child.Exam_name === name
        );

        if (matchingChildren.length > 0) {
          const childObj = matchingChildren.reduce((acc, child) => {
            acc[child.sl] = child;
            return acc;
          }, {});
          setChild(childObj);
          setOverviewTabs([child, ...Object.keys(childObj)]);

          setButtons((prevButtons) => [
            ...initialButtons,
            ...Object.keys(childObj).map((sl) => ({
              title: `${sl}`,
              icon: "heroicons-outline:user",
            })),
          ]);
        }
      } else {
        console.error("Error fetching exam details:", response.statusText);
      }
    } catch (error) {
      console.error("Error in Fetching Exam Details:", error);
    } finally {
      setLoading(false);
    }
  };

  const selectedChild = child?.[buttons?.[selectedIndex]?.title];

  return (
    <div className="grid xl:grid-cols-1 grid-cols-1 gap-7">
      <Card>
        <h4
          className="card-title mb-14"
          style={{
            fontFamily: "Open Sans sans-serif",
            fontSize: "26px",
            fontWeight: "600",
            color: "#000",
            textTransform: "capitalize",
          }}
        >
          {namee} Exam Details
        </h4>
        <div className="absolute right-64 top-40 " style={{}}>
          <Button
            icon="heroicons-outline:eye"
            text="view"
            className="btn-outline-success rounded-[999px] "
          />
        </div>
        <div className="absolute right-14 top-40 ">
          <Submenu
            name={namee}
            onClose={closesubpage}
            added={setOverviewTabs}
            fetchChildDetails={fetchChildDetails}
            id={id}
            unique_id={unique_id}
          />
        </div>

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
                <Examlisting
                  onSubmit={handleExamListingSubmit}
                  handleExamListingSubmit={handleExamListingSubmit}
                  setExamName={setExamName}
                />
              ) : (
                <Examlisting
                  onSubmit={handleExamListingSubmit}
                  handleExamListingSubmit={handleExamListingSubmit}
                  setExamName={setExamName}
                />
              )}
            </Tab.Panel>
            <Tab.Panel>
              <Overview
                onSubmit={handleExamOverviewSubmit}
                handleExamOverviewSubmit={handleExamOverviewSubmit}
                examName={examName}
              />
            </Tab.Panel>
            {overviewTabs.slice(1).map((sl, index) => (
              <Tab.Panel key={index}>
                {index + 2 === selectedIndex ? (
                  <Child
                    slugs={selectedChild}
                    fetchChildDetails={fetchChildDetails}
                  />
                ) : (
                  <></>
                )}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </Card>
      <ToastContainer />
    </div>
  );
}

export default PageUpdate;
