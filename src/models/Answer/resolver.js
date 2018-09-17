const moment = require('moment');
const QuestionModel = require('../Question/QuestionModel');
const UserModel = require('../User/UserModel');
const AnswerModel = require('./AnswerModel');

module.exports = {
  Query: {
    answersByQuestionId: (_, { questionId }) => {
      return AnswerModel.find({ questionId }).exec();
    }
  },
  Mutation: {
    postAnswer: (_, { answer }, context) => {
      const newAnswer = Object.assign(new AnswerModel(), answer, { userId: context.user._id, created: moment().utc().format() });
      return newAnswer.save();
    },
    saveAnswer: async (_, { answer }, context) => {
      const existingAnswer = await AnswerModel.findById(answer._id).exec();
      if (existingAnswer) {
        Object.assign(existingAnswer, { content: answer.content });
        return existingAnswer.save();
      }

      return null;
    },
    deleteAnswer: async (_, { answerId }) => {
      await AnswerModel.deleteOne({ _id: answerId }).exec();
      return { _id: answerId };
    },
  },
  Answer: {
    question: (answer, args, context) => {
      return QuestionModel.findById(answer.questionId).exec();
    },
    user: (answer, args, context) => {
      return UserModel.findById(answer.userId).exec();
    }
  }
};
