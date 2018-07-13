import React, { Component } from 'react';
import Axios from '../../axios-orders';
import BuildControls from '../../burger/BuildControls/BuildControls';
import Burger from '../../burger/Burger';
import OrderSummary from '../../burger/OrderSummary/OrderSummary';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import Aux from '../../hoc/aux_x';
import withErrorHandler from '../../hoc/errorHandler/errorHandler';

import { connect } from 'react-redux'
import * as BurgerBuilderActions from '../../store/actions/index'


class BurgerBuilder extends Component {
  state = {
    ingrediens: null, 
    purchasing: false
  }
  
  componentDidMount(){
    console.log(this.props)
    this.props.onIngredientInit();
  }

  updatePurchase = (ingrediens) => {
    
    const sum = Object.keys(ingrediens)
      .map(igKey => {
        return ingrediens[igKey]
    })
      .reduce((sum, el) => {
        return  sum + el;
      }, 0)
    return sum > 0
  }

  purchasingHandler = () =>{
    
    this.setState({ purchasing: true})

    // const trigger = this.state.purchasing;
    //  console.log(trigger)
    // this.setState({ purchasing: !trigger})
  }

  

  closeModalHandler = () => {
    this.setState({ purchasing: false})
  }

  purchaseContinueHandler = () => {
    // this.setState({loading: true});

    // const order = {
    //   ingrediens: this.state.ingrediens,
    //   price: this.state.totalPrice,
    //     customer: {
    //       name: "Jan Kowalski",
    //         address: {
    //           street: "TestStreet 10",
    //           zipCode: '34-432',
    //           country: "Poland"
    //         },
    //         email: "test@email.com"
    //     },
    //     deliveryMethod: 'faster'
    // }
    // Axios.post('/orders', order)
    //   .then( response => {
    //     this.setState({loading: false, purchasing: false});
    //     console.log(response)
    //     })
    //   .catch(error => console.log(error))
    // const queryParams = [];

    // for( let i in this.state.ingrediens ){
    //   queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingrediens[i]))
    // }
    // queryParams.push('price=' + this.props.price)
    // const querySearch = queryParams.join('&');
    // console.log(queryParams)
    // this.props.history.push({
    //   pathname: '/checkout',
    //   search: '?' + querySearch
    // })

    this.props.history.push('/checkout');

    
      // this.props.history.push('/checkout')
  }

  purchaseCancelHandler = () => {
    this.setState({purchasing: false})
  }

  render() {
    const disabledInfo = {
      ...this.props.ings
    }

    for(let key in disabledInfo ){
        disabledInfo[key] = disabledInfo[key] <= 0 ;
    }

    //If ingrediens has false value we display Spinner. When we fetch data from FireBase we have display component.
    let orderSummary = <Spinner />;
    let burger = this.props.error ? <p style={{ textAlign: 'center'}}>Wystąpił błąd</p> : <Spinner />;

  
    if(this.props.ings){
        burger = (
        <Aux>
          <Burger ingrediens={this.props.ings} />
          <BuildControls  
            ingredientAdded={ this.props.onIngredientAdded} 
            removeIngredient={ this.props.onIngredientRemoved}
            disabled={disabledInfo}
            purchase={this.updatePurchase(this.props.ings)}
            price={this.props.price}
            ordered={this.purchasingHandler}
        
        /></Aux>);

        orderSummary = <OrderSummary 
        ingredients={this.props.ings}
        purchaseContinue={this.purchaseContinueHandler} 
        purchaseCancel={this.purchaseCancelHandler}
        price={this.props.price}
      />

    };

    // console.log(disabledInfo)
    return (
        <Aux>
          <Modal show={this.state.purchasing} modalClosed={this.closeModalHandler}>
            {orderSummary}
          </Modal>
            {burger}
        </Aux>
    )
  }
}
const mapStateToProps = state => {
  return {
    ings: state.ingredients,
    price: state.totalPrice,
    error: state.error
  }
}
const mapDispatchToProps = distpatch => {
  return{
    onIngredientAdded: (ingName) => distpatch(BurgerBuilderActions.addIngredient(ingName)),
    onIngredientRemoved: (ingName) => distpatch(BurgerBuilderActions.removeIngredient(ingName)),
    onIngredientInit: () => distpatch(BurgerBuilderActions.initIngredients())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, Axios));
