import '../styles/index.css'
import '../styles/App.css'
import Login from './authPages/login.jsx'
import { useState } from 'react'
import {Navigate, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard.jsx'
import SideBar from './components/sideBar.jsx'
import DashLayout from './components/dashBoardLayout.jsx'
import UsersList from './pages/users/usersList.jsx'

function App(){
    const [authenticated, setAuthenticated] = useState(true);
    return(
        <div className="App">
            <Routes>
                
                <Route path='/' element={<Login/>}/>
                <Route path='/app' element={<DashLayout />}>
                    <Route index element={<Dashboard/>}/>        
                    <Route path='userslist' element={<UsersList/> }/>
                </Route>

                
            </Routes>
            
        </div>
    )
}

export default App;