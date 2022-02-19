import React, { useContext, useEffect, useState } from 'react'
import {Link, Navigate, useLocation, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Container from 'react-bootstrap/esm/Container';
import { Helmet } from 'react-helmet-async';
import axios, { Axios } from 'axios';
import { Store } from '../Store';
import {toast} from 'react-toastify';
import { getError } from '../utils';

export const LoginScreen = () => {
  const navigate = useNavigate();
  const {search} = useLocation();
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  const redirect = redirectInUrl ?redirectInUrl:'/';

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const { state , dispatch : ctxDispatch} = useContext(Store)
  const {userInfo} = state;
  const onSubmithandler = async(e) =>{
      e.preventDefault();
      try{
        const {data} = await axios.post('/api/users/signin' , {
          email,password
        });
        console.log(data)
        ctxDispatch({type:'USER_SIGNIN' , payload : data });
        localStorage.setItem('userInfo' , JSON.stringify(data));
        navigate(redirect || '/');

      }
      catch(err){
        console.log(err);
        toast.error("Invalid email / password")
      }
  };

  useEffect(() => {
    if(userInfo){
      navigate(redirect)
    }
  }, [navigate,redirect,userInfo])
  return (
    <Container className="small-container">
      <Helmet>
        <title>Log in</title>
      </Helmet>
      <h1>Login</h1>
      <Form onSubmit={onSubmithandler}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" required onChange={ (e) => {setEmail(e.target.value)}}></Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control  required onChange={ (e) => {setPassword(e.target.value)}}></Form.Control>
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
