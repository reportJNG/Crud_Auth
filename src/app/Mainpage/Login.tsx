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
  const [emailVisible, setEmailVisible] = useState(false);
  useEffect(() => {
    if (errors.email?.message) {
      const id = setTimeout(() => setEmailVisible(true), 0);
      const timer = setTimeout(() => {
        setEmailVisible(false);
        clearErrors("email");
      }, 3000);
      return () => {
        clearTimeout(id);
        clearTimeout(timer);
      };
    }
  }, [errors.email?.message, clearErrors]);
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email:</Label>
        <Input {...register("email")} />
        {emailVisible && <p>{errors.email?.message}</p>}
      </div>
      <div>
        <Label>Password:</Label>
        <Input {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <div>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
