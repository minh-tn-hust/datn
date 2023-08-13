/* eslint-disable max-len */
const db = require('../../models');

const Problem = db.Problem;

exports.updateLanguageSupport = async (req, res) => {
  const {problemId, languageType, timeLimited, memoryLimited} = req.body;
  try {
    const problem = await Problem.findByPk(problemId);

    if (!problem) {
      res.status(404).send({message: 'Không tìm thấy đề bài này trong cơ sở dữ liệu'});
      return;
    }

    const listLanguageSupport = await problem.getLanguageSupports();

    for (const languageSupport of listLanguageSupport) {
      if (languageSupport.dataValues.languageType == languageType) {
        await languageSupport.update({
          timeLimited: timeLimited,
          memoryLimited: memoryLimited,
        });
        res.status(200).send({message: 'Cập nhật thành công'});
        return;
      }
    };

    res.status(404).send({message: 'Không tìm thầy ngôn ngữ được hỗ trợ'});
    return;
  } catch (error) {
    console.log(error);
    res.status(500).send({message: 'Có lỗi xảy ra trong quá trình thực hiện thao tác, vui lòng thử lại sau'});
  }
};

exports.getAllLanguageSupport = async (req, res) => {
  const {problemId} = req.body;
  try {
    const problem = await Problem.findByPk(problemId);

    if (!problem) {
      res.status(404).send({message: 'Không tìm thấy đề bài được yêu cầu, vui lòng thử lại sau'});
    }

    const listLanguageSupport = await problem.getLanguageSupports();
    const responseData = [];
    for (const languageSupport of listLanguageSupport) {
      responseData.push({
        type: languageSupport.dataValues.type,
        memoryLimited: languageSupport.dataValues.memoryLimited,
        timeLimited: languageSupport.dataValues.timeLimited,
      });
    };

    res.status(200).send({listLanguageSupport: responseData});
    return;
  } catch (error) {
    res.status(500).send({message: 'Có lỗi xảy ra trong quá thực hiện thao tác, vui lòng thử lại sau'});
  }
};

