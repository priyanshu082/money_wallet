import { NextResponse } from 'next/server';
import prisma from '@repo/prisma/client';

export async function POST(req: Request) {
    try {
        const userData = await req.json();
        if (!userData || !userData.id || !userData.number) {
            return NextResponse.json(
                { error: 'Invalid input data' },
                { status: 400 }
            );
        }

        const existingUser = await prisma.user.findUnique({
            where: { id: userData.id },
        });

        if (existingUser) {
            // Return only the userId
            return NextResponse.json({ id: existingUser.id });
        }

        const newUser = await prisma.user.create({
            data: {
                id: userData.id,
                number: userData.number,
                Balance: {
                    create: {
                        amount: 0,
                        locked: 0,
                    },
                },
            },
        });

        // Return only the userId
        return NextResponse.json({ id: newUser.id });
    } catch (error) {
        console.error('Error in /api/users:', error);
        return NextResponse.json(
            // @ts-ignore
            { error: 'Failed to process user data', details: error.message },
            { status: 500 }
        );
    }
}
