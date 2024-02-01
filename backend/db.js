const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://Aritra:Aritra123@cluster0.nxosm3a.mongodb.net/paytm?retryWrites=true&w=majority");

const userShema = new mongoose.Schema({

    userName: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        lowercase: true,
        minLength: 3,
        maxLength: 30
    },
    password: {
        type: String,
        require: true,
        minLength: 6
    },
    firstName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 30
    },
    lastName: {
        type: String,
        require: true,
        trim: true,
        maxLength: 30
    }
});


const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    balance: {
        type: Number,
        require: true,
    }
});


const User = mongoose.model('User', userShema);
const Account = mongoose.model('Account', accountSchema);


module.exports = {
    User,
    Account
};