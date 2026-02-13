import { useMemo, useState } from "react";
import {
  EyeOff,
  Eye,
  Mail,
  Lock,
  User as UserIcon,
  Phone,
  ShieldCheck,
  Truck,
  RotateCcw,
  CreditCard,
  ArrowRight,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import Layout from "../../Layout";
import { useRegisterUserMutation } from "../../redux/queries/userApi";
import { registerUserSchema } from "../../schema/userSchema";

function Register() {
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    phone: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const { name, phone, email, password, confirmPassword } = form;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((p) => ({ ...p, [name]: true }));
  };

  const errors = useMemo(() => {
    // schema doesn't include confirmPassword, so validate it separately
    const result = registerUserSchema.safeParse({ name, email, phone, password });
    const map = {};

    if (!result.success) {
      for (const issue of result.error.issues) map[issue.path?.[0]] = issue.message;
    }

    if (confirmPassword && password !== confirmPassword) {
      map.confirmPassword = "Passwords do not match";
    }

    return map;
  }, [name, phone, email, password, confirmPassword]);

  const canSubmit =
    name &&
    phone &&
    email &&
    password &&
    confirmPassword &&
    Object.keys(errors).length === 0 &&
    !isLoading;

  const handleRegister = async (e) => {
    e.preventDefault();

    // mark all as touched for inline errors
    setTouched({
      name: true,
      phone: true,
      email: true,
      password: true,
      confirmPassword: true,
    });

    const result = registerUserSchema.safeParse({ name, email, phone, password });
    if (!result.success) return toast.error(result.error.issues[0].message);

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match", { position: "top-center" });
    }

    try {
      const res = await registerUser({ name, email, phone, password, confirmPassword }).unwrap();
      dispatch(setUserInfo({ ...res }));
      navigate("/profile");
    } catch (error) {
      toast.error(error?.data?.message || error?.error || "An error occurred", {
        position: "top-center",
      });
    }
  };

  return (
    <Layout>
      <div className="min-h-screen flex items-center bg-gradient-to-b from-zinc-50 to-white px-4 py-20">
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
                  <ShieldCheck size={14} /> Create account securely
                </p>

                <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                  Join and checkout faster
                </h2>
                <p className="mt-2 text-white/80">
                  Save your address, track orders, and get a smoother shopping experience.
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
                    desc="Encrypted and protected payments."
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
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                  Create account
                </h1>
                <p className="mt-1 text-sm text-zinc-600">It only takes a minute.</p>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                {/* Name */}
                <Field
                  label="Name"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Your name"
                  Icon={UserIcon}
                  error={touched.name ? errors.name : ""}
                />

                {/* Email */}
                <Field
                  label="Email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="you@example.com"
                  Icon={Mail}
                  error={touched.email ? errors.email : ""}
                  autoComplete="email"
                />

                {/* Phone (+965) */}
                {/* Phone */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-800">Phone</label>

                  <div
                    className={[
                      "group flex h-11 items-center rounded-2xl border bg-zinc-50",
                      "focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-900/10",
                      touched.phone && errors.phone ? "border-red-400 ring-red-500/10" : "",
                    ].join(" ")}>
                    {/* Country Code inside input */}
                    <span className="pl-3 pr-2 text-sm font-semibold text-zinc-700">+965</span>

                    <input
                      type="tel"
                      name="phone"
                      value={phone}
                      onChange={(e) => {
                        // only allow numbers
                        const numeric = e.target.value.replace(/\D/g, "");
                        setForm((prev) => ({ ...prev, phone: numeric }));
                      }}
                      onBlur={handleBlur}
                      placeholder="XXXXXXXX"
                      inputMode="numeric"
                      className="h-full w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400 pr-3"
                      autoComplete="tel"
                    />
                  </div>

                  {touched.phone && errors.phone && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.phone}</p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-800">Password</label>
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
                      autoComplete="new-password"
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

                {/* Confirm password */}
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-zinc-800">
                    Confirm password
                  </label>
                  <div
                    className={[
                      "group flex h-11 items-center gap-2 rounded-2xl border bg-zinc-50 px-3",
                      "focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-900/10",
                      touched.confirmPassword && errors.confirmPassword
                        ? "border-red-400 ring-red-500/10"
                        : "",
                    ].join(" ")}>
                    <Lock size={18} className="text-zinc-500 group-focus-within:text-zinc-900" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="••••••••"
                      className="h-full w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
                      autoComplete="new-password"
                    />
                  </div>
                  {touched.confirmPassword && errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-600">{errors.confirmPassword}</p>
                  )}
                </div>

                {/* Primary CTA */}
                <button
                  disabled={!canSubmit}
                  type="submit"
                  className="group flex h-11 w-full items-center justify-center gap-2 rounded-md bg-zinc-900 text-sm font-semibold text-white shadow-sm hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60">
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      Creating account
                    </span>
                  ) : (
                    <>
                      Register
                      <ArrowRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5"
                      />
                    </>
                  )}
                </button>

                <p className="pt-2 text-center text-sm text-zinc-600">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-zinc-900 underline underline-offset-4">
                    Sign in
                  </Link>
                </p>

                <p className="pt-1 text-center text-xs text-zinc-500">
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

function Field({ label, Icon, error, ...props }) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-medium text-zinc-800">{label}</label>
      <div
        className={[
          "group flex h-11 items-center gap-2 rounded-2xl border bg-zinc-50 px-3",
          "focus-within:border-zinc-900 focus-within:ring-4 focus-within:ring-zinc-900/10",
          error ? "border-red-400 ring-red-500/10" : "",
        ].join(" ")}>
        <Icon size={18} className="text-zinc-500 group-focus-within:text-zinc-900" />
        <input
          {...props}
          className="h-full w-full bg-transparent text-sm text-zinc-900 outline-none placeholder:text-zinc-400"
        />
      </div>
      {error ? <p className="mt-1.5 text-xs text-red-600">{error}</p> : null}
    </div>
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

export default Register;
