// ITZFIZZ | main.js
//   Scroll-Driven Hero Animation
//   Tech: GSAP 3 + ScrollTrigger

// Register GSAP Plugin 
gsap.registerPlugin(ScrollTrigger);


const car = document.getElementById("car");
const trail = document.getElementById("trail");
const letters = gsap.utils.toArray(".value-letter");
const valueAdd = document.querySelector(".value-add");
const loader = document.getElementById("loader");
const loaderBar = loader.querySelector(".loader-bar");
const afterTitle = document.querySelector(".after-title");
const afterSub = document.querySelector(".after-sub");
const ctaBtn = document.getElementById("cta-button");

/* Car dimensions */
const CAR_WIDTH = 480;   /* matches new SVG width */
const ROAD_WIDTH = () => window.innerWidth;
const END_X = () => ROAD_WIDTH() - CAR_WIDTH;


//    UTILITY: build road dashes
   
function buildDashes() {
    const container = document.getElementById("road-dashes");
    container.innerHTML = "";
    const count = Math.ceil((window.innerWidth * 2) / 90);
    for (let i = 0; i < count; i++) {
        const d = document.createElement("div");
        d.className = "road-dash";
        container.appendChild(d);
    }
}
buildDashes();


//    LOADER ANIMATION
  
function runLoader(onComplete) {
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 18 + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            loaderBar.style.width = "100%";

            gsap.to(loader, {
                opacity: 0,
                duration: 0.45,
                ease: "power2.inOut",
                delay: 0.25,
                onComplete: () => {
                    loader.style.display = "none";
                    onComplete();
                }
            });
        }
        loaderBar.style.width = progress + "%";
    }, 60);
}


//    INTRO ANIMATION  (after loader)
   
function runIntro() {
    /* Reset car to start position */
    gsap.set(car, { x: -CAR_WIDTH });

    /* Car drives in from left (intro only) */
    gsap.timeline()
        .to(car, {
            x: 0,
            duration: 1.1,
            ease: "power3.out",
            delay: 0.1
        });

    /* Trail follows car on intro */
    gsap.to(trail, {
        width: CAR_WIDTH * 0.2,
        duration: 1.1,
        ease: "power3.out",
        delay: 0.1
    });
}


//    PRE-CALCULATE letter positions (done once, not per scroll)
   
let letterOffsets = [];

function cacheLetterOffsets() {
    /* offsetLeft is relative to parent .value-add */
    const rect = valueAdd.getBoundingClientRect();
    letterOffsets = letters.map(l => rect.left + l.offsetLeft + l.offsetWidth / 2);
}

/* Recalculate on resize (debounced) */
let resizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        buildDashes();
        cacheLetterOffsets();
        ScrollTrigger.refresh();
    }, 200);
});


//    SCROLL-DRIVEN ANIMATIONS (GSAP ScrollTrigger)
   
function setupScrollAnimations() {
    cacheLetterOffsets();

    /* ------ 1. Car + Trail + Letter Reveal (scrub) ------ */
    const carAnim = gsap.to(car, {
        x: END_X,
        ease: "none",   /* linear so scrub is perfectly tied to scroll */
        scrollTrigger: {
            trigger: ".section",
            start: "top top",
            end: "bottom top",
            scrub: 1.2,       /* slight lag = feels smoother */
            pin: ".track",    /* keep the track sticky */
            anticipatePin: 1,
            onUpdate(self) {
                /* --- use requestAnimationFrame for smooth trail --- */
                const currentX = gsap.getProperty(car, "x");
                const carCenter = currentX + CAR_WIDTH / 2;

                /* trail width linked to car position */
                gsap.set(trail, { width: Math.max(0, carCenter) });

                /* letter opacity: reveal when car nose passes each letter */
                letters.forEach((letter, i) => {
                    const threshold = letterOffsets[i];
                    letter.style.opacity = carCenter >= threshold ? "1" : "0";
                });
            }
        }
    });

    //  2. Stat Cards (staggered scroll reveal) 
    const cards = [
        { id: "#box1", start: "top+=30%", end: "top+=45%" },
        { id: "#box2", start: "top+=45%", end: "top+=60%" },
        { id: "#box3", start: "top+=60%", end: "top+=75%" },
        { id: "#box4", start: "top+=75%", end: "top+=88%" },
    ];

    cards.forEach(({ id, start, end }) => {
        gsap.to(id, {
            opacity: 1,
            scrollTrigger: {
                trigger: ".section",
                start,
                end,
                scrub: true,
            }
        });
    });

    //  3. After-section entrance animation 
    const afterTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".after-section",
            start: "top 75%",
            end: "top 30%",
            toggleActions: "play none none reverse",
        }
    });

    afterTl
        .to(afterTitle, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" })
        .to(afterSub, { opacity: 1, y: 0, duration: 0.75, ease: "power3.out" }, "-=0.5")
        .to(ctaBtn, { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" }, "-=0.4");
}

// Boot
runLoader(() => {
    runIntro();
    // tiny delay so intro render is visible before ScrollTrigger attaches 
    setTimeout(setupScrollAnimations, 300);
});
