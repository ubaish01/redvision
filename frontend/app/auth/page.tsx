import dynamic from "next/dynamic";

//@ts-ignore
const AuthForm = dynamic(() => import("@/components/auth-form"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="w-screen h-screen flex items-center justify-center">
      {/* @ts-ignore */}
      <AuthForm />
    </div>
  );
}
