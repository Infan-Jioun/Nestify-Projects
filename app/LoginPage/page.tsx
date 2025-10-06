import { Suspense } from "react";
import { Login } from "../components/Login/Login";
import LoginSkeleton from "../components/Login/LoginSkeleton";


export default function LoginPage() {
  return (
    <Suspense fallback={<LoginSkeleton />}>
      <Login />
    </Suspense>
  );
}