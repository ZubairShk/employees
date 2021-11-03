import axios from "axios";
const ApiEndPoint = "http://localhost:5000/employee/";

export const getEmployeeDetails = async (params) => {
  let res;
  if (params) {
    res = await axios.get(`${ApiEndPoint}showDetail/${params}`);
  } else {
    res = await axios.get(`${ApiEndPoint}showDetail`);
  }
  return res;
};

export const addNewEmployee = async (params) => {
  const res = await axios.post(`${ApiEndPoint}addNew`, params);
  return res.data;
};

export const editEmployee = async (params) => {
  const res = await axios.put(`${ApiEndPoint}update`, params);
  return res.data;
};

export const deleteEmployee = async (params) => {
  const res = await axios.post(`${ApiEndPoint}delete`, params);
  return res.data;
};

export const UploadApi = async (params) => {
  const res = await axios.post(`http://localhost:5000/fileUpload`, params);
  return res.data;
};
