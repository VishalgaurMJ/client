import React, { useState, createRef } from "react";
import Textinput from "@/components/ui/Textinput";
import axios from "axios";
import Fileinput from "@/components/ui/Fileinput";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { Editor } from "@tinymce/tinymce-react";
import cheerio from "cheerio";
import Icon from "@/components/ui/Icon";

import { useForm, useFieldArray } from "react-hook-form";
import Flatpickr from "react-flatpickr";

function CourseOverview({ title, onAddSubPage, onSubmitt, id, unique_id }) {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  // Function to handle item click (e.g., "Pages" action)
  const handleItemClick = () => {
    setShowModal(true);
  };

  const [picker, setPicker] = useState(new Date());
  const [shortdesc, setShortDesc] = useState("");
  const [longdesc, setLongDesc] = useState("");
  const [authname, setAuthName] = useState("");
  const [breadt, setBreadt] = useState("");
  const [paget, setPaget] = useState("");
  const [metat, setMetat] = useState("");
  const [metadesc, setMetadesc] = useState("");
  const [metakey, setMetakey] = useState("");
  const [ogt, setOgt] = useState("");
  const [ogdesc, setOgdesc] = useState("");
  const [file, setFile] = useState("");
  const [ogrobot, setOgrobot] = useState("");
  const [oggogle, setOggogle] = useState("");
  const [notifications, setNotifications] = useState([]);

  const extractTextFromHtml = (html) => {
    const $ = cheerio.load(html); // Load HTML content using cheerio
    // Extract text from each element
    return $("body").text();
  };

  // Handler function for editor change
  const handleEditorChange = (content) => {
    // Extract text from HTML content while preserving structure
    const plainText = extractTextFromHtml(content);
    // Set the plain text to the state variable
    setLongDesc(plainText);
  };

  const addNotification = () => {
    setNotifications([...notifications, { date: "", text: "", link: "" }]);
  };
  const deleteNotification = (index) => {
    const updatedNotifications = [...notifications];
    updatedNotifications.splice(index, 1);
    setNotifications(updatedNotifications);
  };

  // const fileinput = createRef();
  const submitoverview = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);
      formData.append("unique_id", unique_id);
      formData.append("title", title);
      formData.append("shortdesc", shortdesc);
      formData.append("longdesc", longdesc);
      formData.append("authname", authname);
      formData.append("breadt", breadt);
      formData.append("paget", paget);
      formData.append("metat", metat);
      formData.append("metadesc", metadesc);
      formData.append("metakey", metakey);
      formData.append("ogt", ogt);
      formData.append("ogdesc", ogdesc);
      formData.append("ogrobot", ogrobot);
      formData.append("oggogle", oggogle);
      formData.append("status", true);

      // notifications.forEach((notification, index) => {
      //   formData.append(`notifications[${index}][date]`, notification.date);
      //   formData.append(`notifications[${index}][text]`, notification.text);
      //   formData.append(`notifications[${index}][link]`, notification.link);
      //   console.log("Notification:", notification);
      // });
      const currentDate = new Date();
      formData.append("added_on", currentDate);
      formData.append("updated_on", currentDate);
      const data = Object.fromEntries(formData);
      const response = await axios.post(
        "https://server-dashboard-zeta.vercel.app/api/courseoverview",
        data
      );

      onSubmitt();
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Exam Already Exists");
    }
  };

  const saveAsDraft = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("id", id);
      formData.append("unique_id", unique_id);
      formData.append("title", title);
      formData.append("shortdesc", shortdesc);
      formData.append("longdesc", longdesc);
      formData.append("authname", authname);
      formData.append("breadt", breadt);
      formData.append("paget", paget);
      formData.append("metat", metat);
      formData.append("metadesc", metadesc);
      formData.append("metakey", metakey);
      formData.append("ogt", ogt);
      formData.append("ogdesc", ogdesc);
      formData.append("ogrobot", ogrobot);
      formData.append("oggogle", oggogle);
      formData.append("status", false); // Set status to false for draft

      // notifications.forEach((notification, index) => {
      //   formData.append(`notifications[${index}][date]`, notification.date);
      //   formData.append(`notifications[${index}][text]`, notification.text);
      //   formData.append(`notifications[${index}][link]`, notification.link);
      // });

      // data.notifications.forEach((notification, index) => {
      //   formData.append(`notifications[${index}][date]`, notification.date);
      //   formData.append(
      //     `notifications[${index}][text]`,
      //     notification.notificationText
      //   );
      //   formData.append(
      //     `notifications[${index}][link]`,
      //     notification.notificationLink
      //   );
      // });

      const currentDate = new Date();
      formData.append("added_on", currentDate);
      formData.append("updated_on", currentDate);
      const data = Object.fromEntries(formData);

      const response = await axios.post(
        "https://server-dashboard-zeta.vercel.app/api/courseoverview",
        data
      );

      onSubmitt();
      console.log("Success:", response);
    } catch (error) {
      console.error("Error:", error);
      toast.error("course Already Exists");
    }
  };

  const { register, control, handleSubmit, reset, trigger, setError } = useForm(
    {
      defaultValues: {
        test: [{ firstName: "Bill", lastName: "Luo", phone: "123456" }],
      },
    }
  );
  const { fields, append, remove } = useFieldArray({
    control,
    name: "test",
  });
  const index = 1;

  return (
    <div>
      <form className="space-y-4" onSubmit={submitoverview}>
        <p htmlFor="Input" className="mb-4">
          Course Name :<span style={{ marginLeft: "50px" }}>{title}</span>
        </p>
        <div className="w-full">
          <label htmlFor="Input" className="block capitalize form-label">
            Short description<span className="text-red-500">*</span>
          </label>
          <Textinput
            type="text"
            value={shortdesc}
            onChange={(e) => setShortDesc(e.target.value)}
            required
          />
        </div>

        <div>
          <div className="input-area relative">
            <label htmlFor="Input" className="form-label">
              Long Description<span className="text-red-500">*</span>
            </label>
            <Editor
              textareaName="content"
              initialValue="Write your content here"
              onEditorChange={handleEditorChange}
              apiKey="kf062o0jcq27qmkwkgj36iqry9987s9bbb12au6nrwo8eszd"
              init={{
                height: 500,
                menubar: true,
                plugins:
                  "advlist autolink lists link image charmap preview anchor searchreplace visualblocks code fullscreen insertdatetime media table code help wordcount",
                toolbar:
                  "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="w-full">
            <label htmlFor="Input" className="block capitalize form-label">
              Author Name<span className="text-red-500">*</span>
            </label>
            <Textinput
              type="text"
              value={authname}
              onChange={(e) => setAuthName(e.target.value)}
            />
          </div>
        </div>
        <div className="w-full mt-0.5">
          <Modal
            title="Add Latest Notification"
            label="Add Notification"
            labelClass="btn-outline-success"
            uncontrol
            className="max-w-5xl"
            onClick={handleItemClick}
            showModal={showModal}
            setShowModal={setShowModal}
          >
            <div className="flex justify-end">
              <Button
                text="Add more"
                icon="heroicons-outline:plus"
                className="btn-light"
                onClick={() => append()}
              />
            </div>
            <form onSubmit={handleSubmit((data) => console.log(data))}>
              {fields.map((item, index) => (
                <div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-5 last:mb-0"
                  key={index}
                >
                  <div>
                    <label className="block capitalize form-label">
                      Date<span className="text-red-500">*</span>
                    </label>
                    <Flatpickr
                      className="form-control py-2"
                      onChange={(date) => setPicker(date)}
                      value={picker}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="ValidState"
                      className="block capitalize form-label"
                    >
                      Notification Text<span className="text-red-500">*</span>
                    </label>
                    <Textinput
                      label=""
                      type="text"
                      placeholder=""
                      register={register}
                    />
                  </div>
                  <div className="flex justify-between items-end space-x-5">
                    <div className="flex-1">
                      <label
                        htmlFor="ValidState"
                        className="block capitalize form-label"
                      >
                        Notification Link
                        <span className="text-red-500">*</span>
                      </label>
                      <Textinput
                        type="text"
                        placeholder=""
                        register={register}
                      />
                    </div>
                    <div className="flex-none relative">
                      <button
                        onClick={() => remove(index)}
                        type="button"
                        className="inline-flex items-center justify-center h-10 w-10 bg-danger-500 text-lg border rounded border-danger-500 text-white"
                      >
                        <Icon icon="heroicons-outline:trash" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-right">
                <Button text="Submit" className="btn-dark" />
              </div>
            </form>
          </Modal>
        </div>

        <div className="mt-6">
          <div className="flex justify-between items-center mb-4 ml-4">
            <h5 className="font-light text-blue-500">SEO Tags</h5>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            <div className="w-full">
              <label
                htmlFor="largeInput"
                className="block capitalize form-label"
              >
                Breadcrum Title<span className="text-red-500">*</span>
              </label>
              <Textinput
                type="text"
                placeholder=""
                value={breadt}
                onChange={(e) => setBreadt(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="largeInput"
                className="block capitalize form-label"
              >
                Page Title<span className="text-red-500">*</span>
              </label>
              <Textinput
                type="text"
                placeholder=""
                value={paget}
                onChange={(e) => setPaget(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Meta Title<span className="text-red-500">*</span>
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={metat}
              onChange={(e) => setMetat(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Meta Description
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={metadesc}
              onChange={(e) => setMetadesc(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              Meta Keyword
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={metakey}
              onChange={(e) => setMetakey(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              OG: Title
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={ogt}
              onChange={(e) => setOgt(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label htmlFor="largeInput" className="block capitalize form-label">
              OG: Description
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={ogdesc}
              onChange={(e) => setOgdesc(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="exampleFormControlFile1"
              className="block capitalize form-label"
            >
              OG: Image
            </label>
            <Fileinput
              selectedFile={file}
              id="exampleFormControlFile12"
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="flex flex-wrap items-center space-x-10 -ml-9">
            <label
              htmlFor="status"
              className="block capitalize form-label ml-10"
            >
              OG: Robots
            </label>
            <Radio
              label="Follow"
              htmlFor="NationalExam"
              id="NationalExam"
              name="case1"
              value="1"
              checked={ogrobot === 1}
              onChange={(e) => setOgrobot(Number(e.target.value))}
            />
            <Radio
              label="NO follow"
              htmlFor="StateExam"
              id="StateExam"
              name="examType"
              value="2"
              checked={ogrobot === 2}
              onChange={(e) => setOgrobot(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-wrap items-center space-x-10 -ml-9">
            <label
              htmlFor="status"
              className="block capitalize form-label ml-10"
            >
              OG: googlebot
            </label>
            <Radio
              label="Follow"
              htmlFor="NationalExam"
              id="NationalExam"
              name="case2"
              value="1"
              checked={oggogle === 1}
              onChange={(e) => setOggogle(Number(e.target.value))}
            />
            <Radio
              label="NO follow"
              htmlFor="StateExam"
              id="StateExam"
              name="case2"
              value="2"
              checked={oggogle === 2}
              onChange={(e) => setOggogle(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap mt-6 gap-4 xl:gap-8">
          <Button
            text="Save as Draft"
            className="btn-light"
            type="button"
            onClick={saveAsDraft}
          />
          <Button text="Make Exam Live" className="btn-success" type="submit" />
        </div>
      </form>
    </div>
  );
}

export default CourseOverview;
