import * as actionTypes from '../actions/actionTypes';

const INGREDIENTS_PRICE = {
    salad: 1.2,
    bacon: 1,
    cheese: 1,
    meat: 2
}

const initialState = {
    ingredients: null, 
    totalPrice: 0,
    error: false
};

const reducer = (state = initialState, action) => {
        switch(action.type){
            case actionTypes.ADD_INGREDIENT: 
                return{
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                    },
                    totalPrice: state.totalPrice + INGREDIENTS_PRICE[action.ingredientName]
                }
            case actionTypes.REMOVE_INGREDIENT:
                return{
                    ...state,
                    ingredients: {
                        ...state.ingredients,
                        [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                    },
                    totalPrice: state.totalPrice - INGREDIENTS_PRICE[action.ingredientName]
                }
            case actionTypes.SET_INGREDIENTS:
                return{
                    ...state,
                    ingredients: action.ingredients,
                    error: false
                }
            case actionTypes.FETCH_INGREDIENTS_FAILED:
                return{
                    ...state,
                    error: true
                }
            default:
                return state;
        }
}

console.log('REDUCER')


export default reducer;