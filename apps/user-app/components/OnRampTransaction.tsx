import React from 'react'
import Card from '@repo/ui/Card'

// Define possible transaction statuses
export type TransactionStatus = 'Success' | 'Failure' | 'Processing'

// Interface for a single transaction
export interface ITransaction {
    time: Date;
    amount: number;
    status: TransactionStatus;
    provider: string;
}

// Interface for component props
export interface IOnRampTransactionProps {
    transactions: ITransaction[] | null;
}

const OnRampTransaction: React.FC<IOnRampTransactionProps> = ({ transactions }) => {
    if (!transactions) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions.map((t: ITransaction, index: number) => (
                <div key={index} className="flex justify-between">
                    <div>
                        <div className="text-sm">
                            Received INR
                        </div>
                        <div className="text-slate-600 text-xs">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className="flex flex-col justify-center">
                        + Rs {t.amount / 100}
                    </div>
                </div>
            ))}
        </div>
    </Card>
}

export default OnRampTransaction