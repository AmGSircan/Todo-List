import './App.css';
import Title from './components/Title';
import Control from './components/Control';
import React from 'react';
import tasks from './mock/task';
import {remove, reject} from 'lodash';
import { v4 as uuidv4 } from 'uuid';

class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      items: null,
      itemSelected: null
    };

    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

  componentDidMount(){
    let items = JSON.parse(localStorage.getItem('tasks'));
    this.setState({
      items: items
    })
  }

  handleDelete(id){
    let modifiedItem = this.state.items;
    remove(modifiedItem, (item)=>{
      return item.id === id;
    });

    this.setState({
      items: modifiedItem
    });

    localStorage.setItem('tasks', JSON.stringify(this.state.items));
  }

  handleSubmit(item){
    let items = this.state.items;
    let id = null;
    if(item.taskID !== ''){
        id = item.taskID;
        items = reject(items, {id: item.taskID});
    } else {
        id = uuidv4();
    }

    items.push({
        id: id,
        name: item.taskName,
        level: +item.taskLevel
      })

    this.setState({
      items: items,
      itemSelected: null
    })

    setTimeout(() => localStorage.setItem('tasks', JSON.stringify(this.state.items)), 0);
  }

  handleEdit(item){
    this.setState({
      itemSelected: item
    })
  }

  render(){
    let items = this.state.items;
    return(
      <>
        <Title />
        <Control itemSelected={this.state.itemSelected} onClickEdit={this.handleEdit} items={items} onClickDelete={this.handleDelete} onClickAdd={this.handleSubmit}/>
      </>
    )
  }
}

export default App;
