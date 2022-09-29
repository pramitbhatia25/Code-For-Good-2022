import './login.css';
import { useState } from "react"
import Header from "../Header"

const Login = () => {

    const [user, setUser] = useState({
        pass: "", email: "",
    });

    let name, value;
    const Input = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const SendDataLogin = async (e) => {
        e.preventDefault();

        const { email, pass } = user;

        const res = await fetch("http://localhost:1337/api/login", {
            method: "POST", headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                email, pass
            })
        });

        const data = await res.json();
        console.log(data)

        if (res.status === 400 || !data) {
            window.alert("Invalid Credentials!");
            console.log("Invalid Credentials!");
            window.location.href = "/login"

        } else {
            window.alert("Login Successful");
            console.log("Login Successful");
            localStorage.setItem("email", email);
            if(data.userType === "admin") {
                window.location.href = "/adminDashboard"
            }
            else {
                window.location.href = "/progress"
            }
        }

    }

    return (
        <div className="loginForm">
            <Header />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div class="container" id="container">
                <div class="form-container sign-in-container">
                    <form action="#">
                        <h5>Only For Admins and Approved StartUps!</h5>
                        <h1>Sign in</h1>
                        <span>Use your email</span>
                        <input type="email" placeholder="Email" onChange={Input} id="email" value={user.email} name="email" />
                        <input type="password" placeholder="Password" onChange={Input} id="pass" value={user.pass} name="pass" />
                        <br />
                        <button onClick={SendDataLogin} className="btn">Sign In</button>
                    </form>
                </div>
                <div class="overlay-container">
                    <div class="overlay">
                        <div class="overlay-panel overlay-right">
                            <h1>Hey there, startup!</h1>
                            <p>Enter your details and start your journey with GUSEC!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;