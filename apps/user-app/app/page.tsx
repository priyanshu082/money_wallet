import {PrismaClient} from "@repo/prisma/client"
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs'

const client=new PrismaClient();

export default function Home() {
  return (
    <div className=" h-[100vh] flex justify-center flex-col items-center">
 <SignedOut>
      <SignInButton />
    </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
<div>
      USER_APP
</div>
    </div>
  );
}
