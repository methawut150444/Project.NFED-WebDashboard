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

module.exports = {
    utcCurrentTime,
    utc1stMonth
};