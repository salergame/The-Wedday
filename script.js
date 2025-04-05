document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    
    // Создаем элементы для кастомного курсора
    const cursorDot = document.createElement('div');
    const cursorDotOutline = document.createElement('div');
    
    cursorDot.classList.add('cursor-dot');
    cursorDotOutline.classList.add('cursor-dot-outline');
    
    document.body.appendChild(cursorDot);
    document.body.appendChild(cursorDotOutline);
    
    let cursorVisible = false;
    
    // Позиции курсора
    let _x = 0;
    let _y = 0;
    
    const toggleCursorVisibility = () => {
        if (cursorVisible) {
            cursorDot.style.opacity = '1';
            cursorDotOutline.style.opacity = '1';
        } else {
            cursorDot.style.opacity = '0';
            cursorDotOutline.style.opacity = '0';
        }
    };
    
    const toggleCursorSize = (type) => {
        if (type === 'enter') {
            cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    };
    
    const mouseIsMoving = (e) => {
        cursorVisible = true;
        toggleCursorVisibility();
        
        _x = e.clientX;
        _y = e.clientY;
        
        cursorDot.style.top = `${_y}px`;
        cursorDot.style.left = `${_x}px`;
        cursorDotOutline.style.top = `${_y}px`;
        cursorDotOutline.style.left = `${_x}px`;
    };
    
    document.addEventListener('mousedown', () => {
        cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(0.9)';
    });
    
    document.addEventListener('mouseup', () => {
        cursorDotOutline.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    
    document.addEventListener('mouseenter', () => {
        cursorVisible = true;
        toggleCursorVisibility();
    });
    
    document.addEventListener('mouseleave', () => {
        cursorVisible = false;
        toggleCursorVisibility();
    });
    
    document.addEventListener('mousemove', mouseIsMoving);
    
    document.querySelectorAll('a, button, .btn, input, textarea, .service-card, .portfolio-item').forEach((el) => {
        el.addEventListener('mouseenter', () => toggleCursorSize('enter'));
        el.addEventListener('mouseleave', () => toggleCursorSize('leave'));
    });
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
    }
    
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
        }
    }
    
    function handleScroll() {
        const scrollPosition = window.scrollY;
        
        if (scrollPosition > 100) {
            nav.classList.add('scrolled');
            scrollTopBtn?.classList.add('active');
        } else {
            nav.classList.remove('scrolled');
            scrollTopBtn?.classList.remove('active');
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.menu a[href*=${sectionId}]`)?.classList.add('active');
            } else {
                document.querySelector(`.menu a[href*=${sectionId}]`)?.classList.remove('active');
            }
        });
        
        handleElementsAnimation();
    }
    
    function handleElementsAnimation() {
        animatedElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    }
    
    function smoothScroll(e) {
        e.preventDefault();
        const targetId = e.currentTarget.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
            closeMenu();
        }
    }
    
    // Модальные окна для видео и карточек
    const modal = document.getElementById('modal');
    const modalContent = document.querySelector('.modal-content');
    const modalClose = document.querySelector('.modal-close');
    
    function openModal(content, title) {
        if (!modal) return;
        
        modalContent.innerHTML = '';
        
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title || '';
        
        const closeBtn = document.createElement('button');
        closeBtn.classList.add('modal-close-btn');
        closeBtn.innerHTML = '&times;';
        closeBtn.addEventListener('click', closeModal);
        
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeBtn);
        
        const modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.innerHTML = content;
        
        const modalFooter = document.createElement('div');
        modalFooter.classList.add('modal-footer');
        
        const contactBtn = document.createElement('a');
        contactBtn.href = "tel:+77777777777";
        contactBtn.classList.add('btn');
        contactBtn.textContent = 'Позвонить';
        
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = "https://wa.me/77777777777";
        whatsappBtn.classList.add('btn', 'whatsapp-btn');
        whatsappBtn.textContent = 'WhatsApp';
        whatsappBtn.target = '_blank';
        
        modalFooter.appendChild(contactBtn);
        modalFooter.appendChild(whatsappBtn);
        
        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        modalContent.appendChild(modalFooter);
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Добавляем обработчики на изображения в галерее
        setTimeout(() => {
            const galleryImages = modalBody.querySelectorAll('.gallery-item img');
            galleryImages.forEach(img => {
                img.addEventListener('click', function() {
                    openFullscreenImage(this.src, this.alt);
                });
            });
        }, 100);
    }
    
    function closeModal() {
        if (!modal) return;
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Функция для открытия изображения в полный экран
    function openFullscreenImage(src, alt) {
        const fullscreenModal = document.createElement('div');
        fullscreenModal.className = 'modal fullscreen-modal active';
        
        fullscreenModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${alt}</h3>
                    <button class="modal-close-btn">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="${src}" alt="${alt}">
                    </div>
                </div>
            `;
            
        document.body.appendChild(fullscreenModal);
        document.body.style.overflow = 'hidden';
        
        const closeBtn = fullscreenModal.querySelector('.modal-close-btn');
        closeBtn.addEventListener('click', () => {
            fullscreenModal.remove();
            document.body.style.overflow = '';
        });
        
        fullscreenModal.addEventListener('click', (e) => {
            if (e.target === fullscreenModal) {
                fullscreenModal.remove();
                document.body.style.overflow = '';
            }
        });
    }
    
    // Обработчики для карточек услуг
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach((card, index) => {
        // Устанавливаем стиль курсора по умолчанию
        card.style.cursor = 'default';
    });

    // Обработчики для карточек артистов
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach((card, index) => {
        // Устанавливаем стиль курсора по умолчанию
        card.style.cursor = 'default';
    });
    
    // Закрытие модального окна при клике вне его содержимого
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Обработка формы обратной связи
    const contactForm = {
        init() {
            // Инициализация прямых методов связи
            this.initDirectContacts();
        },
        
        initDirectContacts() {
            // Обработчики для кнопок звонка и WhatsApp
            document.querySelectorAll('.btn-primary, .call-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.location.href = "tel:+79999999999";
                });
            });
            
            document.querySelectorAll('.btn-secondary, .whatsapp-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    window.open("https://wa.me/79999999999", "_blank");
                });
            });
            
            // Анимация для QR кода
            const qrCode = document.querySelector('.qr-code');
            if (qrCode) {
                const qrImage = qrCode.querySelector('.qr-image');
                
                // Анимация пульсации при наведении
                qrImage?.addEventListener('mouseenter', () => {
                    qrImage.style.transform = 'scale(1.05)';
                });
                
                qrImage?.addEventListener('mouseleave', () => {
                    qrImage.style.transform = 'scale(1)';
                });
            }
        }
    };
    
    // Изменение стиля навигации при прокрутке
    function initScrolledNav() {
        const nav = document.querySelector('.nav');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // Мобильное меню
    function initMobileMenu() {
        const burgerMenu = document.querySelector('.burger-menu');
        const menu = document.querySelector('.menu');
        
        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        const menuLinks = document.querySelectorAll('.menu a');
        menuLinks.forEach(link => {
            link.addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }

    // Плавная прокрутка к якорям
    function initSmoothScroll() {
        const anchors = document.querySelectorAll('a[href*="#"]');
        
        anchors.forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const blockID = anchor.getAttribute('href').substring(1);
                const element = document.getElementById(blockID);
                
                if (element) {
                    window.scrollTo({
                        top: element.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // Кнопка "Наверх"
    function initScrollToTop() {
        const scrollTopBtn = document.querySelector('.scroll-top');
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('active');
            } else {
                scrollTopBtn.classList.remove('active');
            }
        });
        
        scrollTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Инициализация всех функций при загрузке страницы
    initScrolledNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();

    // Функция для проверки загрузки изображений
    function checkImageExists(url) {
        return new Promise((resolve) => {
            const img = new Image();
            img.onload = () => resolve(true);
            img.onerror = () => resolve(false);
            img.src = url;
        });
    }

    // Функция исправления ошибок с путями к изображениям
    function fixImagePaths() {
        console.log('Проверяем и исправляем пути к изображениям...');
        
        // Проверяем все изображения на странице
        document.querySelectorAll('img').forEach(img => {
            const src = img.getAttribute('src');
            
            // Пропускаем placeholder, так как он недоступен
            if (src && src.includes('placeholder.com')) {
                // Заменяем на альтернативную картинку
                img.setAttribute('src', 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22150%22%20height%3D%22150%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22150%22%20height%3D%22150%22%20fill%3D%22%23cccccc%22%2F%3E%3C%2Fsvg%3E');
            }
        });
    }

    // Проверяем существование элементов перед инициализацией слайдера отзывов
    let currentSlide = 0;
    const slides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    
    function showSlide(n) {
        // Проверяем, существуют ли слайды
        if (!slides || slides.length === 0) return;
        
        // Скрываем все слайды
        for (let i = 0; i < slides.length; i++) {
            if (slides[i]) slides[i].style.display = 'none';
        }
        
        // Убираем активный класс со всех точек
        if (dots && dots.length > 0) {
            for (let i = 0; i < dots.length; i++) {
                if (dots[i]) dots[i].classList.remove('active');
            }
        }
        
        // Показываем текущий слайд, если он существует
        if (slides[n]) {
        slides[n].style.display = 'block';
            
            // Добавляем активный класс для текущей точки
            if (dots && dots.length > 0 && dots[n]) {
        dots[n].classList.add('active');
            }
        }
    }
    
    function nextSlide() {
        // Проверяем, существуют ли слайды
        if (!slides || slides.length === 0) return;
        
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }
    
    // Инициализируем слайдер только если есть слайды
    if (slides && slides.length > 0) {
        try {
        showSlide(currentSlide);
        setInterval(nextSlide, 5000);
        
            // Инициализируем точки только если они существуют
            if (dots && dots.length > 0) {
                for (let i = 0; i < dots.length; i++) {
                    if (dots[i]) {
                        dots[i].addEventListener('click', () => {
                            currentSlide = i;
                showSlide(currentSlide);
                        });
                    }
                }
            }
        } catch (error) {
            console.error('Ошибка при инициализации слайдера:', error);
        }
    }

    // Функция инициализации модальных окон портфолио
    function initPortfolio() {
        console.log('Инициализация портфолио...');
        
        // Вызываем исправление изображений
        fixImagePaths();
        
        // Обработка портфолио
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!portfolioItems || portfolioItems.length === 0) {
            console.warn('Элементы портфолио не найдены!');
            return;
        }
        
        console.log(`Найдено ${portfolioItems.length} элементов портфолио`);
        
        // Проверяем, существуют ли модальные окна для проектов
        for (let i = 0; i < portfolioItems.length; i++) {
            const item = portfolioItems[i];
            const projectId = item.getAttribute('data-project');
            const modalId = `project-${projectId}`;
            const modal = document.getElementById(modalId);
            
            console.log(`Проект ${i+1}: id=${projectId}, модальное окно ${modalId} ${modal ? 'найдено' : 'НЕ НАЙДЕНО'}`);
        }
        
        // Добавляем обработчики событий для каждого элемента портфолио
        portfolioItems.forEach((item, index) => {
            console.log(`Настройка элемента портфолио ${index + 1}`);
            
            // Устанавливаем стиль курсора
            item.style.cursor = 'pointer';
            
            // Добавляем обработчик клика
            item.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const projectId = this.getAttribute('data-project');
                console.log(`Клик по проекту: ${projectId}`);
                
                if (!projectId) {
                    console.error('Не указан data-project для элемента портфолио');
                    return;
                }
                
                const modalId = `project-${projectId}`;
                const modal = document.getElementById(modalId);
                
                if (!modal) {
                    console.error(`Модальное окно с ID ${modalId} не найдено`);
                    return;
                }
                
                // Добавляем кнопки для заказа если их нет
                addOrderButtons(modal, this);
                
                // Открываем модальное окно
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log(`Модальное окно ${modalId} открыто`);
            });
        });
        
        // Настраиваем закрытие модальных окон
        setupModalClosing();
    }
    
    // Функция для добавления кнопок заказа в модальное окно
    function addOrderButtons(modal, portfolioItem) {
        const modalContent = modal.querySelector('.modal-content');
        if (!modalContent) {
            console.error('Не найден .modal-content внутри модального окна');
            return;
        }
        
        // Проверяем, есть ли уже блок кнопок
        let orderButtons = modalContent.querySelector('.order-buttons');
        if (orderButtons) {
            console.log('Кнопки заказа уже существуют');
            return;
        }
        
        // Создаем блок с кнопками
        orderButtons = document.createElement('div');
        orderButtons.className = 'order-buttons';
        
        // Добавляем заголовок
        const orderTitle = document.createElement('h4');
        orderTitle.textContent = 'Заказать эту услугу:';
        orderButtons.appendChild(orderTitle);
        
        // Создаем контейнер для кнопок
        const orderBtnsContainer = document.createElement('div');
        orderBtnsContainer.className = 'order-btns-container';
        
        // Получаем название проекта
        const projectTitle = portfolioItem.querySelector('h3')?.textContent || 'Мероприятие';
        
        // Создаем кнопку WhatsApp
        const whatsappButton = document.createElement('a');
        whatsappButton.href = `https://wa.me/77719057564?text=Здравствуйте!%20Хочу%20заказать%20мероприятие%20как%20${encodeURIComponent(projectTitle)}`;
        whatsappButton.className = 'order-btn whatsapp-btn';
        whatsappButton.target = "_blank";
        whatsappButton.innerHTML = '<i class="fab fa-whatsapp"></i> Заказать через WhatsApp';
        orderBtnsContainer.appendChild(whatsappButton);
        
        // Создаем кнопку Instagram
        const instagramButton = document.createElement('a');
        instagramButton.href = "https://www.instagram.com/the_wedday?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==";
        instagramButton.className = 'order-btn instagram-btn';
        instagramButton.target = "_blank";
        instagramButton.innerHTML = '<i class="fab fa-instagram"></i> Связаться в Instagram';
        orderBtnsContainer.appendChild(instagramButton);
        
        // Добавляем контейнер с кнопками в блок заказа
        orderButtons.appendChild(orderBtnsContainer);
        
        // Добавляем кнопки в модальное окно
        const modalBody = modalContent.querySelector('.modal-body');
        if (modalBody) {
            console.log('Добавляем кнопки заказа в модальное окно');
            modalBody.appendChild(orderButtons);
        } else {
            console.error('Не найден .modal-body внутри модального окна');
        }
    }
    
    // Настройка закрытия модальных окон
    function setupModalClosing() {
        // Закрытие по кнопке
        const closeButtons = document.querySelectorAll('.modal-close-btn');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Закрытие по клику вне модального окна
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }
    
    // Функция для глобальной обработки ошибок загрузки изображений
    function setupImageErrorHandling() {
        // Добавляем глобальный обработчик ошибок для всех изображений
        document.addEventListener('error', function(e) {
            const target = e.target;
            
            // Проверяем, является ли целью изображение
            if (target.tagName.toLowerCase() === 'img') {
                console.error(`Ошибка загрузки изображения: ${target.src}`);
                
                // Заменяем на плейсхолдер, если изображение не загрузилось
                target.src = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%22300%22%20height%3D%22200%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Crect%20width%3D%22300%22%20height%3D%22200%22%20fill%3D%22%23cccccc%22%2F%3E%3Ctext%20x%3D%22150%22%20y%3D%22100%22%20font-size%3D%2216%22%20text-anchor%3D%22middle%22%20alignment-baseline%3D%22middle%22%20fill%3D%22%23999999%22%3EИзображение%20не%20найдено%3C%2Ftext%3E%3C%2Fsvg%3E';
                
                // Устанавливаем размеры плейсхолдера
                target.style.maxWidth = '100%';
                target.style.height = 'auto';
            }
        }, true); // Используем фазу перехвата (capture) для перехвата всех ошибок
    }

    // Вызываем функцию настройки обработки ошибок изображений
    window.addEventListener('DOMContentLoaded', function() {
        console.log('DOM загружен, настраиваем обработку ошибок изображений');
        setupImageErrorHandling();
    });

    // Вызываем инициализацию портфолио после полной загрузки страницы
    window.addEventListener('load', function() {
        console.log('Страница полностью загружена');
        // Исправляем изображения перед инициализацией портфолио
        fixImagePaths();
        // Инициализируем портфолио
        initPortfolio();
    });

    // Исправляем функцию для бургер-меню
    const burgerMenuBtn = document.querySelector('.burger-menu');
    
    burgerMenuBtn?.addEventListener('click', function() {
        burgerMenuBtn.classList.toggle('active');
        menu.classList.toggle('active');
        console.log('Бургер-меню нажато');
    });

    // Закрываем меню при клике на ссылку в меню
    document.querySelectorAll('.menu a').forEach(link => {
        link.addEventListener('click', function() {
            burgerMenuBtn.classList.remove('active');
            menu.classList.remove('active');
        });
    });

    document.querySelectorAll('.menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', closeMenu);
    
    scrollTopBtn?.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Кинематографические эффекты для секции обратной связи
    function initCinematicEffects() {
        // Отключаем все эффекты в секции контактов
        return;
    }
    
    // Инициализация кинематографических эффектов
    initCinematicEffects();

    handleElementsAnimation();
    contactForm.init();
}); 