import React from "react";
import Input from "../FormControl/Input";
import CustomDatePicker from "../FormControl/CustomDatePicker";

const FormControl = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case "input":
      return <Input {...rest} />;
    case "datepicker":
      return <CustomDatePicker {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
