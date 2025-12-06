const API_BASE_URL = import.meta.env.VITE_API_URL;

export async function fetchData() {
  try {
    const response = await fetch(`${API_BASE_URL}/articles`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    console.log("API_BASE_URL:", API_BASE_URL);
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}