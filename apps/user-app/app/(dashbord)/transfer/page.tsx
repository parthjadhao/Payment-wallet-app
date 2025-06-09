import {prisma} from "@payment-wallet-app/db/prismaClient";
import { AddMoney } from "../../../components/addMoneyCard";
import { BalanceCard } from "../../../components/balanceCard";
import { OnRampTransactions } from "../../../components/onRampTransaction";
import { getServerSession } from "next-auth";
import { Next_Auth_CONFIG } from "../../../lib/auth";

async function getBalance() {
    const session = await getServerSession(Next_Auth_CONFIG);
    console.log('-----------------------------',session)
    console.log('-------------------------------------------',session.user.id)
    const id = session.user.id
    // const balance = await prisma.balance.findFirst({
    //     where: {
    //         userId : Number(id)
    //     }
    // });
    const balance = await prisma.balance.findFirst({
        where:{
            userId : Number(id)
        }
    })
    console.log('---------------------------------',balance)
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnRampTransactions() {
    const session = await getServerSession(Next_Auth_CONFIG);
    const txns = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    });
    return txns.map(t => ({
        time: t.startTime,
        amount: t.amount,
        status: t.status,
        provider: t.provider
    }))
}

export default async function() {
    const balance = await getBalance();
    const transactions = await getOnRampTransactions();
    console.log('----------',balance)

    return <div className="w-screen">
        <div className="text-4xl text-white pt-8 mb-8 font-bold">
            Transfer
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
            <div>
                <AddMoney />
            </div>
            <div>
                <div>
                    <BalanceCard amount={balance.amount} locked={balance.locked} />
                </div>
                <div className="pt-4">
                    <OnRampTransactions transactions={transactions} />
                </div>
            </div>
        </div>
    </div>
}

