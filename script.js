document.addEventListener('DOMContentLoaded', function() {
    // Код для скрытия/показа navContainer
    var navContainer = document.querySelector('.sticky-nav');
    var lastScrollTop = 0;

    window.addEventListener('scroll', function() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if (scrollTop > lastScrollTop) {
            // Прокрутка вниз
            navContainer.classList.add('hidden');
        } else {
            // Прокрутка вверх
            navContainer.classList.remove('hidden');
        }

        lastScrollTop = scrollTop;
    });

    // Код для анимации секции "Обо мне"
    var aboutSection = document.querySelector('#about');

    function checkVisibility() {
        var elementTop = aboutSection.getBoundingClientRect().top;
        var elementBottom = aboutSection.getBoundingClientRect().bottom;
        var viewportHeight = window.innerHeight || document.documentElement.clientHeight;

        // Если элемент виден хотя бы частично
        if (elementTop <= viewportHeight && elementBottom >= 0) {
            aboutSection.classList.add('animated');
        }
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Проверяем видимость при загрузке страницы

    // Плавный скролл к секции "Обо мне" и другим секциям
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Предотвращаем стандартное поведение ссылки

            const targetId = this.getAttribute('href');

            if (targetId === '#services-page') { // Если это ссылка на "Услуги"
                window.scrollTo({
                    top: 0, //  Скроллим в самый верх страницы
                    behavior: 'smooth' //  Для плавного скролла
                });
            } else { // Если это ссылка на другую секцию
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, //  Уменьшаем на высоту хедера или отступ
                        behavior: 'smooth' //  Для плавного скролла
                    });
                }
            }
        });
    });

    // Плавный скролл к началу страницы при клике на логотип
    var logoLink = document.querySelector('.logo'); //  Находим ссылку логотипа

    if (logoLink) { // Проверяем, что ссылка логотипа существует
        logoLink.addEventListener('click', function(e) {
            e.preventDefault(); // Предотвращаем стандартное поведение ссылки

            window.scrollTo({
                top: 0, //  Скроллим в самый верх страницы
                behavior: 'smooth' //  Для плавного скролла
            });
        });
    }

    // Код для sticky цен
    const serviceContainers = document.querySelectorAll('.service-container');

    serviceContainers.forEach(container => {
        const price = container.querySelector('.service-price');

        window.addEventListener('scroll', function() {
            const containerTop = container.offsetTop;
            const containerBottom = containerTop + container.offsetHeight;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > containerTop && scrollTop < containerBottom - price.offsetHeight) {
                price.style.position = 'sticky';
                price.style.top = '20px'; // Или другой отступ
            } else if (scrollTop >= containerBottom - price.offsetHeight) {
                price.style.position = 'absolute';
                price.style.top = 'auto';
                price.style.bottom = '0'; /*  Прижимаем к низу контейнера  */
            } else {
                price.style.position = 'static'; /* Возвращаем в исходное положение */
            }
        });
    });
});