import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import thunk from 'redux-thunk'
// redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers} from 'redux';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order'


const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer
})
// const logger = store => {
//     return next => {
//         return action =>{
//             console.log('Mildware dipatching', action);
//             const result = next(action);
//             console.log('Mildware next state', store.getState())
//             return result;
//         }
//     }
// }

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
, document.getElementById('root'));
registerServiceWorker();
