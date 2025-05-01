/**
 * Aira's Magic World - Агентство по организации мероприятий
 * JavaScript функциональность сайта
 * Версия: 2.0 (2025)
 * Автор: Sanjar
 */

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    const menuBtn = document.querySelector('.burger-menu');
    const menu = document.querySelector('.menu');
    const sections = document.querySelectorAll('section');
    const scrollTopBtn = document.querySelector('.scroll-top');
    const animatedElements = document.querySelectorAll('.fade-in, .scale-in');
    
    let isMenuOpen = false;
    
    function toggleMenu() {
        isMenuOpen = !isMenuOpen;
        menu.classList.toggle('active');
        menuBtn.classList.toggle('active');
        console.log('Меню: ' + (isMenuOpen ? 'открыто' : 'закрыто'));
    }
    
    function closeMenu() {
        if (isMenuOpen) {
            isMenuOpen = false;
            menu.classList.remove('active');
            menuBtn.classList.remove('active');
            console.log('Меню закрыто');
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
    
    // Функции инициализации
    function initScrolledNav() {
        handleScroll();
        window.addEventListener('scroll', handleScroll);
    }
    
    function initMobileMenu() {
        if (!menuBtn || !menu) {
            console.error('Элементы меню не найдены!');
            return;
        }
        
        console.log('Инициализация мобильного меню');
        
        // Устанавливаем правильное начальное положение меню
        const updateMenuPosition = function() {
            if (isMenuOpen) {
                const navHeight = nav.offsetHeight;
                menu.style.top = navHeight + 'px';
            }
        };
        
        // Вызываем при инициализации и при изменении размера окна
        updateMenuPosition();
        window.addEventListener('resize', updateMenuPosition);
        
        // Обработчик для открытия/закрытия меню по клику на бургер
        menuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
            console.log('Клик по бургер-меню');
            
            // Обновляем положение меню при открытии
            if (isMenuOpen) {
                updateMenuPosition();
            }
        });
        
        // Закрываем меню при клике на ссылку
        document.querySelectorAll('.menu a').forEach(link => {
            link.addEventListener('click', function() {
                closeMenu();
                console.log('Клик по ссылке меню');
            });
        });
        
        // Закрываем меню при клике вне его
        document.addEventListener('click', function(e) {
            if (isMenuOpen && !menu.contains(e.target) && !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });
        
        // Закрываем меню при нажатии Escape
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                closeMenu();
            }
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
                    closeMenu();
                    
                    // Плавная прокрутка к элементу
                    targetElement.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Модальные окна для видео и карточек
    const modalClose = document.querySelector('.modal-close');
    
    function openModal(content, title) {
        if (!modal) return;
        
        modalContent.innerHTML = '';
        
        const modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        
        const modalTitle = document.createElement('h3');
        modalTitle.textContent = title || '';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'modal-close-btn';
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
        whatsappBtn.href = "https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+заказать+организацию+мероприятия&type=phone_number&app_absent=0";
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
                img.addEventListener('click', function(e) {
                    e.stopPropagation();
                    const src = this.src;
                    const alt = this.alt || '';
                    const fullscreenModal = document.getElementById('fullscreen-modal');
                    const fullscreenImage = document.getElementById('fullscreen-image');
                    if (!fullscreenModal || !fullscreenImage) return;
                    fullscreenImage.src = src;
                    fullscreenImage.alt = alt;
                    fullscreenModal.classList.add('active');
                    document.body.style.overflow = 'hidden';
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
        console.log('Opening fullscreen image:', src, alt);
        const fullscreenModal = document.getElementById('fullscreen-modal');
        const fullscreenImage = document.getElementById('fullscreen-image');
        
        if (!fullscreenModal || !fullscreenImage) {
            console.error('Fullscreen modal or image not found');
            return false;
        }
        
        fullscreenImage.src = src;
        fullscreenImage.alt = alt || 'Полноэкранное изображение';
        fullscreenModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        return false;
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
    
    // Добавляем обработчик клика на изображения в галерее внутри модального окна портфолио
    function setupPortfolioGalleryClickHandlers() {
        const portfolioModals = document.querySelectorAll('.project-modal');
        console.log('Найдено модальных окон портфолио:', portfolioModals.length);

        portfolioModals.forEach(modal => {
            const galleryImages = modal.querySelectorAll('.gallery-item img');
            console.log('Найдено изображений в галерее:', galleryImages.length);

            galleryImages.forEach(img => {
                img.style.cursor = 'pointer';
                console.log('Добавляем обработчик клика для изображения:', img.src);

                img.addEventListener('click', function(e) {
                    console.log('Клик по изображению:', this.src); // Проверим, срабатывает ли
                    e.preventDefault();
                    e.stopPropagation();
                    showFullscreenImage(this.src, this.alt || '');
                });
            });
        });
    }
    
    function handleGalleryImageClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        const src = this.src;
        const alt = this.alt || '';
        showFullscreenImage(src, alt);
    }
    
    // Инициализация обработчиков клика для галереи портфолио
    function initPortfolio() {
        console.log('Инициализация портфолио...');
        fixImagePaths();
        
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        if (!portfolioItems || portfolioItems.length === 0) {
            console.warn('Элементы портфолио не найдены!');
            return;
        }
        
        console.log(`Найдено ${portfolioItems.length} элементов портфолио`);
        
        portfolioItems.forEach((item, index) => {
            console.log(`Настройка элемента портфолио ${index + 1}`);
            item.style.cursor = 'pointer';
            
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
                
                addOrderButtons(modal, this);
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log(`Модальное окно ${modalId} открыто`);
                
                // Инициализируем обработчики клика для галереи внутри модального окна
                setupPortfolioGalleryClickHandlers();
            });
        });
        
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
        whatsappButton.href = `https://api.whatsapp.com/send/?phone=77007172120&text=Здравствуйте!+Хочу+заказать+организацию+мероприятия+как+${encodeURIComponent(projectTitle)}&type=phone_number&app_absent=0`;
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
    
    // Кинематографические эффекты для секции обратной связи
    function initCinematicEffects() {
        // Отключаем все эффекты в секции контактов
        return;
    }
    
    // Инициализация обработчиков для модальных окон услуг
    function initServicesModal() {
        console.log('Инициализация карточек услуг...');
        const serviceCards = document.querySelectorAll('.service-card[data-service-id]');
        
        console.log(`Найдено карточек услуг: ${serviceCards.length}`);
        
        if (!serviceCards.length) {
            console.error('Не найдены карточки услуг');
            return;
        }
        
        // Добавляем обработчик клика для каждой карточки услуг
        serviceCards.forEach(card => {
            const serviceId = card.getAttribute('data-service-id');
            console.log(`Добавление обработчика для карточки с ID: ${serviceId}`);
            
            // Удаляем старые обработчики, если они есть
            const newCard = card.cloneNode(true);
            card.parentNode.replaceChild(newCard, card);
            
            newCard.addEventListener('click', function() {
                console.log(`Клик по карточке услуги с ID: ${serviceId}`);
                const serviceModal = document.getElementById(`service-modal-${serviceId}`);
                
                if (!serviceModal) {
                    console.error(`Не найдено модальное окно для услуги с ID ${serviceId}`);
                    return;
                }
                
                console.log(`Открываем модальное окно service-modal-${serviceId}`);
                // Открываем модальное окно
                serviceModal.classList.add('active');
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Обработчики для закрытия модальных окон
        const closeButtons = document.querySelectorAll('.service-modal .modal-close-btn');
        console.log(`Найдено кнопок закрытия: ${closeButtons.length}`);
        
        closeButtons.forEach(btn => {
            // Удаляем старые обработчики
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', function() {
                console.log('Клик по кнопке закрытия модального окна услуги');
                const modal = this.closest('.service-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
        
        // Закрытие при клике вне контента модального окна
        const modals = document.querySelectorAll('.service-modal');
        console.log(`Найдено модальных окон услуг: ${modals.length}`);
        
        modals.forEach(modal => {
            // Удаляем старые обработчики
            const newModal = modal.cloneNode(true);
            modal.parentNode.replaceChild(newModal, modal);
            
            newModal.addEventListener('click', function(e) {
                if (e.target === this) {
                    console.log('Клик вне контента модального окна услуги');
                    this.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
            
            // Повторно добавляем обработчики для кнопок в клонированном модальном окне
            const closeBtn = newModal.querySelector('.modal-close-btn');
            if (closeBtn) {
                closeBtn.addEventListener('click', function() {
                    console.log('Клик по кнопке закрытия модального окна (повторно)');
                    newModal.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        });
    }
    
    // Инициализация
    initScrolledNav();
    initMobileMenu();
    initSmoothScroll();
    initScrollToTop();
    initTestimonials();
    initTestimonialModals();
    initPortfolio();
    setupModalClosing();
    initServicesModal();
    
    // Исправляем пути к изображениям
    fixImagePaths();

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

    // Очищаем все конфликтующие обработчики событий для модальных окон
    document.querySelectorAll('.modal').forEach(m => m.classList.remove('active'));
    const fullscreenModal = document.getElementById('fullscreen-modal');
    if (fullscreenModal) fullscreenModal.classList.remove('active');
    
    // Удаляем конфликтующие обработчики событий
    document.querySelectorAll('.modal .gallery-item img').forEach(img => {
        const clone = img.cloneNode(true);
        img.parentNode.replaceChild(clone, img);
    });

    // Инициализация полноэкранного просмотра непосредственно после загрузки DOM
    setupFullscreenViewer();
    
    // После полной загрузки страницы проверяем все изображения
    window.addEventListener('load', function() {
        // Убеждаемся, что все изображения в галерее работают с полноэкранным режимом
        document.querySelectorAll('.gallery-item img').forEach(img => {
            img.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                showFullscreenImage(this.src, this.alt);
                return false;
            });
        });
        
        // Обработчики также для тегов <a> внутри gallery-item
        document.querySelectorAll('.gallery-item a').forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                // Извлекаем URL из атрибута onclick, если он есть
                let src = '';
                let alt = '';
                
                // Проверяем, есть ли атрибут onclick с вызовом openFullscreenImage
                if (this.getAttribute('onclick') && this.getAttribute('onclick').includes('openFullscreenImage')) {
                    const onclickAttr = this.getAttribute('onclick');
                    const match = onclickAttr.match(/openFullscreenImage\(['"]([^'"]+)['"],\s*['"]([^'"]+)['"]\)/);
                    if (match && match.length > 2) {
                        src = match[1];
                        alt = match[2];
                    }
                } else {
                    // Получаем изображение внутри ссылки
                    const img = this.querySelector('img');
                    if (img) {
                        src = img.src;
                        alt = img.alt;
                    }
                }
                
                if (src) {
                    showFullscreenImage(src, alt);
                }
                
                return false;
            });
        });
    });
});

function generateContactHTML() {
    return '';
}

function closeFullscreenModal() {
    const fullscreenModal = document.getElementById('fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

function initGalleryImageClickHandlers() {
    // Находим все модальные окна с галереями изображений
    const projectModals = document.querySelectorAll('.project-modal');
    
    // Добавляем обработчики для кнопки закрытия полноэкранного просмотра
    const closeFullscreenBtn = document.querySelector('#fullscreen-modal .modal-close-btn');
    if (closeFullscreenBtn) {
        closeFullscreenBtn.addEventListener('click', closeFullscreenModal);
    }
    
    // Добавляем обработчик для кнопки "Закрыть"
    const closeBtn = document.getElementById('close-fullscreen');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFullscreenModal);
    }
    
    // Добавляем обработчик для кнопки "Скачать"
    const downloadBtn = document.getElementById('download-image');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const fullscreenImage = document.getElementById('fullscreen-image');
            if (fullscreenImage && fullscreenImage.src) {
                // Создаем временную ссылку для скачивания
                const a = document.createElement('a');
                a.href = fullscreenImage.src;
                a.download = fullscreenImage.alt || 'image';
                a.style.display = 'none';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
            }
        });
    }
    
    // Добавляем обработчики для закрытия полноэкранного просмотра по клику вне изображения
    const fullscreenModal = document.getElementById('fullscreen-modal');
    if (fullscreenModal) {
        fullscreenModal.addEventListener('click', function(e) {
            if (e.target === fullscreenModal) {
                closeFullscreenModal();
            }
        });
    }
    
    // Для каждого модального окна находим все изображения и добавляем обработчики
    projectModals.forEach(modal => {
        const galleryItems = modal.querySelectorAll('.gallery-item img');
        galleryItems.forEach(img => {
            img.style.cursor = 'pointer'; // Добавляем указатель курсора, чтобы показать, что можно нажать
            
            // Обертываем изображение в контейнер, если оно еще не обернуто
            if (!img.parentElement.classList.contains('img-container')) {
                const imgParent = img.parentElement;
                const imgContainer = document.createElement('div');
                imgContainer.className = 'img-container';
                imgContainer.style.cursor = 'pointer';
                imgParent.insertBefore(imgContainer, img);
                imgContainer.appendChild(img);
            }
            
            // Добавляем обработчик на img и его родительский контейнер
            const handleClick = function(e) {
                e.preventDefault(); // Предотвращаем стандартное поведение браузера
                e.stopPropagation(); // Останавливаем всплытие события
                const src = img.src;
                const alt = img.alt || '';
                openFullscreenImage(src, alt);
                return false; // Дополнительная защита от стандартного поведения
            };
            
            img.addEventListener('click', handleClick);
            
            // Также добавим обработчик на родительский элемент
            img.parentElement.addEventListener('click', handleClick);
        });
    });
    
    // Добавляем обработчик клавиши Escape для закрытия полноэкранного режима
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeFullscreenModal();
        }
    });
}

// Функция для предотвращения стандартного действия при клике на изображения в галерее
function preventGalleryImageDefaultBehavior() {
    // Находим все изображения в галереях
    const galleryImages = document.querySelectorAll('.gallery-item img');
    
    // Добавляем обработчик события для каждого изображения
    galleryImages.forEach(img => {
        // Блокируем стандартное поведение браузера при различных способах взаимодействия
        img.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }, true);
        
        img.addEventListener('mousedown', function(e) {
            if (e.button === 1) { // Средняя кнопка мыши
                e.preventDefault();
                return false;
            }
        }, true);
        
        img.addEventListener('auxclick', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
        img.addEventListener('contextmenu', function(e) {
            e.preventDefault();
            return false;
        }, true);
        
        // Блокируем drag-and-drop
        img.setAttribute('draggable', 'false');
        img.addEventListener('dragstart', function(e) {
            e.preventDefault();
            return false;
        }, true);
    });
    
    // Также блокируем стандартное поведение для контейнеров изображений
    const galleryItems = document.querySelectorAll('.gallery-item');
    galleryItems.forEach(item => {
        item.addEventListener('click', function(e) {
            if (e.target !== this) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, true);
    });
}

// Глобальная переменная для текущего масштаба изображения
let currentScale = 1;
const maxScale = 3;
const minScale = 0.5;

function setupFullscreenViewer() {
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');
    
    if (!fullscreenModal || !fullscreenImage) {
        console.error('Элементы для полноэкранного просмотра не найдены');
        return;
    }
    
    // Устанавливаем стили для изображения
    fullscreenImage.style.objectFit = 'contain'; // Изображение будет масштабироваться без обрезки
    fullscreenImage.style.maxWidth = '100%';
    fullscreenImage.style.maxHeight = '100%';
    fullscreenImage.style.width = 'auto';
    fullscreenImage.style.height = 'auto';
    
    // Удаляем кнопки управления, если они существуют
    const controls = fullscreenModal.querySelector('.fullscreen-controls');
    if (controls) {
        controls.remove();
    }
}

function showFullscreenImage(src, alt) {
    console.log('Вызов showFullscreenImage:', src, alt);
    const fullscreenModal = document.getElementById('fullscreen-modal');
    const fullscreenImage = document.getElementById('fullscreen-image');

    if (!fullscreenModal || !fullscreenImage) {
        console.error('Fullscreen modal or image not found');
        return false;
    }

    fullscreenImage.src = src;
    fullscreenImage.alt = alt || 'Полноэкранное изображение';
    fullscreenModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    console.log('Fullscreen modal opened');

    return false;
}

// Функция для скачивания изображения
function downloadFullscreenImage() {
    const fullscreenImage = document.getElementById('fullscreen-image');
    if (fullscreenImage && fullscreenImage.src) {
        // Создаем временную ссылку для скачивания
        const a = document.createElement('a');
        a.href = fullscreenImage.src;
        a.download = fullscreenImage.alt || 'image';
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
} 

// Повторная инициализация сервисных карточек после загрузки страницы
window.addEventListener('load', function() {
    console.log('Страница полностью загружена, повторная инициализация карточек услуг...');
    
    // Повторно инициализируем карточки услуг
    setTimeout(function() {
        initServicesModal();
        
        // Добавляем прямые обработчики для карточек услуг
        document.querySelectorAll('.service-card[data-service-id]').forEach(card => {
            const serviceId = card.getAttribute('data-service-id');
            card.onclick = function(e) {
                console.log(`Прямой обработчик: клик по карточке ${serviceId}`);
                const modal = document.getElementById(`service-modal-${serviceId}`);
                if (modal) {
                    modal.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            };
        });
        
        // Добавляем обработчики для кнопок закрытия
        document.querySelectorAll('.service-modal .modal-close-btn').forEach(btn => {
            btn.onclick = function(e) {
                const modal = this.closest('.service-modal');
                if (modal) {
                    modal.classList.remove('active');
                    document.body.style.overflow = '';
                }
            };
        });
    }, 500);
}); 