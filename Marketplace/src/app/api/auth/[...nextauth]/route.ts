import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Здесь должна быть проверка учетных данных в базе данных
        // Временная демо-логика
        if (credentials?.email === "seller@example.com" && credentials?.password === "password") {
          return {
            id: "1",
            email: credentials.email,
            name: "Demo Seller",
          };
        }
        return null;
      }
    })
  ],
  pages: {
    signIn: '/sellers/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }; 