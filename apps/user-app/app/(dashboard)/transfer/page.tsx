import prisma from "@repo/prisma/client";
import { AddMoneyCard } from "../../../components/AddMoneyCard";
import BalanceCard from "../../../components/BalanceCard";
import OnRampTransaction from "../../../components/OnRampTransaction";
import { auth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";

async function getBalance(userId: string) {
  //   const existingUser = await prisma.user.findUnique({
  //     where: { id:userId },
  // });

  // if(existingUser){
  //   console.log(existingUser)
  // }


  const balance = await prisma.balance.findFirst({
    where: {
      userId: userId, // Use userId directly from Clerk's getAuth()
    },
  });


  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getOnRampTransactions(userId: string) {
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: userId, // Use userId directly from Clerk's getAuth()
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function TransferPage(req: NextRequest) {
  // Get authentication data from Clerk
  // const { userId } = await auth();
  const userId  = "yoyo1"
  console.log(userId)

  if (!userId) {
    throw new Error("User not authenticated");
  }

  // Fetch balance and transactions
  const [balance, transactions] = await Promise.all([
    getBalance(userId),
    getOnRampTransactions(userId),
  ]);

  return (
    <div className="w-screen">
      <div className="text-4xl text-[#6a51a6] pt-8 mb-8 font-bold">
        Transfer
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 p-4">
        <div>
          <AddMoneyCard />
        </div>
        <div>
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <div className="pt-4">
            <OnRampTransaction transactions={transactions} />
          </div>
        </div>
      </div>
    </div>
  );
}
