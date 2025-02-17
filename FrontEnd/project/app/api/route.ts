import axios from "axios";

// API URL
const API_URL = "http://localhost:9999/api/powerMonitoring/AED_inMonth";

// Define response type
interface PowerMonitoringResponse {
  _measurement: string;
  _diff: number;
}

// Fetch function
export const fetch_AED_inMonth = async (): Promise<number | null> => {
  try {
    const response = await axios.get<PowerMonitoringResponse>(API_URL);
    return response.data._diff; // Extract the `_diff` value
  } catch (error) {
    console.error("Error fetching power monitoring data:", error);
    return null; // Return null if there's an error
  }
};