import { UserCircle2Icon, X } from "lucide-react";

interface Confirmeprops {
  yes: () => void;
  no: () => void;
}

export default function Confirme({ yes, no }: Confirmeprops) {
  return (
    <>
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 animate-in fade-in-0"
        onClick={no}
      />

      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-6 animate-in fade-in-0 zoom-in-95 duration-200">
          <button
            onClick={no}
            className="absolute right-4 top-4 p-1 rounded-sm opacity-70 hover:opacity-100 hover:bg-accent transition-all focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/10 rounded-full animate-ping" />
              <div className="relative p-3 bg-destructive/10 rounded-full">
                <UserCircle2Icon className="h-12 w-12 text-destructive" />
              </div>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-foreground">
                Are You Sure Delete User?
              </h2>

              <div>
                <p className="text-sm text-muted-foreground">
                  This action is permanent and cannot be undone. All user data
                  will be permanently deleted from our servers.
                </p>
              </div>
            </div>

            <div className="flex gap-3 w-full">
              <button
                onClick={no}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors focus:outline-none focus:ring-2 focus:ring-ring"
              >
                Cancel
              </button>
              <button
                onClick={yes}
                className="flex-1 px-4 py-2 text-sm font-medium rounded-md bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors focus:outline-none focus:ring-2 focus:ring-destructive"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
