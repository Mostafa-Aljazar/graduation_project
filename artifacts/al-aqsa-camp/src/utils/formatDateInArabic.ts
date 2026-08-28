export default function formatDateInArabic(date: Date): string {
    const formatter = new Intl.DateTimeFormat("ar-EG", {
        weekday: "long", // Displays the full weekday name (e.g., الخميس)
        day: "numeric", // Displays the day of the month (e.g., 30)
        month: "long", // Displays the full month name (e.g., مايو)
        year: "numeric", // Displays the full year (e.g., 2024)
    });

    return formatter.format(date);
}

// Example usage
// const date = new Date("2024-05-30");
// console.log(formatDateInArabic(date)); // Output: الخميس، ٣٠ مايو ٢٠٢٤