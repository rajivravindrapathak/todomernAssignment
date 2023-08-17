import { Button, Form, Modal } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const NoteForm = ({ showTodoForm, setShowTodoForm  }) => {

    const navigate = useNavigate()

    const [FormData, setFormData] = useState({
        heading: '',
    })

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value 
        })
    }

    const onFinish = async () => {
        try {

            const dataToSend = { ...FormData }
            const response = await axios.post(`http://localhost:2000/user-todo`, dataToSend)
            console.log('Response from backend:', response.data);
            
        } catch (error) {
            console.log('Error:', error.response.data)
        }
    }

    return ( 
        <>
            <p>NoteForm</p>
            <Modal 
                width={800}
                title='create notes' 
                visible={showTodoForm}
                onCancel={() => setShowTodoForm(false)}
                footer={false}
            >
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item label='heading:' name='heading'>
                        <input 
                            type="text"
                            name='heading'
                            value={FormData.heading} 
                            onChange={handleChange}

                        />  
                    </Form.Item>
                    <div>
                        <Form.Item>
                            <Button htmlType="submit" type="primary">save</Button>
                        </Form.Item>
                    </div>
                </Form>
            </Modal>
        </>
     );
}

export default NoteForm;