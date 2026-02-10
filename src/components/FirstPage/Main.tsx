import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Login from "./Login";
import Signup from "./Signup";
import { ThemeToggle } from "../ui/Themetoggle";

export default function Main() {
  const [switcher, setSwitcher] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState("Login");
  const tabsSwitcher = (tab: "Login" | "Sign up") => {
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-background to-muted/20 p-4 ">
      <ThemeToggle />
      <div className="w-full max-w-md">
        <div className="bg-card border border-border rounded-2xl shadow-xl shadow-primary/5 p-6 ">
          <header className="mb-8">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList
                variant="line"
                className="w-full grid grid-cols-2  p-1 rounded-lg"
              >
                <TabsTrigger
                  value="Login"
                  onClick={() => {
                    setSwitcher(false);
                  }}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value="Sign up"
                  onClick={() => setSwitcher(true)}
                  className="data-[state=active]:bg-background data-[state=active]:shadow-sm rounded-md transition-all duration-200"
                >
                  Sign up
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </header>
          <body className="relative">
            <div className="overflow-hidden">
              <div
                className={`transition-all duration-300 ease-in-out ${!switcher ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute  w-full"}`}
              >
                <Login setSwitcher={setSwitcher} tabsSwitcher={tabsSwitcher} />
              </div>
              <div
                className={`transition-all duration-300 ease-in-out ${switcher ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full absolute top-0 w-full"}`}
              >
                <Signup setSwitcher={setSwitcher} tabsSwitcher={tabsSwitcher} />
              </div>
            </div>
          </body>
        </div>
      </div>
    </div>
  );
}
