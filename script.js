// ===== Переклади (5 мов) =====
const translations = {
    uk: {
        menuTitle: "Навігація",
        subtitle: "СТО | Шиномонтаж | Автосервіс | Вроцлав",
        open: "Відчинено • Працюємо",
        opensMonday: "Зачинено • Відкриється в понеділок о 9:00",
        opensToday: "Зачинено • Відкриється сьогодні о 9:00",
        opensTomorrow: "Зачинено • Відкриється завтра о 9:00",
        servicesTitle: "Послуги",
        srv1: "Швидка допомога для авто",
        srv2: "Шиномонтажні послуги",
        srv3: "Сервісна діагностика",
        srv4: "Технічне обслуговування",
        srv5: "Комп'ютерна діагностика",
        srv6: "Заправка кондиціонеру",
        addressTitle: "Адреса",
        contactsTitle: "Контакти"
    },
    pl: {
        menuTitle: "Nawigacja",
        subtitle: "Warsztat | Wulkanizacja | Serwis | Wrocław",
        open: "Otwarte • Pracujemy",
        opensMonday: "Zamknięte • Otwarte w poniedziałek o 9:00",
        opensToday: "Zamknięte • Otwarte dzisiaj o 9:00",
        opensTomorrow: "Zamknięte • Otwarte jutro o 9:00",
        servicesTitle: "Usługi",
        srv1: "Pomoc drogowa dla auta",
        srv2: "Usługi wulkanizacyjne",
        srv3: "Diagnostyka serwisowa",
        srv4: "Przeglądy techniczne",
        srv5: "Diagnostyka komputerowa",
        srv6: "Napełnianie klimatyzacji",
        addressTitle: "Adres",
        contactsTitle: "Kontakty"
    },
    en: {
        menuTitle: "Navigation",
        subtitle: "Car Service | Tire Fitting | Wrocław",
        open: "Open • Working now",
        opensMonday: "Closed • Opens Monday at 9:00 AM",
        opensToday: "Closed • Opens today at 9:00 AM",
        opensTomorrow: "Closed • Opens tomorrow at 9:00 AM",
        servicesTitle: "Services",
        srv1: "Roadside assistance",
        srv2: "Tire fitting services",
        srv3: "Service diagnostics",
        srv4: "Maintenance & repairs",
        srv5: "Computer diagnostics",
        srv6: "AC recharging",
        addressTitle: "Address",
        contactsTitle: "Contacts"
    },
    cs: {
        menuTitle: "Navigace",
        subtitle: "Autoservis | Pneuservis | Vratislav",
        open: "Otevřeno • Pracujeme",
        opensMonday: "Zavřeno • Otevře se v pondělí v 9:00",
        opensToday: "Zavřeno • Otevře se dnes v 9:00",
        opensTomorrow: "Zavřeno • Otevře se zítra v 9:00",
        servicesTitle: "Služby",
        srv1: "Silniční pomoc",
        srv2: "Pneuservis",
        srv3: "Servisní diagnostika",
        srv4: "Technická údržba",
        srv5: "Počítačová diagnostika",
        srv6: "Plnění klimatizace",
        addressTitle: "Adresa",
        contactsTitle: "Kontakty"
    },
    ru: {
        menuTitle: "Навигация",
        subtitle: "СТО | Шиномонтаж | Автосервис | Вроцлав",
        open: "Открыто • Работаем",
        opensMonday: "Закрыто • Откроется в понедельник в 9:00",
        opensToday: "Закрыто • Откроется сегодня в 9:00",
        opensTomorrow: "Закрыто • Откроется завтра в 9:00",
        servicesTitle: "Услуги",
        srv1: "Быстрая помощь для авто",
        srv2: "Шиномонтажные услуги",
        srv3: "Сервисная диагностика",
        srv4: "Техническое обслуживание",
        srv5: "Компьютерная диагностика",
        srv6: "Заправка кондиционера",
        addressTitle: "Адрес",
        contactsTitle: "Контакты"
    }
};

let currentLang = 'uk';

function changeLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;
    document.documentElement.lang = lang;

    document.querySelectorAll('[data-translate]').forEach(el => {
        const key = el.getAttribute('data-translate');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    updateWorkingStatus();
}

// ===== Статус роботи (Пн–Пт 9:00–18:00, польські свята) =====
function updateWorkingStatus() {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Europe/Warsaw',
        year: 'numeric', month: 'numeric', day: 'numeric',
        weekday: 'short', hour: 'numeric', hour12: false
    });

    let month = 1, day = 1, weekday = '', hour = 0;
    formatter.formatToParts(now).forEach(p => {
        if (p.type === 'month') month = parseInt(p.value, 10);
        if (p.type === 'day') day = parseInt(p.value, 10);
        if (p.type === 'weekday') weekday = p.value;
        if (p.type === 'hour') hour = parseInt(p.value, 10) % 24;
    });

    // Свята Польщі 2026 (MM-DD)
    const holidays = [
        '01-01', '01-06', '04-05', '04-06', '05-01', '05-03',
        '05-24', '06-04', '08-15', '11-01', '11-11', '12-24', '12-25', '12-26'
    ];
    const dateKey = `${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const isHoliday = holidays.includes(dateKey);
    const isWeekend = weekday === 'Sat' || weekday === 'Sun';
    const isWorkingHours = hour >= 9 && hour < 18;

    const dot = document.getElementById('statusDot');
    const text = document.getElementById('statusText');
    const t = translations[currentLang];
    if (!dot || !text || !t) return;

    if (!isWeekend && !isHoliday && isWorkingHours) {
        dot.className = 'status-dot open';
        text.textContent = t.open;
        return;
    }

    dot.className = 'status-dot closed';
    if (isWeekend || isHoliday || (weekday === 'Fri' && hour >= 18)) {
        text.textContent = t.opensMonday;
    } else if (hour < 9) {
        text.textContent = t.opensToday;
    } else {
        text.textContent = t.opensTomorrow;
    }
}

// ===== Меню =====
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const gearIcon = document.getElementById('gearIcon');
    if (menu) menu.classList.toggle('open');
    if (gearIcon) gearIcon.classList.toggle('rotate');
    document.body.classList.toggle('menu-open', !!(menu && menu.classList.contains('open')));
}

function handleMenuClick(blockId) {
    toggleMenu();
    const block = document.getElementById(blockId);
    if (!block) return;
    document.querySelectorAll('.section-block').forEach(b => b.classList.remove('highlight-block'));
    block.classList.add('highlight-block');
    setTimeout(() => block.classList.remove('highlight-block'), 3000);
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');
    const toLight = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', toLight ? 'light' : 'dark');
    if (icon) icon.className = toLight ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
}

// ===== Креслення авто (тільки ПК) =====
// Спільні колеса + різні силуети кузова
const WHEELS = '<circle cx="30" cy="36" r="7"/><circle cx="30" cy="36" r="2.5"/><circle cx="90" cy="36" r="7"/><circle cx="90" cy="36" r="2.5"/>';
const BOTTOM = 'H97 M83 36 H37 M23 36 H6';

function carSvg(bodyPath, windowPath) {
    return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 50" fill="none" ' +
           'stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round">' +
           '<path d="' + bodyPath + BOTTOM + '"/>' +
           '<path d="' + windowPath + '" opacity="0.7"/>' + WHEELS + '</svg>';
}

const carBlueprints = [
    // седан
    carSvg('M6 36 V30 L28 26 L42 13 H80 L94 26 L112 30 V36 ', 'M45 16 H62 V26 H35 Z M65 16 H78 L88 26 H65 Z'),
    // ліфтбек
    carSvg('M6 36 V30 L26 26 L40 13 H70 L106 28 L114 32 V36 ', 'M43 16 H60 V26 H33 Z M63 16 H70 L92 26 H63 Z'),
    // хетчбек
    carSvg('M6 36 V30 L26 26 L38 13 H86 L108 28 V36 ', 'M41 16 H60 V26 H31 Z M63 16 H84 L98 26 H63 Z'),
    // SUV
    carSvg('M6 36 V28 L24 24 L32 10 H92 L104 24 L114 28 V36 ', 'M35 13 H58 V24 H28 Z M61 13 H90 L98 24 H61 Z'),
    // мінівен
    carSvg('M6 36 V28 L30 22 L40 10 H88 L108 24 L114 28 V36 ', 'M43 13 H58 V22 H35 Z M61 13 H72 V22 H61 Z M75 13 H86 L98 22 H75 Z'),
    // бус
    carSvg('M6 36 V12 H84 L108 26 L114 30 V36 ', 'M88 16 H82 V26 H100 Z M12 16 H30 V26 H12 Z')
];

let currentCarIndex = 0;

function showCar(index, animate) {
    const box = document.getElementById('activeCarBlueprint');
    if (!box) return;
    const swap = () => {
        box.innerHTML = carBlueprints[index];
        const svg = box.querySelector('svg');
        if (svg && animate) {
            svg.classList.add('fade-out');
            requestAnimationFrame(() => requestAnimationFrame(() => svg.classList.remove('fade-out')));
        }
    };
    const old = box.querySelector('svg');
    if (old && animate) {
        old.classList.add('fade-out');
        setTimeout(swap, 450);
    } else {
        swap();
    }
}

function rotateCarBlueprints() {
    if (window.innerWidth <= 768) return; // тільки ПК
    currentCarIndex = (currentCarIndex + 1) % carBlueprints.length;
    showCar(currentCarIndex, true);
}

// ===== Ініціалізація =====
document.addEventListener('DOMContentLoaded', () => {
    updateWorkingStatus();
    setInterval(updateWorkingStatus, 60000);

    showCar(0, false);
    setInterval(rotateCarBlueprints, 3500);

    // touch-захист для мобільних браузерів (Telegram / Samsung)
    const gearBtn = document.getElementById('menuToggleBtn');
    if (gearBtn) {
        gearBtn.addEventListener('touchend', (e) => {
            e.preventDefault();
            toggleMenu();
        });
    }
});
