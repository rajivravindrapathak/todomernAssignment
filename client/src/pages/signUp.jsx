import React, { useState } from "react";
import { Button, Col, Form, Layout, Row } from 'antd'
import axios from 'axios'
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
    const navigate = useNavigate()

    const [FormData, setFormData] = useState({
        username: '',
        email: '',
        mobile: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const handleRegister = async (FormData) => {
        try {
            const response = await axios.post(`http://localhost:2000/signup`, FormData)
            console.log('signUp successsful', response.data)
            navigate('/login')
        } catch (error) {
            console.log("signup not successful", error.response.data)
        }
    }


    const onFinish = () => {
        handleRegister(FormData)
    }

    return (
        <>
            <Layout>
                <Row className="modal-mainDiv">
                    <Col className="model-firstDiv"></Col>
                    <Col className={`model-secDiv`}
                        xs={24}
                        sm={24}
                        md={16}
                        lg={16}
                        xl={16}
                    >
                        <h1>SignUp</h1>
                        <hr />
                        <Form onFinish={onFinish} >
                            <Form.Item>
                                <input
                                    name="username"
                                    type="string"
                                    value={FormData.username}
                                    placeholder="username"
                                    onChange={handleChange}
                                />
                                <input
                                    name="email"
                                    type="email"
                                    value={FormData.email}
                                    placeholder="email"
                                    onChange={handleChange}
                                />
                                <input
                                    name="mobile"
                                    type="mobile"
                                    value={FormData.mobile}
                                    placeholder="mobile"
                                    onChange={handleChange}
                                /> 
                                <input
                                    name="password"
                                    type="password"
                                    value={FormData.password}
                                    placeholder="password"
                                    onChange={handleChange}
                                />
                            </Form.Item>
                            <Form.Item>
                                <Link to='/login' style={{ textAlign: 'center'}} >
                                    <Button type="primary">click here to login</Button>
                                </Link>
                            </Form.Item>
                            <Form.Item>
                                <Button htmlType='submit' type="primary">signUp</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Layout>
        </>
    )
}

export default SignUp;



