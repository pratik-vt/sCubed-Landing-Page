import React, { useState, FC } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Button from "../Button/button";
import {
  buttonStyle,
  errorMessageStyle,
  formGroupStyle,
  formWrapper,
  inputControlStyle,
  labelStyle,
  requiredIndicatorStyle,
  submitButtonStyle,
  textAreaControlStyle,
} from "./styles.css";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  buttonColor: string;
  buttonBackground: string;
  buttonWidth?: string;
};

type Inputs = {
  name: string;
  email: string;
  phoneNumber: string;
  company: string;
  comments: string;
};

const ModalForm: FC<Props> = ({
  buttonColor,
  buttonBackground,
  buttonWidth,
}) => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, touchedFields },
    reset,
  } = useForm<Inputs>({ mode: 'onBlur', reValidateMode: 'onChange' });


  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => {
    setOpen(false);
    reset()
  }

 

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div>
      <Button
        className={buttonStyle}
        color={buttonColor}
        backgroundColor={buttonBackground}
        width={buttonWidth ?? "180px"}
        onClick={onOpenModal}
      >
        BOOK A DEMO
      </Button>
      <Modal open={open} onClose={onCloseModal} center>
        <form className={formWrapper} onSubmit={handleSubmit(onSubmit)}>
          <div className={formGroupStyle}>
            <label className={labelStyle}>
              Name<span className={requiredIndicatorStyle}>*</span>
            </label>
            <input
              type="text"
              className={inputControlStyle}
              {...register("name", { required: "Name is required" })}
            />
            {touchedFields.name && (
              <div className={errorMessageStyle}>{errors?.name?.message}</div>
            )}
          </div>
          <div className={formGroupStyle}>
            <label className={labelStyle}>
              Email<span className={requiredIndicatorStyle}>*</span>
            </label>
            <input
              type="text"
              className={inputControlStyle}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
                  message: "Email is not valid",
                },
              })}
            />
            <div className={errorMessageStyle}>{errors?.email?.message}</div>
          </div>
          <div className={formGroupStyle}>
            <label className={labelStyle}>
              Phone Number<span className={requiredIndicatorStyle}>*</span>
            </label>
            <input
              type="text"
              className={inputControlStyle}
              {...register("phoneNumber", {
                required: "Phone number is required",
                pattern: {
                  value: /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
                  message: "Phone number is not valid",
                },
              })}
            />
             <div className={errorMessageStyle}>{errors?.phoneNumber?.message}</div>
          </div>
          <div className={formGroupStyle}>
            <label className={labelStyle}>
              Company
            </label>
            <input
              type="text"
              className={inputControlStyle}
              {...register("company")}
            />
          </div>
          <div className={formGroupStyle}>
            <label className={labelStyle}>Comments</label>
            <textarea
              className={textAreaControlStyle}
              {...register("comments")}
            ></textarea>
          </div>
          <div className={formGroupStyle}>
            <input className={submitButtonStyle} type="submit" />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ModalForm;
