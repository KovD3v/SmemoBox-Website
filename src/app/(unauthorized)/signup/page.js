"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignUp() {
    const router = useRouter();
    const supabase = createClientComponentClient()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async (e) => {
        e.preventDefault();
        await supabase.auth.signUp({
            email,
            password,
            options: {
                //${location.origin}
                emailRedirectTo: `http://localhost:3000/auth/callback`
            },
        });
        router.refresh();
    }

    return (
        <form className="flex flex-col gap-4 justify-center items-center h-screen">
            <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} className="bg-[#1be37d] p-3 rounded-lg text-white" autoComplete="email" />
            <input type="password" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} className="bg-[#1be37d] p-3 rounded-lg text-white" autoComplete="current-password" />
            <button onClick={handleSignUp} className="bg-[#1be37d] p-3 rounded-lg text-white">SignUp</button>
        </form>
    );
}
