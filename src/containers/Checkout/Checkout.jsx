import React, { Component } from 'react'
import CheckoutSummary from '../../components/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router-dom'
import ContactData from './ContactData/ContactData';
import { connect } from 'react-redux'


class Checkout extends Component {
  // state = {
  //     ingrediens: null,
  //     totalPrice: 0
  // }
  // componentWillMount (){
  //   console.log(this.props.location.search)
  //   const query = new URLSearchParams(this.props.location.search);
  //   const ingrediens = {};
  //   let price = 0;
  //   for( let param of query.entries() ){
  //     if( param[0] === 'price'){
  //         price = param[1];
  //     }else{
  //       ingrediens[param[0]] = +param[1];
  //     }
  //     console.log(ingrediens[param[0]] = +param[1])
  //     console.log(param)
  //   }
  //   console.log(ingrediens)
  //   this.setState({ingrediens: ingrediens, totalPrice: price})
  // }

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  }

  checkoutContinueHandler = () => {
    this.props.history.replace('/checkout/contact')
  }
  render() {

    let summary = <Redirect to='/' />

    if (this.props.ings) {
      summary = (
      <div>
        <CheckoutSummary
          checkoutContinue={this.checkoutContinueHandler}
          checkoutCancelled={this.checkoutCancelledHandler}
          ingrediens={this.props.ings}
        />
        <Route path={this.props.match.path + '/contact'}
          component={ContactData} />
      </div>)
    }
    return summary;
  }
}
const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients
  }
}
// const mapDispatchToProps = distpatch => {
//   return{
//     onIngredientAdded: (ingName) => distpatch({type: actionTypes.ADD_INGREDIENT, ingredientName: ingName}),
//     onIngredientRemoved: (ingName) => distpatch({type: actionTypes.REMOVE_INGREDIENT, ingredientName: ingName})
//   }
// }

export default connect(mapStateToProps)(Checkout);