"use client";
import React from "react";
import { useNavigate } from "react-router-dom";
import { Label } from "../../components/ui/aceternityLabel";
import { Input } from "../../components/ui/aceternityInput";
import { cn } from "../../utils/utils";

export function Login() {
const navigate = useNavigate();
const [isLogin, setIsLogin] = React.useState(false);
const handleSubmit = async (e) => {
  e.preventDefault();

  const username = e.target.username.value;
  const password = e.target.password.value;

  try {
    const res = await fetch("https://localhost:7244/api/FantasyUserAccessToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userName: username, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Login failed.");
      return;
    }

    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);
    localStorage.setItem("role", data.role);

    navigate(data.role === "admin" ? "/adminPanel" : "/profile");
  } catch (err) {
    alert("An error occurred during login.");
  }
};

return (
    <div className="flex items-center justify-center min-h-screen w-screen bg-black dark:bg-black">
        <div className="shadow-input w-full max-w-md rounded-2xl bg-white p-4 md:p-8 dark:bg-zinc-900">
            <h2 className="text-xl font-bold text-neutral-800 dark:text-neutral-200">
                {isLogin ? "Login to Fantasy Realm" : "Welcome to Fantasy Realm"}
            </h2>
            <p className="mt-2 max-w-sm text-sm text-neutral-600 dark:text-neutral-300">
                {isLogin ? "Access your fantasy profile!" : "Signup now and find out your fantasy personality!"}
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                {!isLogin && (
                <div className="mb-4 flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-2">
                    <LabelInputContainer>
                        <Label htmlFor="firstname">First name</Label>
                        <Input id="firstname" placeholder="Tyler" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer>
                        <Label htmlFor="lastname">Last name</Label>
                        <Input id="lastname" placeholder="Durden" type="text" />
                    </LabelInputContainer>
                    <LabelInputContainer className="mb-4">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" placeholder="projectmayhem@fc.com" type="email" />
                    </LabelInputContainer>
                </div>
                )}
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="username">Username</Label>
                    <Input id="username" placeholder="tyler_durden" type="text" />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" placeholder="••••••••" type="password" />
                </LabelInputContainer>

                <button
                className="group/btn relative block h-10 w-full rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset]"
                type="submit">
                {isLogin ? "Login" : "Sign up"} &rarr;
                <BottomGradient />
                </button>

                <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-neutral-300 to-transparent dark:via-neutral-700" />
            </form>
            <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
                {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="font-medium text-black dark:text-white"
                >
                {isLogin ? "Sign up" : "Login"}
                </button>
            </p>
        </div>
    </div>
);
}

const BottomGradient = () => {
    return (
        <>
        <span
            className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
        <span
            className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className
}) => {
    return (
        <div className={cn("flex w-full flex-col space-y-2", className)}>
        {children}
        </div>
    );
};
