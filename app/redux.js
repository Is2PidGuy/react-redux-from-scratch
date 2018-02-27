import React from 'react';

class Redux {
    // basically similar to database
    constructor() {
        this.store = {};
        // any callbacks to get notified when state changes
        this.listeners = [];
    }

    setRootReducer(reducer) {
        this.reducer = reducer;
        // this will initialize initial state for our store
        this.store = this.reducer(this.store, {});
    }

    addListener(callback) {
        this.listeners.push(callback);
    }

    removeListener(callback) {
        this.listeners = this.listeners.filter(d => d !== callback);
    }

    dispatch(action) {
        //first modify the store
        this.store = this.reducer(this.store, action);
        //notify all observers of the state / store change
        this.listeners.forEach(d => d());
    }
}

const redux = new Redux();

export const dispatch = (action) => {
    redux.dispatch(action);
}

export const setRootReducer = (reducer) => {
    redux.setRootReducer(reducer);
}

//HOC: RETURN COMPONENT which will subscribe to redux store post mount
export const connect = (Component, mapStatetoProps) => {
    return class extends Component {
        componentDidMount() {
            // trigger forceUpdate on the component
            // note: we don't need to use forceUpdate
            // alternative: use setState
            this.callback = this.forceUpdate.bind(this);
            redux.addListener(this.callback);
        }

        //remove if the component unmounts here
        componentWillUnmount() {
            redux.removeListener(this.callback);
        }

        render() {
            const { props } = this;
            // todo: map state to props here 
            return (
                <Component
                    {...props}
                    {...mapStatetoProps(redux.store)}
                />
            );
        }
    };
};