import React, { useContext } from 'react'
import { AppContext } from '../../contexts/app_context'
import AddForm from '../add_form'
import axios from 'axios'
import './index.css'

const ToDoList = () => {
    
    let { todos, setTodos } = useContext(AppContext);

    const handleCheck = async (item) => {
        console.log("clicked")
        const response = await axios({
          method: 'PUT',
          url: `/todos/update/${item}`
        })
        setTodos(todos.map((todo) => {
          if (todo._id === response.data._id) {
            todo.completed = response.data.completed;
          }
          return todo;
        }));
        console.log(todos)
      }

      const handleDelete = async (id) => {
        console.log("clicked")
        const response = await axios({
          method: 'DELETE',
          url: `/todos/delete/${id}`
        })
        setTodos(todos.filter((todo) => {
          if (todo._id !== response.data._id) {
            return todo;
          }
        }));
        console.log(todos)
      };
    

    let todosJSX = todos.map((item) => {
        return (
          <div className="todo" key={item._id}>
            <div className="checkbox" onClick={() => handleCheck(item._id)}>✔️</div>
            <div className="text" id={(item.completed ? "completed" : "")}>{item.text}</div>
            <div className="delete-todo" onClick={() => handleDelete(item._id)}>❌</div>
          </div>
        )
      })

    
        
        return (
            <div className='todo-container'>
                {todosJSX} 
            </div>
        )
}

export default ToDoList