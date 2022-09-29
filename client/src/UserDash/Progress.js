import {React, useState} from "react";
import { FaCalendarCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import PerDashboard from "./perDashboard";
import RevenueGrowth from "./revenueGrowth";
import { useEffect } from "react";
function Progress() {

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }
    const [diffDays, setdiffDays] = useState();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const email = localStorage.getItem("email");
        if (!email) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        const response = await fetch('http://localhost:1337/api/find', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })

        const data = await response.json()
        const firstDate = new Date(parseInt(data.user.dateCreated));
        const oneDay = 24 * 60 * 60 * 1000;

        const secondDate = new Date();

        setdiffDays(Math.round(Math.abs((firstDate - secondDate)) / oneDay));



    }

    return (

        <div >

            <div>
                <nav style={{ background: "linear-gradient(#FFFFFF, #9198e5)" }} className="navbar navbar-light navbar-expand-lg py-0">

                    <a className="navbar-brand text-light" href="https://gusec.edu.in/"><img src="https://gusec.edu.in/wp-content/uploads/2019/08/GU-GUSEC-High-Res-e1581884201629.png" width="100" height="35" className="d-inline-block align-top m-2 ms-3" alt="" /></a>
                    <ul className="navbar-nav ms-auto pe-3 ">
                        <li className="nav-item">
                            <NavLink to="/applyfunds" className="nav-link shadow bg-primary rounded text-light m-2" >Apply for Funds</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/trackFunds" className="nav-link shadow bg-primary rounded text-light m-2">Track Fund Status</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/progress" className="nav-link shadow bg-primary rounded text-light m-2"><FaCalendarCheck className='me-1' />Progress</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="" className="nav-link shadow bg-primary rounded text-light m-2" onClick={logOut}>LogOut</NavLink>
                        </li>
                    </ul>
                </nav>

                <br />
                <h1 style={{ textAlign: "center" }}>Progress</h1>
                <h2 style={{ textAlign: "center" }}>Days Left For Trial Period: {45 - diffDays}</h2>
                <div className="row w-75 mx-auto mt-5">
                    <div className="col-6">
                        <PerDashboard />
                    </div>
                    <div className="col-6">
                        <RevenueGrowth />
                    </div>
                </div>
            
            </div>
        </div>
    );
}

export default Progress;