"use server";
import { signIn } from "@/utils/auth";
import prisma from "@/utils/db";
import { hash } from "bcryptjs";
import { redirect } from "next/navigation";

export const login = async (formData: FormData) => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const result = await signIn("credentials", {
      redirect: false, 
      callbackUrl: "/",
      email,
      password,
    });
    console.log("resultttttt",result)

    if (result?.error) {
      console.error("Login failed:", result.error);
      throw new Error(result.error);
    }
    return redirect(result.url || "/");
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};


export const register = async (formData: FormData) => {
  const firstName = formData.get("firstname") as string;
  const lastName = formData.get("lastname") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    if (!firstName || !lastName || !email || !password) {
      throw new Error("Fill all fields");
    }

    const existUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existUser) {
      throw new Error("User already exists");
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
      },
    });

    console.log("user created", user);

    // Immediately return redirect after user is created
    return redirect("login")
    
    
  } catch (error) {
    console.error("Error", error);
    throw error;
  }
  
};
