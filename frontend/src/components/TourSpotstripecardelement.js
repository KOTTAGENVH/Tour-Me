//IT21013300
import React from 'react'
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
const TourSpotCheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  return (
<form>
    
<label htmlFor="card-element">Card</label>
                <CardElement id="card-element" />
                </form>
  )
}
export default TourSpotCheckoutForm;

