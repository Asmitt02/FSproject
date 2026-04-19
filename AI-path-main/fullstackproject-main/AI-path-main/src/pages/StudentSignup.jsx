import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function StudentSignup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (name && email && password) {
      // Simulate account creation and redirect to dashboard
      navigate("/student-dashboard");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50/50 dark:bg-zinc-950 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <Card className="w-full shadow-lg border-primary/10">
          <CardHeader className="text-center space-y-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 10 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
                ease: "easeInOut",
              }}
              className="mx-auto bg-primary/10 w-12 h-12 rounded-full flex items-center justify-center mb-4"
            >
              <Sparkles className="w-6 h-6 text-primary" />
            </motion.div>
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Create an Account
            </CardTitle>
            <CardDescription>
              Enter your details below to start your AI-powered learning
              journey.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="John Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full transition-transform active:scale-95 shadow-md group"
              >
                Sign Up
                <Sparkles className="w-4 h-4 ml-2 group-hover:scale-125 transition-transform" />
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 text-center text-sm text-muted-foreground pb-6">
            <div>
              Already have an account?{" "}
              <Link
                to="/student-login"
                className="font-medium text-primary hover:underline hover:text-primary/80 transition-colors"
              >
                Log in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
}
