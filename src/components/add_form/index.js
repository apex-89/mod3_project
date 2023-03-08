import React from 'react'
import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/app_context';
import './index.css';

const AddForm = () => {
  let { todos, setTodos, newTodo, setNewTodo, user } = useContext(AppContext);
  const [disabled, setDisabled] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    setDisabled(newTodo ? false : true);
  }, [newTodo])

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
    setNewTodo("");
    setShow(!show)
  }

  return (
    <div>
      <h4>{new Date().toLocaleDateString()}</h4>      
      <div className='showAdd' onClick={() => setShow(!show)}>📋</div>
      {show ? (
        <div className="addForm">
            <div>
              <h3>What needs to get done!</h3>
              <input type="text" className="add-input" onChange={e => setNewTodo(e.target.value)} value={newTodo} />
              <button className="button" disabled={disabled} onClick={addTodo}>Add Task</button>
            </div>
        </div>
      ) : ''}
    </div>

  )
}

export default AddForm