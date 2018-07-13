import React, { Component } from 'react';
import classes from './ContactData.css'
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-orders'
import Input from '../../../components/UI/Input/Input'
import { connect } from 'react-redux'
import * as actionsOrder from '../../../store/actions/index'

class ContactData extends Component {
    state = {
        orderForm :{
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your name'
                },
                value: ''
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your street'
                },
                value: ''
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your zipCode'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'your country'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'your email'
                },
                value: ''
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheap', displayValue: 'cheap'}
                    ]
                },
                value: ''
            }     
        },
        loading: false
    }

    orderHandler = (e) => {
        e.preventDefault();

        const order = {
        ingrediens: this.props.ings,
        price: this.props.totalPrice}
        
        this.props.purchaseBurger(order);
        // axios.post('/orders.json', order)
        // .then( response => {
        //     this.setState({loading: false, purchasing: false});
        //     console.log(response)
        //     })
        // .catch(error => console.log(error))
        //     console.log(this.props.ingrediens)

        // }

    }

    render() {
        const formElementsArray = [];
        for(let key in this.state.orderForm){
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            })
        }
        let form1 = (<form>
            <Input elementType="input" elementConfig="..." value="..."/>
            {formElementsArray.map(formElement => {
                <Input 
                    key={formElement.id}
                    elementtype={formElement.config.elementType}
                    elementConfig={formElement.config.elementConfig.placeholder}
                    value={formElement.config.value}
                />
            })}
            <Button btnType="Success" clicked={this.orderHandler}>Order</Button>
        </form>)


        console.log(formElementsArray)
        return (
            <div style={{padding: '15px', marginTop: '50px'}} className={classes.ContactData}>
                <h1>Enter yout contact:</h1>
                {form1}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
      ings: state.burgerBuilder.ingrediens,
      price: state.burgerBuilder.totalPrice,
      loading: state.order.loading
    }
  }

const mapDispatchToProps = distpatch => {
    return{
        purchaseBurger: (orderData) => distpatch(actionsOrder.purchaseBurger(orderData))
    }
  }


  export default connect(mapStateToProps, mapDispatchToProps)( ContactData);