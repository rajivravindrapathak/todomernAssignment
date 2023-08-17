import React, { useEffect, useState }  from "react";
import { Button, Table, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import TodoForm from '../components/TodoForm'
import axios from 'axios'

const DashboardPage = () => {

    const [showTodoForm, setShowTodoForm] = useState()
    const [todo, setTodo] = useState([])
    const navigate = useNavigate()

    const getTodoData = async () => {
        const token = localStorage.getItem('token');

        if(!token) {
            return navigate('/login'); 
        }

        try {
            const response = await axios.get("http://localhost:8000/getuser-todo") 
            if(response.data.success) {
                setTodo(response.data.data)
            } else {
                message.error(response.data.message)
            }
        } catch (error) {
            console.log(error)
        }
    
    }

    useEffect(() => {
        getTodoData()
    }, [])

    const columns = [
        {
            title: "Heading",
            dataIndex: "heading" 
        },
    ]

    return ( 
        <>
            <h1>DashboardPage</h1>
            {/* <div>
                {
                    showTodoForm && showTodoForm.map((todo, index) => {
                        return  (
                                    <div key={index}>
                                        <p>{todo.heading}</p>
                                        <Button>delete</Button>
                                    </div>
                                )
                    })
                }
            </div> */}
            <Button
                onClick={() => setShowTodoForm(true)}
            > create todos 
            </Button>
            <Table 
                columns={columns}
                dataSource={todo}
            />

            {
                showTodoForm && (
                    <TodoForm
                        showTodoForm={true} 
                        setShowTodoForm={setShowTodoForm} 
                    />
                )
            }
        </>
     );
}
 
export default DashboardPage;