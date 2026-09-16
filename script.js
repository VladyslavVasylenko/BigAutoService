// Translations Dictionary
const translations = {
    uk: {
        subtitle: "СТО | Шиномонтаж | Автосервіс | Вроцлав",
        servicesTitle: "Наші послуги",
        srv1: "Швидка допомога для авто",
        srv2: "Шиномонтажні послуги",
        srv3: "Сервісна діагностика",
        srv4: "Технічне обслуговування",
        srv5: "Комп'ютерна діагностика",
        addressTitle: "Наша адреса",
        contactsTitle: "Контакти",
        open: "Відчинено • Працюємо",
        closed: "Зачинено • Відчинимося о 9:00"
    },
    pl: {
        subtitle: "Warsztat | Wulkanizacja | Serwis | Wrocław",
        servicesTitle: "Nasze usługi",
        srv1: "Pomoc drogowa dla auta",
        srv2: "Usługi wulkanizacyjne",
        srv3: "Diagnostyka serwisowa",
        srv4: "Przeglądy techniczne",
        srv5: "Diagnostyka komputerowa",
        addressTitle: "Nasz adres",
        contactsTitle: "Kontakty",
        open: "Otwarte • Pracujemy",
        closed: "Zamknięte • Otwieramy o 9:00"
    },
    en: {
        subtitle: "Car Service | Tire Fitting | Wrocław",
        servicesTitle: "Our Services",
        srv1: "Roadside assistance",
        srv2: "Tire fitting services",
        srv3: "Service diagnostics",
        srv4: "Maintenance & repairs",
        srv5: "Computer diagnostics",
        addressTitle: "Our address",
        contactsTitle: "Contacts",
        open: "Open • Working now",
        closed: "Closed • Opens at 9:00"
    },
    cs: {
        subtitle: "Autoservis | Pneuservis | Vratislav",
        servicesTitle: "Naše služby",
        srv1: "Silniční pomoc",
        srv2: "Pneuservis",
        srv3: "Servisní diagnostika",
        srv4: "Technická údržba",
        srv5: "Počítačová diagnostika",
        addressTitle: "Naše adresa",
        contactsTitle: "Kontakty",
        open: "Otevřeno • Pracujeme",
        closed: "Zavřeno • Otevíráme v 9:00"
    },
    ru: {
        subtitle: "СТО | Шиномонтаж | Автосервис | Вроцлав",
        servicesTitle: "Наши услуги",
        srv1: "Быстрая помощь для авто",
        srv2: "Шиномонтажные услуги",
        srv3: "Сервисная диагностика",
        srv4: "Техническое обслуживание",
        srv5: "Компьютерная диагностика",
        addressTitle: "Наш адрес",
        contactsTitle: "Контакты",
        open: "Открыто • Работаем",
        closed: "Закрыто • Откроемся в 9:00"
    }
};

let currentLang = 'uk';

function changeLanguage(lang) {
    currentLang = lang;
    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    updateWorkingStatus();
}

// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const themeIcon = document.getElementById('themeIcon');
    if (html.getAttribute('data-theme') === 'dark') {
        html.setAttribute('data-theme', 'light');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        html.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa-solid fa-moon';
    }
}

// Real-time Working Hours Checker (Poland time / Wrocław)
function updateWorkingStatus() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Warsaw',
        weekday: 'short',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
    });
    
    const parts = formatter.formatToParts(now);
    let weekday = '';
    let hour = 0;

    parts.forEach(p => {
        if (p.type === 'weekday') weekday = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10);
    });

    const isWorkingDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].includes(weekday);
    const isWorkingHours = hour >= 9 && hour < 18;

    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    if (isWorkingDay && isWorkingHours) {
        statusDot.className = 'status-dot open';
        statusText.textContent = translations[currentLang].open;
    } else {
        statusDot.className = 'status-dot closed';
        statusText.textContent = translations[currentLang].closed;
    }
}

updateWorkingStatus();
setInterval(updateWorkingStatus, 60000);
