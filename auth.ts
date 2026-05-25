import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

// アクセスを許可するメールアドレスのリスト
// 追加したい場合はカンマ区切りで増やす：["a@gmail.com", "b@gmail.com"]
const ALLOWED_EMAILS: string[] = [
  "adachi1972@gmail.com",
];

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
