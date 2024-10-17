import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';

export const authOptions = {
  
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      
      async authorize(credentials) {
        const user = { 
          id: "1", 
          name: "Victor Pinheiro", 
          email: "victorca2011@email.com", 
          password: bcrypt.hashSync("123secret", 10) 
        };

        if (credentials?.email === user.email && 
          bcrypt.compareSync(credentials.password, user.password)) {
        return user; 
      }
      return null;
      }
    })
  ],
  pages: {
    signIn: '/auth/signin'  // Caminho personalizado para a página de login
  },
  secret: process.env.NEXTAUTH_SECRET, // Certifique-se de que este valor esteja no .env
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
