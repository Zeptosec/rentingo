import { ValidateEmail } from "@/utils/utils";
import { FormEvent, useState } from "react"

export default function Signup () {

    const [email, setEmail] = useState({ error: false, val: "" });
    const [password, setPassword] = useState({ error: false, val: "" });
    const [repeat, setRepeat] = useState({ error: false, val: "" });


    async function signup(w: FormEvent) {
        w.preventDefault(); // prevent page from refreshing
        let errors = false;
        if (!ValidateEmail(email.val)) {
            setEmail(curr => ({ ...curr, error: true }));
            errors = true;
        }
        if (password.val.length < 8) {
            setPassword(curr => ({ ...curr, error: true }));
            errors = true;
        }
        if (password.val === repeat.val) {
            setPassword(curr => ({ ...curr, error: true }));
            setRepeat(curr => ({ ...curr, error: true }));
            errors = true;
        }
        if (!errors) {
            setEmail(curr => ({ ...curr, error: false }));
            setPassword(curr => ({ ...curr, error: false }));
            setRepeat(curr => ({ ...curr, error: false }));
            alert("signup")
        }
    }

    return (
        <div className="h-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
            <div className="relative py-3 sm:max-w-xl sm:mx-auto">
                <div
                    className="absolute inset-0 bg-gradient-to-r from-blue-300 to-blue-600 shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                </div>
                <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 min-w-[500px]">
                    <div className="max-w-md mx-auto">
                        <div>
                            <h1 className="text-2xl font-semibold">Sign up</h1>
                        </div>
                        <div className="divide-y divide-gray-200">
                            <form onSubmit={w => signup(w)} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                                <div className="relative">
                                    <input onChange={w => setEmail(curr => ({ ...curr, val: w.target.value }))} value={email.val} autoComplete="off" id="email" name="email" type="text" className={`peer placeholder-transparent h-10 w-full border-b-2 ${email.error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Email address" />
                                    <label htmlFor="email" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Email Address</label>
                                </div>
                                <div className="relative">
                                    <input onChange={w => setPassword(curr => ({ ...curr, val: w.target.value }))} value={password.val} autoComplete="off" id="password" name="password" type="password" className={`peer placeholder-transparent h-10 w-full border-b-2 ${password.error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Password" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Password</label>
                                </div>
                                <div className="relative">
                                    <input onChange={w => setRepeat(curr => ({ ...curr, val: w.target.value }))} value={repeat.val} autoComplete="off" id="password" name="password" type="password" className={`peer placeholder-transparent h-10 w-full border-b-2 ${repeat.error ? 'border-red-500' : 'border-gray-300'} text-gray-900 focus:outline-none focus:borer-rose-600`} placeholder="Repeat" />
                                    <label htmlFor="password" className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm">Repeat</label>
                                </div>
                                <div className="relative">
                                    <button className="bg-blue-500 text-white rounded-md px-2 py-1">Sign up</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}