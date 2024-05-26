"use server"

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { connectToDatabase } from '../utils/db';
import Users from './user.model';
import bcryptjs from "bcryptjs";

export async function authenticate(prevState, formData) {
  try {
    await connectToDatabase();
    await signIn('credentials', {...formData, redirectTo: "/dashboard"});
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function discordLogin() {
  try {
    await connectToDatabase();
    await signIn('discord');
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'DiscordSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function logout() {
  await signOut();
}

export async function createUser(prevState, formData) {
  try {
    console.log("formdata", formData);
    await connectToDatabase();

    const salt = bcryptjs.genSaltSync(10);

    const newUser = new Users({
      username: formData.username,
      email: formData.email,
      password: await bcryptjs.hash(formData.password, salt), // Hash password for security
    });
    const resp = await newUser.save();
  } catch (error) {
    console.error("Error creating user:", error.message);
    return null;
  }
}