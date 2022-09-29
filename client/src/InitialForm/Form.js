import { useState } from 'react'
import Header from "../Header"
import "./form1.css"
function Form() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [contact, setContact] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [startupName, setStartupName] = useState('')
    const [problemSolving, setProblemSolving] = useState('')
    const [startupDesc, setStartupDesc] = useState('')
    const approvalStatus = "Pending"

    async function sendApplication(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:1337/api/sendApplication', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
                contact,
                city,
                state,
                startupName,
                problemSolving,
                startupDesc,
                approvalStatus,
			}),
		})

		const data = await response.json()

        console.log(data);
        if(data.status === "ok"){
            window.alert("Your Form Has Been Submitted! Please Wait 6-7 days. If youre startup is approved, you will receive an email with login data on the given email id. Thank you!");
            window.location.href="/" 
        }
        else
        {
            window.alert("Invalid Attempt.");    
        }
    }

    return <div>
    <Header />
    <form action="/login" method="POST" onSubmit={sendApplication}>
    <div className="container">
    <div className='row align-items-start'>
    <div className='col'>
    <br />
    Your name:<br /><br /> 
<input value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" required />
<br /> <br />
    Your email:<br /><br />
<input value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
<br /> <br />
    Your contact number:<br /><br />
<input type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="0832145698" required pattern="[1-9]{1}[0-9]{9}" />
<br /> <br />
    City of Present Residence:<br /><br />
<input type="text" name="address" value={city} onChange={(e) => setCity(e.target.value)}placeholder="Current City" required />
<br /> <br />
</div>
                    <div className='col'>
                    <br />
                    State/UT:<br /><br />
                    <select name="states" id="states" value={state} onChange={(e) => setState(e.target.value)}>
                        <option value="None">Select State</option>
                        <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Puducherry">Puducherry</option>
                        <option value="Daman and Diu">Daman and Diu</option>
                        <option value="Dadra and Nagar Haveli">Dadra and Nagar Haveli</option>
                        <option value="Lakshadweep">Lakshadweep</option>
                        <option value="Ladakh">Ladakh</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chattisgarh">Chattisgarh</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujarat">Gujarat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="Jharkand">Jharkand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerala">Kerala</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Odisha">Odisha</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Telangana">Telangana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttarakhand">Uttarakhand</option>
                        <option value="Himachal Pradesh">Himachal Pradesh</option>
                        <option value="West Bengal">West Bengal</option>
                    </select>
                    <br /> <br />
                                    Startup Name/Idea Name:<br /><br />
                <input type="textarea" value={startupName} onChange={(e) => setStartupName(e.target.value)} required rows="4" cols="50" />
                <br /> <br />
                What problem are you solving?<br /><br />
                <input type="textarea" value={problemSolving} onChange={(e) => setProblemSolving(e.target.value)} required rows="4" cols="50" />
                <br /> <br />
                Brief Description of your startup:<br /><br />
                <input type="textarea" value={startupDesc} onChange={(e) => setStartupDesc(e.target.value)} required rows="10" cols="150" />
                <br /> <br />
                <input className="btn btn-primary" type="submit" value="Submit!" />
                <br />
                </div>
                </div>
            </div>


        </form>
    </div>
}

export default Form;