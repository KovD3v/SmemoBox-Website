"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";

const linkClass = "bg-green-400 p-3 rounded-lg text-white";

export default function Navbar() {
	const router = useRouter();
	const supabase = createClientComponentClient();
	const handleSignOut = async () => {
		await supabase.auth.signOut();
		router.refresh();
	};
	return (
		<div className="flex m-3 justify-between">
			<div id="right" className="flex gap-4">
				<Link
					href="/"
					className={linkClass}>
					Home
				</Link>
				<Link
					href="/boxes"
					className={linkClass}>
					Boxes
				</Link>
				<Link
					href="/profile"
					className={linkClass}>
					Profile
				</Link>
			</div>
			<div id="left" className="flex gap-4">
				<button
					className={linkClass}
					onClick={handleSignOut}>
					LogOut
				</button>
				<Link
					href="/signin"
					className={linkClass}>
					SignIn
				</Link>
				<Link
					href="/signup"
					className={linkClass}>
					SignUp
				</Link>
			</div>
		</div>
	);
}
