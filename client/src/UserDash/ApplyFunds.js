import {React, useState} from "react";
import { FaCalendarCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import "./userDashboard.css"
import FundForm from "./FundForm"

function ApplyFunds() {

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }
    const [data, setData] = useState();

    useEffect(() => {
        getData();
    }, [])

    async function getData() {
        const email = localStorage.getItem("email");
        console.log(email);
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

        setData(await response.json());
        console.log("Data->" + data);
    }

    return (

        <div className="FormFund">

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

                <h1 style={{ textAlign: "center" }}>Apply For Request</h1>
                
                {data != undefined && 
                    <FundForm props={data} />                
                }

            </div>
        </div>
    );
}

export default ApplyFunds;