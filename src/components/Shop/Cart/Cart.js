import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import EmptyCart from '../../../assets/EmptyCart/EmptyCart';
import './Cart.css';
import styled from 'styled-components';
   
export const Box = styled.div`
  padding: 20px 20px;
  background: grey;
  position: relative;
  bottom: 0;
  width: 100%;
  
   
  @media (max-width: 1000px) {
    padding: 70px 30px;
  }
`;
   
export const Containe = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
    /* background: red; */
`
   
export const Column = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  margin-left: 60px;
`;
   
export const Row = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 
                         minmax(185px, 1fr));
  grid-gap: 20px;
   
  @media (max-width: 1000px) {
    grid-template-columns: repeat(auto-fill, 
                           minmax(200px, 1fr));
  }
`;
   
export const FooterLink = styled.a`
  color: #fff;
  margin-bottom: 20px;
  font-size: 18px;
  text-decoration: none;
   
  &:hover {
      color: black;
      transition: 200ms ease-in;
  }
`;
   
export const Heading = styled.p`
  font-size: 24px;
  color: #fff;
  margin-bottom: 40px;
  font-weight: bold;
`;
  
export const Footer = () => {
  return (
    <Box>
    
      <Containe>
        <Row>
          <Column>
            <Heading>About Us</Heading>
            <FooterLink href="/about">Aim</FooterLink>
            <FooterLink href="/about">Vision</FooterLink>
            <FooterLink href="/faq">FAQ</FooterLink>
          </Column>
          <Column>
            
          </Column>
          <Column>
           
          </Column>
          <Column>
            <Heading>Social Media</Heading>
            <FooterLink href="#">
                  Facebook
             
            </FooterLink>
            <FooterLink href="https://www.instagram.com/dream_cover_2023/">
                    Instagram
            
            </FooterLink>
            <FooterLink href="https://twitter.com/Dreamcover_2023">
                  Twitter
             
            </FooterLink>
        
          </Column>
        </Row>
      </Containe>
    </Box>
  );
};
export default function Cart() {

    const User = JSON.parse(localStorage.getItem("User"));
    const [ cart, setCart ] = useState();

    useEffect(() => {
        axios.get("http://localhost:5001/cart", {
            headers: {
                "x-access-token": User.accessToken,
                "userId": User.userId
            }}).then(response => {
                setCart(response.data.cart)
            }).catch(error => {
                console.log(error)
            })
    }, [cart])

const DecrementItem = ()=>{



}
const IncrementItem = ()=>{


}
    const DeleteItemFromCart = (item) => {
        axios.post("http://localhost:5001/deleteItemFromCart", {userId: User.userId, productId: item.productId}, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                window.location = '/Cart'
            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
        <Container maxWidth="md">
            <h2><b>SHOPPING CART</b></h2>
            <hr />
            {!cart ? (
                <Loading />
            ) : (
                <>
                    { cart.items.length === 0 ? (
                        <>
                            <Button variant="outline-primary" href="/" style={{ float: "right"}}>Buy Products</Button>
                            <EmptyCart />
                        </>
                    ) : (
                        <>
                            <br />
                            <br />
                            <div className="shopping-cart">
                                {cart.items.map((item) => (
                                    <>
                                        <div className="cart-column-labels">
                                            <label className="cart-product-image">Image</label>
                                            <label className="cart-product-details">Product</label>
                                            <label className="cart-product-price">Price</label>
                                            <label className="cart-product-quantity">Quantity</label>
                                            <label className="cart-product-removal">Remove</label>
                                            <label className="cart-product-line-price">Total</label>
                                        </div>
                                        <div className="cart-product">
                                            <div className="cart-product-image">
                                                <img src={item.imageURL} alt={item.productTitle} />
                                            </div>
                                            <div className="cart-product-details">
                                                <div className="cart-product-title"><b>{item.productTitle}</b></div>
                                                <p className="cart-product-description">{item.description}</p>
                                            </div>

          
                                            <div className="cart-product-price">
                                                
                                            <button onClick={IncrementItem} tabIndex="0">
          +1
        </button>          
                                               <span> {item.price}</span>
                                                
                                                
                                                <button onClick={DecrementItem} tabIndex="0">
          -1
        </button>           
                                                </div>
          
                                            <div className="cart-product-quantity">{item.quantity}</div>
                                            <div className="cart-product-removal">
                                                <Button className="cart-remove-product" onClick={() => {DeleteItemFromCart(item)}}>
                                                    Remove
                                                </Button>
                                            </div>
                                            <div className="cart-product-line-price">{(item.quantity)*(item.price)}</div>
                                        </div>
                                    </>
                                ))}
                            </div>
                            <br />
                            <Button variant="outline-primary" href="/ShippingInfo" style={{ float: "right"}}>Check Out</Button>
                            <br />
                            <br />
                        </>
                    )}
                </>
            )}
            <br />
            <br />
            <br />
        </Container>
        <Footer />
        </>
    )
}
