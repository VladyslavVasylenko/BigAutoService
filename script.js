// Translations object for 5 languages
const translations = {
    uk: {
        subtitle: "СТО | Шиномонтаж | Автосервіс | Вроцлав",
        open: "Відчинено • Працюємо",
        closed: "Зачинено",
        opensMonday: "Відкриється в понеділок о 9:00",
        opensToday: "Відкриється сьогодні о 9:00",
        opensTomorrow: "Відкриється завтра о 9:00",
        servicesTitle: "Послуги",
        service1: "Швидка допомога для авто",
        service2: "Шиномонтажні послуги",
        service3: "Сервісна діагностика",
        service4: "Технічне обслуговування",
        service5: "Комп'ютерна діагностика",
        service6: "Заправка кондиціонеру",
        addressTitle: "Адреса",
        contactsTitle: "Контакти"
    },
    pl: {
        subtitle: "Warsztat | Wulkanizacja | Serwis | Wrocław",
        open: "Otwarte • Pracujemy",
        closed: "Zamknięte",
        opensMonday: "Otwarte w poniedziałek o 9:00",
        opensToday: "Otwarte dzisiaj o 9:00",
        opensTomorrow: "Otwarte jutro o 9:00",
        servicesTitle: "Usługi",
        service1: "Pomoc drogowa dla auta",
        service2: "Usługi wulkanizacyjne",
        service3: "Diagnostyka serwisowa",
        service4: "Przeglądy techniczne",
        service5: "Diagnostyka komputerowa",
        service6: "Napełnianie klimatyzacji",
        addressTitle: "Adres",
        contactsTitle: "Kontakty"
    },
    en: {
        subtitle: "Car Service | Tire Fitting | Wrocław",
        open: "Open • Working now",
        closed: "Closed",
        opensMonday: "Opens Monday at 9:00 AM",
        opensToday: "Opens today at 9:00 AM",
        opensTomorrow: "Opens tomorrow at 9:00 AM",
        servicesTitle: "Services",
        service1: "Roadside assistance",
        service2: "Tire fitting services",
        service3: "Service diagnostics",
        service4: "Maintenance & repairs",
        service5: "Computer diagnostics",
        service6: "AC recharging",
        addressTitle: "Address",
        contactsTitle: "Contacts"
    },
    cs: {
        subtitle: "Autoservis | Pneuservis | Vratislav",
        open: "Otevřeno • Pracujeme",
        closed: "Zavřeno",
        opensMonday: "Otevře se v pondělí v 9:00",
        opensToday: "Otevře se dnes v 9:00",
        opensTomorrow: "Otevře se zítra v 9:00",
        servicesTitle: "Služby",
        service1: "Silniční pomoc",
        service2: "Pneuservis",
        service3: "Servisní diagnostika",
        service4: "Technická údržba",
        service5: "Počítačová diagnostika",
        service6: "Plnění klimatizace",
        addressTitle: "Adresa",
        contactsTitle: "Kontakty"
    },
    ru: {
        subtitle: "СТО | Шиномонтаж | Автосервис | Вроцлав",
        open: "Открыто • Работаем",
        closed: "Закрыто",
        opensMonday: "Откроется в понедельник в 9:00",
        opensToday: "Откроется сегодня в 9:00",
        opensTomorrow: "Откроется завтра в 9:00",
        servicesTitle: "Услуги",
        service1: "Быстрая помощь для авто",
        service2: "Шиномонтажные услуги",
        service3: "Сервисная діагностика",
        service4: "Техническое обслуживание",
        service5: "Компьютерная диагностика",
        service6: "Заправка кондиционера",
        addressTitle: "Адрес",
        contactsTitle: "Контакты"
    }
};

let currentLang = 'uk';

// Change language function
function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    updateWorkingStatus();
}

