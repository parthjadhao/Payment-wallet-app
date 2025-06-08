"use client"

import { ReactNode } from "react"

interface ButtonProps {
    children: ReactNode,
    onclick: () => void
}

export function Button({ onclick, children }: ButtonProps) {
    return <button type="button" onClick={onclick} className="text-black bg-white hover:bg-white/90 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">
        {children}
    </button>
}