import React, { useEffect, useRef, useState, useContext } from "react";
import { Button, Typography, Box, Divider, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import Template from "../Template/Template";
import FormControl from "../FormControl/FormControl";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { kycCardStyles } from "../pages/kycCard.style";
import { Formik, Form } from "formik";
import * as yup from "yup";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import {
  UploadApi,
  addNewEmployee,
  editEmployee,
  getEmployeeDetails,
} from "../apis/apis";
import AlertBox from "../organism/Alertbox/AlertBox";
import moment from "moment";
import { Context } from "../../App";

function FormPage() {
  const formikRef = useRef();
  const history = useHistory();
  const classes = kycCardStyles();
  const [data, setData] = useState([]);
  const [filrUrl, setFileUrl] = useState(false);
  const [alert, setAlert] = useState(false);
  const [msg, setMsg] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [calcAge, setCalcAge] = useState("");
  const [detail, setDetail] = useState();
  const [formValue, setFormValue] = useState({});
  const [editing, setEditing] = useState(false);

  const { edit, setEdit, newId, setNewId } = useContext(Context);

  const initialValues = {
    name: "",
    email: "",
    dob: null,
    age: "",
    address: "",
  };

  const validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .matches(/^[\u0900-\u097F.a-zA-Z ]*$/, "please enter valid name"),
    email: yup
      .string()
      .required("email is required")
      .matches(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/, "please enter valid email"),
    age: yup.string(),
  });

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false);
    let requestData = {
      id: newId,
      name: values.name,
      email: values.email,
      age: calcAge,
      dob: moment(values.dob).format("DD MMM, YYYY"),
      address: values.address,
      photo: filrUrl ? filrUrl : null,
    };

    const addEmployee = async () => {
      try {
        const submit = await addNewEmployee(requestData);

        if (submit.success) {
          history.push("/");
        }
      } catch (error) {
        setAlert(true);
        setMsg("submit failed");
        setIsSuccess(false);
        const timer = setTimeout(() => {
          setAlert(false);
          setMsg("");
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    const updateEmployee = async () => {
      try {
        const submit = await editEmployee(requestData);
        console.log("after submit", submit);
        if (submit.success) {
          history.push("/");
        }
      } catch (error) {
        setAlert(true);
        setMsg("submit failed");
        setIsSuccess(false);
        const timer = setTimeout(() => {
          setAlert(false);
          setMsg("");
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    if (editing) {
      updateEmployee();
    } else {
      addEmployee();
    }
  };

  useEffect(() => {
    const uploadFile = async () => {
      try {
        let requestData = new FormData();
        requestData.append("profile", data);
        const res = await UploadApi(requestData);
        if (res.success) {
          setFileUrl(res.path_url);
          setAlert(true);
          setIsSuccess(true);
          setMsg("uploaded successfully");
          const timer = setTimeout(() => {
            setAlert(false);
            setIsSuccess(false);
          }, 3000);
          return () => clearTimeout(timer);
        }
      } catch (error) {
        setAlert(true);
        setMsg("upload failed");
        setIsSuccess(false);
        const timer = setTimeout(() => {
          setAlert(false);
          setMsg("");
        }, 3000);
        return () => clearTimeout(timer);
      }
    };
    if (data.name) {
      uploadFile();
    }
  }, [data]);

  const gettingDetails = async (id) => {
    try {
      const data = await getEmployeeDetails(id);
      setDetail(data.data.data);
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    if (edit) {
      if (newId !== "") {
        setEditing(true);
        gettingDetails(newId);
        setEditing(true);
      }
    }
  }, []);

  useEffect(() => {
    if (editing) {
      let Name = "";
      if (detail.Name) {
        Name = detail.Name;
      }
      let Email = "";
      if (detail.email !== "") {
        Email = detail.email;
      }
      let Dob = "";
      if (detail.dob !== "") {
        Dob = detail.dob;
      }
      let age = "";
      if (detail.age) {
        age = detail.age;
        setCalcAge(age);
      }
      let Address = "";
      if (detail.address !== "") {
        Address = detail.address;
      }
      if (detail.photo !== null) {
        setFileUrl(detail.photo);
      }
      const savedValue = {
        name: Name,
        email: Email,
        dob: Dob,
        age: age,
        address: Address,
      };
      setFormValue(savedValue);
      console.log("savedValue", savedValue);
    }
  }, [detail]);

  const calculateAge = (dob) => {
    const diffMs = Date.now() - dob.getTime();
    const ageDT = new Date(diffMs);
    const age = Math.abs(ageDT.getUTCFullYear() - 1970);
    setCalcAge(age);
  };

  return (
    <>
      <div className={classes.authSectionMain}>
        <Container maxWidth="md" className={classes.containerRoot}>
          <Paper>
            <Formik
              initialValues={editing ? formValue : initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
              innerRef={formikRef}
              enableReinitialize
            >
              {({ submitForm, setFieldValue, values }) => (
                <Form className={classes.form} noValidate autoComplete="off">
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    alignContent="center"
                    width="100%"
                    height="100%"
                    paddingY={3}
                  >
                    <Box textAlign="center">
                      <Typography variant="h5" className={classes.title}>
                        Add New Employee
                      </Typography>
                    </Box>
                    <Box width="60%">
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={"Name"}
                        placeholder={"Enter Name"}
                        name="name"
                        type="text"
                        id="fullname"
                        required
                      />
                    </Box>
                    <Box width="60%">
                      <FormControl
                        control="input"
                        variant="outlined"
                        label={"E-mail"}
                        placeholder={"Enter Email"}
                        name="email"
                        type="text"
                        id="email"
                        required
                      />
                    </Box>
                    <Box width="60%">
                      <FormControl
                        control="datepicker"
                        name="dob"
                        label={"Date of Birth"}
                        onChange={(value) => {
                          if (!isNaN(value) && value !== null) {
                            calculateAge(value);
                            setFieldValue("dob", value);
                          }
                        }}
                        // variant={width === "lg" ? "inline" : ""}
                        maxDate={new Date()}
                        inputVariant="outlined"
                      />
                    </Box>
                    <Box width="60%">
                      <FormControl
                        control="input"
                        name="age"
                        value={calcAge}
                        label={"Age"}
                        placeholder={"Enter age"}
                        inputVariant="outlined"
                        variant="outlined"
                        disabled
                      />
                    </Box>
                    <Box width="60%">
                      <FormControl
                        control="input"
                        name="address"
                        label={"Address"}
                        placeholder={"Enter Address"}
                        inputVariant="outlined"
                        variant="outlined"
                        multiline
                        rows={4}
                      />
                    </Box>
                    {isSuccess && alert && (
                      <AlertBox severity="success">{msg}</AlertBox>
                    )}
                    {alert && !isSuccess && (
                      <AlertBox severity="error">{msg}</AlertBox>
                    )}
                    <Box
                      width="60%"
                      className={classes.dragNdDropText}
                      textAlign="center"
                      marginY={2}
                      padding={1}
                    >
                      <input
                        accept="image/jpeg,image/png,application/pdf,image/x-eps"
                        className={classes.input}
                        id="fileData"
                        type="file"
                        name="fileData"
                        onChange={(event) => {
                          if (event.currentTarget.files[0]) {
                            setFieldValue(
                              "fileData",
                              event.currentTarget.files[0]
                            );
                            setData(event.currentTarget.files[0]);
                          }
                        }}
                      />
                      <label htmlFor="fileData">
                        <Button
                          color="primary"
                          variant="outlined"
                          component="span"
                          style={{ fontSize: 17 }}
                          startIcon={<CloudUploadIcon />}
                        >
                          <Typography
                            variant="subtitle2"
                            className={classes.kycUploadBtn}
                          >
                            {data.name ? "upload another" : " upload"}
                          </Typography>
                        </Button>
                      </label>
                      <Box marginY={2}>
                        <Typography style={{ fontSize: 12 }}>
                          We support <strong> jpg, png & pdf format </strong>.
                          Make sure your file size is not more than 1 MB.
                        </Typography>
                      </Box>
                      {data.name && (
                        <Box marginY={2}>
                          <Typography style={{ fontSize: 14 }} color="primary">
                            <strong>image selected: </strong> {data.name}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                    <Box width="60%" margint={2}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={submitForm}
                        fullWidth

                        // fullWidth
                      >
                        Add
                      </Button>
                    </Box>
                  </Box>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      </div>
    </>
  );
}

export default FormPage;
