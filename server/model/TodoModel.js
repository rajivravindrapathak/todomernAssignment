const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema ({
    heading: {type: String, required: false},
})

const TodoModel = mongoose.model("newTodo", todoSchema)

module.exports = { TodoModel }           