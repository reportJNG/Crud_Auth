import { useRouter } from "next/navigation";
import { ThemeToggle } from "../ui/Themetoggle";
import { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import {
  Github,
  WorkflowIcon,
  UserCircle,
  LogOut,
  Settings,
  Eye,
  EyeClosed,
} from "lucide-react";
import { getuseract } from "@/app/actions/getusers";
import { toast } from "sonner";
import { users } from "@prisma/client";

export default function Main() {
  const routes = useRouter();
  const [toggleeye, setToggleEye] = useState<boolean>(false);
  const [users, setUsers] = useState<users[]>([]);
  //need here get all users and put them inside an array
  useEffect(() => {
    const getusers = async () => {
      const Result = await getuseract();
      if ("error" in Result) {
        toast.error(Result.error);
      } else {
        if (Result.success) {
          toast.success(Result.success);
          setUsers(Result.Users);
        }
      }
    };
    getusers();
  }, []);
  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-primary/20 to-secondary/20 border border-border">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-semibold">Users Dashboard</h1>
              <p className="text-sm text-muted-foreground">Adminstration</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                routes.push("/");
              }}
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              aria-label="Logout"
            >
              <LogOut className="h-5 w-5" />
            </button>
            <button
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10"
              aria-label="Settings"
            >
              <Settings className="h-5 w-5" />
            </button>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between p-4 rounded-lg border border-border bg-card">
            <div>
              <h2 className="text-lg font-semibold">User Visibility</h2>
              <p className="text-sm text-muted-foreground">
                Toggle to show or hide user list
              </p>
            </div>
            <button
              onClick={() => setToggleEye((prev) => !prev)}
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
            >
              {toggleeye ? (
                <>
                  <Eye className="h-4 w-4" />
                  <span>Hide Users</span>
                </>
              ) : (
                <>
                  <EyeClosed className="h-4 w-4" />
                  <span>Show Users</span>
                </>
              )}
            </button>
          </div>

          <div className="transition-all duration-300 ease-in-out">
            {toggleeye ? (
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <AllUsers users={users} />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-dashed border-border bg-card/50">
                <EyeClosed className="h-16 w-16 text-muted-foreground/40 mb-4" />
                <h3 className="text-lg font-medium mb-2">Users Hidden</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Click the Show Users button above to display the list of
                  registered users.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-card/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-sm text-muted-foreground">
              <p>© 2026 User Dashboard. All rights reserved.</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() =>
                  window.open("https://github.com/reportJNG", "_blank")
                }
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5" />
                <span className="hidden sm:inline">GitHub</span>
              </button>
              <button
                onClick={() =>
                  window.open("https://remalihamza.vercel.app/", "_blank")
                }
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 cursor-pointer"
                aria-label="Workflow"
              >
                <WorkflowIcon className="h-5 w-5" />
                <span className="hidden sm:inline">Workflow</span>
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
