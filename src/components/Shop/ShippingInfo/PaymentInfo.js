import React, { useContext, useState } from 'react';
import { ContextData } from '../../../Context';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function PaymentInfo() {
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    
    // creates a paypal order
    const createOrder = (data, actions) => {
      return actions.order
        .create({
          purchase_units: [
            {
              description: "Sunflower",
              amount: {
                currency_code: "USD",
                value: 20,
              },
            },
          ],
          // not needed if a shipping address is actually needed
          application_context: {
            shipping_preference: "NO_SHIPPING",
          },
        })
        .then((orderID) => {
          setOrderID(orderID);
          return orderID;
        });
    };
    
    // check Approval
    const onApprove = (data, actions) => {
      return actions.order.capture().then(function (details) {
        const { payer } = details;
        setSuccess(true);
      });
    };
    //capture likely error
    const onError = (data, actions) => {
      setErrorMessage("An Error occured with your payment ");
    };
   
    const { shippingInfo, setShippingInfo } = useContext(ContextData);
    const [value, setValue] = useState('Cash On Delivery');

    const handleChange = (event) => {
        setValue(event.target.value);
        setShippingInfo({...shippingInfo, 'payment_method': event.target.value})
    };

    return (
        <div>
            <FormControl component="fieldset">
                <RadioGroup aria-label="transaction_type" name="transaction_type" value={value} onChange={handleChange}>
                    <FormControlLabel value="Cash On Delivery" control={<Radio color="primary"/>} label="Cash On Delivery" />
                    <FormControlLabel value="Online Transaction" control={<Radio color="primary" />} label="Online Transaction" />
                    {value === "Online Transaction" ? (
 
                    

 <PayPalScriptProvider
 options={{
   "client-id":"AU9MOTvSnObJPSBcoTdwJtSRQtXn1vVTlxO7pkSz05BKqbQnctwDUYT37PT10RTGsmkT8Sg44lsNmgNU",
 }}
>



     <PayPalButtons
       style={{ layout: "vertical" }}
       createOrder={createOrder}
       onApprove={onApprove}
     />
   

</PayPalScriptProvider>                 
                        
                    ) : (
                        null
                    )}
                </RadioGroup>
            </FormControl>
        </div>
    )
}
