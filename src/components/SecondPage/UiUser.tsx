import { User2Icon, DeleteIcon } from "lucide-react";

interface UiUserProps {
  name: string;
  id: string;
  deleteUser: (id: string) => void;
}

export default function UiUser({ name, id, deleteUser }: UiUserProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-card border border-border rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-full bg-primary/10">
          <User2Icon className="size-5 text-primary" />
        </div>
        <div>
          <div className="font-medium text-card-foreground">
            {name.toUpperCase()}
          </div>
        </div>
      </div>

      <button
        onClick={() => deleteUser(id)}
        className="p-2 rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive focus:outline-none focus:ring-2 focus:ring-destructive/50 transition-colors"
        aria-label={`Delete user ${name}`}
      >
        <DeleteIcon className="size-4" />
      </button>
    </div>
  );
}
