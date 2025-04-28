/**
 * Aira's Magic World - Агентство по организации мероприятий
 * JavaScript функциональность сайта
 * Версия: 2.0 (2025)
 * Автор: Sanjar
 */

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth >= 992) {
        const cursorDot = document.createElement('div');
        const cursorDotOutline = document.createElement('div');
        cursorDot.classList.add('cursor-dot');
        cursorDotOutline.classList.add('cursor-dot-outline');
        document.body.appendChild(cursorDot);
        document.body.appendChild(cursorDotOutline);
    }
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    
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
        contactBtn.href = "tel:+77007172120";
        contactBtn.classList.add('btn');
        contactBtn.textContent = 'Позвонить';
        
        const whatsappBtn = document.createElement('a');
        whatsappBtn.href = "https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+заказать+мероприятие&type=phone_number&app_absent=0";
        whatsappBtn.target = "_blank";
        whatsappBtn.classList.add('btn', 'btn-secondary');
        whatsappBtn.style.backgroundColor = '#25D366';
        whatsappBtn.style.color = '#ffffff';
        whatsappBtn.style.marginLeft = '10px';
        whatsappBtn.style.cursor = 'pointer';
        whatsappBtn.textContent = 'WhatsApp';
        
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
                img.addEventListener('click', () => {
                    openFullscreenImage(img.src, img.alt);
                });
            });
        }, 100);
    }
    
    function closeModal() {
        if (modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
    
    function openFullscreenImage(src, alt) {
        const fullscreenModal = document.getElementById('fullscreen-modal');
        const fullscreenImage = document.getElementById('fullscreen-image');
        
        if (!fullscreenModal || !fullscreenImage) {
            console.error('Элементы для полноэкранного просмотра не найдены');
            return;
        }
        
        fullscreenImage.src = src;
        fullscreenImage.alt = alt || 'Полноэкранное изображение';
        
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Форма обратной связи
    const contactForm = {
        form: document.querySelector('.contact-form'),
        submitBtn: null,
        formStatus: document.createElement('div'),
        
        init() {
            if (!this.form) return;
            
            this.submitBtn = this.form.querySelector('button[type="submit"]');
            this.formStatus.className = 'form-status';
            this.form.appendChild(this.formStatus);
            
            this.form.addEventListener('submit', this.handleSubmit.bind(this));
            this.initDirectContacts();
        },
        
        initDirectContacts() {
            const directContactButtons = document.querySelectorAll('.contact-method a, .cta-buttons a');
            
            directContactButtons.forEach(button => {
                button.addEventListener('click', function(e) {
                    // Предотвращаем стандартное поведение только для кнопок, которые не должны перенаправлять
                    if (!this.href || this.href === '#') {
                        e.preventDefault();
                    }
                    
                    // Добавляем отслеживание для всех кнопок
                    const contactType = this.textContent.trim();
                    console.log(`Пользователь выбрал контакт: ${contactType}`);
                    
                    // Если это телефонный номер для звонка - не нужно предотвращать стандартное поведение
                    if (this.href && this.href.startsWith('tel:')) {
                        console.log(`Звонок на номер: ${this.href.replace('tel:', '')}`);
                    }
                    
                    // Если это WhatsApp - не нужно предотвращать стандартное поведение
                    if (this.href && this.href.startsWith('https://api.whatsapp.com/')) {
                        console.log(`Переход в WhatsApp: ${this.href}`);
                    }
                });
            });
        },
        
        handleSubmit(e) {
            e.preventDefault();
            
            if (this.submitBtn) {
                this.submitBtn.disabled = true;
                this.submitBtn.textContent = 'Отправка...';
            }
            
            // Здесь будет код отправки формы на сервер
            
            // Имитация отправки формы
            setTimeout(() => {
                this.showStatus('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.', 'success');
                
                if (this.submitBtn) {
                    this.submitBtn.disabled = false;
                    this.submitBtn.textContent = 'Отправить';
                }
                
                this.form.reset();
            }, 1500);
        },
        
        showStatus(message, type) {
            this.formStatus.textContent = message;
            this.formStatus.className = `form-status ${type}`;
            
            setTimeout(() => {
                this.formStatus.textContent = '';
                this.formStatus.className = 'form-status';
            }, 5000);
        }
    };
    
    // Функции инициализации
    function initScrolledNav() {
        handleScroll();
        
        menuBtn?.addEventListener('click', (e) => {
            e.preventDefault();
            toggleMenu();
        });
        
        window.addEventListener('scroll', handleScroll);
    }
    
    function initMobileMenu() {
        const burgerMenuBtn = document.querySelector('.burger-menu');
        
        burgerMenuBtn?.addEventListener('click', function(e) {
            e.preventDefault();
            burgerMenuBtn.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                burgerMenuBtn.classList.remove('active');
                menu.classList.remove('active');
            });
        });
    }
    
    function initSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Закрываем мобильное меню, если открыто
                    menuBtn.classList.remove('active');
                    menu.classList.remove('active');
                    
                    // Плавная прокрутка к элементу
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    function initScrollToTop() {
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 500) {
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
    }
    
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
    
    // Настройка и инициализация слайдера отзывов
    function initTestimonials() {
        const slider = document.querySelector('.testimonials-slider');
        
        if (!slider) {
            console.warn('Слайдер отзывов не найден');
            return;
        }
        
        console.log('Инициализация слайдера отзывов с кастомным скроллбаром');
        
        // Добавляем возможность скроллить мышкой (drag to scroll)
        let isDown = false;
        let startX;
        let scrollLeft;
        
        slider.addEventListener('mousedown', (e) => {
            isDown = true;
            slider.style.cursor = 'grabbing';
            startX = e.pageX - slider.offsetLeft;
            scrollLeft = slider.scrollLeft;
        });
        
        slider.addEventListener('mouseleave', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mouseup', () => {
            isDown = false;
            slider.style.cursor = 'grab';
        });
        
        slider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - slider.offsetLeft;
            const walk = (x - startX) * 2; // Скорость скролла
            slider.scrollLeft = scrollLeft - walk;
        });
        
        // Инициализируем стиль курсора
        slider.style.cursor = 'grab';
        
        // Инициализация модальных окон для отзывов
        initTestimonialModals();
    }
    
    // Функция для инициализации модальных окон отзывов
    function initTestimonialModals() {
        // Находим все отзывы
        const testimonialContents = document.querySelectorAll('.testimonial-content');
        
        if (testimonialContents.length === 0) {
            console.warn('Отзывы не найдены');
            return;
        }
        
        console.log('Инициализация модальных окон для отзывов');
        
        // Добавляем обработчики событий для каждого отзыва
        testimonialContents.forEach(content => {
            // Добавляем обработчик клика на весь блок отзыва
            content.addEventListener('click', function(e) {
                // Проверяем, что клик не был на кнопке ""
                if (!e.target.classList.contains('read-more')) {
                    const testimonialId = this.getAttribute('data-testimonial-id');
                    if (!testimonialId) {
                        console.error('Не указан ID отзыва');
                        return;
                    }
                    
                    // Открываем соответствующее модальное окно
                    openTestimonialModal(testimonialId);
                }
            });
            
            // Добавляем отдельный обработчик для кнопки ""
            const readMoreBtn = content.querySelector('.read-more');
            if (readMoreBtn) {
                readMoreBtn.addEventListener('click', function(e) {
                    e.stopPropagation(); // Предотвращаем всплытие события
                    
                    const testimonialId = this.parentElement.getAttribute('data-testimonial-id');
                    if (!testimonialId) {
                        console.error('Не указан ID отзыва');
                        return;
                    }
                    
                    // Открываем соответствующее модальное окно
                    openTestimonialModal(testimonialId);
                });
            }
        });
        
        // Добавляем обработчики для закрытия модальных окон
        const closeButtons = document.querySelectorAll('.testimonial-modal-close');
        closeButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const modal = this.closest('.testimonial-modal');
                closeTestimonialModal(modal);
            });
        });
        
        // Закрытие по клику вне контента модального окна
        const modals = document.querySelectorAll('.testimonial-modal');
        modals.forEach(modal => {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeTestimonialModal(this);
                }
            });
        });
        
        // Закрытие по клавише ESC
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                const activeModal = document.querySelector('.testimonial-modal.active');
                if (activeModal) {
                    closeTestimonialModal(activeModal);
                }
            }
        });
    }
    
    // Функция для открытия модального окна отзыва
    function openTestimonialModal(testimonialId) {
        const modal = document.getElementById(`testimonial-modal-${testimonialId}`);
        if (!modal) return;
        
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    // Функция для закрытия модального окна отзыва
    function closeTestimonialModal(modal) {
        if (!modal) return;
        
        console.log('Закрываем модальное окно отзыва');
        
        // Запускаем анимацию закрытия
        const modalContent = modal.querySelector('.testimonial-modal-content');
        if (modalContent) {
            modalContent.style.opacity = '0';
            modalContent.style.transform = 'translateY(30px)';
        }
        
        // Закрываем модальное окно после завершения анимации
        setTimeout(() => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }, 300);
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
        
        // Создаем контейнер для кнопок
        const orderBtnsContainer = document.createElement('div');
        orderBtnsContainer.className = 'order-btns-container';
        
        // Получаем название проекта
        const projectTitle = portfolioItem.querySelector('h3')?.textContent || 'Мероприятие';
        
        // Создаем кнопку WhatsApp
        const whatsappButton = document.createElement('a');
        whatsappButton.href = `https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+заказать+мероприятие+как+${encodeURIComponent(projectTitle)}&type=phone_number&app_absent=0`;
        whatsappButton.target = '_blank';
        whatsappButton.className = 'order-btn whatsapp-btn';
        whatsappButton.style.backgroundColor = '#25D366';
        whatsappButton.style.cursor = 'pointer';
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
    
    // Кинематографические эффекты для секции обратной связи
    function initCinematicEffects() {
        // Отключаем все эффекты в секции контактов
        return;
    }
    
    // Инициализация
    initScrolledNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    fixImagePaths();
    initPortfolio();
    setupModalClosing();
    setupImageErrorHandling();
    initCinematicEffects();
    handleElementsAnimation();
    contactForm.init();
    
    // Инициализация слайдера отзывов
    initTestimonials();

    // Добавляем hover-эффект для адресной кнопки
    const addressLink = document.querySelector('a[href*="2gis.kz"]');
    if (addressLink) {
        const addressButton = addressLink.querySelector('div');
        const addressIcon = addressLink.querySelector('.fa-map-marker-alt');
        
        addressLink.addEventListener('mouseenter', function() {
            addressButton.style.backgroundColor = '#c9a431';
            addressButton.style.transform = 'translateY(-2px)';
            addressButton.style.boxShadow = '0 6px 15px rgba(0,0,0,0.3)';
            addressIcon.style.transform = 'scale(1.1)';
        });
        
        addressLink.addEventListener('mouseleave', function() {
            addressButton.style.backgroundColor = '#D4AF37';
            addressButton.style.transform = 'translateY(0)';
            addressButton.style.boxShadow = '0 4px 15px rgba(0,0,0,0.2)';
            addressIcon.style.transform = 'scale(1)';
        });
    }
}); 

