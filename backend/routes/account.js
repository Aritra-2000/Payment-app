const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();


router.get('/balance', authMiddleware, async (req, res) => {

    const account = await Account.findOne({
        userId: req.userId,
    });

    res.json({
        balance: account.balance
    })
});


router.post('/transfer', authMiddleware, async (req, res) => {

    const session = await mongoose.startSession();

    session.startTransaction();

    const { amount, to } = req.body;

    const account = await Account.findOne({ userId: req.userId }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            messege: "Insufficient balance"
        })
    }

    const toAccount = await Account.find({ userId: to }).session(session);

    if (!toAccount) {
        session.abortTransaction();
        return res.status(400).json({
            messege: "invalide account"
        })
    }

    await Account.updateOne({userId : req.userId}, {$inc: {balance: -amount}}).session(session);
    await Account.updateOne({userId: to}, {$inc: {balance: +amount}}).session(session);

    await session.commitTransaction();

    res.json({
        messege: "trancfer successfully"
    })

})


module.exports = router;