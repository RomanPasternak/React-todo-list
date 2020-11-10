import React from 'react'
import './item-add-form.css'

export default class ItemAddForm extends React.Component {
    
    state = {
        label: ''
    }

    onLabelChange = (e) => {
        this.setState({
            label: e.target.value
        })
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.addNewItem(this.state.label);
        this.setState({
            label: ''
        });
    }
    render() {

        return(
            <form className="item-add-form d-flex"
                  onSubmit={ this.onSubmit }>
                <input type="text" 
                       className="form-control"
                       onChange={ this.onLabelChange }
                       value={ this.state.label }
                       placeholder="What needs to be done"></input>
                <button className="btn btn-info float-right">Add item</button>
            </form>
        )
    }
}