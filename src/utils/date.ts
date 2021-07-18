function subDay(date: Date, day = 1): Date {
    const dt = new Date(date);
    dt.setDate(dt.getDate() - day);
    return dt;
}

export { subDay };
