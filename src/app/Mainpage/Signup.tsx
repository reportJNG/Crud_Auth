import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Signupschema, signupschema } from "@/schemas/signup.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm<Signupschema>({ resolver: zodResolver(signupschema) });

  const onSubmit = (data: Signupschema) => {};

  const [visible, setVisible] = useState<{
    email: boolean;
    password: boolean;
    confirmpassword: boolean;
  }>({ email: false, password: false, confirmpassword: false });

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

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email:</Label>
        <Input {...register("email")} maxLength={30} />
        {visible.email && <p>{errors.email?.message}</p>}
      </div>
      <div>
        <Label>Password:</Label>
        <Input {...register("password")} maxLength={8} minLength={6} />
        {visible.password && <p>{errors.password?.message}</p>}
      </div>
      <div>
        <Label>Confirme password:</Label>
        <Input {...register("confirmpassword")} maxLength={8} minLength={6} />
        {visible.confirmpassword && <p>{errors.confirmpassword?.message}</p>}
      </div>
      <div>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
