import '../../styles/dashLayout.css'
import { Outlet } from "react-router-dom";
import SideBar from "./sideBar.jsx";

export default function DashLayout(){
    return(
        <div className="dashLayout">
            <SideBar/>

            <main className='main'>
                <Outlet/>
            </main>
        </div>
    )
}