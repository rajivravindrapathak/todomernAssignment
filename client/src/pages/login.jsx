import { Button, Col, Form, Layout, Row } from "antd";
import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {

    const navigate = useNavigate()

    const [FormData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        setFormData({
            ...FormData,
            [e.target.name]: e.target.value
        })
    }

    const handleLogin = async (FormData) => {
        try {
            const response = await axios.post(`http://localhost:2000/login`, FormData)
            console.log('login successsful', response.data)
            navigate('/')
        } catch (error) {
            console.log("login not successful", error.response.data)
            navigate('/signup')
        }
    }


    const onFinish = () => {
        handleLogin(FormData)
    }


    return ( 
        <>
              <Layout>
                <Row className="modal-mainDiv" gutter={16}>
                    <Col className="model-firstDiv"></Col>
                    <Col className={`model-secDiv`}   // ${loading ? "blur" : ""}
                        xs={24}
                        sm={24}
                        md={16}
                        lg={16}
                        xl={16}
                    >
                        <h1>Login page</h1>
                        <hr />
                        <Form className="FormDiv" onFinish={onFinish}>
                            <Form.Item name='email'>
                                <input 
                                    type="email" 
                                    name="email"
                                    value={FormData.email}
                                    placeholder="Enter Your Email" 
                                    onChange={handleChange}
                                    // required 
                                />
                                <input 
                                    type="password" 
                                    name="password"
                                    value={FormData.password}
                                    placeholder="Enter your password" 
                                    onChange={handleChange}
                                    // required 
                                />
                            </Form.Item>
                            <div className="btn-div">
                                <Form.Item>
                                    <Link to='/signup' style={{ textAlign: 'center' }} >
                                        <Button type="primary">click here to signUp</Button>
                                    </Link>
                                </Form.Item>
                                <Form.Item> 
                                    <Button htmlType="submit" type="primary">Login</Button>
                                </Form.Item>
                            </div>
                        </Form>
                    </Col>
                </Row>  
            </Layout>
        </>
     );
}
 
export default LoginPage;