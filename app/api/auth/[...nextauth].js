import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import User from './models/User'

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }), 
    CredentialsProvider({
      name:'credentials', 
      async authorize(credentials, req){
        const user = await User.findOne({email: credentials.email});
        if(!user){
          throw new Error('No User found with that email')
        }

        const isPasswordCorrect = await compare(credentials.password, user.password);

        if(!isPasswordCorrect){
          throw new Error("Incorrect Password")
        }

        return {email: user.email}
      }
    })
  ], 
  secret: process.env.NEXTAUTH_SECRET, 
  session: {
    strategy: 'jwt'
  }, 
  callbacks: {
    async jwt({token, user}){
      if(user){
        token.email = user.email
      }
      return token
    },
    async session({sesion, token}){
      session.user.email = token.email
      return session;
    }
  }, 
  pages: {
    singIn: '/signin'
  }
})
