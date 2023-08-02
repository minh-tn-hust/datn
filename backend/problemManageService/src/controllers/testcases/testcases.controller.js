const db = require("../../models");
const upload = require("../../middlewares/uploadFile");
const e = require("express");

const Testcase = db.testcase;
const Problem = db.problem;
const TestcaseFile = db.uploadTestcaseFile;

exports.uploadTestcaseFile = async function (req, res) {
  upload.single("file")(req, res, async (error) => {
    if (error) {
      console.error(error);
      return res
        .status(400)
        .json({ message: "Error uploading, please try again later" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file was uploaded" });
    }

    try {
      const fileData = {
        filename: req.file.filename,
        originalFile: req.file.originalname,
        mimetype: req.file.mimetype,
        path: req.file.path,
      };
      console.log(JSON.stringify(req.file));

      let createdFile = await TestcaseFile.create(fileData);
      return res
        .status(200)
        .json({ message: "File uploaded successfully!", file: createdFile });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Failed to upload file!", error: error.message });
    }
  });
};

exports.editTestcaseFile = async function (req, res) {};

exports.addTestcase = async function (req, res) {
  const { problemId, input, output, explaination } = req.body;

  try {
    // check problemId có tồn tại trong database không
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).send({
        message: "Problem not found.",
      });
    }

    // Tạo TestCase mới
    const testcase = await Testcase.create({
      input: input,
      output: output,
      explaination: explaination,
      problemId: problemId,
    });

    // Thêm Testcase vào problem
    await problem.addTestcase(testcase);

    res.status(200).send({
      message: "Add testcase successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while adding testcase.",
    });
  }
};

exports.editTestcase = async function (req, res) {
  const { testcaseId, input, output, explaination } = req.body;

  try {
    const testcase = await Testcase.findByPk(testcaseId);
    if (!testcase) {
      return res.status(404).send({
        message: `Testcase with id ${testcaseId} not found.`,
      });
    }

    await testcase.update({
      input: input,
      output: output,
      explaination: explaination,
    });

    res.status(200).send({
      message: "Update testcase successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while updating testcase.",
    });
  }
};

exports.getAllTestcases = async (req, res) => {
  const problemId = req.params.id;

  try {
    const testcases = await Testcase.findAll({
      where: { problemId: problemId },
    });

    res.status(200).send({
      testcases,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || "Some error occurred while retrieving testcases.",
    });
  }
};

exports.deleteTestcase = async (req, res) => {
  const testcaseId = req.params.id;

  try {
    const testcase = await Testcase.findByPk(testcaseId);
    if (!testcase) {
      return res.status(404).send({
        message: `Testcase with id ${testcaseId} not found.`,
      });
    }

    await testcase.destroy();

    res.status(200).send({
      message: "Delete testcase successfully.",
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while deleting testcase.",
    });
  }
};
