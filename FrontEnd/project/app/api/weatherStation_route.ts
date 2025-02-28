import axios from "axios";

const API_BASE_URL = "http://localhost:9999/api/weatherStation";

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
export const Temp_now = () => fetchAPI<number>("Temp_now");
export const Humi_now = () => fetchAPI<number>("Humi_now");
export const PM2_5_now = () => fetchAPI<number>("PM2_5_now");
export const PM10_now = () => fetchAPI<number>("PM10_now");
export const WindSpeed_now = () => fetchAPI<number>("WindSpeed_now");

// * define dataType --> AQIData
interface AQIData {
  value: number;
  image: string;
  description: string;
  colorClass: string;
}
export const getAQI = async (): Promise<AQIData | null> => {
  const aqiValue = await fetchAPI<number>("AQI_now");
  if (aqiValue === null) return null;

  // จัดกลุ่มข้อมูลตาม AQI Value
  const aqiRanges = [
    { max: 50, image: "/img/weatherStation_img/AQI_1.png", description: "EXCELLENT", colorClass: "text-AQI_1" },
    { max: 100, image: "/img/weatherStation_img/AQI_2.png", description: "GOOD", colorClass: "text-AQI_2" },
    { max: 150, image: "/img/weatherStation_img/AQI_3.png", description: "MODERATE", colorClass: "text-AQI_3" },
    { max: 200, image: "/img/weatherStation_img/AQI_4.png", description: "UNHEALTHY", colorClass: "text-AQI_4" },
    { max: 300, image: "/img/weatherStation_img/AQI_5.png", description: "VERY UNHEALTHY", colorClass: "text-AQI_5" },
    { max: Infinity, image: "/img/weatherStation_img/AQI_6.png", description: "HAZARDOUS", colorClass: "text-AQI_6" },
  ];

  // ค้นหาค่าที่ตรงกับช่วง AQI
  const aqiData = aqiRanges.find(range => aqiValue <= range.max) || aqiRanges[aqiRanges.length - 1];
  return { value: aqiValue, ...aqiData };
};