// Funktion zum Laden der Feiertagsdaten aus einer XML-Datei
async function loadHolidaysFromXml(xmlFile) {
    const response = await fetch(xmlFile);
    const xmlString = await response.text();
    const xmlDoc = new DOMParser().parseFromString(xmlString, "text/xml");

    // Extrahieren Sie die Feiertagsdaten aus dem XML-Dokument
    const holidays = [];
    const nodes = xmlDoc.querySelectorAll("holiday");
    for (const node of nodes) {
        const holiday = {
            date: node.getAttribute("date"),
            name: node.textContent,
        };
        holidays.push(holiday);
    }

    return holidays;
}

// Generieren Sie den Kalender mit den Feiertagen
const holidays = await loadHolidaysFromXml("bank_holidays.xml");
const calendarHtml = generateCalendar(year, holidays);

document.getElementById("calendar").innerHTML = calendarHtml;
