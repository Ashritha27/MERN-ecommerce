import  Button  from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card'
import Rating from './Rating';

function Product(props){
    const {product} = props;
    return (
    <Card  className="product">
        <Link to={`/product/${product.slug}`} >
        <img src={product.images} alt={product.name}  className="card-img-top"/>
        </Link>
        <Card.Body>
            <Link to={`/product/${product.slug}`} >
            <p>{product.name}</p>
        </Link>
        <Rating ratings={product.rating} numReviews = {product.numReviews}></Rating>
        <Card.Text>${product.price}</Card.Text>
        <Button>Add to cart</Button> 
        </Card.Body>
        
    </Card>
  )
}

export default Product;