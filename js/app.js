(function ($, document, window) {
    $(document).ready(function () {
        // Clone main navigation for mobile menu
        $(".mobile-navigation").html($(".main-navigation .menu").clone());

        // Mobile menu toggle with smooth animation
        $(".menu-toggle").click(function () {
            $(".mobile-navigation").toggleClass("open").stop(true, true).slideToggle(300);
        });

        // Hero slider
        $(".hero-slider").flexslider({
            controlNav: false,
            directionNav: true,
            animation: "fade",
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        });

        // Testimonial slider with automatic sliding every 1 minute
        $(".testimonial-slider").flexslider({
            controlNav: true,
            directionNav: false,
            animation: "slide",
            slideshow: true,
            slideshowSpeed: 60000, // 1 minute
            animationSpeed: 600
        });

        // Enhanced filtering with animation
        $(window).on("load", function () {
            var $container = $(".filterable-items");
            $container.isotope({
                itemSelector: ".project",
                layoutMode: "fitRows",
                transitionDuration: "0.5s"
            });

            $(document).on("click", ".filterable-nav a", function (e) {
                e.preventDefault();
                $(".filterable-nav .current").removeClass("current");
                $(this).addClass("current");
                $container.isotope({ filter: $(this).data("filter") });
            });

            $(".mobile-filter").on("change", function () {
                $container.isotope({ filter: $(this).val() });
            });
        });

        // Animate text on scroll down
        const elementsToAnimate = document.querySelectorAll(".fade-text");
        let lastScrollTop = 0;

        window.addEventListener("scroll", function () {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            elementsToAnimate.forEach(el => {
                let rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight && scrollTop > lastScrollTop) {
                    el.classList.add("slide-in-left");
                }
            });

            lastScrollTop = scrollTop; // Update last scroll position
        });

        // Lazy load background images for slides
        document.querySelectorAll('.slide').forEach(div => {
            const bgImage = div.getAttribute('data-bg-image');
            if (bgImage) {
                div.style.backgroundImage = `url(${bgImage})`;
            }
        });

    });
})(jQuery, document, window);
