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
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = (data: LoginSchema) => {
    console.log("login data", data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email:</Label>
        <Input {...register("email")} />
        <p>{errors.email?.message}</p>
      </div>
      <div>
        <Label>Password:</Label>
        <Input {...register("password")} />
        <p>{errors.password?.message}</p>
      </div>
      <Button type="submit">Login</Button>
    </form>
  );
}
