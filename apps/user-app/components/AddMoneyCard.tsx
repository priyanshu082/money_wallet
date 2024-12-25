"use client"
import { Button } from "@repo/ui/Button";
import  Card  from "@repo/ui/Card";
import  Center  from "@repo/ui/Center";
import  Select  from "@repo/ui/Select";
import { useState } from "react";
import  TextInput  from "@repo/ui/TextInput";

const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];

export const AddMoneyCard = () => {
    const handleSelect=(value:String)=>{
        setRedirectUrl(SUPPORTED_BANKS.find(x=>x.name===value)?.redirectUrl)
    }

    const [redirectUrl, setRedirectUrl] = useState(SUPPORTED_BANKS[0]?.redirectUrl);
  return <Card title="Add Money">
     <div className="w-full">
    <TextInput placeholder="Amount" label="Amount" onChange={()=>{}}/>
        <div>
            Bank
        </div>
        <Select onSelect={handleSelect} options={SUPPORTED_BANKS.map(x=>({
            key:x.name,
            value:x.name
        }))}/>

<div className="flex justify-center pt-4">
            <Button onClick={() => {
                window.location.href = redirectUrl || "";
            }}>
            Add Money
            </Button>
        </div>
    </div>
  </Card>
}