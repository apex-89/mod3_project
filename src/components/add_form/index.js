import React from 'react'
import axios from 'axios';
import { useContext } from 'react';
import { AppContext } from '../../contexts/app_context';

const AddForm = () => {
  let { todos, setTodos, newTodo, setNewTodo, user } = useContext(AppContext);

  const addTodo = async () => {
    console.log(newTodo);
    const response = await axios({
      method: 'POST',
      url: '/todos/new',
      data: {
        user: user._id,
        text: newTodo
      }
    });
    console.log(response);
    setTodos([...todos, response.data]);
  }

  return (
    <div>
        <h3>Add Task</h3>
        <input type="text" className="add-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
        <div className="button" onClick={addTodo}>Create Task</div>
    </div>
  )
}

export default AddForm