import React, { useContext, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../context/UserContext';

const Register = () => {
    const { signupCreate } = useContext(AuthContext)
    const [error, setError] = useState(null)

    const registerHandleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const cpassword = form.cpassword.value;
        if (password !== cpassword) {
            console.log("password is Wrong");
            setError("Your Password did not match!");
        }
        else if (password.length >= 8) {
            setError("Please, Type your any 8 value");
        }
        else {
            signupCreate(email, password)
                .then((result) => {
                    const user = result.user;
                    console.log(user);
                    form.reset();
                    setError("Success");
                })
                .catch((error) => {
                    console.error(error);
                    setError("Password is Error");
                })
        }
    }
    return (
        <div className='login_main-area'>
            <div className='container'>
                <Row>
                    <Col md={{ span: 6, offset: 3 }}>
                        <Form onSubmit={registerHandleSubmit} className='form_text py-5'>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" name='email' placeholder="Enter email" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" name="password" placeholder="Password" required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" name="cpassword" placeholder="password" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Check type="checkbox" label="Check me out" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicBtn">
                                <Form.Control className='bg-primary text-white' type="submit" value="Sign Up" />
                            </Form.Group>
                        </Form>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div >
                            <p>New to Ema-john? <NavLink to='/login'>Login</NavLink></p>
                        </div>
                    </Col>
                    <Col md={{ span: 6, offset: 3 }}>
                        <div >
                            {
                                error ? <p className='text-Danger'>{error}</p> :
                                    <p></p>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default Register;