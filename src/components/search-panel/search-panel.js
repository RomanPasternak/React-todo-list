import React from 'react';

import './search-panel.css'

export default class SearchPanel extends React.Component{

    state = {
        term: ''
    }

    onChangeSearch = (e) =>{
        const term = e.target.value;
        this.setState({term});
        this.props.onSearchChange(term);
    }

    render(){
        
        return (
            <input type="text" 
                   placeholder="search" 
                   className="search-input"
                   value={ this.state.term }
                   onChange={ this.onChangeSearch }></input>
        );
    }
};