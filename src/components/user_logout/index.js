import React, {useContext} from 'react'
import { AppContext } from '../../contexts/app_context'
import { logOut, refreshPage } from '../../utilities/user-functions.js'

const UserLogOut = () => {

    const { user } = useContext(AppContext);

    const handleLogout = async () => {
        await logOut();
        refreshPage();
      };

  return (
    <div className='user-logout'>
        <div>
            {user.name || "Guest"}
        </div>
        <div className="email">
            {user.email  || "Guest@guest.com"}
        </div>
        <button className="btn-sm" onClick={handleLogout}>
            LOG OUT
        </button>
    </div>
  )
}

export default UserLogOut