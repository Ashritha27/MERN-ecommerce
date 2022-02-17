import React from 'react'
import {Link, useLocation} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';


export const LoginScreen = () => {
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ?redirectInUrl:'/';
  return (
    <Container className="small-container">
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <h1>Login</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control  required></Form.Control>
        </Form.Group>
        <div className="mb-3" >
          <Button type="submit">Login</Button>
        </div>
        <div className="mb-3">
          New customer ? {' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your account</Link>
        </div>
      </Form>
    </Container>
  )
}
