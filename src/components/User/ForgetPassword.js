import React, { useState } from 'react';
import { Container, TextField, InputAdornment} from '@material-ui/core';
import { Button } from 'react-bootstrap';
import firebase from '../../firebase';
import { AccountCircle } from '@material-ui/icons';

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
export default function ForgetPassword() {

    const [email, setEmail] = useState("");

    const ResetPassword = (e) => {

        firebase.auth().sendPasswordResetEmail(email).then(function() {
          alert("Check your mail")
          window.location = ("/SignIn")
        }).catch(error => {
          console.log(error)
        });
      }

    return (
        <>
        <Container maxWidth="sm">
            <h2><b>Forget Password</b></h2>
            <TextField
                label="Email"
                name="email"
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                InputProps={{
                    startAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                    ),
                }}
            />
            <br />
            <br />
            <Button style={{ float: "right" }} onClick={ResetPassword} variant="outline-primary">Send Mail</Button>
        </Container>
        
        </>
    )
}
