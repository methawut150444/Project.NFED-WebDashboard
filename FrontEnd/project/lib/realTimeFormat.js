function Get_currentTime() { // * 23:59:00 form
    return new Date().toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",

    });
}

function Get_currentDate_1() { // * '31/01/25' form
    return new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    });
}

function Get_currentDate_2() { // * '31 January 2025' form
    return new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
}

function Get_currentLongDay() {
    return new Date().toLocaleDateString('en-US', { weekday: 'long' })
}

export {
    Get_currentTime,
    Get_currentDate_1,
    Get_currentDate_2,
    Get_currentLongDay,
}