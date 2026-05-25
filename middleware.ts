export { auth as middleware } from "@/auth";

export const config = {
  // 静的ファイル・認証APIルートは除外、それ以外は全部保護
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
};
