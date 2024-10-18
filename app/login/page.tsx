import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { IconBrandGithub, IconBrandGoogle } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";

export default function page() {
  return (
    <div className="max-w-md w-full mt-10 rounded-none md:rounded-2xl mx-auto border border-[#121212] px-4 py-4">
      <form action="">
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
        <Button className="flex-1">
          <IconBrandGithub /> <span>Github</span>
        </Button>
        <Button className="flex-1">
          <IconBrandGoogle /> <span>Google</span>
        </Button>
      </div>
    </div>
  );
}
