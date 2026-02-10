import { UserSquare } from "lucide-react";
import { users } from "@prisma/client";
import UiUser from "./UiUser";

interface AllUsersProps {
  users: users[];
}

export default function AllUsers({ users }: AllUsersProps) {
  const handleDeleteUsers = async (id: string) => {
    // Implement delete functionality
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-6 lg:p-8">
      <div className="mb-8 flex items-center gap-3 rounded-lg border border-border bg-card p-4 shadow-sm md:p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 md:h-12 md:w-12">
          <UserSquare className="h-5 w-5 text-primary md:h-6 md:w-6" />
        </div>
        <div>
          <h1 className="text-xl font-semibold text-card-foreground md:text-2xl lg:text-3xl">
            All Users
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {users.length} {users.length === 1 ? "user" : "users"} found
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {users.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {users.map((user) => (
              <div
                key={user.id}
                className="transform rounded-lg border border-border bg-card p-4 shadow-sm transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
              >
                <UiUser
                  name={user.name}
                  id={user.id}
                  deleteUser={handleDeleteUsers}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-card/50 py-16">
            <UserSquare className="mb-4 h-12 w-12 text-muted-foreground/50" />
            <h3 className="text-lg font-medium text-muted-foreground">
              No users found
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Users will appear here once they are added
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
