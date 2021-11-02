const model = require("../models");

exports.getEmployeeDetails = async (req, res) => {
  try {
    const data = await model.Employees.findAll({
      attributes: ["id", "Name", "email", "age", "dob", "address", "photo"],
    });
    if (!data) {
      return res
        .status(205)
        .json({ success: false, data: [], error: "data not found" });
    }
    return res.status(200).json({ success: true, data: data });
  } catch (error) {
    return res.status(205).json({ success: false, data: [], error: error });
  }
};

exports.addNewEmployee = async (req, res) => {
  try {
    const { name, email, age, dob, address, photo } = req.body;
    if (!name) {
      return res.status(205).json({ success: false, error: "name is require" });
    } else if (!email) {
      return res
        .status(205)
        .json({ success: false, error: "email is require" });
    }

    const table = await model.Employees.create({
      Name: name,
      email: email,
      age: age,
      dob: dob,
      address: address,
      photo: photo,
    });
    if (table) {
      return res
        .status(201)
        .json({ success: true, data: table, message: "employee added" });
    } else {
      return res
        .status(201)
        .json({ success: true, error: "something went wrong, try again!" });
    }
  } catch (error) {
    return res
      .status(205)
      .json({ success: true, data: [], error: "try again" });
  }
};

exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.body;
    if (!id) {
      return res
        .status(205)
        .json({ success: false, error: "employee id is require" });
    }
    const data = await model.Employees.destroy({
      where: {
        id: id,
      },
    });
    if (data) {
      return res
        .status(201)
        .json({ success: true, data: data, message: "employee deleted" });
    }
  } catch (error) {
    return res
      .status(205)
      .json({ success: true, data: [], error: "try again" });
  }
};

exports.editEmployee = async (req, res) => {
  try {
    const { id, name, email, age, dob, address, photo } = req.body;
    if (!name) {
      return res.status(205).json({ success: false, error: "name is require" });
    } else if (!email) {
      return res
        .status(205)
        .json({ success: false, error: "email is require" });
    }
    if (!id) {
      return res
        .status(205)
        .json({ success: false, error: "employee id is require" });
    }
    const data = await model.Employees.update(
      {
        id: id,
        Name: name,
        email: email,
        age: age,
        dob: dob,
        address: address,
        photo: photo,
      },
      {
        where: {
          id: id,
        },
      }
    );
    if (data) {
      return res
        .status(201)
        .json({ success: true, data: data, message: "employee updated" });
    }
  } catch (error) {
    return res
      .status(205)
      .json({ success: true, data: [], error: "try again" });
  }
};
