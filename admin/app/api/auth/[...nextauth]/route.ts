import NextAuth from "next-auth";
import { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { JWT } from "next-auth/jwt";

// Interface cho response từ BE login API
interface LoginResponse {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  isActive: boolean;
}

// Interface cho user được trả về từ authorize
interface AuthorizedUser {
  id: string;
  email: string;
  name: string;
  role: string;
  accessToken: string;
  isActive: boolean;
}

// Thêm type declaration
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      role: string;
      accessToken: string;
      isActive: boolean;
    };
  }
}

export const authOptions: any = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials): Promise<AuthorizedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          console.log("Missing credentials");
          return null;
        }

        try {
          console.log("Calling API with:", {
            email: credentials.email,
            password: credentials.password,
          });

          const res = await fetch("http://localhost:3001/api/vgm/auth/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          console.log("API Response status:", res.status);

          if (!res.ok) {
            const error = await res.json();
            console.log("API Error:", error);
            throw new Error(error.message || "Authentication failed");
          }

          const user: LoginResponse = await res.json();
          console.log("API Success:", user);

          if (!user.isActive) {
            throw new Error("Tài khoản đã bị khóa");
          }

          return user;
        } catch (err: any) {
          console.error("Auth Error:", err);
          throw new Error(err.message || "Authentication failed");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // Tăng thời gian session lên 30 ngày
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: AuthorizedUser | null }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.role = "admin";
        token.accessToken = user.accessToken;
        token.isActive = user.isActive;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.role = token.role;
        session.user.accessToken = token.accessToken;
        session.user.isActive = token.isActive;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
      },
    },
  },
};

export const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
