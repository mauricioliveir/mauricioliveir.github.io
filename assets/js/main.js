/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId);

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        });
    }
}
showMenu('nav-toggle', 'nav-menu');

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
    reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text', {}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img', { delay: 200 }); 
sr.reveal('.home__social-icon', { interval: 100 }); 
sr.reveal('.skills__data, .work__img, .contact__input', { interval: 100 }); 

/*===== EMAILJS INTEGRATION =====*/
// Inicialize o EmailJS
(function() {
    emailjs.init('6Zk9pkZItswnl98GQ');
})();

function sendEmail(event) {
    event.preventDefault();

    const form = document.getElementById('contact-form');
    const name = form.querySelector('input[name="name"]').value;
    const email = form.querySelector('input[name="email"]').value;
    const message = form.querySelector('textarea[name="message"]').value;

    if (!name || !email || !message) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    const serviceID = 'service_3ysil3h';
    const templateID = 'template_1bdwe6b';

    emailjs.sendForm(serviceID, templateID, form)
        .then(function(response) {
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }, function(error) {
            alert('Erro ao enviar mensagem. Tente novamente mais tarde.');
        });
}

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', sendEmail);
}

/*===== HEADER SCROLL EFFECT =====*/
const header = document.querySelector('.l-header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

/*===== ANIMATE SKILL BARS =====*/
const skillBars = document.querySelectorAll('.skills__bar');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBar = entry.target;
            const computedStyle = window.getComputedStyle(skillBar);
            const width = computedStyle.width;
            skillBar.style.width = '0';
            setTimeout(() => {
                skillBar.style.width = width;
            }, 300);
        }
    });
}, { threshold: 0.5 });

skillBars.forEach(bar => {
    observer.observe(bar);
});

/*===== TYPEWRITER EFFECT =====*/
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Inicializar efeito de digitação quando a página carregar
document.addEventListener('DOMContentLoaded', () => {
    const homeTitle = document.querySelector('.home__title');
    if (homeTitle) {
        const originalText = homeTitle.innerHTML;
        homeTitle.innerHTML = '';
        setTimeout(() => {
            typeWriter(homeTitle, originalText, 50);
        }, 1000);
    }
    
    // Adicionar classe loaded para animações de entrada
    document.body.classList.add('loaded');
});

/*===== SMOOTH SCROLL =====*/
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const headerHeight = document.querySelector('.l-header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

/*===== ANIMATE COUNTERS =====*/
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target + '%';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start) + '%';
        }
    }, 16);
}

// Observar elementos de porcentagem para animação
const percentageElements = document.querySelectorAll('.skills__percentage');
const percentageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            const target = parseInt(element.textContent);
            animateCounter(element, target);
            percentageObserver.unobserve(element);
        }
    });
}, { threshold: 0.5 });

percentageElements.forEach(element => {
    percentageObserver.observe(element);
});

/*===== PRELOADER =====*/
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        preloader.style.display = 'none';
    }
});

/*===== WORK ITEM HOVER EFFECTS =====*/
const workItems = document.querySelectorAll('.work__img');
workItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.style.transform = 'translateY(-10px)';
        item.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
    });
    
    item.addEventListener('mouseleave', () => {
        item.style.transform = 'translateY(0)';
        item.style.boxShadow = '0px 2px 10px rgba(14, 36, 49, 0.15)';
    });
});

/*===== PROFILE IMAGE ANIMATION =====*/
const profileImage = document.querySelector('.home__img');
if (profileImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        profileImage.style.transform = `translateY(${rate}px)`;
    });
}

/*===== FORM VALIDATION ENHANCEMENT =====*/
const formInputs = document.querySelectorAll('.contact__input');
formInputs.forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.classList.add('focused');
    });
    
    input.addEventListener('blur', () => {
        if (input.value === '') {
            input.parentElement.classList.remove('focused');
        }
    });
});

/*===== SOCIAL ICONS HOVER EFFECTS =====*/
const socialIcons = document.querySelectorAll('.home__social-icon, .footer__icon');
socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
        icon.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', () => {
        icon.style.transform = 'translateY(0) scale(1)';
    });
});

/*===== LAZY LOADING FOR IMAGES =====*/
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

/*===== BACK TO TOP BUTTON =====*/
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="bx bx-chevron-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--first-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

backToTopButton.addEventListener('mouseenter', () => {
    backToTopButton.style.transform = 'translateY(-5px)';
    backToTopButton.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.3)';
});

backToTopButton.addEventListener('mouseleave', () => {
    backToTopButton.style.transform = 'translateY(0)';
    backToTopButton.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});

document.body.appendChild(backToTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }
});

/*===== THEME TOGGLE (OPCIONAL) =====*/
const themeToggle = document.createElement('button');
themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
themeToggle.className = 'theme-toggle';
themeToggle.style.cssText = `
    position: fixed;
    bottom: 80px;
    right: 20px;
    width: 50px;
    height: 50px;
    background: var(--first-color);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    z-index: 1000;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    if (document.body.classList.contains('dark-theme')) {
        themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="bx bx-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Verificar tema salvo
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.innerHTML = '<i class="bx bx-sun"></i>';
}

document.body.appendChild(themeToggle);

/*===== PERFORMANCE OPTIMIZATIONS =====*/
// Debounce para eventos de scroll
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Aplicar debounce aos event listeners de scroll
window.addEventListener('scroll', debounce(() => {
    // Código que precisa ser executado no scroll
}, 10));

