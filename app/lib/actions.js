"use server"

import React from 'react';
import { signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { connectToDatabase } from '../utils/db';
import Users from './user.model';
import bcryptjs from "bcryptjs";
import { Resend } from 'resend'
import VerificationTemplate from '../../emails/verification-template';
import { generateToken } from './utils';

export async function authenticate(prevState, formData) {
  try {
    await connectToDatabase();
    await signIn('credentials', { ...formData, redirectTo: "/dashboard" });
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
  await signOut({ redirectTo: "/signin" });
}

// Creates an instance of Resend using the API KEY
const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmail = async (payload) => {
  const { error } = await resend.emails.send({
    from: 'onboarding@resend.dev', // Defines the sender's address.
    ...payload, // Expands the contents of 'payload' to include 'to', 'subject', and 'react'.
  })

  if (error) {
    console.error('Error sending email', error)
    return null
  }

  console.log('Email sent successfully')
  return true
}

export async function createUser(prevState, formData) {
  try {
    await connectToDatabase();
    const emailVerificationToken = await generateToken();

    const salt = bcryptjs.genSaltSync(10);

    const newUser = new Users({
      username: formData.username,
      email: formData.email,
      password: await bcryptjs.hash(formData.password, salt), // Hash password for security
      emailVerificationToken: emailVerificationToken
    });

    const resp = await newUser.save();
    
    await sendEmail({
      to: formData.email,
      subject: 'Verify your email address',
      react: React.createElement(VerificationTemplate, { username: formData.username, emailVerificationToken }),
    })
  } catch (error) {
    console.error("Error creating user:", error.message);
    return null;
  }
}


