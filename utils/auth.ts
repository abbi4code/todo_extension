import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prisma from "./db";
import { compare } from "bcryptjs";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const {handlers, signIn, signOut , auth}= NextAuth({
    providers: [

        GitHub({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        }),
        Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        }),
        Credentials({
            name: "credentials",
            credentials:{
                email: {label: "email", type: "email" },
                password: {label: "password", type: "password" }
            },
            authorize:async(credentials)=>{

                const email = credentials.email as string | undefined
                const password = credentials.password as string | undefined

                if(!email || !password){
                    return new CredentialsSignin("Please fill both credentials fields")
                }

                const existUser= await prisma.user.findUnique({
                    where: {
                        email: email
                    },
                    select:{
                        firstName:true,
                        password:true,
                        lastName:true,
                        email:true,
                        id:true
                    }
                })

                if(!existUser){
                    throw new Error("Invalid Credentials")
                }

                const validPassword = await compare(password,existUser.password)

                if(!validPassword){
                    throw new Error("Password didnt match")
                }

                const userData = {
                    firstName: existUser.firstName,
                    lastName: existUser.lastName,
                    email: existUser.email,
                    id: existUser.id
                }

                return userData

            }
        })
    ],
    pages:{
        signIn: "/login"
    },
    callbacks:{
        async session({session,token}){
            if(token?.sub){
                session.user.id = token.sub
            }
            return session

        },
        async signIn({user,account}){
            if(account?.provider === "google"){
                try {
                    const {email, name, image, id} = user;
                    const existUser = await prisma.user.findUnique({
                        where:{
                            email:email
                        }
                    })
                    if(!existUser){
                        await prisma.user.create({
                            data:{
                                email: email,
                                imageUrl:image,
                                firstName: name,
                                authProviderId: id
                            }
                        })
                    }else {
                        return true
                    }
                    
                } catch (error) {
                    throw new Error("Error while creating user")
                    
                }  

            }
            if(account?.provider === "credentials"){
                return true
            }else{
                return false;
            }

        }
    }
    
})