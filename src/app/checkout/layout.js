import AuthGuard from "@/components/templates/AuthGuard";

export default async function checkoutLayout({ children }) {
  return <AuthGuard>{children}</AuthGuard>;
}
