import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData,
      );
      login(res.data.user, res.data.token);
      Swal.fire({
        title: "Welcome Back!",
        text: "Login successful",
        icon: "success",
      });
      navigate("/dashboard");
    } catch (error) {
      Swal.fire({
        title: "Login Failed",
        text: error.response?.data?.message || "Invalid credentials",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-base-200 to-base-300 flex items-center justify-center p-4">
      <div className="w-full max-w-5xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 border border-white/20">
        <div className="hidden lg:flex bg-error/10 items-center justify-center p-12">
          <img
            src="/login.png"
            alt="Security login"
            className="w-full h-auto max-h-112.5 object-contain rounded-2xl border border-white/20 shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:shadow-error/20"
          />
        </div>

        <div className="p-8 md:p-16 flex flex-col justify-center">
          <div className="mb-10">
            <h2 className="text-4xl font-extrabold text-base-content mb-2">
              Welcome Back
            </h2>
            <p className="text-base-content/60">
              Enter your credentials to access your dashboard.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered w-full focus:ring-2 focus:ring-error"
                placeholder="name@example.com"
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="input input-bordered w-full focus:ring-2 focus:ring-error"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn btn-error w-full text-white text-lg shadow-lg hover:shadow-red-500/20 transition-all ${loading ? "loading" : ""}`}
            >
              {loading ? "Authenticating..." : "Sign In"}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-base-content/70">
              New here?{" "}
              <Link
                to="/register"
                className="text-error font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