function generateContactHTML() {
    return `
            <div class="contact-info">
            <h3>Наши контакты</h3>
            <p><i class="fas fa-map-marker-alt"></i> УЛИЦА АКМЕШИТ, 19/1</p>
            <p><i class="fas fa-phone"></i> <a href="tel:+77007172120">+7 (700) 717-21-20</a></p>
            <p><i class="fas fa-envelope"></i> <a href="mailto:info@prazdnikastana.kz">info@prazdnikastana.kz</a></p>
            <div class="social-links">
                <h4>Связаться с нами:</h4>
                <div class="social-icons">
                    <a href="https://www.instagram.com/the_wedday?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" class="social-icon"><i class="fab fa-instagram"></i></a>
                    <a href="https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+связаться&type=phone_number&app_absent=0" class="social-icon"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    `;
}

function generateFooterHTML() {
    return `
        <div class="footer-content">
            <div class="footer-logo">
                <img src="images/logo.png" alt="The Wedday Logo">
                <p>The Wedday - Ваш надежный партнер для организации свадеб и мероприятий любой сложности в Астане</p>
                </div>
            <div class="footer-links">
                <h3>Контакты</h3>
                <span><i class="fas fa-map-marker-alt"></i> УЛИЦА АКМЕШИТ, 19/1</span>
                <span><i class="fas fa-phone"></i> <a href="tel:+77007172120">+7 (700) 717-21-20</a></span>
                <span><i class="fas fa-envelope"></i> <a href="mailto:info@prazdnikastana.kz">info@prazdnikastana.kz</a></span>
                <div class="social-icons">
                    <a href="https://www.instagram.com/the_wedday?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target="_blank"><i class="fab fa-instagram"></i></a>
                    <a href="https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+связаться&type=phone_number&app_absent=0"><i class="fab fa-whatsapp"></i></a>
                </div>
            </div>
        </div>
    `;
} 