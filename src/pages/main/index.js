import React, {useContext} from 'react'
import AddForm from '../../components/add_form'
import ToDoList from '../../components/todo_list'
import UserLogOut from '../../components/user_logout'
import { AppContext } from '../../contexts/app_context'

const Main = () => {
  let { user } = useContext(AppContext);

  return (
    <div className='MainPage'>
      <h1>Welcome, {user.name}</h1>
      <h4>Your tasks</h4>
      <ToDoList />
      <AddForm /> 
      <UserLogOut />     
    </div>
  )
}

export default Main