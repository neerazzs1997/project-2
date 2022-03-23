const { count } = require("console");
const CollegeModel = require("../models/CollegeModel");

const createcollege = async function (req, res) {
  try {
    let data = req.body;
    const { name, fullName, logoLink } = data;
    if (!name) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide name " });
    }
    if (!fullName) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide fullname " });
    }
    if (!logoLink) {
      return res
        .status(400)
        .send({ status: false, msg: "please provide logoLink " });
    }

    if (Object.keys(data).length !== 0) {
      let savedData = await CollegeModel.create(data);
      return res.status(201).send({ msg: savedData });
    } else return res.status(400).send({ msg: "BAD REQUEST" });
  } catch (err) {
    console.log("This is the error :", err.message);
    return res.status(500).send({ msg: "Error", error: err.message });
  }
};

module.exports.createcollege = createcollege;
