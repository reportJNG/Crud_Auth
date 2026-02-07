import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Signupschema, signupschema } from "@/schemas/signup.schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Signupschema>({ resolver: zodResolver(signupschema) });
  const onSubmit = (data: Signupschema) => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Label>Email:</Label>
        <Input {...register("email")} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <Label>Password:</Label>
        <Input {...register("password")} />
        {errors.password && <p>{errors.password.message}</p>}
      </div>
      <div>
        <Label>Confirme password:</Label>
        <Input {...register("confirmpassword")} />
        {errors.confirmpassword && <p>{errors.confirmpassword.message}</p>}
      </div>
      <div>
        <Button type="reset">Reset</Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
