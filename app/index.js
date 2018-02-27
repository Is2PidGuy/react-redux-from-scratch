import React from 'react';
import { connect, setRootReducer, dispatch } from './redux';

class Main extends React.Component {
    render() {
        const { name, age } = this.props;
        return (
            <div>
                <h3>Name {name}</h3>
                <h3>Age {age}</h3>
                <button onClick={() => {
                    dispatch({ type: 'TEST', name: 'Is2PidGuy' });
                }}>set name</button>
                <button onClick={() => {
                    dispatch({ type: 'AGE', age: 35 });
                }}>set age</button>
            </div>
        );
    }
}

const reducer = (state = 'i dont hve a name now', action) => {
    if (action.type === 'TEST') return action.name;
    return state;
};

const agereducer = (state = 0, action) => {
    if (action.type === 'AGE') return action.age;
    return state;
};

const MainReducer = (state, action) => ({
    name: reducer(state.name, action),
    age: agereducer(state.age, action),
});

setRootReducer(MainReducer);

const mapStateToProps = (store) => ({
    name: store.name,
    age: store.age,
});

export default connect(Main, mapStateToProps);

