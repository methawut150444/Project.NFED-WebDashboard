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
    const midnightBangkok = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 17)); // 17:00 UTC คือ 00:00 ไทย
    return midnightBangkok.toISOString();
};

module.exports = {
    utcCurrentTime,
    utc1stMonth,
    utc0000InDay
};