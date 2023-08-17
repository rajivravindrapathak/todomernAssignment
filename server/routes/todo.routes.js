const { Router } = require("express")
const bcryptjs = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const {TodoModel} = require("../model/TodoModel") 

const TodoController = Router()

// todo api for getting data
TodoController.get("/getuser-todo", async (req, res) => {
    const { user_id } = req.body
    const gettodo = await TodoModel.findOne({_id: user_id })
    const { heading } = gettodo
    res.status(200).send({ msg: 'todo get successfully', heading })
})

// todo api for posting data
TodoController.post("/user-todo", async (req, res) => {
    const {
        heading,  
    } = req.body;
    const newtodo = new TodoModel({
        heading,
    })
    try {
        await newtodo.save()
        res.status(200).send({ msg: "newtodo created", newtodo })
        
    } catch(err) {
        res.status(404).send({ msg: "something went wrong", err })
    }
})

// todo api for deleting specific data 
TodoController.delete("/todo/:todoId", async (req, res) => {
    const {todoId} = req.params
    const deleteTodo = await TodoModel.findOneAndDelete({_id: todoId, userId: req.body.userId})
    if(deleteTodo) {
        res.send({ msg: "todo deleted", deleteTodo })
    } else {
        res.send({ msg: "todo couldn't deleted" })
    }
})

// todo api for updating/editing single data from userinterface and database also 
TodoController.patch("/todo/:todoId", async (req, res) => {
    const {todoId} = req.params
    const updateTodo = await TodoModel.findOneAndUpdate({_id: todoId, userId: req.body.userId}, req.body)
    if(updateTodo) {
        res.send({ msg: "todo updated", updateTodo})
    } else {
        res.send({ msg: "todo couldn't updated"})
    }
})

module.exports = { TodoController }