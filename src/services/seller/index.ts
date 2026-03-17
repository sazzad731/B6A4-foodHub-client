"use server"

import { cookies } from "next/headers"

export interface TProfile {
  businessName: string
  address: string
  contactNumber: string
  description: string
}
export const createProfile = async (profileData: TProfile) => {
  const cookieStore = await cookies()
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/providers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(profileData),
      },
    );
    const result = await res.json();
    return result;
  } catch (error) {
    console.log(error)
  }
}