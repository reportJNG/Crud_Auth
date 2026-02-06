"use client";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
export default function Main() {
  const [switcher, setSwitcher] = useState<boolean>(false);
  return (
    <div>
      <header>
        {/**top header of the main webpage normal state will show the login webpage to change btw pages login and sign up */}
        <Tabs defaultValue="overview">
          <TabsList variant="line">
            <TabsTrigger value="Login" onClick={() => setSwitcher(false)}>
              Login
            </TabsTrigger>
            <TabsTrigger value="Sign up" onClick={() => setSwitcher(true)}>
              Sign up
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </header>
      <body></body>
    </div>
  );
}
