import { useState } from "react";
import { useRouter } from "next/router";
import { userLogin } from "../api/user";
import { signInWithEmailAndPassword, User } from "firebase/auth";
import { auth } from "../firebase/clientApp";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const token = await userCredential.user.getIdToken();

      const userData = await userLogin(token, { email: email });
      localStorage.setItem("user", JSON.stringify(userData));
      router.push("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unknown error occurred.");
      }
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        ></input>
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: "100%", padding: 8, marginBottom: 12 }}
        ></input>
        <button type="submit" style={{ width: "20%", padding: 8 }}>
          Login
        </button>
      </form>
      {error && <p>Error: {error}</p>}
    </div>
  );
}
