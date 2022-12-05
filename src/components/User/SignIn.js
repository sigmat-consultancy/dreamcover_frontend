import React, { useState } from 'react';
import { Container,
        TextField,
        Grid,
        Hidden } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import firebase from '../../firebase';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import UserLogin from '../../assets/UserLogin/UserLogin';
import styled from 'styled-components';
   
export const Box = styled.div`
  padding: 20px 20px;
  background: black;
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
export default function SignIn() {
    const history = useHistory();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(data.email,data.password)
            .then((user) => {
                if(!user.user.emailVerified){
                    alert("Kindly Verify your Email")
                }

                if(user.user.emailVerified) {
                    axios.post("http://localhost:5001/SignIn", data,{
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    ).then(res => {
                        
                    localStorage.setItem("User", JSON.stringify(res.data));
                 
                  window.location = ('/')
                    })
                }
            }).catch(error => {
                console.log(error)
                alert(error.code.split('/')[1])
            })
    };

    return (
        <>
        <Grid container spacing={0} style={{ height: "79vh"}}>
            <Hidden xsDown>
                <Grid item sm={5} md={6} lg={6} >
                    <UserLogin />
                </Grid>
            </Hidden>
            <Grid item xs={12} sm={7} md={6} lg={6} >
                <Container maxWidth="sm">
                    <br />
                    <br />
                    <br />
                    <h2><b>Login</b></h2>
                    <br />
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Email"
                            fullWidth
                            name="email"
                            variant="outlined" 
                            value={data.email}
                            onChange={(e) => setData({ ...data, "email": e.target.value })}
                        />
                        <br />
                        <br />
                        <TextField 
                            type="password"
                            label="Password"
                            fullWidth
                            name="password"
                            variant="outlined" 
                            value={data.password}
                            onChange={(e) => setData({ ...data, "password": e.target.value })}
                        />
                        <br />
                        <br />
                        <Button variant="primary" type="submit" block>
                            Log In
                        </Button>
                    </form>
                    <br />
                    <a href="/ForgetPassword">Forget Password?</a>
                    <a href="/SignUp" style={{ float: 'right' }}>Don't have an account? Sign Up</a>
                </Container>
            </Grid>
        </Grid>
        <Footer /></>
    )
}
