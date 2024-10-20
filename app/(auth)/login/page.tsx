import { login } from "@/actions/user";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn } from "@/utils/auth";
import { getSession } from "@/utils/getSession";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

export default async function page() {

  const session = await getSession();
  console.log("session", session)
  const user = session?.user
  if(user) redirect('/')
  return (
    <div className="max-w-md w-full mt-10 rounded-none md:rounded-2xl mx-auto border border-[#121212] px-4 py-4">
      <form action={login}>
        <Label>Email</Label>
        <Input
          placeholder="abhisek@gmail.com"
          id="email"
          type="text"
          name="email"
        />
        <Label>Password</Label>
        <Input
          placeholder="******"
          id="password"
          type="password"
          name="password"
        />

        <Button className="w-full font-bold text-lg mt-4">Login</Button>

        <p>
          Dont have a account? <Link href="register">Register</Link>
        </p>
      </form>

      <div className="flex w-full gap-2 mt-10">
      <form action={async()=>{
        "use server";
        await signIn("github");
      }

      }>
      <Button className="flex-1">
          <IconBrandGithub /> <span>Github</span>
        </Button>
      </form>
      <form action={async()=>{
        "use server";
        await signIn("google")
      }}>
      <Button className="flex-1">
          <IconBrandGoogle /> <span>Google</span>
        </Button>
      </form>
      </div>
    </div>
  );
}
