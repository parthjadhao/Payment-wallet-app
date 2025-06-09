import { prisma } from "@payment-wallet-app/db/prismaClient";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { Session } from "inspector/promises";


export const Next_Auth_CONFIG = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                number: { label: 'phone', type: 'text', placeholder: 'phone number' },
                password: { label: 'Password', type: 'password', placeholder: 'Enter Password' },
            },
            async authorize(credentials: any) {
                console.log(`phone no loged ${credentials.number}`)
                console.log(`password no loged ${credentials.password}`)
                const hashedPassword = await bcrypt.hash(credentials.password, 10);
                console.log(`hashedpassword no loged ${hashedPassword}`)

                const existingUser = await prisma.user.findFirst({
                    where : {
                        number : credentials.number
                    }
                });

                if (existingUser) {
                    const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                    if (passwordValidation) {
                        return {
                            id: existingUser.id.toString(),
                            name: existingUser.name,
                            email: existingUser.email
                        }
                    }
                    return null
                }
                try {
                    const user = await prisma.user.create({
                        data: {
                            number: credentials.number,
                            password: hashedPassword
                        }
                    })

                    // TODO : feat to send otp to user phone number and verify it

                    return {
                        id: user.id.toString(),
                        name: user.name,
                        email: user.email
                    }
                } catch (e) {
                    console.error(e);
                }
                return null
            },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    callbacks:{
        async session({token,session}:any){
            session.user.id = token.sub

            return session
        }
    }
}