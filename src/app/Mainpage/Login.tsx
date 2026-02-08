import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

import { toast } from "sonner";

interface Signupprops {
  setSwitcher: React.Dispatch<React.SetStateAction<boolean>>;
  tabsSwitcher: (tab: "Login" | "Sign up") => void;
}

export default function Login({ setSwitcher, tabsSwitcher }: Signupprops) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    clearErrors,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = (data: LoginSchema) => {
    console.log("login data", data);
    toast.loading("Seccusefully");
  };

  const [visible, setVisible] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false },
  );
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (errors.email?.message && errors.password) {
      const id = setTimeout(
        () => setVisible((prev) => ({ ...prev, email: true, password: true })),
        0,
      );
      const timer = setTimeout(() => {
        setVisible((prev) => ({ ...prev, email: false, password: false }));
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
    }
  }, [errors, clearErrors]);

  return (
    <div className="min-h-screen flex items-center justify-center  from-background via-secondary/10 to-primary/5 p-4">
      <div className="w-full max-w-md">
        <div className="bg-card/95  rounded-2xl  overflow-hidden">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="px-8 py-6 space-y-6"
          >
            {" "}
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                </div>
                <Input
                  id="email"
                  {...register("email")}
                  maxLength={30}
                  className="pl-10 pr-4 py-6 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="you@example.com"
                />
                {!errors.email && visible.email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  </div>
                )}
              </div>
              {visible.email && errors.email?.message && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{errors.email.message}</span>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-sm font-medium flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Password
              </Label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                  <Lock className="w-5 h-5" />
                </div>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  minLength={6}
                  maxLength={8}
                  className="pl-10 pr-12 py-6 bg-background/50 border-border/50 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {visible.password && errors.password?.message && (
                <div className="flex items-center gap-2 text-sm text-destructive animate-in slide-in-from-top-1 duration-200">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span className="font-medium">{errors.password.message}</span>
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-border bg-background/50 focus:ring-primary/50"
                />
                <span className="text-muted-foreground">Remember me</span>
              </label>
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
              >
                Forgot password?
              </a>
            </div>
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting || !isValid}
                className="flex-1 py-6 bg-linear-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-5 h-5 mr-2 animate-spin" />
                    Signing In...
                  </>
                ) : (
                  <>
                    <LogIn className="w-5 h-5 mr-2" />
                    Sign In
                  </>
                )}
              </Button>
            </div>
          </form>
          <div className="px-8 py-6 bg-secondary/5 border-t border-border/50 text-center">
            <p className="text-sm text-muted-foreground">
              Dont have an account?{" "}
              <a
                href="#"
                className="text-primary hover:text-primary/80 font-medium transition-colors hover:underline"
                onClick={() => {
                  setSwitcher(true);
                  tabsSwitcher("Sign up");
                }}
              >
                Sign up now
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
