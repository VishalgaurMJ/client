import React, { useState, useMemo, Fragment } from "react";
import { Tab } from "@headlessui/react";
import Card from "@/components/ui/Card";
import ManageCourse from "./ManageCourse";

function MainManageCourse() {
  const buttons = [
    {
      title: "courses",
      icon: "heroicons-outline:home",
    },
  ];

  return (
    <>
      <Card noborder>
        <div className="grid xl:grid-cols-1 grid-cols-1 gap-6 bg-white dark:bg-slate-800">
          <Tab.Group>
            <Tab.List className="lg:space-x-8 md:space-x-4 space-x-0 rtl:space-x-reverse">
              {buttons.map((item, i) => (
                <Tab as={Fragment} key={i}>
                  {({ selected }) => (
                    <button
                      style={{ marginLeft: "20px", marginTop: "20px" }}
                      className={` text-sm font-medium mb-7 capitalize bg-white
                          dark:bg-slate-800 ring-0 foucs:ring-0 focus:outline-none px-2
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
                <ManageCourse />
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </Card>
    </>
  );
}

export default MainManageCourse;
