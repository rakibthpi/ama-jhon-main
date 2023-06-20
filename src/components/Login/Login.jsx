import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Login = () => {
    const { loginUserEmail } = useContext(AuthContext)

    const [error, setError] = useState(null)

    const loginHandleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);

        if (password.length >= 8) {
            console.log(password.length);
            loginUserEmail(email, password)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                    setError("Success")
                    form.reset();

                })
                .case((error) => {
                    console.error(error);
                    setError('This is your wrong Password')
                })
        }
        else {
            setError('Please, Type your any 8 value')
        }

    }

    return (
        <div className='login_main-area'>
            <div className='container'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <h2>Login</h2>
                        <Form onSubmit={loginHandleSubmit} className='form_text py-5'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicBtn">
                                <Form.Control className='bg-primary text-white' type="submit" value="Login" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div>
                            <p>New to Ema-john? <NavLink to='/register'>Create New Account</NavLink></p>
                        </div>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div >
                            <p className='text-danger'>{error}</p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div >
    );
};

export default Login;