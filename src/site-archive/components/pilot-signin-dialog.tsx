import { useState, type FormEvent, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PilotSignInDialog({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [notice, setNotice] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setNotice(true);
  };
  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) setNotice(false); }}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>SynoraDrive Pilot Portal Sign-In</DialogTitle>
          <DialogDescription>Invited dealership pilot accounts only.</DialogDescription>
        </DialogHeader>
        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="pilot-email">Work email</Label>
            <Input id="pilot-email" type="email" autoComplete="username" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pilot-password">Password</Label>
            <Input id="pilot-password" type="password" autoComplete="current-password" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="pilot-totp">6-digit authenticator code (optional)</Label>
            <Input id="pilot-totp" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} autoComplete="one-time-code" />
          </div>
          <Button type="submit" className="w-full bg-brand">Sign in</Button>
          <Button type="button" variant="outline" className="w-full" onClick={() => setNotice(true)}>Sign in with Microsoft Entra ID (Dealer Group SSO)</Button>
          {notice && (
            <p role="status" className="rounded-xl border bg-muted p-3 text-sm text-muted-foreground">
              Portal access is issued to invited pilot rooftops during onboarding. If you have been invited, use the sign-in link in your onboarding email.
            </p>
          )}
          <p className="text-center text-xs text-muted-foreground">
            Invited dealership pilot accounts only — Need access?{" "}
            <Link to="/demo" onClick={() => setOpen(false)} className="font-semibold text-primary">Request a rooftop pilot walkthrough.</Link>
          </p>
        </form>
      </DialogContent>
    </Dialog>
  );
}
