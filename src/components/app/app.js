import React from 'react';
import './app.css'

import AppHeader from '../app-header/app-header';
import SearchPanel from '../search-panel/search-panel';
import TodoList from '../todo-list/todo-list';
import ItemStatusFilter from '../item-status-filter/item-status-filter';
import ItemAddForm from '../item-add-form/item-add-form';

export default class App extends React.Component {
  
  newId = 100;

  state = {
    todoData:[
      this.createTodoItem('Drink cofee'),
      this.createTodoItem('Build app'),
      this.createTodoItem('Have a lanch') 
    ],
    term: '',
    filter: 'all' //active, done, all
  };

  createTodoItem(label){
    return {
      label: label,
      done: false,
      important: false,
      id: this.newId++
    }
  };

  deleteItem = (id) => {
    this.setState(( {todoData} ) => {
      const arr = todoData.filter( (el) => el.id !== id );
      return {
        todoData: arr
      }
    });
  };

  addNewItem = (text) => {
    this.setState(( {todoData} ) => {
      const newItem = this.createTodoItem(text);
      return {
        todoData: [...todoData, newItem]
      }
    })
  };

  onToggleProp(arr, id, propName){
    const idx = arr.findIndex((el) =>  el.id === id );
      const oldItem = arr[idx];
      const newItem = {...oldItem, [propName]: !oldItem[propName]};

      return [
        ...arr.slice(0, idx),
        newItem,
        ...arr.slice(idx + 1)
      ]
  };

  onToggleDone = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.onToggleProp(todoData, id, 'done')
      }
    });
  };

  onToggleImportant = (id) => {
    this.setState(( {todoData} ) => {
      return {
        todoData: this.onToggleProp(todoData, id, 'important')
      }
    });
  };

  onSearchChange = (term) => {
    this.setState({  term });
  }

  search(items, term){
    if(term.length === 0){
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter(items, filter){
    switch(filter){
      case 'all':
        return items;
      case 'done':
        return items.filter((item) => item.done);
      case 'active':
        return items.filter((item) => !item.done);
      default:
        return items;
    }
  }

  onFilterChange = (filter) =>{
    this.setState({filter})
  };

  render() {
    const { todoData, term, filter } = this.state;

    const visibleItems = this.filter(this.search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        <AppHeader toDo={ todoCount } done={ doneCount } />
        <div className="top-panel d-flex">
          <SearchPanel onSearchChange={ this.onSearchChange } />
          <ItemStatusFilter filter={ filter }
                            onFilterChange={ this.onFilterChange }/>
        </div>
        <TodoList todos = { visibleItems } 
                  onDeleted = { this.deleteItem }
                  onToggleImportant = { this.onToggleImportant }
                  onToggleDone = {this.onToggleDone }/>
        <ItemAddForm addNewItem={ this.addNewItem }/>
      </div>
    );
  }
};
