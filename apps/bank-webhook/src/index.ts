import express from "express"
import prisma from "@repo/prisma/client"
import jwt from "jsonwebtoken"

const app = express()

app.post("/hdfc", async (req, res) => {
    const payementInformation = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    }
    //for ensuring both the transaction happens at the same time , or we can say if one failed than both of them should cancel we can wrap them into single transaction

    try {
        await prisma.$transaction([

            prisma.balance.update({
                where: {
                    userId: payementInformation.userId
                },
                data: {
                    amount: Number(payementInformation.amount)
                }
            }),

            prisma.onRampTransaction.update({
                where: {
                    token: payementInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])


        res.json({
            message: "success"
        })
    } catch (error) {
        console.log(error)
        res.status(411).json({
            message: "failed"
        })
    }
})

const generateToken =async (userId: string) => {
    return jwt.sign(
        { userId },
        process.env.JWT_SECRET || 'priyanshu',
        { expiresIn: '24h' }
    )
}

app.post("/user", async (req, res) => {
    const user = req.body
    try {
        const userExist = await prisma.user.findUnique({
            where: {
                number: user.number
            }
        })
        if (!userExist) {
            res.status(401).json({
                message: "user not found"
            })
        } else {
            const token = await generateToken(userExist.id)
            res.json({
                message: "login success",
                token: token
            })
        }
    } catch (error) {
        console.log(error)
        res.status(411).json({
            message: "failed"
        })
    }
})

