import React, { useEffect, useState } from 'react';
import { Container,
        DialogActions,
        DialogContent,
        DialogContentText,
        Dialog } from '@material-ui/core';
import { Button } from 'react-bootstrap';
import Loading from '../../../assets/Loading/Loading';
import Cart from '../../../assets/AddToCart/Cart';
import axios from 'axios';
import './SingleProduct.css'


export default function SingleProduct(props) {
    const [counter, setCounter] = useState(1);
    const incrementCounter = () => setCounter(counter + 1);
    let decrementCounter = () => setCounter(counter - 1);
    if(counter<=1) {
      decrementCounter = () => setCounter(1);
    }
  
    const [ product, setProduct ] = useState();
    const [open, setOpen] = useState(false);
    
    const User = JSON.parse(localStorage.getItem("User"));

    useEffect(() => {
        axios.get(`http://localhost:5001/product/${props.match.params.productId}`, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                setProduct(response.data)
            }).catch(error => {
                console.log(error)
            })
    }, [])
    function ButtonIncrement(props) {
  
        return (
          <button style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
          +1
          </button>
        )
     }
     function ButtonDecrement(props) {
       
       return (
         <button style={{ marginLeft: '.5rem'}} onClick={props.onClickFunc}>
         -1
         </button>
       )

       }

       function Display(props) {
        return (
          <label style={{ marginLeft: '.5rem'}} >{props.message}</label>
        )
      }
      const options = ['Small','Medium','Large'];
    const onOptionChangeHandler = (event) => {
        console.log("User Selected Value - ", event.target.value)
    }
       const AddToCart = (e) => {
        setOpen(true);
       
        axios.post(`http://localhost:5001/addToCart`, { userId: User.userId, product}, {
            headers: {
                "x-access-token": User.accessToken
            }}).then(response => {
                console.log(response)
            }).catch(error => {
                console.log(error)
            })
        
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Container>  
            {!product ? 
            (
                <Loading />
            ) : (
                <main class="container">
                    <div class="left-column">
                        <img src={product.imageURL} alt="" />
                    </div>
                    <div class="right-column">
                        <div class="product-description">
                            <h4>{product.title}</h4>
                            
                        </div>
                        <div class="product-price">
                            <spa><b>₹ {product.price}</b></spa>
                            <br />
                            <br />
                           
                          

                                <div>
                                <h6>{product.description}</h6>
                                <br />
                            <br />
                                </div>
    
     

<div>

<select onChange={onOptionChangeHandler}>
  
  <option>Size</option>
  {options.map((option, index) => {
      return <option key={index} >
          {option}
      </option>
  })}
</select>
<br />
                            <br /><br />
                            

</div>
   

                            <Button variant="outline-primary" value={product._id} onClick={AddToCart}>Add to cart</Button>
                        </div>
                    </div>
                </main>
            )} 
            <br />
            <br />
            <br />
            <br />
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogContent style={{ padding: '50px 100px' }}>
                    <Cart />
                    <DialogContentText id="alert-dialog-description">
                        Product Add To Cart
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Close
                </Button>
                </DialogActions>
            </Dialog>
        </Container>
    )
}
