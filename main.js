
const calendarContainer = document.getElementById('calendar-container');
const year = 2025;

const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

const daysOfWeek = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

function generateCalendar() {
    for (let monthIndex = 0; monthIndex < 12; monthIndex++) {
        const monthDiv = document.createElement('div');
        monthDiv.classList.add('month');
        // Delay for month animation
        monthDiv.style.setProperty('--month-delay', `${monthIndex * 100}ms`);

        const monthHeader = document.createElement('div');
        monthHeader.classList.add('month-header');
        monthHeader.textContent = `${months[monthIndex]} ${year}`;
        monthDiv.appendChild(monthHeader);

        const daysGrid = document.createElement('div');
        daysGrid.classList.add('days-grid');

        // Add day names
        daysOfWeek.forEach(dayName => {
            const dayNameDiv = document.createElement('div');
            dayNameDiv.classList.add('day', 'day-name');
            dayNameDiv.textContent = dayName;
            daysGrid.appendChild(dayNameDiv);
        });

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, monthIndex, 1).getDay();

        let dayCounter = 0;

        // Add empty cells for days before the first day of the month
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDay = document.createElement('div');
            emptyDay.classList.add('day', 'empty-day');
            daysGrid.appendChild(emptyDay);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add('day');
            dayDiv.textContent = day;
            // Set delay for staggering animation
            dayDiv.style.setProperty('--day-delay', `${dayCounter * 25}ms`);

            dayDiv.addEventListener('click', () => {
                dayDiv.classList.toggle('selected');
            });
            daysGrid.appendChild(dayDiv);
            dayCounter++;
        }

        monthDiv.appendChild(daysGrid);
        calendarContainer.appendChild(monthDiv);
    }
}

generateCalendar();
