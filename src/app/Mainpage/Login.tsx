import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, LoginSchema } from "@/schemas/login.schema";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
    console.log("login data", data);
  };
  const [visible, setVisible] = useState<{ email: boolean; password: boolean }>(
    { email: false, password: false },
  );
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email:</Label>
        <Input {...register("email")} maxLength={30} />
        {visible.email && <p>{errors.email?.message}</p>}
      </div>
      <div>
        <Label>Password:</Label>
        <Input {...register("password")} minLength={6} maxLength={8} />
        {visible.password && <p>{errors.password?.message}</p>}
      </div>
      <div>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
