"use client"

import { useForm } from "react-hook-form";
import { createUser } from "../utils/auth"; // Import server-side signup logic

function Signup() {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const user = await createUser(data);
    if (user) {
      // Handle successful signup (e.g., redirect to login)
      console.log("Signup successful! Redirecting to login page...");
      // You can use a router library like 'next/router' to redirect
    } else {
      // Handle signup errors (e.g., display error message)
      console.error("Signup failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Signup</h2>
      <input {...register("username", { required: true })} type="text" placeholder="Username" />
      {errors.email && <span className="error">Username is required</span>}
      <input {...register("email", { required: true })} type="email" placeholder="Email" />
      {errors.email && <span className="error">Email is required</span>}
      <input {...register("password", { required: true })} type="password" placeholder="Password" />
      {errors.password && <span className="error">Password is required</span>}
      <button type="submit">Signup</button>
    </form>
  );
}

export default Signup;
