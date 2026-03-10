export default function LoginLayout({ children }: { children: React.ReactNode }) {
  // Login page gets its own layout — no sidebar
  return <>{children}</>;
}
