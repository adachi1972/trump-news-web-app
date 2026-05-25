import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// アクセスを許可するメールアドレスのリスト（空にすると全Googleアカウントを許可）
// 特定のメールだけ許可したい場合は追加：["yourname@gmail.com"]
const ALLOWED_EMAILS: string[] = [];

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // ALLOWED_EMAILS が空なら全Googleアカウントを許可
      if (ALLOWED_EMAILS.length === 0) return true;
      return ALLOWED_EMAILS.includes(user.email ?? "");
    },
    authorized({ auth }) {
      return !!auth?.user;
    },
  },
  pages: {
    signIn: "/login",
  },
});
