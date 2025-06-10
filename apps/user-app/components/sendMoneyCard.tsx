"use client"
import { Card } from "@payment-wallet-app/ui/card";
import { TextInput } from "@payment-wallet-app/ui/textinput";
import { useState } from "react";
import { Button } from "@payment-wallet-app/ui/button";
import { p2pTransfer } from "../lib/actionP2pTxn";

export default function SendMoneyCard() {
    const [number, setNumber] = useState<string>()
    const [amount, setAmount] = useState<string>()
    return <Card title="Send Money">
        <div className="min-w-72">
            <TextInput label="Number" placeholder="Number" onChange={(value) => {
                setNumber(value);
            }} />
            <TextInput label="Amount" placeholder="Amount" onChange={(value) => {
                setAmount(value)
            }} />
            <div className="mt-3">
                <Button onclick={async () => {
                    if (!number) {
                        return {
                            message : "please enter the number of user who you want to send"
                        }
                    }
                    p2pTransfer(number,Number(amount))
                }}>Send</Button>
            </div>
        </div >
    </Card>
}