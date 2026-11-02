document.addEventListener("DOMContentLoaded", function () {

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    function closeMenu() {
        navMenu.classList.remove("open");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Buka menu navigasi");

        menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    }

    function openMenu() {
        navMenu.classList.add("open");
        document.body.classList.add("menu-open");

        menuToggle.setAttribute("aria-expanded", "true");
        menuToggle.setAttribute("aria-label", "Tutup menu navigasi");

        menuToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    }

    menuToggle.addEventListener("click", function () {

        const isOpen = navMenu.classList.contains("open");

        if (isOpen) {
            closeMenu();
        } else {
            openMenu();
        }

    });


    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {
            closeMenu();
        });

    });


    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    window.addEventListener("resize", function () {

        if (window.innerWidth > 680) {
            closeMenu();
        }

    });


    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


        revealElements.forEach(function (element) {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });

    }


    const yearElement = document.getElementById("current-year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    const sections = document.querySelectorAll("main section[id]");

    if ("IntersectionObserver" in window) {

        const sectionObserver = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        const currentSectionId = entry.target.id;

                        navLinks.forEach(function (link) {

                            const linkTarget = link.getAttribute("href");

                            if (linkTarget === "#" + currentSectionId) {

                                link.classList.add("active");

                            } else {

                                link.classList.remove("active");

                            }

                        });

                    }

                });

            },
            {
                rootMargin: "-30% 0px -55% 0px",
                threshold: 0
            }
        );


        sections.forEach(function (section) {
            sectionObserver.observe(section);
        });

    }

});