import { useMemo, useState } from "react";
import {
  EyeOff,
  Eye,
  Mail,
  Lock,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ArrowRight,
  User,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/queries/userApi";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Layout from "../../Layout";
import { loginUserSchema } from "../../schema/userSchema";

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [touched, setTouched] = useState({ email: false, password: false });
  const { email, password } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };

  // ✅ Device helpers (no extra libs)
  const getDeviceInfo = () => {
    const ua = navigator.userAgent || "";
    const platform = navigator?.userAgentData?.platform || navigator.platform || "";
    const language = navigator.language || "";
    const screenSize =
      typeof window !== "undefined" ? `${window.screen.width}x${window.screen.height}` : "";
    const timezone =
      typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "";
    return { userAgent: ua, platform, language, screen: screenSize, timezone };
  };

  const errors = useMemo(() => {
    const result = loginUserSchema.safeParse({ email, password });
    if (result.success) return {};
    const map = {};
    for (const issue of result.error.issues) map[issue.path?.[0]] = issue.message;
    return map;
  }, [email, password]);

  const canSubmit = email && password && Object.keys(errors).length === 0 && !isLoading;

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      if (!email || !password) {
        setTouched({ email: true, password: true });
        return toast.error("All fields are required", { position: "top-center" });
      }

      const result = loginUserSchema.safeParse({ email, password });
      if (!result.success) {
        setTouched({ email: true, password: true });
        return toast.error(result.error.issues[0].message, { position: "top-center" });
      }

      const deviceInfo = getDeviceInfo();

      const res = await loginUser({ email, password, deviceInfo }).unwrap();

      dispatch(setUserInfo({ ...res }));

      // Ecommerce-friendly: go back if coming from checkout/cart
      navigate(-1);
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "An error occurred", {
        position: "top-center",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center   bg-gradient-to-b from-zinc-50 to-white px-4 ">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 overflow-hidden rounded-3xl border bg-white shadow-[0_20px_60px_-35px_rgba(0,0,0,0.45)] lg:grid-cols-2">
          {/* Left: Value/Trust panel */}
          <div className="relative hidden lg:block">
            <div className="absolute inset-0 bg-zinc-900" />
            <div className="absolute inset-0 opacity-30">
              <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute -bottom-28 -right-28 h-80 w-80 rounded-full bg-white/10 blur-3xl" />
            </div>

            <div className="relative flex h-full flex-col justify-between p-10 text-white">
              <div>
                <p className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
                  <ShieldCheck size={14} /> Secure checkout
                </p>

                <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                  Welcome back to your store
                </h2>
                <p className="mt-2 text-white/80">
                  Sign in to track orders, save addresses, and checkout faster.
                </p>

                <div className="mt-8 space-y-3">
                  <TrustItem
                    icon={Truck}
                    title="Fast delivery"
                    desc="Quick shipping options available."
                  />
                  <TrustItem
                    icon={RotateCcw}
                    title="Easy returns"
                    desc="Hassle-free returns & refunds."
                  />
                  <TrustItem
                    icon={CreditCard}
                    title="Safe payments"
                    desc="Payments are encrypted and protected."
                  />
                </div>
              </div>

              <div className="text-sm text-white/70">
                Need help?{" "}
                <Link
                  to="/contact"
                  className="font-semibold text-white underline underline-offset-4">
                  Contact support
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="p-6 sm:p-10">
            <div className="mx-auto max-w-md">
              <div className="mb-6">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Log in</h1>
                <p className="mt-1 text-sm text-zinc-600">
                  Access your account to continue shopping.
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Email */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-800">Email</label>
                  <div
                    className={[
                      "group flex h-11 items-center gap-2 rounded-2xl border bg-zinc-50 px-3",
                      "focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-900/10",
                      touched.email && errors.email ? "border-red-400 ring-red-500/10" : "",
                    ].join(" ")}>
                    <Mail size={18} className="text-zinc-500 group-focus-within:text-zinc-900" />
                    <input
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="you@example.com"
                      className="h-full w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      autoComplete="email"
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div
                    className={[
                      "group flex h-11 items-center gap-2 rounded-2xl border bg-zinc-50 px-3 pr-2",
                      "focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-900/10",
                      touched.password && errors.password ? "border-red-400 ring-red-500/10" : "",
                    ].join(" ")}>
                    <Lock size={18} className="text-zinc-500 group-focus-within:text-zinc-900" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      className="h-full w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      autoComplete="current-password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
                      aria-label={showPassword ? "Hide password" : "Show password"}>
                      {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                    </button>
                  </div>

                  {touched.password && errors.password && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
                  )}
                </div>

                {/* Remember + guest */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm text-zinc-700">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-zinc-300 text-zinc-900 focus:ring-zinc-900"
                    />
                    Remember me
                  </label>
                </div>

                {/* Primary CTA */}
                <button
                  disabled={!canSubmit}
                  type="submit"
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-900 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Signing in
                    </span>
                  ) : (
                    <>
                      Log in
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                {/* Secondary CTA */}
                <Link
                  to="/register"
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-md border bg-white text-sm font-semibold text-zinc-900 hover:bg-zinc-50">
                  <User size={16} />
                  Create account
                </Link>

                <p className="pt-2 text-center text-xs text-zinc-500">
                  By continuing, you agree to our Terms & Privacy Policy.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

function TrustItem({ icon: Icon, title, desc }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white/10 p-4">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/10">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-0.5 text-sm text-white/80">{desc}</p>
      </div>
    </div>
  );
}

export default Login;
