const { mongoose } = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: {
        type: String,
        require: true
    },
    A: {
        type: String,
        require: true
    },
    B: {
        type: String,
        require: true
    },
    C: {
        type: String,
        require: true
    },
    D: {
        type: String,
        require: true
    },
    audio: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Podcast'
    }
})

questionSchema.statics.random = function () {
    return this.where()[[Math.random()]];
}

questionSchema.query.trust = function () {
    return this.where({trust: true})
}

module.exports = mongoose.model('Question', questionSchema);
