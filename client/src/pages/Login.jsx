import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    setErr("");

    try {
      const res = await fetch("https://fullstack-todo-app-s1z7.onrender.com/auth/login", {  //http://localhost:8000/auth/login
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ⭐ Save token to localStorage
      localStorage.setItem("token", data.token);

      // Navigate to dashboard
      navigate("/dashboard");

    } catch (error) {
      setErr(error.message);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md bg-white p-10 rounded-3xl shadow-xl">
        <h2 className="text-3xl font-bold">Login</h2>
        <p className="text-gray-500">to get started</p>

        <form onSubmit={handleLogin} className="mt-8 space-y-5">
          {err && <p className="text-red-500 text-sm">{err}</p>}

          <input
            type="email"
            placeholder="shivam@gmail.com"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-blue-700 text-white text-lg font-medium hover:bg-blue-800 transition"
          >
            Continue
          </button>
        </form>

        <p className="text-center text-sm mt-6 text-gray-600">
          New User?{" "}
          <Link className="text-black font-medium" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
