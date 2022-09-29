import { useEffect, useState } from "react"
import "./adminDashboard.css"
import { NavLink } from 'react-router-dom';


function AdminDashBoard() {

    function logOut() {
        localStorage.removeItem("email");
        window.location.assign("/login");
    }


    const [applications, setApplications] = useState([]);

    async function createStartupUser(props) {

        let startupName = props.startupName;
        let name = props.name;
        let phone = props.contact;
        let city = props.city;
        let email = props.email;
        let pass = generateRandomPassword(name);
        let userType = "user"
        let dateCreated = await Date.now();
        console.log("AAA");
        const response = await fetch('http://localhost:1337/api/createStartupUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                startupName,
                name,
                phone,
                city,
                email,
                pass,
                userType,
                dateCreated,
            }),
        })

        const data = await response.json()

        if (data.status === "ok") {
            window.alert("User Created!");
            window.location.assign("/adminDashboard");
        }
        else {
            window.alert("User Already Exists!");
            window.location.assign("/adminDashboard");
        }

    }

    useEffect(() => {
        const res = localStorage.getItem("email");
        if (!res) {
            alert("Please Login first!");
            window.location.assign("/login");
        }
        else {
            getAllApplications();
        }
    }, [])

    function generateRandomPassword(name) {
        return name + "@123"
    }

    async function updateApprovalStatus(props, status) {
        let email = props;

        const response = await fetch('http://localhost:1337/api/updateApprovalStatus', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                status,
                email,
            }),
        })

        const data = await response.json()
    }

    function handleApprove(props) {
        updateApprovalStatus(props.email, "Approved");
        createStartupUser(props);

        // window.location = `mailto:${props.email}?cc=pramitbhatia25@gmail.com.&bcc=harshitmundhra2@gmail.com&subject=Application%status&body=Your%20Proposal%20for%20startup%20named%20${props.startupName}%20has%20been%20accepted.%0AYour%20Login%20credentials%20are%20as%20follows%20-:.%0AEmailId:%20${props.email}%0APassword:%20${props.name}@123`;        
        // sendEmail(random_password);
    }

    function handleReject(props) {
        // window.location = `mailto:${props.email}?cc=pramitbhatia25@gmail.com.&bcc=harshitmundhra2@gmail.com&subject=Application%status&body=Your%20Proposal%20for%20startup%20named%20${props.startupName}%20has%20been%20rejected.`;        
        updateApprovalStatus(props.email, "Rejected");
        window.alert("Updated!");
        window.location.assign("/adminDashboard");
    }

    async function getAllApplications() {
        const res = await fetch("http://localhost:1337/api/fetchApplications", { method: "GET" });

        const data = await res.json();
        console.log(data.applications)
        setApplications(data.applications);
    }

    const pending = applications.filter(application => application.approvalStatus == "Pending")
    const approved = applications.filter(application => application.approvalStatus == "Approved")
    const rejected = applications.filter(application => application.approvalStatus == "Rejected")

    function ApplicationCard(props) {
        const ap = props.i.approvalStatus;
        console.log(ap)
        return <div className="AppCard">

            <h1>{props.i.startupName}</h1>
            <h5>Name: {props.i.name}</h5>
            <h5>Contact: {props.i.contact}</h5>
            <h5>Email: {props.i.email}</h5>
            <h5>City: {props.i.city}</h5>
            <h5>State: {props.i.state}</h5>
            <h5>Startup Description: {props.i.startupDesc}</h5>
            {ap == "Pending" &&
                <div>
                    <button className="Status" onClick={() => handleApprove(props.i)}>Approve</button><br />
                    <button className="Status" onClick={() => handleReject(props.i)}>Reject</button><br />
                </div>
            }
            {ap == "Approved" &&
                <div>
                    <button className="Status" onClick={() => handleReject(props.i)}>Reject</button><br />
                </div>
            }
            {ap == "Rejected" &&
                <div>
                    <button className="Status" onClick={() => handleApprove(props.i)}>Approve</button><br />
                </div>
            }
        </div>
    }

    return <div>

        <nav style={{ background: "linear-gradient(#FFFFFF, #9198e5)" }} className="navbar navbar-light navbar-expand-lg py-0">

            <a className="navbar-brand text-light" href="https://gusec.edu.in/"><img src="https://gusec.edu.in/wp-content/uploads/2019/08/GU-GUSEC-High-Res-e1581884201629.png" width="100" height="35" className="d-inline-block align-top m-2 ms-3" alt="" /></a>
            <ul className="navbar-nav ms-auto pe-3 ">
                <li className="nav-item">
                    <NavLink to="" className="nav-link shadow bg-primary rounded text-light m-2" onClick={logOut}>LogOut</NavLink>
                </li>
            </ul>



        </nav>

        <h1 style={{ textAlign: "center" }} className="Headers">Track Fund Request</h1>
        <br />
        <div className="row">
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Pending Startups</h1>
                {pending.map((app) => <ApplicationCard i={app} />)}
            </div>
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Approved Startups</h1>
                {approved.map((app) => <ApplicationCard i={app} />)}
            </div>
            <div className="col">
                <h1 style={{ textAlign: "center" }}>Rejected Startups</h1>
                {rejected.map((app) => <ApplicationCard i={app} />)}
            </div>
        </div>



    </div>
}

export default AdminDashBoard