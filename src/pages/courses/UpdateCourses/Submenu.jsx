import React, { useState } from "react";
import axios from "axios";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { ToastContainer, toast } from "react-toastify";
import Textinput from "@/components/ui/Textinput";

function Submenu({ onClose, name, fetchChildDetails, id, unique_id }) {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const [et, setEt] = useState("");
  const [sl, setSl] = useState("");

  const handleExamTitleChange = (e) => {
    const title = e.target.value;

    // Replace spaces with dashes for the slug
    const slugValue = title.replace(/\s+/g, "-").toLowerCase();

    setEt(title);
    setSl(slugValue);
  };
  const handleClick = () => {
    const newTabLabel = `${et}`; // Replace with the value you want to pass

    setShowModal(false);
  };

  const submitoverview = async (e) => {
    e.preventDefault();

    try {
      const currentDate = new Date();
      const requestData = {
        id: id,
        unique_id: unique_id,
        ct: et,
        sl: sl,
        title: name,
        added_on: currentDate,
        updated_on: currentDate,
      };

      const result = await axios.post(
        "https://server-dashboard-zeta.vercel.app/api/courseoverviewsubpage",
        requestData
      );

      const overviewdata = result.data;
      console.log("Success:", overviewdata);
      await fetchChildDetails();
      onClose();
    } catch (error) {
      toast.error("Child already exist");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <Modal
        title=""
        label="Add Submenu Page"
        labelClass="btn-outline-success"
        uncontrol
        className="max-w-5xl"
        showModal={showModal}
        setShowModal={setShowModal}
      >
        <div>
          <form className="space-y-4" onSubmit={submitoverview}>
            <div className="flex justify-between">
              <div style={{ width: "30rem" }}>
                <label
                  htmlFor="Input"
                  className="block capitalize form-label  "
                >
                  Course Title
                </label>
                <Textinput
                  type="text"
                  className="form-control"
                  placeholder=""
                  onChange={handleExamTitleChange}
                  required
                />
              </div>
              <div style={{ width: "30rem" }}>
                <label
                  htmlFor="Input"
                  className="block capitalize form-label  "
                >
                  slug
                </label>
                <Textinput
                  type="text"
                  className="form-control"
                  placeholder=""
                  defaultValue={et}
                  value={sl}
                  required
                  disabled
                />
              </div>
            </div>
            <Button
              text="Add Submenu"
              className="btn-success mt-6"
              type="submit"
              onClick={handleClick}
            />
          </form>
        </div>
      </Modal>
      <ToastContainer />
    </div>
  );
}

export default Submenu;
