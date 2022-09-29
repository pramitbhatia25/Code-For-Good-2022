import { useState } from 'react'
import "./form.css"
function FundForm(props) {
    console.log("Props -->");
    console.log(props)

    const [name, setName] = useState(props.props.user.name)
    const [email, setEmail] = useState(props.props.user.email)
    const [contact, setContact] = useState(props.props.user.phone)
    const [startupName, setStartupName] = useState(props.props.user.startupName)
    const [fundsRequired, setFundsRequired] = useState()
    const [reason, setReason] = useState('')


    async function sendFundApplication(e) {
        e.preventDefault();

        const response = await fetch('http://localhost:1337/api/sendFundApplication', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				name,
				email,
                contact,
                startupName,
                fundsRequired,
                reason
			}),
		})

		const data = await response.json()

        console.log(data);
        if(data.status === "ok"){
            window.alert("Your Form Has Been Submitted! Use the portal to track your progress.");
        }
        else
        {
            window.alert(data.error.message);    
        }
    }

    return <div>
        <form action="/login" method="POST" onSubmit={sendFundApplication}>
            <br />
                Your name:<br /><br /> 
            <input disabled value={name} onChange={(e) => setName(e.target.value)} type="text" name="name" placeholder="Name" required />
            <br /> <br />
                Your email:<br /><br />
            <input disabled value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" placeholder="Email" required />
            <br /> <br />
                Your contact number:<br /><br />
            <input disabled type="text" name="contact" value={contact} onChange={(e) => setContact(e.target.value)} placeholder="0832145698" required pattern="[1-9]{1}[0-9]{9}" />
            <br /> <br />
        Startup Name/Idea Name:<br /><br />
        <input disabled type="textarea" value={startupName} onChange={(e) => setStartupName(e.target.value)} required rows="4" cols="50" />
        <br /> <br />
        Funds Required:<br /><br />
        <input type="text" value={fundsRequired} onChange={(e) => setFundsRequired(e.target.value)}/>
        <br /> <br />
        Reason:<br /><br />
        <input type="textarea" value={reason} onChange={(e) => setReason(e.target.value)} required rows="4" cols="50" />
        <br />
        <br />
        <br />
        <input type="submit" value="Submit!" />
        </form>

    </div>
}

export default FundForm;