import gsap from "../vendors/gsap/src/index.js";
//declare var this:any
function init() {
    const slides = document.querySelectorAll(".slide");
    const pages = document.querySelectorAll(".page");
    const backgrounds = [
        `radial-gradient(#2b3760,#0b1023)`,
        `radial-gradient(#4e3022,#161616)`,
        `radial-gradient(#4e4342,#161616)`,
    ];
    //Tracker
    let current = 0;
    let scrollSlide = 0;
    slides.forEach((slide, index) => {
        slide.addEventListener('click', function ( /* this:any */) {
            changeDots(this);
            nextSlide(index);
            scrollSlide = index;
        });
    });
    function changeDots(dot) {
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        dot.classList.add('active');
    }
    function nextSlide(pageNumber) {
        if (pageNumber === current)
            return;
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextLeft = nextPage.querySelector('.hero, .model-left');
        const nextRight = nextPage.querySelector('.hero, .model-right');
        const currentLeft = currentPage.querySelector('.hero, .model-left');
        const currentRight = currentPage.querySelector('.hero, .model-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');
        const tl = gsap.timeline({
            onStart: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                });
            },
            onComplete: function () {
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                });
            }
        });
        tl.to(currentLeft, 0.3, { y: '-100%', opacity: 0 })
            .to(currentRight, 0.3, { y: '-100%', opacity: 0 }, '-=0.2')
            .to(portfolio, 0.3, { backgroundImage: backgrounds[pageNumber] })
            .fromTo(currentPage, 0.3, { opacity: 1, pointerEvents: 'all' }, { opacity: 0, pointerEvents: 'none' })
            .fromTo(nextPage, 0.3, { opacity: 0, pointerEvents: 'none' }, { opacity: 1, pointerEvents: 'all' }, "-=0.6")
            .fromTo(nextLeft, 0.3, { y: '-100%' }, { y: '-10%' }, '-=0.6')
            .fromTo(nextRight, 0.3, { y: '-100%' }, { y: '10%' }, '-=0.8')
            .fromTo(nextText, 0.3, { opacity: 0 }, { opacity: 1, y: 0 })
            // if hover effect is lost due to some complications in gsap
            .set(nextLeft, { clearProps: 'opacity' })
            .set(nextRight, { clearProps: 'opacity' })
            .set(currentLeft, { clearProps: 'opacity' })
            .set(currentRight, { clearProps: 'opacity' });
        current = pageNumber;
    }
    //OPTIONAL
    document.addEventListener('wheel', throttle(scrollChange, 1500));
    document.addEventListener('touchmove', throttle(scrollChange, 1500));
    function switchDots(dotNumber) {
        const activeDot = document.querySelectorAll('.slide')[dotNumber];
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        activeDot.classList.add('active');
    }
    function scrollChange(e) {
        console.log(e);
        if (e.deltaY > 0) {
            scrollSlide += 1;
        }
        else {
            scrollSlide -= 1;
        }
        if (scrollSlide > 2) {
            scrollSlide = 0;
        }
        if (scrollSlide < 0) {
            scrollSlide = 2;
        }
        switchDots(scrollSlide);
        nextSlide(scrollSlide);
        console.log(scrollSlide);
    }
    // navigation animation
    const hamburger = document.querySelector('.menu');
    const hamburgerLines = document.querySelectorAll('.menu line');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');
    console.log(hamburger, hamburgerLines, navOpen, contact, social, logo);
    const tl = gsap.timeline({ paused: true });
    tl.to(navOpen, 0.3, { y: 0 })
        .fromTo(contact, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.1')
        .fromTo(social, 0.5, { opacity: 0, y: 10 }, { opacity: 1, y: 0 }, '-=0.5')
        .fromTo(logo, 0.2, { color: 'white' }, { color: 'black' })
        .fromTo(hamburgerLines, 0.2, { stroke: 'white' }, { stroke: 'black' }, '-=1');
    hamburger?.addEventListener('click', () => {
        tl.reversed() ? tl.play() : tl.reverse();
    });
}
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}
init();
