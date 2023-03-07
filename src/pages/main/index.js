import React, {useContext} from 'react'
import ToDoList from '../../components/todo_list'
import { AppContext } from '../../contexts/app_context'

const Main = () => {
  let { user } = useContext(AppContext);

  return (
    <div className='MainPage'>
      <h1>Welcome, {user.name}</h1>
      <ToDoList />
    </div>
  )
}

export default Main