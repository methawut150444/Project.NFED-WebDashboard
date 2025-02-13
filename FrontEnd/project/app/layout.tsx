import "./globals.css"; 
import Sidebar from "../components/sidebar"; 

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <Sidebar />
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
