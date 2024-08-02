import React from "react";
import Card from "@/components/ui/Card";
import Datanuggets from "../../components/partials/widget/chart/datanuggets";
import SelectMonth from "@/components/partials/SelectMonth";
import CategoryChart from "../../components/partials/widget/chart/category-chart";
import Monthlycalculation from "../../components/partials/widget/chart/monthlycalculation";
import ExampleTwo from "../table/react-tables/ExampleTwo";
import AuthorLog from "../table/react-tables/Authorlog";
import HomeBredCurbs from "./HomeBredCurbs";
import SelectData from "@/components/partials/SelectData";
const LeadDetails = [
  {
    name: "Type",
    value: "Number",
  },
  {
    name: "Newsletter",
    value: "44455",
  },
  {
    name: "Registared User",
    value: "55555",
  },
  {
    name: "Contact Us",
    value: "2002",
  },
  {
    name: "Exam",
    value: "230",
  },
  {
    name: "Courses",
    value: "504",
  },
  {
    name: "News",
    value: "1000",
  },
  {
    name: "Certificated Courses",
    value: "402",
  },
  {
    name: "Product Artical",
    value: "45",
  },
  {
    name: "College",
    value: "6000",
  },
  {
    name: "Institutes",
    value: "2333",
  },
  {
    name: "Universities",
    value: "3223",
  },
  {
    name: "Hospitals",
    value: "44567",
  },
  {
    name: "Clinics",
    value: "345",
  },
  {
    name: "Pathlabs",
    value: "100",
  },
  {
    name: "NGO",
    value: "22222",
  },
];
const NewdashboardPage = () => {
  return (
    <div>
      <HomeBredCurbs title="Medicaljagat dashboard" />
      <div className="space-y-5">
        <div className="grid grid-cols-12 gap-5">
          <div className="lg:col-span-8 col-span-12 space-y-5">
            <Card>
              <div className="grid xl:grid-cols-4 lg:grid-cols-2 col-span-1 gap-2">
                <Datanuggets />
              </div>
            </Card>
            <Card>
              <header className="md:flex md:space-y-0 space-y-4">
                <h6 className="flex-1 text-slate-900 dark:text-white capitalize">
                  Category Chart
                </h6>
                <div className="flex-none">
                  <SelectData />
                </div>
              </header>
              <div className="legend-ring">
                <CategoryChart />
              </div>
            </Card>
          </div>
          <div className="lg:col-span-4 col-span-12 space-y-5">
            <div className="lg:col-span-4 col-span-12 space-y-5">
              <Card title="Lead Details" headerslot={<SelectData />}>
                <ul className="divide-y divide-slate-100 dark:divide-slate-700">
                  {LeadDetails.map((item, i) => (
                    <li
                      key={i}
                      className="first:text-xs text-sm first:text-slate-600 text-slate-600 dark:text-slate-300 py-2 first:uppercase"
                    >
                      <div className="flex justify-between">
                        <span>{item.name}</span>
                        <span>{item.value}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card title="Monthly All Data">
                <div className="legend-ring3">
                  <Monthlycalculation />
                </div>
              </Card>
            </div>
          </div>
        </div>

        <AuthorLog title="Author Log" />
        {/*            
        <ExampleTwo title="Latest Transaction" />   */}
      </div>
    </div>
  );
};

export default NewdashboardPage;
