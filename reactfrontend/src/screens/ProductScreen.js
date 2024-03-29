import axios from 'axios';
import { useContext, useEffect, useReducer } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/esm/ListGroup';
import Badge from 'react-bootstrap/esm/Badge';
import Card from 'react-bootstrap/esm/Card';



import {useNavigate, useParams} from 'react-router-dom'
import Rating from '../components/Rating';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';


const reducer = (state ,action) => {
    switch(action.type){
        case 'FETCH_REQUEST':
            return {...state ,loading:true};
        case 'FETCH_SUCCESS':
            return {...state , product : action.payload , loading:false}
        case 'FETCH_FAIL':
            return {...state,loading:false , error:action.payload};
        default:
            return state;

    }
}

function ProductScreen(){
    const navigate = useNavigate();
    const params = useParams();
    const {slug} = params;

    const [{ loading , error ,product} ,dispatch] =  useReducer((reducer),{
        product:[],
        loading:true,error: ''
    } )
    //const [products , setProducts] =  useState([]);
    useEffect(() => {
        const fetchData = async () => {

            dispatch({type:'FETCH_REQUEST' });
            try{
                const result = await axios.get(`/api/products/slug/${slug}`);
                dispatch({type:'FETCH_SUCCESS' , payload:result.data});
            }
            catch(err){
                dispatch({ type : 'FETCH_FAIL' , payload :getError(err)});
            }
            
            //setProducts(result.data);
        };
        fetchData();
    }, [slug]);
    
    const { state ,dispatch : cxtDispatch} = useContext(Store);
    const {cart} = state;

    const addToCartHandler = async() => {
        console.log(cart.cartItems)
        const itemExists  =cart.cartItems.find(x => x._id === product._id)
        const quantity = itemExists ? itemExists.quantity +1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if(data.countInStock < quantity){
            window.alert('Sorry. Produsct is out of stock');
            return;
        } 
        cxtDispatch({ type : 'CART_ADD_ITEM' , payload : {
            ...product,quantity 
        }})
        navigate('/cart');

    }
    return (
        loading ? ( <LoadingBox /> ) : error ? (
            (<MessageBox variant="danger" >{error}</MessageBox>)
        ) :
        (<div>
            <Row>
                <Col md={6}>
                    <img className='img-large' src={product.images} alt={product.name} ></img>
                </Col>
                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        <h1>{product.name}</h1>
                        </ListGroup.Item>
                        <ListGroup.Item>
                         <Rating ratings={product.rating} numReviews = {product.numReviews}></Rating>
                        </ListGroup.Item>
                        <ListGroup.Item> Price : {product.price}</ListGroup.Item>
                        <ListGroup.Item> Description : {product.description}</ListGroup.Item>

                    </ListGroup>

                </Col>
                <Col md={3}>
                    <Card>
                        <Card.Body>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Price:</Col>
                                        <Col>{product.price}</Col>
                                    </Row>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Row>
                                        <Col>Status:</Col>
                                        <Col>{product.countInStock > 0 ?
                                        <Badge bg="success">In stock</Badge> :
                                        <Badge bg="danger">Out of stock</Badge> }</Col>
                                    </Row>
                                </ListGroup.Item>

                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <div className='d-grid'>
                                            <Button variant='primary' onClick = {addToCartHandler}>
                                                Add to cart
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                )}


                            </ListGroup>
                        </Card.Body>
                    </Card>
                </Col>

            </Row>
        </div>)

    )

}


export default ProductScreen