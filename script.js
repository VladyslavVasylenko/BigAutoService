// Translations Dictionary
const translations = {
    uk: {
        menuTitle: "Меню навігації",
        subtitle: "СТО | Шиномонтаж | Автосервіс | Вроцлав",
        servicesTitle: "Послуги",
        srv1: "Швидка допомога для авто",
        srv2: "Шиномонтажні послуги",
        srv3: "Сервісна діагностика",
        srv4: "Технічне обслуговування",
        srv5: "Комп'ютерна діагностика",
        srv6: "Заправка кондиціонеру",
        addressTitle: "Адреса",
        contactsTitle: "Контакти",
        open: "Відчинено • Працюємо",
        closed: "Зачинено • Відчинимося о 9:00"
    },
    pl: {
        menuTitle: "Menu nawigacji",
        subtitle: "Warsztat | Wulkanizacja | Serwis | Wrocław",
        servicesTitle: "Usługi",
        srv1: "Pomoc drogowa dla auta",
        srv2: "Usługi wulkanizacyjne",
        srv3: "Diagnostyka serwisowa",
        srv4: "Przeglądy techniczne",
        srv5: "Diagnostyka komputerowa",
        srv6: "Napełnianie klimatyzacji",
        addressTitle: "Adres",
        contactsTitle: "Kontakty",
        open: "Otwarte • Pracujemy",
        closed: "Zamknięte • Otwieramy o 9:00"
    },
    en: {
        menuTitle: "Navigation Menu",
        subtitle: "Car Service | Tire Fitting | Wrocław",
        servicesTitle: "Services",
        srv1: "Roadside assistance",
        srv2: "Tire fitting services",
        srv3: "Service diagnostics",
        srv4: "Maintenance & repairs",
        srv5: "Computer diagnostics",
        srv6: "AC recharging",
        addressTitle: "Address",
        contactsTitle: "Contacts",
        open: "Open • Working now",
        closed: "Closed • Opens at 9:00"
    },
    cs: {
        menuTitle: "Navigační menu",
        subtitle: "Autoservis | Pneuservis | Vratislav",
        servicesTitle: "Služby",
        srv1: "Silniční pomoc",
        srv2: "Pneuservis",
        srv3: "Servisní diagnostika",
        srv4: "Technická údržba",
        srv5: "Počítačová diagnostika",
        srv6: "Plnění klimatizace",
        addressTitle: "Adresa",
        contactsTitle: "Kontakty",
        open: "Otevřeno • Pracujeme",
        closed: "Zavřeno • Otevíráme v 9:00"
    },
    ru: {
        menuTitle: "Меню навигации",
        subtitle: "СТО | Шиномонтаж | Автосервис | Вроцлав",
        servicesTitle: "Услуги",
        srv1: "Быстрая помощь для авто",
        srv2: "Шиномонтажные услуги",
        srv3: "Сервисная діагностика",
        srv4: "Техническое обслуживание",
        srv5: "Компьютерная диагностика",
        srv6: "Заправка кондиционера",
        addressTitle: "Адрес",
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

// Global Toggle Menu function & Scroll Lock
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    const gearIcon = document.getElementById('gearIcon');
    
    menu.classList.toggle('open');
    gearIcon.classList.toggle('rotate');
    
    // Блокування / розблокування скролу сторінки
    document.body.classList.toggle('menu-open', menu.classList.contains('open'));
}

// Handler for menu items: close menu, scroll smoothly, highlight block for 3 seconds
function handleMenuClick(blockId) {
    toggleMenu();
    
    const block = document.getElementById(blockId);
    if (block) {
        // Remove highlight from any other block first
        document.querySelectorAll('.section-block').forEach(b => b.classList.remove('highlight-block'));
        
        // Add highlight
        block.classList.add('highlight-block');
        
        // Remove highlight after 3 seconds
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

    // Працюємо тільки з понеділка по п'ятницю (з 9:00 до 18:00). Субота і неділя — вихідні.
    const isWorkingDay = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].includes(weekday);
    const isWorkingHours = hour >= 9 && hour < 18;

    const statusDot = document.getElementById('statusDot');
    const statusText = document.getElementById('statusText');

    if (statusDot && statusText && translations[currentLang]) {
        if (isWorkingDay && isWorkingHours) {
            statusDot.className = 'status-dot open';
            statusText.textContent = translations[currentLang].open;
        } else {
            statusDot.className = 'status-dot closed';
            statusText.textContent = translations[currentLang].closed;
        }
    }
}

updateWorkingStatus();
setInterval(updateWorkingStatus, 60000);
