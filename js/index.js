/* ================================ common ================================ */
let secondLastPathSegment = location.href.split('/')[location.href.split('/').length - 2],
    varUA = navigator.userAgent.toLowerCase(),
    userLang = navigator.language || navigator.userLanguage,
    html = document.querySelector("html"),
    body = document.querySelector("body"),
    main = document.querySelector("main"),
    section = document.querySelectorAll("section"),
    header = document.querySelector("#header"),
    footer = document.querySelector("#footer"),
    menuicon = document.querySelector("#menuicon"),
    gnb = document.querySelector("#gnb"),
    cursor = document.querySelector('#cursor');

let lastScroll = 0,
    responsiveWidth = 1024,
    mouseX = 0,
    mouseY = 0,
    cursorX = 0,
    cursorY = 0;


AOS.init({
    duration: 1000,
    delay: 100,
});


const lenis = new Lenis({
    duration: 1.5,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


window.addEventListener("scroll", function () {
    let scrollTop = window.scrollY || $(window).scrollTop();
    if (header.classList.contains("hover") || header.classList.contains("on")) {
        return false;
    }
    if (varUA.indexOf("iphone") > -1 || varUA.indexOf("ipad") > -1 || varUA.indexOf("ipod") > -1 || varUA.indexOf("mac") > -1) {
        if (scrollTop == 0) {
            header.classList.add("active");
        } else {
            header.className.remove("active");
        }
    } else {
        if (scrollTop > lastScroll) {
            header.classList.remove("active");
        } else {
            header.classList.add("active");
        }
    }
    lastScroll = scrollTop;
});

window.addEventListener("load", function () {
    AOS.refresh();
    lenis.resize();
});

window.addEventListener("DOMContentLoaded", function () {
    /* ================================ <header> ================================ */
    menuicon.addEventListener("click", function () {
        this.classList.toggle("active");
    });


    header.querySelectorAll("#gnb>li>a").forEach(function (el) {
        el.parentElement.addEventListener("mouseenter", function () {
            if (window.innerWidth > responsiveWidth) {
                header.classList.add("hover");
            }
        });

        el.addEventListener("click", function (e) {
            let li = this.parentElement,
                sub_menu = this.nextElementSibling;
            if (window.innerWidth <= responsiveWidth && sub_menu) {
                e.preventDefault();
                document.querySelectorAll('#gnb li.active .sub_menu').forEach(function (active_sub_menu) {
                    if (sub_menu != active_sub_menu) {
                        active_sub_menu.parentElement.classList.remove("active");
                        slideUp(active_sub_menu, .4);
                    }
                });
                if (li.classList.contains("active")) {
                    slideUp(sub_menu, .4);
                    li.classList.remove("active");
                } else {
                    slideDown(sub_menu, .4);
                    li.classList.add("active");
                }
            }
        });

    });

    header.addEventListener("mouseleave", function (e) {
        if (window.innerWidth > responsiveWidth) {
            header.classList.remove("hover");
        }
    });

    /* ================================ <cursor> ================================ */
    if (doesElementExist("#cursor")) {
        window.addEventListener('mousemove', updateCursor);
        animateCursor();
    }

    /* ================================ <main> ================================ */
    if (doesElementExist("#main_page")) {
        var s01_swiper = new Swiper(".s01 .swiper", {
            effect: "fade",
            loop: true,
            autoplay: {
                delay: 8000,
                disableOnInteraction: false,
            },
            speed: 1000,
        });

        const splide01 = new Splide('.s03 .splide', {
            type: 'loop',
            focus: 'center',
            drag: "free",
            pagination: false,
            arrows: false,
            perPage: 5,
            breakpoints: {
                1024: {

                },
            },
            autoScroll: {
                speed: 1,
            },
        });
        splide01.mount(window.splide.Extensions);

        document.querySelectorAll(".s04 .tab li a").forEach(function(el,index){
            el.addEventListener("click",function(e){
                e.preventDefault();
                document.querySelector(".s04 .tab li.active").classList.remove("active");
                el.parentElement.classList.add("active");
            });
        });
    }

    /* ================================ <sub> ================================ */
    if (doesElementExist("#sub_page")) {

    }

    /* ================================ <popup> ================================ */
    if (doesElementExist(".popup")) {
        let popup = document.querySelector(".popup"),
            popup_iframe = popup.querySelector("iframe"),
            popup_video = popup.querySelector("video"),
            popup_img = popup.querySelector(".img_wrap img"),
            popup_close = popup.querySelector(".close");

        popup_close.addEventListener("click", function (e) {
            e.preventDefault();
            popup.classList.remove("active");
        });

        popup.addEventListener("click", function (e) {
            if (e.target == popup) {
                popup.classList.remove("active");
            }
        });
    }

    /* ================================ <form> ================================ */
    if (doesElementExist("#sub_page.contact.inquiry")) {
        let buttonSubmit = document.querySelector(".inquiry button[type='submit']"),
            form = document.querySelector(".inquiry form"),
            input_company = document.querySelector(".f_company_name"),
            input_name = document.querySelector(".f_name"),
            input_tel = document.querySelector(".f_tel"),
            input_email = document.querySelector(".f_email"),
            textarea_detail = document.querySelector(".f_detail"),
            input_privacy = document.querySelector(".f_privacy"),
            download_btn = document.querySelectorAll(".f_download_btn"),
            download_name = document.querySelectorAll(".f_download_name"),
            donwload_size = document.querySelectorAll(".f_donwload_size"),
            language_type = form.getAttribute("language-type");

        /* Form Enter X */
        form.addEventListener('submit', function (event) {
            event.preventDefault();
        });

        /* Download */
        if (download_btn[0]) {
            download_btn.forEach((el, index) => {
                el.addEventListener("change", () => {
                    if (el.files[0] == undefined) return false;
                    download_name[index].textContent = el.files[0].name;
                    if (el.files[0].size >= 1024) {
                        if (el.files[0].size >= (1024 * 1024 * 1024)) {
                            alert("1000MB를 초과하였습니다.");
                            download_name[index].textContent = "";
                            el.value = "";
                        } else {
                            download_name[index].innerHTML += `<span class="donwload_size">${(el.files[0].size / (1024 * 1024)).toFixed(2)} MB</span>`;
                        }
                    } else {
                        download_name[index].innerHTML += `<span class="donwload_size">${(el.files[0].size / (1024 * 1024)).toFixed(10)} MB</span>`;
                    }
                });
            });
        }

        /* Datepicker */
        if (doesElementExist(".datepicker")) {
            $.datepicker.setDefaults({
                dateFormat: 'yy-mm-dd',
                prevText: '이전 달',
                nextText: '다음 달',
                monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
                dayNames: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
                dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
                showMonthAfterYear: true,
                yearSuffix: '년'
            });

            var today = $.datepicker.formatDate('yy-mm-dd', new Date());
            var prevMonth = new Date();
            prevMonth.setMonth(prevMonth.getMonth() - 1);
            var prevMonthDate = $.datepicker.formatDate('yy-mm-dd', prevMonth);

            // Tdoay - 1 month
            $('.date_start .datepicker').each(function () {
                $(this).val(prevMonthDate);
                $(this).siblings("span").text(prevMonthDate);
            });

            // Today
            $('.date_end .datepicker').each(function () {
                $(this).val(today);
                $(this).siblings("span").text(today);
            });

            // datepicker.value = span
            $('.datepicker').datepicker({
                onSelect: function (dateText) {
                    $(this).siblings("span").text(dateText);
                }
            });
        }

        /* Submit */
        buttonSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            if (location.href.includes("/kor/") && language_type == "kor") {
                if (!validateInput(input_name, "text")) {
                    alert("이름을 입력해 주세요.");
                    return false;
                }
                if (!validateInput(input_tel, "num")) {
                    alert("전화번호를 입력해주세요.");
                    return false;
                }
                if (!validateInput(input_email, "email")) {
                    alert("이메일을 입력해주세요.");
                    return false;
                }
                if (!validateInput(input_privacy, "checkbox")) {
                    alert("개인정보 수집 및 이용에 동의해주세요.");
                    return false;
                }
                if (!confirm("문의내용을 전송하시겠습니까?")) {
                    return false;
                }
            } else if (location.href.includes("/eng/") && language_type == "eng") {
                if (!validateInput(input_name, "text")) {
                    alert("Please enter your name.");
                    return false;
                }
                if (!validateInput(input_tel, "num")) {
                    alert("Please enter your tel.");
                    return false;
                }
                if (!validateInput(input_email, "email")) {
                    alert("Please enter your email.");
                    return false;
                }
                if (!validateInput(input_privacy, "checkbox")) {
                    alert("Please agree to the collection and use of personal information.");
                    return false;
                }
                if (!confirm("Would you like to send your inquiry?")) {
                    return false;
                }
            } else {
                alert("None");
                return false;
            }

            buttonSubmit.disabled = false;
            form.submit();
        });
    }

    let DOMContentLoadedRefresh = setTimeout(() => {
        AOS.refresh();
        lenis.resize();
        clearTimeout(DOMContentLoadedRefresh)
    }, 0);
});

