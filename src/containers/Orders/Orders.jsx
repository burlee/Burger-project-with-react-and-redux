import React, { Component } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'

export default class Orders extends Component {
  state = {
    orders: [],
    loading: true
  }
  componentDidMount(){
    axios.get('/orders.json')
      .then(response => {
        const fetchOrders = [];
        for(let key in response.data){
          // console.log(response.data[key])
          fetchOrders.push({
            ...response.data[key],
            id: key
          })
        }
        this.setState({loading: false, orders: fetchOrders})
      })
      .catch(error => console.log(error))
  }
  render() {
    return (
      <div>
        {this.state.orders.map( order =>(
          <Order key={order.id} price={order.price} ingrediens={order.ingrediens} />
        ))}
      </div>
    )
  }
}
