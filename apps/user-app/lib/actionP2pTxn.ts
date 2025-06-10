"use server"
import { getServerSession } from "next-auth";
import { Next_Auth_CONFIG } from "./auth";
import { prisma } from "@payment-wallet-app/db/prismaClient";

export async function p2pTransfer(to: string, amount: number) {
    amount = amount * 100;
    const session = await getServerSession(Next_Auth_CONFIG)
    const from = session?.user?.id;
    if (!from) {
        return {
            message: 'Error while sending message'
        }
    }
    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    });
    if (!toUser) {
        return {
            message: 'User no found'
        }
    }
    await prisma.$transaction(async (tx) => {
        await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
        const fromBalance = await tx.balance.findUnique({
            where: { userId: Number(from) }
        });
        if (!fromBalance || fromBalance.amount < amount) {
            throw new Error('Insufficient funds')
        }
        await tx.balance.update({
            where: { userId: Number(from) },
            data: { amount: { decrement: amount } },
        });

        await tx.balance.upsert({
            where: { userId: toUser.id },
            update: {
                amount: { increment: amount }
            },
            create: {
                userId: toUser.id,
                amount: amount,
                locked: 0,
            }
        })

        await tx.p2pTransfer.create({
            data: {
                amount: amount,
                timestamp: new Date(),
                fromUserId: Number(from),
                toUserId: Number(toUser.id)
            }
        })
    })
}