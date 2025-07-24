// Navbar scroll effect
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled', 'shadow-sm');
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    } else {
        navbar.classList.remove('scrolled', 'shadow-sm');
        navbar.style.backgroundColor = 'white';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const toggler = document.querySelector('.navbar-toggler');
    const customToggler = document.querySelector('.custom-toggler');
    const navbarCollapse = document.getElementById('navbarNav');

    // ✅ تحويل أيقونة القائمة إلى X عند الفتح والعكس عند الإغلاق
    if (navbarCollapse && customToggler) {
        navbarCollapse.addEventListener('shown.bs.collapse', function () {
            customToggler.classList.add('open');
        });

        navbarCollapse.addEventListener('hidden.bs.collapse', function () {
            customToggler.classList.remove('open');
        });
    }

    // ✅ إغلاق القائمة عند الضغط على أي رابط في الشاشات الصغيرة
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 991) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, {
                    toggle: false
                });
                bsCollapse.hide();
            }
        });
    });

    // ✅ Swiper for Team Section
    const teamSwiper = new Swiper('.team-swiper', {
        direction: 'horizontal',
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            576: { slidesPerView: 1, spaceBetween: 20 },
            768: { slidesPerView: 2, spaceBetween: 30 },
            992: { slidesPerView: 3, spaceBetween: 30 },
            1200: { slidesPerView: 4, spaceBetween: 30 },
        },
        autoplay: {
            delay: 3000,
            disableOnInteraction: false,
        },
        effect: 'slide',
        speed: 800,
    });

    // ✅ Animated Counter
    function animateCounters() {
        const counters = document.querySelectorAll('.counter');
        const speed = 200;
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let count = 0;
            const updateCounter = () => {
                const increment = Math.ceil(target / speed);
                count += increment;
                if (count < target) {
                    counter.textContent = count.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString();
                }
            };
            updateCounter();
        });
    }

    //  Language Switcher Notification
    function showCustomNotification(message, duration = 2000) {
        const notification = document.getElementById('customNotification');
        notification.textContent = message;
        notification.classList.add('show');
        setTimeout(() => {
            notification.classList.remove('show');
        }, duration);
    }

    const langButtons = document.querySelectorAll('.language-switcher .btn');

    function closeNavbar() {
        if (window.innerWidth <= 991) {
            if (customToggler) customToggler.classList.remove('open');
            if (navbarCollapse) {
                const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
                bsCollapse.hide();
            }
        }
    }

    langButtons.forEach(button => {
        button.addEventListener('click', function () {
            langButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            closeNavbar();
            const lang = this.getAttribute('data-lang');
            if (lang === 'en') {
                showCustomNotification('جاري التبديل إلى النسخة الإنجليزية...', 1500);
            } else {
                showCustomNotification('Switching to English version...', 1500);
            }
        });
    });

    //  Counters Visibility
    const statisticsSection = document.getElementById('statistics');
    let hasAnimated = false;

    function checkIfInView() {
        if (hasAnimated) return;
        if (!statisticsSection) return;
        const rect = statisticsSection.getBoundingClientRect();
        const isInView = rect.top <= (window.innerHeight || document.documentElement.clientHeight) && rect.bottom >= 0;
        if (isInView) {
            hasAnimated = true;
            animateCounters();
            window.removeEventListener('scroll', checkIfInView);
        }
    }

    checkIfInView();
    window.addEventListener('scroll', checkIfInView);
    setTimeout(checkIfInView, 1000);
});
