import axios from "axios";

const API_BASE_URL = "http://localhost:9999/api/powerMonitoring";

// Todo: ////////////////////////////////////////////////////////////////////////////////////////////////////////// < for request API >
const fetchAPI = async <T>(endpoint: string): Promise<T | null> => {
  try {
    const response = await axios.get<T>(`${API_BASE_URL}/${endpoint}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${endpoint}:`, error);
    return null;
  }
};

// Todo: ////////////////////////////////////////////////////////////////////////////////////////////////////////// < for export function >
export const Main_AED_inMonth = () => fetchAPI<number>("Main_AED_inMonth");
export const Main_AED_inDay = () => fetchAPI<number>("Main_AED_inDay");
export const Main_AED_inYesterday = () => fetchAPI<number>("Main_AED_inYesterday");

// * define dataType --> PowerChartData
interface PowerChartData {
  time: string;
  value: number;
}
export const Main_Power_inDay = () => fetchAPI<PowerChartData[]>("Main_Power_inDay");
export const Main_Power_inYesterday = () => fetchAPI<PowerChartData[]>("Main_Power_inYesterday");