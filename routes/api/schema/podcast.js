const { mongoose } = require('mongoose')

const podcastSchema = new mongoose.Schema({
    fileName: {
        type: String,
        require: true
    },
    trust: {
        type: Boolean,
        default: false,
    },
    audio: {
        type: Buffer,
        require: true
    },
    mimetype: {
        type: String,
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        require: true
    },
});

podcastSchema.query.trust = function () {
    return this.where({trust: true})
}

podcastSchema.statics.findByFileName = function (name) {
    if(name)
        return this.where({fileName: new RegExp(name, "i")}).trust().select('fileName');
    else
        return this.where().trust().select('fileName ownerId').populate("ownerId");
}

module.exports = mongoose.model('Podcast', podcastSchema);