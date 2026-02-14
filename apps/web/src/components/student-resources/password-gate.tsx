"use client";

import { useState } from "react";
import { verifyPassword } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function PasswordGate() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    try {
      const result = await verifyPassword(password);
      if (result.success) {
        window.location.reload();
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-cream px-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center">
          <h1 className="font-bold text-3xl tracking-tight">Student Resources</h1>
          <p className="mt-2 text-muted-foreground">
            Enter the password to access exclusive materials.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={error ? "border-red-500" : ""}
            />
            {error && (
              <p className="mt-2 text-red-500 text-sm">Incorrect password. Please try again.</p>
            )}
          </div>
          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Verifying..." : "Access Resources"}
          </Button>
        </form>
      </div>
    </div>
  );
}
