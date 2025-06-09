"use server"

import { prisma } from "@payment-wallet-app/db/prismaClient";
import { Next_Auth_CONFIG } from "./auth";
import { getServerSession } from "next-auth";

export async function CreateOnRampTxn(amount: number, provider: string) {
    const session = await getServerSession(Next_Auth_CONFIG)
    const token = Math.random().toString()
    const userId = session?.user?.id;
    if(!userId){
        return {
            message : "user not logged in"
        }
    }
    await prisma.onRampTransaction.create({
        data:{
            userId : Number(userId),
            amount : amount,
            status : "Processing",
            startTime : new Date(),
            provider,
            token : token
        }
    })
}