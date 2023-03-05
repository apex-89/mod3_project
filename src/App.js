import './App.css';
import { useEffect, useState, useContext } from 'react';
import AuthPage from './pages/auth';
import { Routes, Route, Navigate } from 'react-router-dom';
import { getUserFromSession } from './utilities/user-functions';
import axios from 'axios';
import { AppContext } from './contexts/app_context';
import Main from './pages/main'
import Loader from "react-js-loader";


function App() {
  const [callWasMade, setCallWasMade] = useState(false)
  let { setTodos, user, setUser} = useContext(AppContext);

  
  useEffect(() => {
    const getSession =  async () => {

      let userResponse = await getUserFromSession();
      setUser(userResponse)
      setCallWasMade(true)
    }
      getSession();

  }, []);

  useEffect(() => {
    console.log(user);
    const getTodos = async () => {
      if (user) {
        const response = await axios ({
          method: 'GET',
          url: '/todos',
        })
        setTodos(response.data);
      } 
    }
    if (user) {;
      getTodos();
    }
  }, [user]);

  const returnPage = () => {
    if (callWasMade) {
      return (
        <>
          { user ? 
            <div className="page-wrapper">
              <Routes>
                <Route path="/main" element={<Main />}/>
                <Route path="/*" element={<Navigate to="/main" />} />
              </Routes>
            </div>
              :
              <AuthPage />
          }
        </>
      )
    } else {
      return <div>
        <Loader />
      </div>
    }
  }
	return (
		<div className="App">
		     { returnPage() }
    </div>
	);
}

export default App;