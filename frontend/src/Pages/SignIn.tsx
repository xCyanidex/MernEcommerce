"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useNavigate, Link } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { SignIpformSchema } from "@/lib/validations";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import logo from "../assets/pf-logo.png";
import { useAuthStore } from "../store/store.js";

const SignIn = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();
  const notify = () => toast("Please Login First");

  const { loggedin } = useParams();
  if (loggedin) {
    notify;
    console.log(loggedin);
  }

  const form = useForm<z.infer<typeof SignIpformSchema>>({
    resolver: zodResolver(SignIpformSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: z.infer<typeof SignIpformSchema>) {
    console.log("submit");
    const { email, password } = values;
    axios
      .post("http://localhost:3000/api/auth/signin", {
        email,
        password,
      })
      .then((response) => {
        const resMessage = response.status.toString();
        if (resMessage == "200") {
          setUser(response.data.token);
          navigate("/dashboard");
        }
      })
      .catch((error) => {
        console.log(error.response);
      });
  }
  return (
    <>
      <div className="container max-w-xl ">
        <img height="50" src={logo} alt="logo" />
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-center">
              <p>
                Don't have an account? Sign up{" "}
                <Link className=" underline text-blue-500" to="/sign-up">
                  here
                </Link>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit">Login</Button>
            </div>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignIn;
