import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';

import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';
import { Store } from '../Store';

export const PaymentMethodScreen = () => {
    const navigate = useNavigate();
    const {state , dispatch:ctxDispatch} =  useContext(Store);

    const {
        cart:{shippingAddress , paymentMethod},
    } = state;

    const [paymentMethodName , setPaymentMethod] = useState(
        paymentMethod || 'Paypal'
    );

    const submitHandler = (e) => {
        e.preventDefault();
        ctxDispatch({ type:'SAVE_PAYMENT_METHOD' , payload: paymentMethodName });
        localStorage.setItem('paymentMethod' , paymentMethodName);
        navigate('/placeorder')
    }

    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    }, [shippingAddress,navigate])
   
  return (
    <div>
        <CheckoutSteps step1 step2 step3></CheckoutSteps>
        <div className='container small-container'>
            <Helmet>
                <title>Payment</title>
            </Helmet>
            <Form onSubmit={submitHandler}>
                <div className='mb-3'>
                    <Form.Check
                    type="radio"
                    id="Paypal"
                    label="Paypal"
                    value="Paypal"
                    checked={paymentMethodName==="Paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Form.Check
                    type="radio"
                    id="Stripe"
                    label="Stripe"
                    value="Stripe"
                    checked={paymentMethodName==="Stripe"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <Button type="submit">Continue</Button>
                </div>

            </Form>
        </div>
    </div>
  )
}

export default PaymentMethodScreen;