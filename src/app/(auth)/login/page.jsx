"use client";

import Link from "next/link";
import { useActionState } from "react";

export default function Register() {
    const [state, action, isPending] = useActionState(() => {}, undefined);
    return (
        <div className="container w-1/2">
            <h1 className="title">Login</h1>
            <form action={action} className="space-y-4">
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" id="email" defaultValue={state?.email} />
                    {state?.errors?.email && <p className="error">{state.errors.email[0]}</p>}
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" id="password" />
                </div>

                <div className="flex items-end gap-4">
                    <button disabled={isPending} className="btn-primary">
                        {isPending ? "Loading..." : "Login"}
                    </button>

                    <Link href="/register" className="text-link">
                        or register-here
                    </Link>
                </div>
            </form>
        </div>
    );
}
