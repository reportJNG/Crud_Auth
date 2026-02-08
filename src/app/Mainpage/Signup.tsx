import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Signupschema, signupschema } from "@/schemas/signup.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  UserPlus,
  AlertCircle,
} from "lucide-react";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    watch,
  } = useForm<Signupschema>({ resolver: zodResolver(signupschema) });

  const onSubmit = async (data: Signupschema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
  };

  const [visible, setVisible] = useState<{
    email: boolean;
    password: boolean;
    confirmpassword: boolean;
  }>({ email: false, password: false, confirmpassword: false });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmpassword: false,
  });

  const password = watch("password");
  const confirmPassword = watch("confirmpassword");

  useEffect(() => {
    if (errors.email?.message && errors.password && errors.confirmpassword) {
      const id = setTimeout(
        () =>
          setVisible((prev) => ({
            ...prev,
            email: true,
            password: true,
            confirmpassword: true,
          })),
        0,
      );
      const timer = setTimeout(() => {
        setVisible((prev) => ({
          ...prev,
          email: false,
          password: false,
          confirmpassword: false,
        }));
        clearErrors("email");
        clearErrors("password");
      }, 3000);
      return () => {
        clearTimeout(id);
        clearTimeout(timer);
      };
    } else {
      if (errors.email?.message) {
        const id = setTimeout(
          () => setVisible((prev) => ({ ...prev, email: true })),
          0,
        );
        const timer = setTimeout(() => {
          setVisible((prev) => ({ ...prev, email: false }));
          clearErrors("email");
        }, 3000);
        return () => {
          clearTimeout(id);
          clearTimeout(timer);
        };
      }
      if (errors.password?.message) {
        const id = setTimeout(
          () => setVisible((prev) => ({ ...prev, password: true })),
          0,
        );
        const timer = setTimeout(() => {
          setVisible((prev) => ({ ...prev, password: false }));
          clearErrors("password");
        }, 3000);
        return () => {
          clearTimeout(id);
          clearTimeout(timer);
        };
      }
      if (errors.confirmpassword?.message) {
        const id = setTimeout(
          () => setVisible((prev) => ({ ...prev, confirmpassword: true })),
          0,
        );
        const timer = setTimeout(() => {
          setVisible((prev) => ({ ...prev, password: false }));
          clearErrors("confirmpassword");
        }, 3000);
        return () => {
          clearTimeout(id);
          clearTimeout(timer);
        };
      }
    }
  }, [errors, clearErrors]);

  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 6) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[0-9]/.test(pass)) strength += 25;
    if (/[^A-Za-z0-9]/.test(pass)) strength += 25;
    return strength;
  };

  const passwordStrength = getPasswordStrength(password || "");
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/30 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/50 backdrop-blur-sm rounded-2xl shadow-xl border border-border p-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  maxLength={30}
                  placeholder="you@example.com"
                  className={`pl-10 pr-10 py-6 ${errors.email && visible.email ? "border-destructive" : "border-input"}`}
                />
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                {errors.email && visible.email ? (
                  <XCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-destructive" />
                ) : (
                  <CheckCircle2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-green-500 opacity-50" />
                )}
              </div>
              {visible.email && errors.email?.message && (
                <div className="flex items-center gap-2 text-destructive text-sm animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.email.message}</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Password
                <span className="text-xs text-muted-foreground ml-auto">
                  {password ? `${password.length}/8` : "0/8"}
                </span>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword.password ? "text" : "password"}
                  {...register("password")}
                  maxLength={8}
                  minLength={6}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 py-6 ${errors.password && visible.password ? "border-destructive" : "border-input"}`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      password: !prev.password,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword.password ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {password && (
                <div className="space-y-2">
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-300 ${
                        passwordStrength <= 25
                          ? "bg-destructive"
                          : passwordStrength <= 50
                            ? "bg-orange-500"
                            : passwordStrength <= 75
                              ? "bg-yellow-500"
                              : "bg-green-500"
                      }`}
                      style={{ width: `${passwordStrength}%` }}
                    />
                  </div>
                  <div className="text-xs text-muted-foreground flex justify-between">
                    <span>Weak</span>
                    <span>Strong</span>
                  </div>
                </div>
              )}

              {visible.password && errors.password?.message && (
                <div className="flex items-center gap-2 text-destructive text-sm animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.password.message}</span>
                </div>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="space-y-2">
              <Label
                htmlFor="confirmpassword"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmpassword"
                  type={showPassword.confirmpassword ? "text" : "password"}
                  {...register("confirmpassword")}
                  maxLength={8}
                  minLength={6}
                  placeholder="••••••••"
                  className={`pl-10 pr-10 py-6 ${
                    errors.confirmpassword && visible.confirmpassword
                      ? "border-destructive"
                      : password &&
                          confirmPassword &&
                          password === confirmPassword
                        ? "border-green-500"
                        : "border-input"
                  }`}
                />
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword((prev) => ({
                      ...prev,
                      confirmpassword: !prev.confirmpassword,
                    }))
                  }
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword.confirmpassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              {/* Password Match Indicator */}
              {password && confirmPassword && (
                <div
                  className={`flex items-center gap-2 text-sm ${
                    password === confirmPassword
                      ? "text-green-500"
                      : "text-destructive"
                  }`}
                >
                  {password === confirmPassword ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  <span>
                    {password === confirmPassword
                      ? "Passwords match"
                      : "Passwords do not match"}
                  </span>
                </div>
              )}

              {visible.confirmpassword && errors.confirmpassword?.message && (
                <div className="flex items-center gap-2 text-destructive text-sm animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-4 h-4" />
                  <span>{errors.confirmpassword.message}</span>
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 h-12 gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all shadow-lg hover:shadow-xl cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <UserPlus className="w-4 h-4" />
                    Create Account
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="text-center mt-6">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="#" className="text-primary font-medium hover:underline">
                Sign in
              </a>
            </p>
          </div>
        </div>
        <p className="text-xs text-center text-muted-foreground pt-4 border-t border-border">
          By creating an account, you agree to our{" "}
          <a href="#" className="text-primary hover:underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="text-primary hover:underline">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
