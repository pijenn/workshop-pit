import { useEffect, useState } from "react";
import { CheckUser, setUserData } from "../SessionHelper";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("🔐 Use your account");

    const navigation = useNavigate();

    useEffect(() => {
        if (!loading) return;

        setMsg("⏳ Authenticating...");

        fetch("http://localhost:3001/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                email,
                password,
            }),
        })
            .then((reply) => {
                return reply.json();
            })
            .then((reply) => {
                console.log(reply);
                setMsg("⏳  Redirecting...");
                setLoading(false);
                setTimeout(() => {
                    navigation("/login");
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                setMsg("❌  Error occurred");
                setLoading(false);
            });
    }, [loading]);

    return (
        <>
            <CheckUser forLoggedOut red>
                <div
                    className={`
        flex flex-col h-screen bg-[url("https://res.cloudinary.com/dr0lbokc5/image/upload/v1691679055/Dust_2_hncbc4.png")]
      `}
                >
                    <div className="flex flex-col justify-center text-center p-5 mt-20 text-2xl font-bold text-cust-blue">
                        <h1>Register</h1>
                    </div>
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            setLoading(true);
                        }}
                        className="self-center text-center md:text-left w-full max-w-sm text-gray-900 font-bold"
                    >
                        <div className="mb-4">
                            <label className="block text-md mb-2">
                                Username
                            </label>
                            <input
                                className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
                                name="username"
                                type="text"
                                value={username}
                                required
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-md mb-2">Email</label>
                            <input
                                className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
                                name="email"
                                type="text"
                                value={email}
                                required
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-md mb-2">
                                Password 🗝
                            </label>
                            <input
                                className="shadow appearance-none border rounded-md w-full px-4 py-3 focus:outline-none focus:shadow-lg"
                                name="password"
                                type="password"
                                required
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <div className="flex flex-col space-y-4 md:space-y-0 pt-4 md:pt-2 md:flex-row items-center justify-between">
                            <span
                                className={`${
                                    loading && "animate-pulse"
                                } text-sm text-gray-700 font-normal`}
                            >
                                {msg}
                            </span>
                            <button disabled={loading}>Register →</button>
                        </div>
                    </form>
                </div>
            </CheckUser>
        </>
    );
};

export default Register;
    