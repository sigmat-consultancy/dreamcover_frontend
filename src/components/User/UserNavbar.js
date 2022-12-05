import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Nav, Navbar, Container, Button } from 'react-bootstrap'
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
  

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    }
  }));

const UserNavbar = () => {
    const classes = useStyles();

    const [ products, setProducts ] = useState([]);

    var [myOptions, setMyOptions] = useState([])

    const User = JSON.parse(localStorage.getItem("User"));
   const searchFromAPI = (val) => {


    axios.get("http://localhost:5001/showProducts")
    .then(response => {
        console.log(response.data)
    
     for(var i = 0; i < response.data.length; i++) {
        if(val == response.data[i].title){
    
            products.push(val)

    }
      }   
    }).catch(err => {
        console.log(err)
    })


   }
    const getDataFromAPI = (val) => {
        myOptions= []
        console.log("Options Fetched from API")
        axios.get("http://localhost:5001/showProducts")
        .then(response => {
            console.log(response.data)
            for (var i = 0; i < response.data.length; i++) {
                myOptions.push(response.data[i].title)
                products.push(response.data[i].title)
              }
              setMyOptions(myOptions)
        }).catch(err => {
            console.log(err)
        })
    
      }
   
   
    const LogOut = () => {
        localStorage.removeItem("User")
        window.location = "/SignIn"
    }

    return (
        <div className={classes.root}>
            <Navbar bg="dark" variant="dark" expand="sm" sticky="bottom">
                <Container>
                    <Navbar.Brand href="#home"><img src="https://firebasestorage.googleapis.com/v0/b/dreamcover-28a23.appspot.com/o/logo-removebg-preview.png?alt=media&token=8ea173c5-cd86-4b94-98ed-8a3b618a128b" height={70} width={70} /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        {User ? (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Products</Nav.Link>
                                    <Nav.Link href="/Cart">Cart</Nav.Link>  
                                    <Nav.Link href={`/Orders/${User.userId}`}>Orders</Nav.Link>  
                              
                                    <div style={{ marginLeft: '10%', marginTop: '0px' }}>
      <Autocomplete
        style={{ width: 400 }}
        freeSolo
        autoComplete
        autoHighlight
        options={myOptions}
        renderInput={(params) => (
          <TextField {...params}
            onChange={getDataFromAPI}
            variant="outlined"
            label="Search Box"
          />
        )}
      />
    </div>
                                </Nav>
                                    <Button variant="outline-primary" onClick={LogOut}>Sign Out</Button>
                            </>
                        ) : (
                            <>
                                <Nav className="mr-auto">
                                    <Nav.Link href="/">Products</Nav.Link>
                                </Nav>
                                    <Button variant="outline-primary" href={"/SignIn"} style={{ marginRight: "10px"}}>Log In</Button>
                                    <Button variant="outline-primary" href={"/SignUp"} style={{ marginRight: "10px"}}>Sign Up</Button>
                                    <Button variant="outline-primary" href={"/admin/SignIn"}>Admin Login</Button>
                            </>
                        )}
                        
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <br />
            <br />
        </div>
    )
}

export default UserNavbar