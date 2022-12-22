import React from 'react';
// import Form from '../Form';
// import List from '../List';
// import { BsPlusSquare } from 'react-icons/bs';
// import { BsPen } from 'react-icons/bs';
// import { AiOutlineDelete } from 'react-icons/ai';
import Form from '../Form';
import List from '../List';

export default class Main extends React.Component{
  state={
    todo: {
      id: Math.random(),
      title: '',
      isComplete: false,
      update: -1
    },
    list: []
  }
  componentDidUpdate(prevProps, prevState){
    const { list } = this.state;
    if(list === prevState.list) return;
    localStorage.setItem('list', JSON.stringify(this.state.list)) 
  }
  componentDidMount(){
    const list = JSON.parse(localStorage.getItem('list'))
    if(!list) return;
    this.setState({list: list})
  }
  handleSubmit = (e)=>{
    e.preventDefault()
    if((this.state.todo.title).trim() === '') return;
    if((this.state.todo.update) === -1){
    const copyList = [this.state.todo, ...this.state.list]
    this.setState({
      list: copyList
    })
    this.setState({
      todo: {
        id: Math.random(),
        title: '',
        isComplete: false,
        update: -1,
      }
    })
    
  } else{
    const copyList = [...this.state.list]
    copyList[this.state.todo.update] = this.state.todo
    this.setState({
      list: copyList,
      todo: {
        id: Math.random(),
        title: '',
        isComplete: false,
        update: -1
      }
    })
  }
  }
  handleInput = (e)=>{
    this.setState({
      todo: {
        id: Math.random(),
        title: e.target.value,
        isComplete: this.state.todo.isComplete,
        update: this.state.todo.update
      }
    })
  }
  handleDelete = (index)=>{
    const copyList = [...this.state.list]
    copyList.splice(index, 1)
    this.setState({
      list: copyList
    })
  }
  handleUpdate = (index)=>{
    const copyList = [...this.state.list]
    this.setState({
      todo:{
        id: copyList[index].id,
        title: copyList[index].title,
        isComplete: copyList[index].isComplete,
        update: index
      }
    })
  }
  handleCheckbox = (index)=>{
    const copyList = [...this.state.list]
    copyList[index].isComplete = !(copyList[index].isComplete)
    this.setState({
      list: copyList
    })
  }
  render(){
    const { todo, list } = this.state

    return(
      <div className="container">
        <Form
        handleChange = {this.handleInput}
        handleSubmit = {this.handleSubmit}
        todoTitle = {todo.title}
        />
        <List
        list={list}
        handleDeleteTodo= {(e)=>this.handleDelete(e)}
        handleCheckTodo= {(e)=>this.handleCheckbox(e)}
        handleUpdate= {(e)=> this.handleUpdate(e)}
        />
      </div>
    )
  }
    
}
