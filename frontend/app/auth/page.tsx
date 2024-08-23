import { AuthForm } from "@/components/auth-form";
import { Toaster } from "sonner";

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* @ts-ignore */}
      <AuthForm />
    </div>
  );
}
