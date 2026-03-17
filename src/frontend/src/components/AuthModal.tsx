import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useCallerProfile, useSaveProfile } from "@/hooks/useQueries";
import { Loader2, Spade } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface AuthModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function AuthModal({ open, onOpenChange }: AuthModalProps) {
  const [username, setUsername] = useState("");
  const { login, isLoggingIn, identity } = useInternetIdentity();
  const { data: existingProfile } = useCallerProfile();
  const saveProfile = useSaveProfile();

  const isLoggedIn = !!identity;

  const handleLogin = async () => {
    await login();
  };

  const handleRegister = async () => {
    if (!username.trim()) {
      toast.error("Please enter a username");
      return;
    }
    if (!isLoggedIn) {
      await login();
      return;
    }
    try {
      await saveProfile.mutateAsync({
        username: username.trim(),
        wins: BigInt(0),
        losses: BigInt(0),
        totalGames: BigInt(0),
      });
      toast.success(`Profile saved! Welcome, ${username.trim()}`);
      onOpenChange(false);
    } catch {
      toast.error("Failed to save profile");
    }
  };

  if (isLoggedIn && existingProfile) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md" data-ocid="auth.dialog">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Spade className="w-5 h-5 text-gold-500" fill="currentColor" />
              Welcome Back!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-4">
            <p className="text-muted-foreground">Signed in as</p>
            <p className="text-2xl font-bold text-foreground mt-1">
              {existingProfile.username}
            </p>
            <div className="flex justify-center gap-6 mt-4 text-sm text-muted-foreground">
              <span>🏆 {existingProfile.wins.toString()} wins</span>
              <span>🎮 {existingProfile.totalGames.toString()} games</span>
            </div>
          </div>
          <Button
            className="gold-gradient text-navy-900 font-bold uppercase w-full border-0"
            onClick={() => onOpenChange(false)}
            data-ocid="auth.close_button"
          >
            Let's Play!
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" data-ocid="auth.dialog">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Spade className="w-5 h-5 text-gold-500" fill="currentColor" />
            Card Masters Account
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2" data-ocid="auth.tab">
            <TabsTrigger value="login" data-ocid="auth.tab">
              Sign In
            </TabsTrigger>
            <TabsTrigger value="register" data-ocid="auth.tab">
              Register
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="space-y-4 pt-4">
            <p className="text-sm text-muted-foreground">
              Sign in securely using Internet Identity — no passwords needed.
            </p>
            <Button
              className="gold-gradient text-navy-900 font-bold uppercase w-full border-0 shadow-gold"
              onClick={handleLogin}
              disabled={isLoggingIn}
              data-ocid="auth.submit_button"
            >
              {isLoggingIn ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                  Connecting...
                </>
              ) : (
                "Sign In with Internet Identity"
              )}
            </Button>
          </TabsContent>

          <TabsContent value="register" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="username">Choose your username</Label>
              <Input
                id="username"
                placeholder="CardShark99"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                data-ocid="auth.input"
              />
            </div>
            <p className="text-xs text-muted-foreground">
              You'll be prompted to authenticate with Internet Identity.
            </p>
            <Button
              className="gold-gradient text-navy-900 font-bold uppercase w-full border-0 shadow-gold"
              onClick={handleRegister}
              disabled={isLoggingIn || saveProfile.isPending}
              data-ocid="auth.submit_button"
            >
              {isLoggingIn || saveProfile.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Setting
                  up...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
