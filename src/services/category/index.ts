export const getAllCategory = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/category/get-all`);
    return res.json();
  } catch (error) {
    console.log(error)
  }
}