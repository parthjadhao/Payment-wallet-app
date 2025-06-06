"use client"
import { Button } from "@payment-wallet-app/ui/button";
import { Card } from "@payment-wallet-app/ui/card";
import { Center } from "@payment-wallet-app/ui/center";
import { Select } from "@payment-wallet-app/ui/select";
import { useState } from "react";
import { TextInput } from "@payment-wallet-app/ui/textinput";
import { signIn } from "next-auth/react";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoney = () => {
    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
    return <Card title="Add Money">
    <div className="w-full">
        <TextInput label={"Amount"} placeholder={"Amount"} onChange={() => {

        }} />
        <div className="py-4 text-left">
            Bank
        </div>
        <Select onSelect={(value) => {
            setRedirectUrl(SUPPORTED_BANKS.find(x => x.name === value)?.redirectUrl || "")
        }} options={SUPPORTED_BANKS.map(x => ({
            key: x.name,
            value: x.name
        }))} />
        <div className="flex justify-center pt-4">
            {/* <Button onClick={() => {
                window.location.href = redirectUrl || "";
            }}> */}
            <Button onclick={signIn}>
            Add Money
            </Button>
        </div>
    </div>
</Card>
}