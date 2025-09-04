
const calendarContainer = document.getElementById('calendar-container');
const year = 2025;
const STORAGE_KEY = `selectedDays-${year}`;

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

// --- Funciones para guardar y cargar ---

function saveSelectedDays() {
    const selectedElements = document.querySelectorAll('.day.selected');
    const selectedDates = Array.from(selectedElements).map(el => el.dataset.date);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedDates));
}

function loadSelectedDays() {
    const savedDates = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    if (savedDates.length === 0) return;

    savedDates.forEach(date => {
        const dayElement = document.querySelector(`.day[data-date="${date}"]`);
        if (dayElement) {
            dayElement.classList.add('selected');
        }
    });
}

// --- Generador del Calendario ---

function generateCalendar() {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        monthDiv.style.setProperty('--month-delay', `${monthIndex * 100}ms`);

        const monthHeader = document.createElement('div');
        monthHeader.classList.add('month-header');
        monthHeader.textContent = `${months[monthIndex]} ${year}`;
        monthDiv.appendChild(monthHeader);

        const daysGrid = document.createElement('div');
        daysGrid.classList.add('days-grid');

        daysOfWeek.forEach(dayName => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day', 'day-name');
            dayNameDiv.textContent = dayName;
            daysGrid.appendChild(dayNameDiv);
        });

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

        let dayCounter = 0;

        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty-day');
            daysGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            // Identificador único para cada día
            dayDiv.dataset.date = `${monthIndex}-${day}`; 
            dayDiv.style.setProperty('--day-delay', `${dayCounter * 25}ms`);

            dayDiv.addEventListener('click', () => {
                dayDiv.classList.toggle('selected');
                // Guardar los cambios cada vez que se hace clic
                saveSelectedDays(); 
            });
            daysGrid.appendChild(dayDiv);
            dayCounter++;
        }

        monthDiv.appendChild(daysGrid);
        calendarContainer.appendChild(monthDiv);
    }
}

// --- Inicialización ---

generateCalendar();
loadSelectedDays(); // Cargar los días guardados al iniciar
