import axios from "axios";

export const fetchActivePower = async (): Promise<number | null> => {
  try {
    const startDate = "2025-02-13";
    const endDate = "2025-02-14";

    const response = await axios.get<{ data: number }>("http://localhost:9999/ActivePower", {
      params: { startDate, endDate },
    });

    return response.data.data; // Return active power data
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // Return null in case of an error
  }
};