import express from "express";
import { prisma } from "@payment-wallet-app/db/prismaClient";

const app = express()

app.post("/hdfcWebhook", async (req, res) => {
    // TODO : Add zod validation
    // TODO : logic for checking whether this webhook coming from hdfc bank use a webhook secret 
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.userId,
        amount: req.body.amount
    };
    try {
        await prisma.$transaction([
            prisma.balance.update({
                where: {
                    userId: Number(paymentInformation.userId)
                },
                data: {
                    amount: {
                        increment: Number(paymentInformation.amount)
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