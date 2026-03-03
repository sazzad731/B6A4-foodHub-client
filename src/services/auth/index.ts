"use server"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const loginUser = async (userData: FieldValues) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`, {
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
  const token = storeCookie.get("token")?.value
  let decoded = null;
  if (token) {
    decoded = await jwtDecode(token)
    return decoded
  } else {
    return null
  }
}


export const userLogOut = async () => {
  const storeCookie = await cookies();
  storeCookie.delete("token");
  console.log("deleted")
}