import { UserSquare } from "lucide-react";
import { users } from "@prisma/client";
import UiUser from "./UiUser";
interface AllUsersprops {
  users: users[];
}
export default function AllUsers({ users }: AllUsersprops) {
  const HandleDeleteUsers = async (id: string) => {};
  return (
    <div>
      <div>
        <UserSquare />
        <h1>All Users</h1>
      </div>
      <div>
        {users.map((val, i) => (
          <div key={i}>
            {" "}
            <UiUser
              name={val.name}
              id={val.id}
              deleteUser={HandleDeleteUsers}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
