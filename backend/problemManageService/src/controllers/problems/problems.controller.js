/* eslint-disable max-len */
const db = require('../../models');

const Category = db.category;
const Problem = db.problem;
const TestCase = db.testcase;
const LanguageSupport = db.languageSupport;
const {Op} = require('sequelize');
const {LANGUAGE_SUPPORT} = require('../../configs/problem.config');

exports.addProblem = async (req, res) => {
  const {
    problemName,
    description,
    hardLevel,
    statement,
    input,
    output,
    constraint,
    categories,
  } = req.body;

  const userId = req.userId;

  let problem;
  try {
    problem = await Problem.create({
      problemName: problemName,
      hardLevel: hardLevel,
      description: description,
      statement: statement,
      input: input,
      output: output,
      constraint: constraint,
      ownerId: userId,
    });

    if (!problem) {
      res.status(500).send({message: 'Có lỗi xảy ra trong quá trình thực hiện thao tác, vui lòng thử lại sau'});
    };

    for (let languageType of Object.values(LANGUAGE_SUPPORT)) {
      const language = await LanguageSupport.create({
        type: languageType,
        timeLimited: 2,
        memoryLimited: 128
      });
      problem.addLanguageSupport(language);
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while creating the problem.',
    });
    return;
  }

  const listWrongCate = [];
  if (categories) {
    for (const category of categories) {
      const cateObj = await Category.findOne({
        where: {
          type: category,
        },
      });
      if (cateObj) {
        problem.addCategory(cateObj);
      } else {
        listWrongCate.push(category);
      }
    }
  }

  if (listWrongCate.length !== 0) {
    res.status(200).send({
      listWrongCate: listWrongCate,
      message: 'Add successfully but these categories is not added',
    });
  } else {
    res.status(200).send({
      problemId: problem.id,
      message: 'Add problem successfully',
    });
  }
};

exports.editProblem = async (req, res) => {
  const {
    problemId,
    problemName,
    hardLevel,
    description,
    statement,
    input,
    output,
    constraint,
    categories,
    updatedAt,
  } = req.body;

  try {
    const problem = await Problem.findByPk(problemId);

    if (!problem) {
      res.status(404).send({
        message: `Problem with id ${problemId} not found.`,
      });
      return;
    }

    await problem.update({
      problemName: problemName,
      description: description,
      hardLevel: hardLevel,
      statement: statement,
      input: input,
      output: output,
      updatedAt: updatedAt,
      constraint: constraint,
    });

    // Xóa tất cả các categories hiện tại của problem
    await problem.setCategories([]);

    // Thêm các categories mới vào problem
    const listWrongCate = [];
    if (categories) {
      for (const category of categories) {
        const cateObj = await Category.findOne({
          where: {
            type: category,
          },
        });

        if (cateObj) {
          await problem.addCategory(cateObj);
        } else {
          listWrongCate.push(category);
        }
      }
    }

    if (listWrongCate.length !== 0) {
      res.status(200).send({
        listWrongCate: listWrongCate,
        message:
          'Problem updated successfully, but these categories were not added.',
      });
    } else {
      res.status(200).send({
        message: 'Problem updated successfully.',
      });
    }
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while updating the problem.',
    });
  }
};

exports.getProblem = async (req, res) => {
  const userId = req.userId;

  try {
    const problems = await Problem.findAll({
      where: {
        ownerId: userId,
      },
      include: [Category],
    });

    res.status(200).send({
      problems,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving problems.',
    });
  }
};

exports.getAllProblem = async (req, res) => {
  try {
    const problems = await Problem.findAll({
      include: [Category],
    });

    res.status(200).send({
      problems,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving problems.',
    });
  }
};

exports.getProblemByFilter = async (req, res) => {
  const hardLevel = req.query.hl;
  const categories = req.query.ct;

  const query = {where: {}, include: [Category]};
  if (hardLevel !== 'all') {
    query.where.hardLevel = hardLevel;
  }
  if (categories !== undefined) {
    query.include = [{model: Category, where: {type: categories}}];
  }

  try {
    const problems = await Problem.findAll(query);

    res.status(200).send({
      problems,
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving problems.',
    });
  }
};

exports.getAProblem = async (req, res) => {
  const problemId = req.params.id; // Lấy id từ tham số đường dẫn

  try {
    const problem = await Problem.findOne({
      where: {id: problemId},
      include: [Category],
    });

    if (!problem) {
      return res.status(404).send({
        message: `Problem with id ${problemId} not found.`,
      });
    }

    const testcases = await TestCase.findAll({
      where: {
        problemId: problemId,
        explaination: {
          [Op.ne]: '',
        },
      },
    });

    const listDemoTestcase = [];
    if (testcases) {
      for (const testcase of testcases) {
        listDemoTestcase.push(testcase.dataValues);
      }
      problem.demoTestcase = listDemoTestcase;
      console.log(problem);
    }

    let listLanguageSupport = await problem.getLanguageSupports();
    let langauges = [];
    for (let language of listLanguageSupport) {
      langauges.push({
        type : language.type,
        memoryLimited : language.memoryLimited,
        timeLimited : language.timeLimited
      });
    }

    res.status(200).send({
      problem: problem,
      listDemoTestcase: listDemoTestcase,
      listLanguageSupport: langauges
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while retrieving the problem.',
    });
  }
};

exports.deleteAProblem = async (req, res) => {
  const problemId = req.params.id;

  let problem;
  try {
    problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).send({
        message: `Problem with id ${problemId} not found.`,
      });
    }

    await problem.destroy();

    res.status(200).send({
      message: 'Delete problem successfully.',
    });
  } catch (error) {
    res.status(500).send({
      message: error.message || 'Some error occurred while delete problem.',
    });
  }
};

exports.addLanguage = async (req, res) => {
  const {problemId, type, memoryLimited, timeLimited} = req.body;

  try {
    // check problemId có tồn tại trong database không
    const problem = await Problem.findByPk(problemId);
    if (!problem) {
      return res.status(404).send({
        message: 'Problem not found.',
      });
    }

    // Tạo LanguageSupport mới
    const languageSupport = await db.languageSupport.create({
      type: type,
      memoryLimited: memoryLimited,
      timeLimited: timeLimited,
    });

    // Thêm LanguageSupport vào problem
    await problem.addLanguageSupport(languageSupport);

    res.status(200).send({
      message: 'Add language successfully.',
    });
  } catch (error) {
    res.status(500).send({
      message:
        error.message || 'Some error occurred while adding language support.',
    });
  }
};