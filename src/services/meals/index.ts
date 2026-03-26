"use server"


export const getAllMeals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/meals`)
    return res.json();
  } catch (error) {
    console.log(error)
  }
}