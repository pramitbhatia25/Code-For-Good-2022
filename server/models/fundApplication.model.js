const mongoose = require('mongoose')

const FundApplication = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true },
		contact: { type: String, required: true },
		startupName: { type: String, required: true },
        fundsRequired: {type: Number, required:true },
        reason: { type: String, required: true },
        approvalStatus: { type: String, required: true },
},
	{ collection: 'fundApplicationData1' }
)

const model = mongoose.model('FundApplicationData1', FundApplication)

module.exports = model
