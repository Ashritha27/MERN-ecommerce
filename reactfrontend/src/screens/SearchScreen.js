import axios from 'axios'
import React, { useEffect, useState ,useReducer} from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getError } from '../utils'

import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import {Link} from 'react-router-dom'


const reducer = (state , action) =>{
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state , loading:true}
        case 'FETCH_SUCCESS':
            return {
                ...state,
                products:action.payload.products,
                page:action.payload.page,
                pages:action.payload.pages,
                countProducts:action.payload.countProducts,
                loading:false
            }
        case 'FETCH_FAIL':
            return {...state , loading:false,error:action.payload}
        default:
            return state;
    }
}

const prices = [
    {
        name : '$1 to $50',
        value:'1-50'
    },
    {
        name : '$51 to $200',
        value:'51-200'
    },
    {
        name : '$201 to $1000',
        value:'201-1000'
    }
]
export default function SearchScreen(){
    const navigate = useNavigate();
    const {search} = useLocation();
    const sp = new URLSearchParams(search);
    const category = sp.get('category') || 'all';
    const query = sp.get('query') || 'all';
    const price = sp.get('price') || 'all';
    const rating = sp.get('rating') || 'all';
    const order = sp.get('order') || 'newest';
    const page = sp.get('page') || 1;

    const [{loading , error , products , pages,countProducts} ,dispatch] = useReducer(
        reducer , {
            loading:true,
            error:''
        }
    )

    useEffect(()=>{
        const fetchData = async() => {
            try{
                const {data} = await axios.get(
                    `/api/products/search?page=${page}&query=${query}&category=${category}&price=${price}&rating=${rating}&order=${order}`
                )
                dispatch({type:'FETCH_SUCCESS' , payload:data})

            }
            catch(err){
                dispatch({
                    type:'FETCH_FAIL',
                    payload:getError(err)
                })
            }
        }
        fetchData();
    },[category,error,order,page,price,query,rating])

    const [categories ,setCategories] = useState([]);
    useEffect(()=>{
        const fetchCategories = async() => {
            try{
                const { data } = await axios.get(`/api/products/categories`)
                setCategories(data);

            }
            catch(err){
                toast.error(getError(err));
            }
        }
        fetchCategories();
    } , [dispatch]);
    const getFilterUrl = (filter) =>{
        const filterPage = filter.page || page;
        const filterCategory = filter.category || category;
        const filterQuery = filter.query || query;
        const filterRating = filter.rating || rating;
        const filterPrice = filter.price || price;
        const filterOrder = filter.order || order;
        return `/search?category=${filterCategory}&query=${filterQuery}&price=${filterPrice}&rating=${filterRating}&order=${filterOrder}&page=${filterPage}`
    }
    return (
        <div>
            <Helmet>
                Search Products
            </Helmet>
            <Row>
                <Col md={3}>
                    
                    <div>
                    <h3>Departmentt</h3>
                        <ul>
                           <li>
                            <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl({category:'all'})}>
                                Any
                            </Link>
                            </li> 
                            {categories.map((c)=>(
                                <li key={c}>
                                    <Link className={c===category ? 'text-bold':''}
                                    to={getFilterUrl({category : c})}>{c}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                    <h3>Price</h3>
                        <ul>
                           <li>
                            <Link className={'all' === category ? 'text-bold' : ''} to={getFilterUrl({price:'all'})}>
                                Any
                            </Link>
                            </li> 
                            {prices.map((c)=>(
                                <li key={c}>
                                    <Link className={c.value===price ? 'text-bold':''}
                                    to={getFilterUrl({price : c.value})}>{c.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                   
                </Col>
            </Row>

        </div>
    )
}