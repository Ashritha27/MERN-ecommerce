import logo from './logo.svg';
import './App.css';
import data from './data';
import {BrowserRouter, Route, Routes ,Link} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'


import Container from 'react-bootstrap/Container'
import {LinkContainer} from 'react-router-bootstrap'
import Badge from 'react-bootstrap/esm/Badge';
import { Store } from './Store';
import { useContext } from 'react';
import CartScreen from './screens/CartScreen';
import { ShippingAddressScreen } from './screens/ShippingAddressScreen';
import { LoginScreen } from './screens/LoginScreen';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import SignupScreen from './screens/SignupScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import Button from 'react-bootstrap/esm/Button';

function App() {
  const { state ,dispatch: ctxDispatch} = useContext(Store);
  const { cart ,userInfo } = state;

  const signoutHandler = () => {
    ctxDispatch({type:'USER_SIGNOUT'});
    localStorage.removeItem('userInfo');
    localStorage.removeItem('shippingAddress')
    localStorage.removeItem('paymentMethod')
    window.location.href='/signin'
  }

  const [sidebarIsOpen , setSidebarIsOpen ] = useState(false)
  return (
    <BrowserRouter>
    <div className={sidebarIsOpen ? 'd-flex flex-column site-container active-cont' : 'd-flex flex-column site-container'}>
      <ToastContainer position="bottom-center" limit={1}></ToastContainer>
      <header>        
        <Navbar bg="dark" variant="dark">
          <Container >
            <Button variant="dark" onClick={()=> setSidebarIsOpen(!sidebarIsOpen)}>
              <i className ="fas fas-bars"></i>
            </Button>
            <LinkContainer to='/'>
              <Navbar.Brand>Ecommerce</Navbar.Brand>
            </LinkContainer>
            <Nav className="me-auto">
              <Link to="/cart" className='nav-link'>
                Cart {cart.cartItems.length > 0 && (
                  <Badge pill bg="danger">
                    {cart.cartItems.reduce((a,c) => a+c.quantity , 0)}
                  </Badge>
                )}
              </Link>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id="basic-nav-dropdown">
                  <LinkContainer to="/profile">
                    <NavDropdown.Item>User Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/orderhistory">
                    <NavDropdown.Item>Order History</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Divider />
                  <Link className='dropdown-item'
                  to='#signout'
                  onClick={signoutHandler}>Sign out</Link>
                </NavDropdown>
              ) : (
                <Link className='nav-link' to='signin'>Sign In</Link>
              )}
            </Nav>
          </Container>
        </Navbar>
        </header>
       <div className={sidebarIsOpen ? "" : ""}></div>
        <main>
      <Container className='mt-3'>
        <Routes>
          <Route path="/product/:slug" element={<ProductScreen />} />
          <Route path="/" element={<HomeScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/shipping" element={<ShippingAddressScreen />} />
          <Route path="/signin" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} /> 
          <Route path="/payment" element={<PaymentMethodScreen />} /> 
          <Route path="/placeorder" element={<PlaceOrderScreen />} /> 
          <Route path="/order/:id" element={<OrderScreen />}></Route>
          <Route
                path="/orderhistory"
                element={<OrderHistoryScreen />}
              ></Route>


        </Routes>
       
        </Container>
        </main>
        <footer>
          <div className='text-center'>All rights reserved</div>
        </footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
