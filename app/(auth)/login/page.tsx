"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Eye,
  EyeOff,
  Loader2,
  Terminal,
  Zap,
  Lock as LucidLock,
  Mail,
} from "lucide-react";
import {
  FormItem,
  Form,
  FormMessage,
  FormLabel,
  FormControl,
  FormField,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserCredential, signInWithEmailAndPassword } from "firebase/auth";
import { loginWithCredential } from "@/api/index";
import { useLoadingCallback } from "react-loading-hook";
import { getFirebaseAuth } from "@/components/firebase-auth/firebase";
import { useRedirectAfterLogin } from "@/shared/useRedirectAfterLogin";

import { cn } from "@/lib/utils";
import {
  loginFormSchema,
  LoginFormValues,
} from "@/lib/validations/auth-schema";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [glitchActive, setGlitchActive] = useState(false);
  const [terminalText, setTerminalText] = useState("");
  const [currentTime, setCurrentTime] = useState("");
  const { toast } = useToast();
  const [handleLoginWithEmailAndPassword, isEmailLoading, emailPasswordError] =
    useLoadingCallback(async ({ email, password }: LoginFormValues) => {
      const auth = getFirebaseAuth();
      try {
        const credential = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        await handleLogin(credential);
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: `Failed to log in: ${
            error.message.split("Firebase: ")[1]
          }`,
        });
        console.error("Error logging in:", error);
      }
    });

  const redirectAfterLogin = useRedirectAfterLogin();

  async function handleLogin(credential: UserCredential) {
    try {
      const result = await loginWithCredential(credential);
      if (!result) {
        throw new Error("Failed to log in");
      }

      redirectAfterLogin();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to log in",
      });
      console.error("Error logging in:", error);
    }
  }

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema as any),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Terminal typing effect
  useEffect(() => {
    const messages = [
      "INITIALIZING_SECURE_CONNECTION...",
      "LOADING_AUTHENTICATION_PROTOCOL...",
      "AWAITING_USER_CREDENTIALS...",
      "SYSTEM_READY_FOR_LOGIN...",
    ];
    let messageIndex = 0;
    let charIndex = 0;

    const typeMessage = () => {
      if (messageIndex < messages.length) {
        if (charIndex < messages[messageIndex].length) {
          setTerminalText(messages[messageIndex].substring(0, charIndex + 1));
          charIndex++;
          setTimeout(typeMessage, 50);
        } else {
          setTimeout(() => {
            messageIndex++;
            charIndex = 0;
            if (messageIndex < messages.length) {
              typeMessage();
            }
          }, 2000);
        }
      }
    };

    typeMessage();
  }, []);

  // Update current time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Glitch effect
  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 8000);

    return () => clearInterval(glitchInterval);
  }, []);

  const onSubmit = async (data: LoginFormValues) => {
    await handleLoginWithEmailAndPassword(data);
  };

  return (
    <div className="min-h-screen mt-20 relative overflow-hidden">
      {/* Main content */}
      <div className="relative z-10 flex min-h-screen items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          {/* Terminal header */}
          <div className="mb-8 text-center">
            {/* Terminal window */}
            <div className="bg-gray-800/80 backdrop-blur-sm rounded-lg border border-[#00f7ff]/30 mb-6">
              <div className="flex items-center justify-between px-4 py-2 border-b border-[#00f7ff]/30">
                <div className="flex items-center space-x-2">
                  <Terminal className="h-4 w-4 text-[#00f7ff]" />
                  <span className="text-[#00f7ff] font-mono text-sm">
                    SECURE_TERMINAL
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-[#ff00f7] font-mono text-xs">
                    {currentTime}
                  </div>
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 rounded-full bg-[#ff00f7]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#9600ff]"></div>
                    <div className="w-2 h-2 rounded-full bg-[#00f7ff]"></div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3">
                <div className="text-[#00f7ff] font-mono text-sm">
                  {terminalText}
                  <span className="animate-[terminalBlink_1s_infinite]">_</span>
                </div>
              </div>
            </div>
          </div>

          {/* Login card */}
          <Card className="bg-gray-800/50 backdrop-blur-sm border-gray-700 shadow-[0_0_30px_rgba(0,247,255,0.2)]">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold font-mono">
                <div className="relative inline-block">
                  {glitchActive && (
                    <span className="absolute inset-0 text-[#ff00f7] animate-[glitch_0.3s_ease_forwards] opacity-70">
                      // ACCESS_CONTROL
                    </span>
                  )}
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00f7ff] to-[#9600ff] animate-[holographicShimmer_3s_ease-in-out_infinite] bg-[length:200%_auto]">
                    // ACCESS_CONTROL
                  </span>
                </div>
              </CardTitle>
              <CardDescription className="text-gray-400 font-mono">
                Enter your credentials to access the AI & Robotics Club system
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form {...loginForm}>
                <form
                  onSubmit={loginForm.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-mono flex items-center">
                          <Mail className="h-4 w-4 mr-2 text-[#00f7ff]" />
                          EMAIL_ADDRESS
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type="email"
                              placeholder="user@gmail.com"
                              {...field}
                              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#00f7ff] focus:ring-[#00f7ff]/20 font-mono pl-10"
                            />
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 font-mono text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-gray-300 font-mono flex items-center">
                          <LucidLock className="h-4 w-4 mr-2 text-[#9600ff]" />
                          PASSWORD
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Input
                              type={showPassword ? "text" : "password"}
                              placeholder="Enter your secure password"
                              {...field}
                              className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-[#9600ff] focus:ring-[#9600ff]/20 font-mono pl-10 pr-12"
                            />
                            <LucidLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Button
                              type="button"
                              variant="ghost"
                              size="icon"
                              className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8 text-gray-400 hover:text-[#9600ff] hover:bg-gray-600/50"
                              onClick={() => setShowPassword(!showPassword)}
                              tabIndex={-1}
                            >
                              {showPassword ? (
                                <EyeOff size={16} />
                              ) : (
                                <Eye size={16} />
                              )}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage className="text-red-400 font-mono text-xs" />
                      </FormItem>
                    )}
                  />

                  {emailPasswordError && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-md p-3">
                      <p className="text-red-400 font-mono text-sm flex items-center">
                        <Zap className="h-4 w-4 mr-2" />
                        ACCESS_DENIED: {emailPasswordError}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={isEmailLoading}
                    className={cn(
                      "w-full bg-gradient-to-r from-[#00f7ff] to-[#9600ff] hover:from-[#00f7ff] hover:to-[#ff00f7] text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(0,247,255,0.4)] hover:shadow-[0_0_20px_rgba(255,0,247,0.6)] transition-all duration-300 transform hover:scale-105 font-mono",
                      isEmailLoading ? "cursor-not-allowed opacity-50" : ""
                    )}
                  >
                    {isEmailLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        AUTHENTICATING...
                      </>
                    ) : (
                      <>
                        <Terminal className="mr-2 h-4 w-4" />
                        INITIATE_LOGIN
                      </>
                    )}
                  </Button>
                </form>
              </Form>
            </CardContent>

            {/* Footer */}
            <div className="px-6 pb-6">
              <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
                <div className="text-center">
                  <p className="text-gray-400 font-mono text-sm mb-2">
                    <span className="text-[#ff00f7]">ACCESS_RESTRICTED:</span>{" "}
                    New user registration requires admin approval
                  </p>
                </div>
              </div>
            </div>
          </Card>

          {/* System info */}
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-4 text-xs text-gray-500 font-mono">
              <span>SYSTEM_STATUS:</span>
              <span className="text-green-400">ONLINE</span>
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
