"use client";
import { Link } from "react-router-dom";
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
import { Input } from "@/components/ui/input";
import logo from "../assets/pf-logo.png";
import { SignUpformSchema } from "@/lib/validations";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUp = () => {
    const emailExists = () => toast("Email is Already Registered with us. Please Sign in.");
  const form = useForm<z.infer<typeof SignUpformSchema>>({
    resolver: zodResolver(SignUpformSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof SignUpformSchema>) {
    axios
      .post("http://localhost:3000/api/auth/signup", {
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then((response) => {
        console.log(response);
        const resMessage = response.data.toString();
        toast.success(resMessage);
      })
      .catch((error) => {
        console.log(error.response);
            //  const errorMessage = error.response.data.toString();
          //  toast.error(errorMessage);
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
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="Email" {...field} />
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
                Already have an account? Sign in
                <Link className=" underline text-blue-500 mx-2" to="/sign-in">
                  here
                </Link>
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Button type="submit">Sign Up</Button>
            </div>
          </form>
        </Form>
      </div>
      <ToastContainer />
    </>
  );
};

export default SignUp;
