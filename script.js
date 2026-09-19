// Translations object for 5 languages
const translations = {
    uk: {
        subtitle: "Автосервіс • Вроцлав",
        open: "Відчинено • Працюємо",
        closed: "Зачинено",
        opensMonday: "Відкриється в понеділок о 9:00",
        opensToday: "Відкриється сьогодні о 9:00",
        opensTomorrow: "Відкриється завтра о 9:00",
        servicesTitle: "Наші послуги",
        service1: "Швидка допомога для авто",
        service2: "Шиномонтажні послуги",
        service3: "Сервісна діагностика",
        service4: "Технічне обслуговування",
        service5: "Комп'ютерна діагностика",
        service6: "Заправка кондиціонеру",
        addressTitle: "Адреса",
        addressText: "ul. Wąska 8, Ligota Piękna, Wrocław, Poland 55-144",
        contactsTitle: "Контакти",
        callBtn: "Зателефонувати",
        telegramBtn: "Telegram",
        instagramBtn: "Instagram",
        menuServices: "Послуги",
        menuAddress: "Адреса",
        menuContacts: "Контакти"
    },
    pl: {
        subtitle: "Autoserwis • Wrocław",
        open: "Otwarte • Pracujemy",
        closed: "Zamknięte",
        opensMonday: "Otwarte w poniedziałek o 9:00",
        opensToday: "Otwarte dzisiaj o 9:00",
        opensTomorrow: "Otwarte jutro o 9:00",
        servicesTitle: "Nasze usługi",
        service1: "Pomoc drogowa",
        service2: "Wulkanizacja / Opony",
        service3: "Diagnostyka serwisowa",
        service4: "Przegląd techniczny",
        service5: "Diagnostyka komputerowa",
        service6: "Nabijanie klimatyzacji",
        addressTitle: "Adres",
        addressText: "ul. Wąska 8, Ligota Piękna, Wrocław, Poland 55-144",
        contactsTitle: "Kontakty",
        callBtn: "Zadzwoń",
        telegramBtn: "Telegram",
        instagramBtn: "Instagram",
        menuServices: "Usługi",
        menuAddress: "Adres",
        menuContacts: "Kontakty"
    },
    en: {
        subtitle: "Car Service • Wroclaw",
        open: "Open • Working",
        closed: "Closed",
        opensMonday: "Opens Monday at 9:00 AM",
        opensToday: "Opens today at 9:00 AM",
        opensTomorrow: "Opens tomorrow at 9:00 AM",
        servicesTitle: "Our Services",
        service1: "Roadside Assistance",
        service2: "Tire Service",
        service3: "Service Diagnostics",
        service4: "Maintenance",
        service5: "Computer Diagnostics",
        service6: "AC Recharge",
        addressTitle: "Address",
        addressText: "ul. Wąska 8, Ligota Piękna, Wrocław, Poland 55-144",
        contactsTitle: "Contacts",
        callBtn: "Call Us",
        telegramBtn: "Telegram",
        instagramBtn: "Instagram",
        menuServices: "Services",
        menuAddress: "Address",
        menuContacts: "Contacts"
    },
    cs: {
        subtitle: "Autoservis • Vratislav",
        open: "Otevřeno • Pracujeme",
        closed: "Zavřeno",
        opensMonday: "Otevře se v pondělí v 9:00",
        opensToday: "Otevře se dnes v 9:00",
        opensTomorrow: "Otevře se zítra v 9:00",
        servicesTitle: "Naše služby",
        service1: "Silniční asistence",
        service2: "Pneuservis",
        service3: "Servisní diagnostika",
        service4: "Technická údržba",
        service5: "Počítačová diagnostika",
        service6: "Plnění klimatizace",
        addressTitle: "Adresa",
        addressText: "ul. Wąska 8, Ligota Piękna, Wrocław, Poland 55-144",
        contactsTitle: "Kontakty",
        callBtn: "Zavolat",
        telegramBtn: "Telegram",
        instagramBtn: "Instagram",
        menuServices: "Služby",
        menuAddress: "Adresa",
        menuContacts: "Kontakty"
    },
    ru: {
        subtitle: "Автосервис • Вроцлав",
        open: "Открыто • Работаем",
        closed: "Закрыто",
        opensMonday: "Откроется в понедельник в 9:00",
        opensToday: "Откроется сегодня в 9:00",
        opensTomorrow: "Откроется завтра в 9:00",
        servicesTitle: "Наши услуги",
        service1: "Помощь на дороге",
        service2: "Шиномонтаж",
        service3: "Сервисная диагностика",
        service4: "Техническое обслуживание",
        service5: "Компьютерная диагностика",
        service6: "Заправка кондиционера",
        addressTitle: "Адрес",
        addressText: "ul. Wąska 8, Ligota Piękna, Wrocław, Poland 55-144",
        contactsTitle: "Контакты",
        callBtn: "Позвонить",
        telegramBtn: "Telegram",
        instagramBtn: "Instagram",
        menuServices: "Услуги",
        menuAddress: "Адрес",
        menuContacts: "Контакты"
    }
};

let currentLang = 'uk';

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

// Change language function
function setLanguage(lang) {
    if (!translations[lang]) return;
    currentLang = lang;

    // Update active class on language buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });

    // Translate all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });

    updateWorkingStatus();
}

// Scroll to top function
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Smooth scroll to section with highlight effect
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerOffset = 70;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Add highlight animation class
        section.classList.add('highlight-block');
        setTimeout(() => {
            section.classList.remove('highlight-block');
        }, 3000);
    }
}

// DOMContentLoaded Event Listener
document.addEventListener('DOMContentLoaded', () => {
    // 1. Popup Menu Elements
    const menuToggle = document.getElementById('menuToggle');
    const popupMenu = document.getElementById('popupMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const closeMenuBtn = document.getElementById('closeMenu');

    function toggleMenu() {
        popupMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
        menuToggle.classList.toggle('active');
    }

    if (menuToggle) menuToggle.addEventListener('click', toggleMenu);
    if (closeMenuBtn) closeMenuBtn.addEventListener('click', toggleMenu);
    if (menuOverlay) menuOverlay.addEventListener('click', toggleMenu);

    // Menu item clicks
    document.querySelectorAll('.popup-nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            toggleMenu();
            setTimeout(() => {
                scrollToSection(targetId);
            }, 300);
        });
    });

    // 2. Theme Toggle (Dark / Light)
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggle.textContent = isLight ? '🌙' : '☀️';
        });
    }

    // 3. Language Switcher Buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // 4. Initialize working status & update every minute
    updateWorkingStatus();
    setInterval(updateWorkingStatus, 60000);
});
