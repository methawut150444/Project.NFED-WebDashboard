import axios from "axios";

// API URLs
const API_BASE_URL = "http://localhost:9999/api/powerMonitoring";

// todo: --------------------------------------------------------------------------------< Main_AED_inMonth >
const Main_AED_inMonth = async (): Promise<number | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Main_AED_inMonth`);
    
    // Check if response data is valid
    if (typeof response.data !== "number") {
      console.error("Invalid API response format for AED in Month:", response.data);
      return null;
    }

    return response.data; // Directly return the number value
  } catch (error) {
    console.error("Error fetching AED in Month data:", error);
    return null;
  }
};

// todo: --------------------------------------------------------------------------------< Main_Power_inDay & Main_Power_inYesterday >
interface PowerChart_dataType {
  time: string;
  value: number;
}

const Main_Power_inDay = async (): Promise<PowerChart_dataType[] | null> => {
  try {
    const response = await axios.get<PowerChart_dataType[]>(`${API_BASE_URL}/Main_Power_inDay`);
    return response.data; // Return full dataset
  } catch (error) {
    console.error("Error fetching AED in Day data:", error);
    return null;
  }
};

const Main_Power_inYesterday = async (): Promise<PowerChart_dataType[] | null> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/Main_Power_inYesterday`);
    console.log("Yesterday's Data:", response.data);
    if (!Array.isArray(response.data)) throw new Error("Invalid API response format");
    return response.data;
  } catch (error) {
    console.error("Error fetching AED in Yesterday data:", error);
    return null;
  }
};

export {
  Main_AED_inMonth,
  Main_Power_inDay,
  Main_Power_inYesterday,
}