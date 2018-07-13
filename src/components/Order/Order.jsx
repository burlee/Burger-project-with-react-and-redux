import React from 'react'
import classes from './Order.css'

const Order = (props) => {
  const ingrediens = [];

  for(let ingrediensName in props.ingrediens){
    ingrediens.push({
      name: ingrediensName,
      amount: props.ingrediens[ingrediensName]
    })
  }
  console.log(ingrediens)

  const ingrediensOutput = ingrediens.map( ingredient => {
        return <span  style={{border: '1px solid gray', padding: '10px', marginLeft:'5px'}} key={ingredient.name}> {ingredient.name} : {ingredient.amount}</span>
  })
  console.log(ingrediens)
  return (
    <div className={classes.Order}>
      <p>Ingrediens: {ingrediensOutput} </p>
      <p>Price: {props.price} PLN <strong></strong></p>
    </div>
  )
}

export default Order;
