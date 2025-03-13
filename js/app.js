(function ($, document, window) {
    $(document).ready(function () {
        // Clone main navigation for mobile menu
        $(".mobile-navigation").html($(".main-navigation .menu").clone());

        // Mobile menu toggle with smooth animation
        $(".menu-toggle").click(function () {
            $(".mobile-navigation").toggleClass("open").stop(true, true).slideToggle(300);
        });

        // Hero slider initialization
        $(".hero-slider").flexslider({
            controlNav: false,
            directionNav: true,
            animation: "fade",
            prevText: '<i class="fa fa-angle-left"></i>',
            nextText: '<i class="fa fa-angle-right"></i>'
        });

        // Testimonial slider with auto-sliding every 60 seconds
        $(".testimonial-slider").flexslider({
            controlNav: true,
            directionNav: false,
            animation: "slide",
            slideshow: true,
            slideshowSpeed: 60000,
            animationSpeed: 600
        });

        // Filtering functionality with animation
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

            lastScrollTop = scrollTop;
        });

        // Optimized lazy loading for slider images
        function lazyLoadSliderImages(sliderClass) {
            const slides = document.querySelectorAll(`.${sliderClass} .slides li`);

            if ("IntersectionObserver" in window) {
                let observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            let slide = entry.target;
                            let bgImage = slide.dataset.bgImage;
                            if (bgImage) {
                                slide.style.backgroundImage = `url(${bgImage})`;
                                observer.unobserve(slide);
                            }
                        }
                    });
                });

                slides.forEach(slide => observer.observe(slide));
            } else {
                // Fallback for older browsers
                slides.forEach(slide => {
                    let bgImage = slide.dataset.bgImage;
                    if (bgImage) {
                        slide.style.backgroundImage = `url(${bgImage})`;
                    }
                });
            }
        }

        // Run lazy load on both desktop and mobile sliders
        lazyLoadSliderImages("desktop-slider");
        lazyLoadSliderImages("mobile-slider");

        // Notification Popup
        setTimeout(function () {
            $("#overlay-popup").fadeIn();
            $("#popup-box").addClass("popup-show");
        }, 1000);

        // Close notification
        $(".btn-close").click(function () {
            $("#overlay-popup").fadeOut();
            $("#popup-box").removeClass("popup-show");
        });

        $(document).ready(function () {
            const downloadButton = $("#downloadBtn");
            const form = $(".contact-form form");
            let formSubmitted = false;
        
            // Handle form submission
            form.on("submit", function (event) {
                event.preventDefault(); // Prevent default form submission
        
                // Validate required fields
                const name = $("#name").val().trim();
                const email = $("#email").val().trim();
                const message = $("#message").val().trim();
        
                if (!name || !email || !message) {
                    alert("Please fill out all required fields before submitting.");
                    return;
                }
        
                // Simulate form submission via AJAX
                $.ajax({
                    url: form.attr("action"),
                    method: form.attr("method"),
                    data: form.serialize(),
                    dataType: "json",
                    success: function () {
                        formSubmitted = true;
                        alert("Form submitted successfully! Your brochure will now be downloaded.");
        
                        // Automatically download the brochure
                        setTimeout(() => {
                            const brochureUrl = "dummy/brochure.pdf"; // Adjust path if needed
                            const link = document.createElement("a");
                            link.href = brochureUrl;
                            link.download = "dummy/brochure.pdf"; // Force download
                            document.body.appendChild(link);
                            link.click();
                            document.body.removeChild(link);
                        }, 1000);
        
                        // Reset form fields after submission
                        form[0].reset();
                    },
                    error: function () {
                        alert("There was a problem submitting the form. Please try again.");
                    }
                });
            });
        
            // Prevent download if form isn't submitted
            downloadButton.on("click", function (event) {
                if (!formSubmitted) {
                    event.preventDefault();
                    alert("You need to submit the form first!");
                }
            });
        });
        

    });
})(jQuery, document, window);
