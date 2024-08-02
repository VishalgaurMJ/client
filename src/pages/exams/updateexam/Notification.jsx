import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "@/components/ui/Button";
import Textinput from "@/components/ui/Textinput";
import Flatpickr from "react-flatpickr";
import { Icon } from "@iconify/react";
import Modal from "@/components/ui/Modal";

const AddNotificationModal = () => {
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility

  const handleItemClick = () => {
    setShowModal(true);
  };

  const { register, handleSubmit, control } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "notifications",
  });
  const [picker, setPicker] = useState([]);

  const onSubmit = (data) => {
    // Transform data to the desired format
    const transformedData = data.notifications.map((item, index) => ({
      date: picker[index] || null, // Get the corresponding date from picker state
      text: item.notificationText,
      link: item.notificationLink,
    }));
    // Send data to the database
    console.log("Data to send:", transformedData);
    // Add your API call logic here to send transformedData to the backend
  };

  return (
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
          onClick={() => append({ notificationText: "", notificationLink: "" })}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {fields.map((item, index) => (
          <div
            className="lg:grid-cols-3 md:grid-cols-2 grid-cols-1 grid gap-5 mb-5 last:mb-0"
            key={item.id}
          >
            <div>
              <label
                htmlFor={`notification-${index}`}
                id={`date-notification-${index}`}
                className="block capitalize form-label  "
              >
                Date<span style={{ color: "red" }}>*</span>
              </label>
              <Flatpickr
                className="form-control py-2"
                onChange={(date) => {
                  const newPicker = [...picker];
                  newPicker[index] = date[0]; // Assuming date is an array with the selected date as the first element
                  setPicker(newPicker);
                }}
                value={picker[index]}
              />
            </div>
            <div>
              <label
                htmlFor={`notificationText-${index}`}
                className="block capitalize form-label  "
              >
                Notification Text<span style={{ color: "red" }}>*</span>
              </label>
              <Textinput
                label=""
                type="text"
                id={`notificationText-${index}`}
                placeholder=""
                register={register}
                name={`notifications[${index}].notificationText`}
                required
              />
            </div>
            <div className="flex justify-between items-end space-x-5">
              <div className="flex-1">
                <label
                  htmlFor={`notificationLink-${index}`}
                  className="block capitalize form-label  "
                >
                  Notification Link
                  <span style={{ color: "red" }}>*</span>
                </label>
                <Textinput
                  type="text"
                  id={`notificationLink-${index}`}
                  placeholder=""
                  register={register}
                  name={`notifications[${index}].notificationLink`}
                  required
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
  );
};

export default AddNotificationModal;
