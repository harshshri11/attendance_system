'use client'
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [role, setRole] = useState("headmaster");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();

    const credentials = {
      headmaster: { email: "headmaster@example.com", password: "headmaster123" },
      teacher: { email: "teacher@example.com", password: "teacher123" },
      parent:{email:"parent@example.com", password:"parents123"}
    };
    console.log(role)
    if (credentials[role] && email === credentials[role].email && password === credentials[role].password) {
      router.push(`/${role}`);
    } else {
      setError("Invalid email or password");
    }
  };

  const isRoleParent = () => {
    return role == "parent"
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">{role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>

        <div className="flex justify-center gap-4 mb-6">
          {["headmaster", "teacher", "parent"].map((r) => (
            <button
              key={r}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${role === r ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"}`}
              onClick={() => setRole(r)}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </button>
          ))}
        </div>

        <form className="space-y-4" onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">{isRoleParent() ? "Contact Number" : "Email"}</label>
            <input
              type="email"
              placeholder={isRoleParent() ? "Enter your contact number" : "Enter your email"}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={isRoleParent() ? contactNo : email}
              onChange={(e) => isRoleParent() ? setContactNo(e.target.value) : setEmail(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