/* ================================ <spinner> ================================ */
document.addEventListener("DOMContentLoaded", () => {
    let spinner = document.querySelector("#spinner");
        countValue = document.querySelector("#spinner .count");
        circle = document.querySelector("#spinner circle");

    let progress_count = 0,
        progress_draw = 0;

    if(spinner){
        const startTime = performance.now();

        window.addEventListener("load", () => {
            const endTime = performance.now();
            const loadTime = endTime - startTime;
            const duration = Math.max(loadTime, 1500);
            const cirlce_width = circle.getBoundingClientRect().width + 2;
            const circle_stroke_width = circle.getAttribute("stroke-width");
            const dasharray = getStrokeDasharray(cirlce_width, circle_stroke_width);
            const interval = 10;
            const step = 100 / (duration / interval);
            const draw = dasharray / (duration / interval);
    
            const timer = setInterval(() => {
                progress_count += step;
                progress_draw += draw;
                if (progress_count >= 100) {
                    progress_count = 100;
                    progress_draw = dasharray;
                    clearInterval(timer);
                    let spinnerHide = setTimeout(() => {
                        document.querySelector("#spinner").classList.add("hide");
                        clearTimeout(spinnerHide);
                    }, 300);
                }
    
                countValue.textContent = Math.floor(progress_count) + "%";
                circle.setAttribute("stroke-dasharray", `${Math.floor(progress_draw)} ${dasharray}`);
            }, interval);
        });    
    }
});


