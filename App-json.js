const appJson = {
    // Funktion zum Laden der Feiertagsdaten
    loadHolidays: async () => {
        const response = await fetch("bank_holidays.json");
        const data = await response.json();
        return data;
    },

    // Funktion zum Generieren des Kalenders für ein bestimmtes Jahr
    generateCalendar: (year, holidays) => {
        const months = [
            "Januar",
            "Februar",
            "März",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Dezember",
        ];

        // Erstellen des HTML-Codes für den Kalender
        let html = "";
        for (const month of months) {
            html += `<div class="month"><h2>${month}</h2>`;
            html += appJson.generateMonth(year, month, holidays);
            html += "</div>";
        }

        return html;
    },

    // Funktion zum Generieren des HTML-Codes für einen einzelnen Monat
    generateMonth: (year, month, holidays) => {
        const daysInMonth = new Date(year, month, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();

        // Erstellen des HTML-Codes für die Wochentage
        let html = "<div class='days'>";
        for (let i = 0; i < 7; i++) {
            html += `<div class='day'>${["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"][i]}</div>`;
        }
        html += "</div>";

        // Erstellen des HTML-Codes für die Tage des Monats
        html += "<div class='dates'>";
        for (let i = 0; i < firstDay; i++) {
            html += `<div class='day empty'></div>`;
        }
        for (let i = 1; i <= daysInMonth; i++) {
            const dateString = `${i}.${month}.${year}`;
            const isHoliday = holidays.some((holiday) => holiday.date === dateString);
            const holidayName = isHoliday ? holidays.find((holiday) => holiday.date === dateString).name : "";

            html += `<div class='day${isHoliday ? " holiday" : ""}'><span class='date'>${i}</span>`;
            if (isHoliday) {
                html += `<span class='holiday-name'>${holidayName}</span>`;
            }
            html += "</div>";
        }
        html += "</div>";

        return html;
    },

    // Starten der Anwendung
    async init() {
        const holidays = await appJson.loadHolidays();
        const year = new Date().getFullYear();
        const calendarHtml = appJson.generateCalendar(year, holidays);

        document.getElementById("calendar").innerHTML = calendarHtml;
    },
};

appJson.init();
