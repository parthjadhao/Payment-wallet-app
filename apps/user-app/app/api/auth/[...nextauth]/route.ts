import NextAuth from "next-auth";
import { Next_Auth_CONFIG } from "../../../../lib/auth";

const handler = NextAuth(Next_Auth_CONFIG)

export {handler as GET, handler as POST}