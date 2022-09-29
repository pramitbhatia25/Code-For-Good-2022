const mongoose = require('mongoose')

const Application = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		contact: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		startupName: { type: String, required: true },
		problemSolving: { type: String, required: true },
		startupDesc: { type: String, required: true },
		approvalStatus: {type: String}
},
	{ collection: 'applicationData' }
)

const model = mongoose.model('ApplicationData', Application)

module.exports = model
