import React from 'react'
import Burger from '../../burger/Burger'
import Button from '../UI/Button/Button'
import classes from './CheckoutSummary.css'

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>Smacznego</h1>
        <div style={{width: '100%', height: '300px', margin: 'auto'}}>
            <Burger ingrediens={props.ingrediens} />
        </div>
        <Button 
            clicked={props.checkoutCancelled}
            btnType="Danger" >
            Cancel </Button>
        <Button 
            clicked={props.checkoutContinue}
            btnType="Success">
            Confirm </Button>
    </div>
  )
}

export default CheckoutSummary;
