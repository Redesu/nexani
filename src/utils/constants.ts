export function getCurrentSeason(): string {
    const today = new Date();
    const month = today.getMonth();
    return month >= 2 && month <= 4 ? "spring" :
        month >= 5 && month <= 7 ? "summer" :
            month >= 8 && month <= 10 ? "fall" :
                "winter";
}