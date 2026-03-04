
import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import API from "../api/axios";
import LeftPanel from "../components/LeftPanel";
import PasswordInput from "../components/PasswordInput";
import Alert from "../components/Alert";
import { BookIcon, UserIcon, ArrowIcon, SpinnerIcon } from "../components/Icons";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await API.post("/auth/login", form);
      login(res.data.token);
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid username or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex">
      <LeftPanel
        headline={`Every book<br/>has a story<br/><span class="text-teal-400">to tell.</span>`}
        subheadline="A modern platform to manage your entire library — track books, borrowers, and availability all in one place."
        features={[
       
        ]}
      />

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">

         
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center text-white">
              <BookIcon />
            </div>
            <span className="text-white font-bold text-lg">
              Library<span className="text-teal-400">MS</span>
            </span>
          </div>

          <h2 className="text-white text-3xl font-bold mb-1">Welcome back</h2>
          <p className="text-slate-400 text-sm mb-7">Sign in to access your library dashboard</p>

          <Alert type="error" message={error} />

          <form onSubmit={handleSubmit} className="space-y-4">
         
            <div>
              <label className="block text-xs text-slate-400 font-semibold uppercase tracking-wider mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
                  <UserIcon />
                </div>
                <input
                  type="text"
                  required
                  placeholder="Enter your username"
                  value={form.username}
                  onChange={(e) => setForm({ ...form, username: e.target.value })}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500 transition"
                />
              </div>
            </div>

            
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-400 disabled:bg-teal-500/40 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl text-sm transition-all mt-2"
            >
              {loading ? (
                <><SpinnerIcon /> Signing in…</>
              ) : (
                <><span>Sign In</span><ArrowIcon /></>
              )}
            </button>
          </form>

          <p className="text-center text-slate-500 text-sm mt-6">
            Don't have an account?{" "}
            <Link to="/register" className="text-teal-400 hover:text-teal-300 font-medium transition-colors">
              Create one
            </Link>
          </p>

          <p className="text-center text-slate-600 text-xs mt-4">
            © 2026 Library Management System
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
