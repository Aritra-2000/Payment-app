const express = require('express');
const zod = require('zod');
const { User, Account } = require('../db');
const jwt = require('jsonwebtoken');
const { authMiddleware } = require('../middleware');
const { JWT_SECRET } = require('../config');

const router = express.Router();

const signupBody = zod.object({

    userName: zod.string().email(),
    firstName: zod.string(),
    lastName: zod.string(),
    password: zod.string(),

})

router.post('/signup', async (req, res) => {

    const { success } = signupBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        userName: req.body.userName
    });

    if (existingUser) {
        return res.status(411).json({
            message: "Email alredy taken"
        })
    }

    const user = await User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    });

    const userId = user._id;

    await Account.create({
        userId,
        balance: 1 + Math.random() * 1000
    });

    const token = jwt.sign({
        userId
    }, JWT_SECRET);

    res.json({
        message: "User created successfully",
        token: token,
    })

});

const userBody = zod.object({
    userName: zod.string().email(),
    password: zod.string(),
})

router.post('/signin', async (req, res) => {

    const { success } = userBody.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            message: "Incorrect inputs"
        })
    }

    const user = await User.findOne({
        userName: req.body.userName,
        password: req.body.password,
    });

    if (!user) {
        res.status(401).json({
            message: "Incorrect Password or Email"
        })
    }
    const token = jwt.sign({
        userId: user._id
    }, JWT_SECRET);

    res.status(200).json({
        message: "Login Successfully",
        token: token,
        user
    })
});


const updateody = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
});


router.put('/', authMiddleware, async (req, res) => {
    const { success } = updateody.safeParse(req.body);

    if (!success) {
        return res.status(403).json({
            message: "Error while updating information"
        })
    }

    await User.updateOne(req.body, {
        _id: req.userId
    });

    res.json({
        message: "Updated successfully"
    })
});


router.get("/bulk", async (req, res) => {

    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports = router;
