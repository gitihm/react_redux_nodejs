import React, {Component} from 'react';
import {connect} from 'react-redux'
import {add, minus, add2, store} from './App'

class Count extends Component {

    render() {
        return (
            <div style={{margin: '10px'}}>
                <h2>Count: {this.props.number}</h2>
                <button onClick={ this.props.add }> + </button>
                <button onClick={ this.props.add2}> +2 </button>
                <button onClick={ this.props.minus}> - </button>
            </div>
        );
    }
}

const mapStateToProps = ( {number} ) => { return {number} }

const mapDispatchToProps = (dispatch) => {
    return {
        add:  () => store.dispatch(add()),
        add2:   () => store.dispatch(add2(2)),
        minus: () => store.dispatch(minus())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Count);