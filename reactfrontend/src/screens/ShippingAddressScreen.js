import React, { useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { Helmet } from 'react-helmet-async';

export const ShippingAddressScreen = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  }
  const [fullname,setFullname] =  useState('');
  const [address,setAddress] =  useState('');
  const [postalCode,setPostalCode] =  useState('');
  const [city,setCity] =  useState('');
  const [country,setCountry] =  useState('');




  return (
    <div>
      <Helmet>
        <title>Shipping address</title>
      </Helmet>
      <h1 className='my-3'>Shipping Address</h1>
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
  )
}
