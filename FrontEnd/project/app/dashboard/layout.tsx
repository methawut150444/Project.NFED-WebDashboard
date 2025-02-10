import "../globals.css"; // ✅ Import Tailwind styles
import Sidebar from "../../components/sidebar"; // Update path if necessary

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex">
      <Sidebar />
      <main className="p-5 w-full">{children}</main>
    </div>
  );
}