import {React, useState} from "react";
import { FaCalendarCheck } from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
import { useEffect } from "react";
import "./userDashboard.css"

function TrackFunds() {
    const [data, setData] = useState([]);
    const [pending, setPending] = useState(["None"]);
    const [approved, setApproved] = useState(["None"]);
    const [rejected, setRejected] = useState(["None"]);

    const [total, setTotal] = useState(0);

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }

    useEffect(() => {
        const res = localStorage.getItem("email");
        if (!res) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        else {
            getData();
        }
    }, [])

    async function getData() {
        const email = localStorage.getItem("email");
        console.log("em" + email);
        if (!email) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        const response = await fetch('http://localhost:1337/api/findFundRequest', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify({
                email,
            }),
        })
        
        const res = (await response).json();
        setData(res);
        setPending((await data.user).filter(application => application.approvalStatus === "Pending"))
        setApproved((await data.user).filter(application => application.approvalStatus === "Approved"))
        setRejected((await data.user).filter(application => application.approvalStatus === "Rejected"))
    }

    // async function updateApprovalStatus(props, status) {
    //     let email = props;

    //     const response = await fetch('http://localhost:1337/api/updateApprovalStatus', {
    //         method: 'PUT',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             status,
    //             email,
    //         }),
    //     })

    //     const datsa = await response.json()
    // }

    // function handleApprove(props) {
    //     updateApprovalStatus(props.email, "Approved");

    //     // window.location = `mailto:${props.email}?cc=pramitbhatia25@gmail.com.&bcc=harshitmundhra2@gmail.com&subject=Application%status&body=Your%20Proposal%20for%20startup%20named%20${props.startupName}%20has%20been%20accepted.%0AYour%20Login%20credentials%20are%20as%20follows%20-:.%0AEmailId:%20${props.email}%0APassword:%20${props.name}@123`;        
    //     // sendEmail(random_password);
    // }

    // function handleReject(props) {
    //     // window.location = `mailto:${props.email}?cc=pramitbhatia25@gmail.com.&bcc=harshitmundhra2@gmail.com&subject=Application%status&body=Your%20Proposal%20for%20startup%20named%20${props.startupName}%20has%20been%20rejected.`;        
    //     updateApprovalStatus(props.email, "Rejected");
    //     // window.alert("Updated!");
    //     // window.location.assign("/adminDashboard");
    // }


    function FundCard(props) {
        console.log(props)
        const ap = props.i.approvalStatus;
        return <div className="AppCard">

        <h1>Rs. {props.i.fundsRequired}</h1>
        <br />
        <h5>StartUp Name: {props.i.startupName}</h5>
        <h5>Name: {props.i.name}</h5>
        <h5>Contact: {props.i.contact}</h5>
        <h5>Email: {props.i.email}</h5>
        <h5>Reason: {props.i.reason}</h5>
        <h5>Approval Status: {props.i.approvalStatus}</h5>
        {ap === "Pending" &&
        <div>
            <button className="Status" >Approve</button><br />
            <button className="Status" >Reject</button><br />
        </div>
        }
        {ap === "Approved" &&
            <div>
                <button className="Status" >Reject</button><br />
            </div>
        }
        {ap === "Rejected" &&
            <div>
                <button className="Status" >Approve</button><br />
            </div>
        }

        </div>
    }

    return (

        <div className="TrackFund">
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
    <h1 style={{ textAlign: "center" }}className="Headers">Track Fund Request</h1>
    <h5 style={{ textAlign: "center" }}className="Headers">Total Funds Required = {total}</h5>

    <br />

    {(data !== undefined) && 

        <div className="row">
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Pending Requests</h1>
                {pending.map(ap => <FundCard i={ap}/>)}
            </div>
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Approved Requests</h1>
                {approved.map(ap => <FundCard i={ap}/>)}
            </div>
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Rejected Requests</h1>
                {rejected.map(ap => <FundCard i={ap}/>)}
            </div>
        </div>
    }
    </div>
    );
}

export default TrackFunds;