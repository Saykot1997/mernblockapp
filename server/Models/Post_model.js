const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    desc: {
        type: String,
        required: true

    },
    photo: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: false
    },
    comments: [

        comment = {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            commentData: String
        }

    ]

},
    { timestamps: true }
);

module.exports = mongoose.model('Post', PostSchema)