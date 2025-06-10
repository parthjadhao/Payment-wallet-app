import express from "express";
import { prisma } from "@payment-wallet-app/db/prismaClient";

const app = express()

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    // TODO : Add zod validation
    // TODO : logic for checking whether this webhook coming from hdfc bank use a webhook secret 
    // TODO : check wheter if this onRampTxn status is processing or not
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    };
    console.log(paymentInformation)
    try {
        await prisma.$transaction([
            prisma.balance.upsert({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                update:{
                    amount : {increment : Number(req.body.amount)}
                },
                create:{
                    amount : Number(req.body.amount),
                    locked : 0,
                    user : {
                        connect : {id : paymentInformation.userId}
                    }
                }
            }),
            prisma.onRampTransaction.update({
                where: {
                    token: paymentInformation.token
                },
                data: {
                    status: "Success"
                }
            })
        ])
        res.json({
            message: "Captured"
        })
    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }
})

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});