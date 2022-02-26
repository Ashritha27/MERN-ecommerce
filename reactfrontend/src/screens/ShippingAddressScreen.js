import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export const ShippingAddressScreen = () => {
  const navigate =useNavigate();
  const {state ,dispatch: ctxDispatch} =  useContext(Store)
  const { 
    userInfo,
    cart : { shippingAddress} , } = state;

  const [fullname,setFullname] =  useState(shippingAddress.fullname ||'');
  const [address,setAddress] =  useState(shippingAddress.address || '');
  const [postalCode,setPostalCode] =  useState(shippingAddress.postalCode || '');
  const [city,setCity] =  useState(shippingAddress.city || '');
  const [country,setCountry] =  useState(shippingAddress.country || '');

  useEffect(() => {
    if(!userInfo){
      navigate('/signin?redirect=/shipping')
    }
  }, [userInfo , navigate])
  const onSubmit = (e) => {
    e.preventDefault();
    ctxDispatch({
      type:'SAVE_SHIPPING_ADDRESS',
      payload:{
        fullname,address,postalCode,city,country
      },
    });
    localStorage.setItem('shippingAddress' ,
    JSON.stringify({
      fullname,address,postalCode,city,country
    }))
    navigate('/payment')
  }


  return (
    <div>
      <Helmet>
        <title>Shipping address</title>
      </Helmet>
      <CheckoutSteps step1 step2 ></CheckoutSteps>
      <h1 className='my-3'>Shipping Address</h1>
      <div className="container small-container">
      <Form onSubmit={onSubmit}>
      <Form.Group className="mb-3" controlId="fullname">
        <Form.Label>Full Name</Form.Label>
        <Form.Control
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required>
        </Form.Control>

      </Form.Group>
      <Form.Group className="mb-3" controlId="address">
        <Form.Label>address</Form.Label>
        <Form.Control
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required>
        </Form.Control>
      </Form.Group>
      <Form.Group className="mb-3" controlId="city">
        <Form.Label>citycity</Form.Label>
        <Form.Control
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required>
        </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3" controlId="country">
        <Form.Label>country</Form.Label>
        <Form.Control
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required>
        </Form.Control>

      </Form.Group>
      <Form.Group className="mb-3" controlId="postalCode">
        <Form.Label>postal Code</Form.Label>
        <Form.Control
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required>
        </Form.Control>

      </Form.Group>
      <div>
        <Button variant="primary" type="submit">Continue</Button>
      </div>
      
    </Form>
    </div>
    
    </div>
  )
}
