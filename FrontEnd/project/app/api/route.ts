import axios from "axios";

// API URLs
const API_BASE_URL = "http://localhost:9999/api/powerMonitoring";

// Define response type for AED in Month
interface AEDInMonthResponse {
  _measurement: string;
  _diff: number;
}

// Define response type for AED in Day
interface AEDInDayResponse {
  time: string;
  value: number;
}

// Fetch function for AED in Month
const fetch_AED_inMonth = async (): Promise<number | null> => {
  try {
    const response = await axios.get<AEDInMonthResponse>(`${API_BASE_URL}/AED_inMonth`);
    return response.data._diff; // Extract `_diff`
  } catch (error) {
    console.error("Error fetching AED in Month data:", error);
    return null;
  }
};

// Fetch function for AED in Day
const fetch_AED_inDay = async (): Promise<AEDInDayResponse[] | null> => {
  try {
    const response = await axios.get<AEDInDayResponse[]>(`${API_BASE_URL}/AED_inDay`);
    return response.data; // Return full dataset
  } catch (error) {
    console.error("Error fetching AED in Day data:", error);
    return null;
  }
};

export {
  fetch_AED_inMonth,
  fetch_AED_inDay,
}