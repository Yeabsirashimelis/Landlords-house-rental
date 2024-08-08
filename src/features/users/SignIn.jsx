import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

function SignIn() {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isFirstTime, setIsFirstTime] = useState(true); // New state to track first-time sign-in
  const { signIn, user } = useAuth();
  const myId = user?.id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  async function handleOnClickLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const person = { userName, email, password, address, gender };
    try {
      await signIn(person);
      setUserName("");
      setEmail("");
      setPassword("");
      setAddress("");
      setGender("");
      queryClient.invalidateQueries({ queryKey: ["myListings", myId] });
      navigate(`/home`);
    } catch (error) {
      setError("Failed to sign in. Please check your credentials.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <form
        className="bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full max-w-md"
        onSubmit={handleOnClickLogin}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Sign In</h2>
        {error && <div className="mb-4 text-red-500">{error}</div>}
        <div className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-gray-400">User Name</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-400">Email</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-gray-400">Password</label>
            <input
              className="rounded-md px-4 py-2 bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isFirstTime && (
            <>
              <div className="flex flex-col gap-1">
                <label className="text-gray-400">Address</label>
                <input
                  className="rounded-md px-4 py-2 bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-gray-400">Gender</label>
                <select
                  className="rounded-md px-4 py-2 bg-gray-700 outline-none focus:ring-2 focus:ring-blue-500"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
            </>
          )}
          <button
            className="w-full text-white bg-blue-600 rounded-md px-4 py-2 mt-4 hover:bg-blue-700 active:scale-105 disabled:opacity-50"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
        <p className="mt-4 text-center text-gray-400">
          If it is your first time signing in, filling all of them could be
          crucial. If you already have an account, enter your username, email,
          and password.
        </p>
        <div className="flex items-center justify-center mt-4">
          <label className="text-gray-400 mr-2">First time here?</label>
          <input
            type="checkbox"
            checked={isFirstTime}
            onChange={(e) => setIsFirstTime(e.target.checked)}
            className="form-checkbox h-4 w-4 text-blue-600"
          />
        </div>
      </form>
    </div>
  );
}

export default SignIn;
