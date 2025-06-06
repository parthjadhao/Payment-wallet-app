import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    onSignin: any,
    onSignout: any
}

export function Appbar({ user, onSignin, onSignout }: AppbarProps) {
    return <div className="flex justify-between p-2 border-b items-center">
        <div className="font-semibold text-2xl">
            Wallet
        </div>
        <Button onclick={user ? onSignin : onSignout}>
            {user ? "Logout" : "Login"}
        </Button>

    </div>
}