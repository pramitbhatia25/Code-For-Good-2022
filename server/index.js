const express = require('express')
const app = express()
const cors = require('cors')
const User = require('./models/user.model')
const mongoose = require('mongoose')
// const jwt = require('jsonwebtoken')
app.use(cors())
app.use(express.json())

const Application = require('./models/application.model')
const FundApplication = require('./models/fundApplication.model')
mongoose.connect('mongodb+srv://harshit:harshit@team53.vfbts.mongodb.net/team53Db')

app.get('/api/fetchApplications', async (req, res) => {
    try {
        const applications = await Application.find();
		res.json({ status: 'ok', applications:applications})
    }
    catch(err)
    {
		res.json({ status: 'error', error: err })
    }
})

app.post('/api/sendApplication', async (req, res) => {
	try {
		await Application.create({
			name: req.body.name,
			email: req.body.email,
			contact: req.body.contact,
			city: req.body.city,
			state: req.body.state,
			startupName: req.body.startupName,
			problemSolving: req.body.problemSolving,
			startupDesc: req.body.startupDesc,
			approvalStatus: req.body.approvalStatus,
		})
		res.json({ status: 'ok'})
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
})

app.post('/api/createStartupUser', async (req, res) => {

	try {
		await User.create({
			startupName: req.body.startupName,
			name: req.body.name,
			phone: req.body.phone,
			city: req.body.city,
			email: req.body.email,
			pass: req.body.pass,
			userType: req.body.userType,
            dateCreated: req.body.dateCreated,
		})
		console.log("ok")
		res.json({ status: 'ok' })
	} catch (err) {
        console.log(err);
		res.json({ status: 'error', error: err })
	}
})

app.put('/api/updateApprovalStatus', async (req, res) => {
    let status = req.body.status;
    let email = req.body.email;
	try {
		await Application.updateOne(
            {email: email},
            {$set: {approvalStatus: status}}
		);
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
})

app.post('/api/sendFundApplication', async (req, res) => {
	try {
		await FundApplication.create({
			name: req.body.name,
			email: req.body.email,
			contact: req.body.contact,
			startupName: req.body.startupName,
			fundsRequired: req.body.fundsRequired,
			reason: req.body.reason,
			approvalStatus: "Pending",
		})
		res.json({ status: 'ok'})
	} catch (err) {
		res.json({ status: 'error', error: err })
	}
})

app.post('/api/findFundRequest', async (req, res) => {
    const email = req.body.email;
    try {
    const userLogin = await FundApplication.find({email:email});
    res.json({status: "ok", user: userLogin});       
    } catch(err) {
        res.json({status:"error", error: err})
}
});

app.post('/api/find', async (req, res) => {
        const email = req.body.email;
        try {
        const userLogin = await User.findOne({email:email});
        res.json({status: "ok", user: userLogin});       
        } catch(err) {
            res.json({status:"error", error: err})
    }
});

app.post('/api/login', async (req, res) => {
    try{
        const {email, pass} = req.body;

        if(!email || !pass){
            res.status(400).json({error:"field incomplete"});
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
        const isMatch = pass == userLogin.pass;
        if(!isMatch){
            res.status(400).json({error:"user login unsuccesful"});
        }else{
            res.json({message:"user login succesful", userType: userLogin.userType});
        }}else{
            res.status(400).json({error:"user login unsuccesful"});
        }
        

    }catch (err) {
        console.log(err);
    }
});

app.listen(1337, () => {
	console.log('Server started on 1337')
})
