const { mongoose } = require('mongoose')

const userQuestionSchema = new mongoose.Schema({
    user : {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },
    question: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: 'Question'
    },
});

module.exports = mongoose.model('UserQuestion', userQuestionSchema);