const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
}, 
{
    timestamps: true
});

todoSchema.statics.getTodos = function (userId) {
    return this.find({ user: userId });
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
