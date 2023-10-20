"use client"

import { useRouter } from "next/navigation"

export default function Box({ box }) {
    const router = useRouter()
    const expandBox = () => {
        router.push(`/boxes/${box.id}`)
    }

    return (
        <button onClick={expandBox} className="flex flex-col shadow-xl m-3 p-3 rounded-xl gap-1 bg-green-600 text-white">
            {box.name}
        </button>
    )
}