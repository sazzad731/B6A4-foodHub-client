"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

interface IUser {
  role: string
  name: string
  email: string
  password: string
}

export const registerUser = async (userData: IUser) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(userData)
    });
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error)
    return {error}
  }
}



export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include"
    });
    const result = await res.json()
    const storeCookie = await cookies()
    if (result.success) {
    storeCookie.set("token", result.data.token)
  }
    return result
  } catch (error) {
    console.log(error)
  }
}



export const getUser = async () => {
  const storeCookie = await cookies();
  const currentTime = Date.now() / 1000;
  const token = storeCookie.get("token")?.value
  let decoded = null;
  if (token) {
    decoded = await jwtDecode(token);
    if (decoded.exp < currentTime) {
      storeCookie.delete("token");
      decoded = null;
      return null
    }
    return decoded;
  } else {
    return null
  }
}


export const userLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
}