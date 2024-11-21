import {PrismaClient} from "@repo/prisma/client"

const client=new PrismaClient();

export default function Home() {
  return (
    <div className="bg-yellow-400 h-[100vh]">
     hello
      
    </div>
  );
}
