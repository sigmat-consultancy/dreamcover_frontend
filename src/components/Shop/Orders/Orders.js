import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Container,
        Table,
        TableBody,
        TableCell,
        TableContainer,
        TableRow,
        Paper } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import NoOrder from '../../../assets/NoOrder/NoOrder';
import styled from 'styled-components';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
  });
   
  export const Box = styled.div`
    padding: 20px 20px;
    background: grey;
    width:100%;
      bottom: 0;
    position: fixed;
    margin-top: auto;


  `
     
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
export default function Orders(props) {

    const classes = useStyles();

    const User = JSON.parse(localStorage.getItem("User"));
    const [ orders, setOrders ] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5001/getorder/${props.match.params.userId}`, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setOrders(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])

    const handleInvoice = (orderId) => {
        axios.get(`http://localhost:5001/invoice/${orderId}`, {
            responseType: 'blob',
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                const file = new Blob([response.data], {type: 'application/pdf'});

                //Build a URL from the file
                const fileURL = URL.createObjectURL(file);
                //Open the URL on new Window
                window.open(fileURL);

            }).catch(error => {
                console.log(error)
            })
    }

    return (
        <>
        <Container maxWidth="md">
            <h2><b>ORDERS</b></h2>
            <Button variant="outline-primary" href="/">Buy Products</Button>
            <hr />

            {orders.orderCount === 0 ? (
                <NoOrder />
            ) : (
                <>
                {!orders.length ? (
                    <>
                      <Loading />  
                    </>
                ) : (
                    <TableContainer component={Paper}>
                        <Table className={classes.table} size="small" aria-label="a dense table">
                            <TableBody>
                            {orders.map((order, index) => (
                                <TableRow>
                                    <TableCell><b>{index+1}</b></TableCell>
                                    <TableCell><b>{order.shipping_information.firstName} {order.shipping_information.lastName}</b></TableCell>
                                    <TableCell align="left"><b>{order.shipping_information.phone_number}</b></TableCell>
                                    <TableCell align="left"><b>{order.shipping_information.payment_method}</b></TableCell>
                                    <TableCell align="left"><Button variant="outline-primary" onClick={() => {handleInvoice(order._id)}}>Invoice</Button></TableCell>
                                    <TableCell align="left"><Button variant="outline-primary" href={`/Order/${order._id}`}>View Order</Button></TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
                </>
            )}
        </Container>
        <Footer /></>
    )
}
