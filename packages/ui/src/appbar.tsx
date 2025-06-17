import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export function Appbar({ user, onSignin, onSignout }: AppbarProps) {
    return <div className="flex justify-between px-50 py-2 border-b border-slate-700 items-center">
        <div className="font-bold text-2xl text-blue-500">
            Wallet
        </div>
        <Button onclick={user ? onSignin : onSignout}>
            {user ? "Logout" : "Login"}
        </Button>

    </div>
}