// Real-time Working Hours Checker with Polish Holidays & Multi-language Support
function updateWorkingStatus() {
    const now = new Date();
    
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Warsaw',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    let year = 2026, month = 1, day = 1, weekday = '', hour = 0;

    parts.forEach(p => {
        if (p.type === 'year') year = parseInt(p.value, 10);
        if (p.type === 'month') month = parseInt(p.value, 10);
        if (p.type === 'day') day = parseInt(p.value, 10);
        if (p.type === 'weekday') weekday = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10);
    });

    // Список офіційних державних свят Польщі (формат 'MM-DD')
    const polishHolidays2026 = [
        '01-01', '01-06', '04-05', '04-06', '05-01', '05-03', 
        '05-24', '06-04', '08-15', '11-01', '11-11', '12-24', '12-25', '12-26'
    ];

    const formattedMonth = String(month).padStart(2, '0');
    const formattedDay = String(day).padStart(2, '0');
    const dateKey = `${formattedMonth}-${formattedDay}`;

    const isHoliday = polishHolidays2026.includes(dateKey);
    const isWeekend = ['Sat', 'Sun'].includes(weekday);
    const isWorkingHours = hour >= 9 && hour < 18;

    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    if (statusDot && statusText && translations[currentLang]) {
        const t = translations[currentLang];

        if (!isWeekend && !isHoliday && isWorkingHours) {
            statusDot.className = 'status-dot open';
            statusText.textContent = t.open;
        } else {
            statusDot.className = 'status-dot closed';
            
            if (weekday === 'Sat' || weekday === 'Sun' || (weekday === 'Fri' && hour >= 18) || isHoliday) {
                statusText.textContent = t.opensMonday;
            } else if (hour < 9) {
                statusText.textContent = t.opensToday;
            } else {
                statusText.textContent = t.opensTomorrow;
            }
        }
    }
}

// Global Toggle Menu function & Scroll Lock (Optimized for Mobile/Telegram/Samsung)
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const gearIcon = document.getElementById('gearIcon');
    
    if (menu) menu.classList.toggle('open');
    if (gearIcon) gearIcon.classList.toggle('rotate');
    
    document.body.classList.toggle('menu-open', menu && menu.classList.contains('open'));
}

// Handler for menu items: close menu, scroll smoothly, highlight block for 3 seconds
function handleMenuClick(blockId) {
    toggleMenu();
    
    const block = document.getElementById(blockId);
    if (block) {
        document.querySelectorAll('.section-block').forEach(b => b.classList.remove('highlight-block'));
        
        block.classList.add('highlight-block');
        
        setTimeout(() => {
            block.classList.remove('highlight-block');
        }, 3000);
    }
}

// Scroll to top function when clicking brand logo
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
    } else {
        html.setAttribute('data-theme', 'dark');
        if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
    }
}

// Initialize on DOM load with touch support for Samsung/Telegram browsers
document.addEventListener('DOMContentLoaded', () => {
    updateWorkingStatus();
    setInterval(updateWorkingStatus, 60000);

    // Додатковий захист для кнопів у мобільних браузерах (touchend)
    const gearBtn = document.getElementById('menuToggleBtn');
    if (gearBtn) {
        gearBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }
});
/* ==========================================================
   ДОДАТОК ДЛЯ ПК: Зміна креслень машин та перевірка ширини
   ========================================================== */

// Масив SVG-креслень машин (седан, ліфтбек, хетчбек, SUV, мінівен, бус)
const carBlueprints = [
    { type: 'sedan', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M3 16l2-5h14l2 5M5 16h14v2H5zM6 11l2-4h8l2 4M7 8h10"/></svg>' },
    { type: 'liftback', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M2 16l3-6h14l3 6M4 16h16v2H4zM7 10l3-3h6l3 3"/></svg>' },
    { type: 'hatchback', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M3 16l2-5h12l4 5M4 16h16v2H4zM6 11l2-3h7l2 3"/></svg>' },
    { type: 'suv', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M3 15l2-6h14l2 6M3 15h18v3H3zM6 9l2-3h8l2 3"/></svg>' },
    { type: 'minivan', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M2 15l2-7h16l2 7M2 15h20v3H2zM5 8l3-3h8l3 3"/></svg>' },
    { type: 'van', svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="%2360a5fa" stroke-width="1.5"><path d="M2 14l2-8h16l2 8M2 14h20v4H2zM5 6h14v3H5z"/></svg>' }
];

let currentCarIndex = 0;

function rotateCarBlueprints() {
    // Працює тільки на ПК, якщо екран ширший за 768px і контейнер існує
    if (window.innerWidth <= 768) return;
    
    const container = document.getElementById('activeCarBlueprint');
    if (!container) return;
    
    currentCarIndex = (currentCarIndex + 1) % carBlueprints.length;
    container.innerHTML = carBlueprints[currentCarIndex].svg;
}

// Запускаємо зміну малюнків кожні 3.5 секунди
document.addEventListener('DOMContentLoaded', () => {
    const blueprintElement = document.getElementById('activeCarBlueprint');
    if (blueprintElement) {
        setInterval(rotateCarBlueprints, 3500);
    }
});
