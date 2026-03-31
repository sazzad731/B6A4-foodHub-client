"use server"

interface AllMealsParams {
  search?: string | undefined;
  price_range?: string | undefined;
  page?: string | undefined;
  limit?: string | undefined;
  sortBy?: string | undefined;
  sortOrder?: string | undefined;
}
export const getAllMeals = async (params: AllMealsParams) => {
  try {
    const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/meals`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          url.searchParams.append(key, value)
        }
      })
    }
    const res = await fetch(url.toString(), { cache: "no-cache" })
    return res.json();
  } catch (error) {
    console.log(error)
  }
}



export const getFeaturedMeals = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/meals/featured`, {cache: "no-cache"});
    return res.json();
  } catch (error) {
    console.log(error)
  }
}




export const getMealDetail = async (id: string) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/meals/${id}`, {cache: "no-cache"})
    return res.json()
  } catch (error) {
    console.log(error)
  }
}