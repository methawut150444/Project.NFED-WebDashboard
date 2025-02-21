const utcCurrentTime = () => {
    const date = new Date();
    date.setUTCHours(date.getUTCHours());
    date.setUTCSeconds(0, 0); // ตั้งค่าวินาทีและมิลลิวินาทีเป็น 00
    return date.toISOString();
};

const utc1stMonth = () => {
    const now = new Date();
    const firstDay = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1));
    firstDay.setUTCHours(firstDay.getUTCHours() - 7);
    return firstDay.toISOString();
};

const utc0000InDay = () => {
    const now = new Date();

    // ดึงวันที่ปัจจุบันตามเวลาไทย
    const bangkokDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));

    // สร้างเวลา 00:00 น. UTC ของวันปัจจุบันในไทย
    const utcMidnight = new Date(Date.UTC(bangkokDate.getFullYear(), bangkokDate.getMonth(), bangkokDate.getDate()));

    // ลบ 7 ชั่วโมงให้ตรงกับเวลาไทย
    return new Date(utcMidnight.getTime() - (7.5 * 60 * 60 * 1000)).toISOString();
};

const utc0000InYesterday = () => {
    const now = new Date();

    // ดึงวันที่ปัจจุบันตามเวลาไทย
    const bangkokDate = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Bangkok" }));

    // สร้างเวลา 00:00 น. UTC ของวันปัจจุบันในไทย
    const utcMidnight = new Date(Date.UTC(bangkokDate.getFullYear(), bangkokDate.getMonth(), bangkokDate.getDate()));

    // ลบ 1 วัน (24 ชั่วโมง) + 7 ชั่วโมงเพื่อแปลงเป็น UTC
    return new Date(utcMidnight.getTime() - (24 * 60 * 60 * 1000) - (7.5 * 60 * 60 * 1000)).toISOString();
};

module.exports = {
    utcCurrentTime,
    utc1stMonth,
    utc0000InDay,
    utc0000InYesterday,
};