/* ================================ <function> ================================ */
const animationMap = new WeakMap();

function getStrokeDasharray(svgSize, strokeWidth) {
    const radius = (svgSize / 2);
    const circumference = 2 * Math.PI * radius;
    return circumference.toFixed(2);
}

function slideStop(element) {
    if (animationMap.has(element)) {
        let animation = animationMap.get(element);
        cancelAnimationFrame(animation.requestId);
        clearTimeout(animation.timeoutId);
        element.style.transition = "none";
        animationMap.delete(element);
    }
    console.log(animationMap)
}

function slideUp(element, duration = 0.4) {
    slideStop(element);
    element.style.transition = `height ${duration}s ease-out, opacity ${duration}s ease-out`;
    element.style.height = element.offsetHeight + "px";
    element.offsetHeight;
    element.style.overflow = "hidden";
    element.style.height = "0";
    element.style.opacity = "0";

    let timeoutId = setTimeout(() => {
        element.style.display = "none";
        animationMap.delete(element);
    }, duration * 1000);

    animationMap.set(element, { timeoutId, requestId: requestAnimationFrame(() => { }) });
}

function slideDown(element, duration = 0.4) {
    slideStop(element);
    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;

    if (display === "none") display = "block";
    element.style.display = display;

    let height = element.scrollHeight;
    element.style.height = "0";
    element.style.overflow = "hidden";
    element.style.opacity = "0";
    element.offsetHeight;
    element.style.transition = `height ${duration}s ease-out, opacity ${duration}s ease-out`;
    element.style.height = height + "px";
    element.style.opacity = "1";

    let timeoutId = setTimeout(() => {
        element.style.removeProperty("height");
        element.style.removeProperty("overflow");
        element.style.removeProperty("opacity");
        element.style.removeProperty("transition");
        animationMap.delete(element);
    }, duration * 1000);

    animationMap.set(element, { timeoutId, requestId: requestAnimationFrame(() => { }) });
}

function updateCursor(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    let target = e.target,
        style = window.getComputedStyle(target);

    if (target.tagName === "A" || target.tagName === "BUTTON" || style.cursor === 'pointer') {
        cursor.classList.add("hover");
    } else {
        cursor.classList.contains("hover") && cursor.classList.remove("hover");
    }
    
    if(target.classList.contains("cursor_view")){
        cursor.classList.add("on");
    }else{
        cursor.classList.contains("on") && cursor.classList.remove("on");
    }
}

function animateCursor() {
    const deltaX = mouseX - cursorX;
    const deltaY = mouseY - cursorY;
    let size = cursor.offsetHeight;
    cursorX += deltaX * 0.2;
    cursorY += deltaY * 0.2;

    cursor.style.transform = `translate3d(${cursorX - size / 2}px, ${cursorY - size / 2}px,0)`;

    requestAnimationFrame(animateCursor);
}

function scrollToTop() {
    if (document.querySelector(".fullpage-wrapper")) {
        $.fn.fullpage.moveTo(1);
    } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }
}

function isInputValid(el) {
    if (!el.value.trim().length > 0 || el.value.trim().length == 0) {
        el.focus();
        return false;
    }
    return true;
}

function validateInput(el, type) {
    let num = /[0-9]/,
        email = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

    if (type == "text") {
        isInputValid(el);
    } else if (type == "num") {
        if (!num.test(el.value.trim())) {
            el.focus();
            return false;
        }
    } else if (type == "email") {
        if (!email.test(el.value.trim())) {
            el.focus();
            return false;
        }
    } else if (type == "checkbox") {
        if (el.checked == false) {
            el.focus();
            return false;
        }
    }
    return true;
}

function doesElementExist(selector) {
    let n = "";
    if (selector.includes(".") || selector.includes("#")) {
        n = selector;
    } else {
        n = "." + selector;
    }

    if (document.querySelector(n)) {
        return true;
    } else {
        return false;
    }
}

function isCurrentPage(htmlName) {
    let n = htmlName.includes(".html") ? htmlName : htmlName + ".html";
    if (n == location.href.split('/')[(location.href.split('/').length - 1)]) {
        return true;
    } else {
        return false;
    }
}

function historyBack() {
    if (document.referrer.includes("/list")) {
        history.back();
    } else {
        location.href = "./list.html";
    }
}