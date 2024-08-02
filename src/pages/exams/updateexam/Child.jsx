import React, { useState } from "react";
import axios from "axios";
import { Editor } from "@tinymce/tinymce-react";
import Textinput from "@/components/ui/Textinput";
import Fileinput from "@/components/ui/Fileinput";
import Radio from "@/components/ui/Radio";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import { useForm, useFieldArray } from "react-hook-form";
import Flatpickr from "react-flatpickr";
import Icon from "@/components/ui/Icon";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function slug({ slugs, fetchChildDetails }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [picker, setPicker] = useState(new Date());

  const handleItemClick = () => {
    setShowModal(true);
  };
  const toastiyy = () => {
    toast("child Updated");
  };

  const [et, setEt] = useState(slugs?.et);
  const [slugr, setSlugr] = useState(slugs?.sl);
  const [name, setName] = useState(slugs?.Exam_name);

  const handleExamTitleChange = (e) => {
    const title = e.target.value;

    // Replace spaces with dashes for the slug
    const slugValue = title.replace(/\s+/g, "-").toLowerCase();

    setEt(title);
    setSlugr(slugValue);
  };

  const [longdesc, setLongDesc] = useState(slugs?.longdesc);
  const [authname, setAuthName] = useState(slugs?.authname);
  const [breadt, setBreadt] = useState(slugs?.breadt);
  const [paget, setPaget] = useState(slugs?.paget);
  const [metat, setMetat] = useState(slugs?.metat);
  const [metadesc, setMetadesc] = useState(slugs?.metadesc);
  const [metakey, setMetakey] = useState(slugs?.metakey);
  const [ogt, setOgt] = useState(slugs?.ogt);
  const [ogdesc, setOgdesc] = useState(slugs?.ogdesc);

  const [ogrobot, setOgrobot] = useState(slugs?.ogrobot);
  const [oggogle, setOggogle] = useState(slugs?.oggogle);
  const [loading, setLoading] = useState("");

  // const [notifications, setNotifications] = useState([]);

  const htmlToText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent || "";
  };

  const handleEditorChange = (content) => {
    // Convert HTML content to plain text
    const plainText = htmlToText(content);
    // Set the plain text to the state variable
    setLongDesc(plainText);
  };

  // const addNotification = () => {
  //   setNotifications([...notifications, { date: "", text: "", link: "" }]);
  // };
  // const deleteNotification = (index) => {
  //   const updatedNotifications = [...notifications];
  //   updatedNotifications.splice(index, 1);
  //   setNotifications(updatedNotifications);
  // };
  //   //form repeater

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

  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      // setLoading(true);
      const formData = new FormData();
      formData.append("et", et);
      formData.append("sl", slugr);
      formData.append("Exam_name", name);
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
      const currentDate = new Date();
      formData.append("updated_on", currentDate);

      const response = await axios.put(
        `https://server-medicaljagat-git-main-medical-jagat.vercel.app/api/overviewsubpage/${slugr}`, // Use `sl` from useParams for URL
        formData
      );

      console.log("Success:", response);
      await fetchChildDetails();
      toastiyy();
      setLoading(false);
      navigate("/manageexam");
      // Handle success state or further actions
    } catch (error) {
      console.error("Error:", error);
      setLoading(false);
      // Handle error state or display error message
    }
  };

  return (
    <div>
      <form
        className="space-y-4"
        action="/exam_childpages"
        encType="multipart/form-data"
        onSubmit={handleSubmitt}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div className="w-full">
            <label htmlFor="Input" className="block capitalize form-label  ">
              Exam Title
            </label>
            <Textinput
              type="text"
              className="form-control"
              placeholder=""
              value={et}
              defaultValue={et}
              onChange={handleExamTitleChange}
              required
            />
          </div>
          <div className="w-full">
            <label htmlFor="Input" className="block capitalize form-label  ">
              slug
            </label>
            <Textinput
              type="text"
              className="form-control"
              placeholder=""
              defaultValue={slugr}
              value={slugr}
              required
              disabled
            />
          </div>
        </div>

        <div>
          <div className="input-area relative">
            <label htmlFor="Input" className="form-label">
              Long Description<span style={{ color: "red" }}>*</span>
            </label>

            <Editor
              textareaName="content"
              initialValue={longdesc}
              onEditorChange={handleEditorChange}
              apiKey="kf062o0jcq27qmkwkgj36iqry9987s9bbb12au6nrwo8eszd"
              init={{
                height: 500,
                menubar: true,
                plugins:
                  "advlist autolink lists link image charmap preview anchor " +
                  "searchreplace visualblocks code fullscreen " +
                  "insertdatetime media table code help wordcount",
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
              required
            />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap" style={{ gap: "1rem" }}>
          <div className="w-1/2">
            <label htmlFor="Input" className="block capitalize form-label  ">
              Author Name<span style={{ color: "red" }}>*</span>
            </label>

            <Textinput
              type="text"
              placeholder=""
              value={authname}
              defaultValue={authname}
              onChange={(e) => setAuthName(e.target.value)}
            />
          </div>

          <div style={{ marginTop: "1.5rem" }}>
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
              <form
              // onSubmit={handleSubmit((data) => console.log(data))}
              >
                {fields.map((item, index) => (
                  <div
                    className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
                    key={index}
                  >
                    <div>
                      <label
                        // htmlFor={`notification-${index}`}
                        // id={`date-notification-${index}`}
                        className="block capitalize form-label  "
                      >
                        Date<span style={{ color: "red" }}>*</span>
                      </label>
                      <Flatpickr
                        className="form-control py-2"
                        onChange={(date) => setPicker(date)}
                        value={picker}
                        // onChange={(e) => {const updatedNotifications = [...notifications];
                        //                                  updatedNotifications[index] = {...notification, date:e.target.value};  setNotifications(updatedNotifications); }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="ValidState"
                        className="block capitalize form-label  "
                      >
                        Notification Text<span style={{ color: "red" }}>*</span>
                      </label>
                      <Textinput
                        label=""
                        type="text"
                        // id={`name2${index}`}
                        placeholder=""
                        register={register}
                        // name={`test[${index}].notificationText`}
                      />
                    </div>

                    <div className="flex justify-between items-end space-x-5">
                      <div className="flex-1">
                        <label
                          htmlFor="ValidState"
                          className="block capitalize form-label  "
                        >
                          Notification Link
                          <span style={{ color: "red" }}>*</span>
                        </label>
                        <Textinput
                          type="text"
                          // id={`name3${index}`}
                          placeholder=""
                          register={register}
                          // name={`test[${index}].notificationLink`}
                          // value={notification.link}
                          // onChange={(e) => {const updatedNotifications = [...notifications];
                          //                                  updatedNotifications[index] = {...notification, link:e.target.value};  setNotifications(updatedNotifications); }}
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

                <div className="ltr:text-right rtl:text-left">
                  <Button text="Submit" className="btn-dark" />
                </div>
              </form>
            </Modal>
          </div>
        </div>

        <div className="mt-6">
          <div className="md:flex justify-between items-center mb-4 ml-4">
            <h5 className="font-light text-blue-500">SEO Tags</h5>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            <div className="w-full">
              <label
                htmlFor="largeInput"
                className="block capitalize form-label  "
              >
                Breadcrum Title<span style={{ color: "red" }}>*</span>
              </label>
              <Textinput
                type="text"
                placeholder=""
                defaultValue={breadt}
                value={breadt}
                onChange={(e) => setBreadt(e.target.value)}
                required
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="largeInput"
                className="block capitalize form-label  "
              >
                Page Title<span style={{ color: "red" }}>*</span>
              </label>
              <Textinput
                type="text"
                placeholder=""
                defaultValue={paget}
                value={paget}
                onChange={(e) => setPaget(e.target.value)}
                required
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Meta Title<span style={{ color: "red" }}>*</span>
            </label>
            <Textinput
              type="text"
              placeholder=""
              defaultValue={metat}
              value={metat}
              onChange={(e) => setMetat(e.target.value)}
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Meta Description
            </label>
            <Textinput
              type="text"
              placeholder=""
              defaultValue={metadesc}
              value={metadesc}
              onChange={(e) => setMetadesc(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              Meta Keyword
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={metakey}
              defaultValue={metakey}
              onChange={(e) => setMetakey(e.target.value)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              OG: Title
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={ogt}
              defaultValue={ogt}
              onChange={(e) => setOgt(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="largeInput"
              className="block capitalize form-label  "
            >
              OG: Description
            </label>
            <Textinput
              type="text"
              placeholder=""
              value={ogdesc}
              defaultValue={ogdesc}
              onChange={(e) => setOgdesc(e.target.value)}
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="exampleFormControlFile1"
              className="block capitalize form-label  "
            >
              OG: Image
            </label>
            <Fileinput
              // selectedFile={file}
              id="exampleFormControlFile12"
              accept=".jpg, .jpeg, .png"
              // ref={fileinput}
              // onChange={(e) => setFile(e.target.files[0])}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          <div
            className="flex flex-wrap space-x-10"
            style={{ marginLeft: "-2.3rem" }}
          >
            <label
              htmlFor="status"
              className="block capitalize form-label"
              style={{ marginLeft: "2.5rem" }}
            >
              OG: Robots
            </label>
            <Radio
              label="Follow"
              htmlFor="NationalExam"
              id="NationalExam"
              name="examType"
              defaultValue="Follow"
              value="1"
              checked={ogrobot === 1}
              onChange={(e) => setOgrobot(Number(e.target.value))}
            />
            <Radio
              label="NO follow"
              htmlFor="StateExam"
              id="StateExam"
              name="examType"
              defaultValue="No Follow"
              value="2"
              checked={ogrobot === 2}
              onChange={(e) => setOgrobot(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-wrap space-x-10 -ml-9  xl:mr-40">
            <label
              htmlFor="status"
              className="block capitalize form-label"
              style={{ marginLeft: "2.5rem" }}
            >
              OG: googlebot
            </label>
            <Radio
              label="Follow"
              htmlFor="NationalExam"
              id="NationalExam"
              name="examType"
              value="1"
              checked={oggogle === 1}
              onChange={(e) => setOggogle(Number(e.target.value))}
            />
            <Radio
              label="NO follow"
              htmlFor="StateExam"
              id="StateExam"
              name="examType"
              checked={oggogle === 2}
              value="2"
              onChange={(e) => setOggogle(Number(e.target.value))}
            />
          </div>
        </div>

        <Button text="Update" className="btn-success" type="submit" />
      </form>
      <ToastContainer />
    </div>
  );
}

export default slug;
