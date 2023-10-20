"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
    const router = useRouter();
    const supabase = createClientComponentClient()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (e) => {
        e.preventDefault();
        await supabase.auth.signInWithPassword({
            email,
            password,
        });
        router.refresh();
    }

    return (
        <form className="flex flex-col gap-4 justify-center items-center h-screen">
            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="bg-[#1be37d] p-3 rounded-lg text-white" autoComplete="email" />
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="bg-[#1be37d] p-3 rounded-lg text-white" autoComplete="current-password" />
            <button onClick={handleSignIn} className="bg-[#1be37d] p-3 rounded-lg text-white">LogIn</button>
        </form>
    );
}
