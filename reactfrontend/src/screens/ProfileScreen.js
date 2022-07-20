import axios from "axios";
import { useContext, useReducer, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

import { Helmet } from "react-helmet-async";
import { toast } from "react-toastify";
import { Store } from "../Store";
import { getError } from "../utils";

const reducer = (state,action) =>{
    switch(action.type){
        case 'UPDATE_REQUEST':
            return {...state,loadingUpdate:true};
        case 'UPDATE_SUCCESS':
            return {...state,loadingUpdate:false};
        case 'UPDATE_FAIL':
            return {...state,loadingUpdate:false}
        default:return state;
        
    }
}

 export default function ProfileScreen(){
    const {state , dispatch: ctxDisptch} =useContext(Store);
    const {userInfo } = state;
    const [name , setName] = useState(userInfo.name)
    const [email , setEmail] = useState(userInfo.email)
    const [password , setPassword] = useState('')
    const [confirmpassword , setConfirmpassword] = useState('')

    const [{loadingUpdate} ,dispatch] =useReducer(reducer , {
        loadingUpdate:false,
    })

    const submitHandler =async(e) =>{
        e.preventDefault();

        try{
            const {data} = await axios.put(
                '/api/users/profile',
                {
                    name,email,password
                },
                {
                    headers:{Authorization : `Bearer ${userInfo.token}`}
                }
            )

            dispatch({type:'UPDATE_SUCCESS'});
            ctxDisptch({type:'USER_SIGNIN' , payload:data});
            localStorage.setItem('userInfo' , JSON.stringify(data));
            toast.success('User details updated successfully');
        }
        catch(err){
            dispatch({
                type : 'UPDATE_FAIL'
            });
            toast.error(getError(err));
            console.log('fail')
        }
    }

    return (
        <div className="container small-container">
            <Helmet>
                <title>User Details</title>
            </Helmet>
            <h1 className="">User Profile</h1>
            <form onSubmit={submitHandler}>
                <Form.Group className="mb-3" controlId="name">
                    <Form.Label>name</Form.Label>
                    <Form.Control value={name} required onChange={(e) => setName(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control value={email} required onChange={(e) => setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={password} required onChange={(e) => setPassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control value={confirmpassword} required onChange={(e) => setConfirmpassword(e.target.value)}></Form.Control>
                </Form.Group>
                <Button type="submit">Update</Button>
            </form>

        </div>
    )
 }

