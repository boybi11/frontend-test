let mobileNavToggled = false;
const nav = document.getElementById("mainNav");

window.addEventListener("scroll", (e) => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 0) nav.classList.add("scrolled");
    else nav.classList.remove("scrolled");
});

window.addEventListener("load", function(){
    const insightGrid = document.querySelector(".insights__grid");
    const insightCards = document.querySelectorAll(".insights__grid .card");

    insightGrid.addEventListener("scroll", () => {
        let activeCard = null;
    
        insightCards.forEach((card, index) => {
            card.classList.remove("active");
            if (testInView(insightGrid, card, ((index + 1) === insightCards.length))) {
                activeCard = card;
            }
        });

        if (activeCard) {
            const insightDots = document.querySelectorAll(`.insights__dots .dots-container__dot`);
            activeCard.classList.add("active");
            insightDots.forEach((dot, index) => {
                if ((index + 1) == activeCard.dataset.index) dot.classList.add("active");
                else dot.classList.remove("active");
            })
        }
    });


    const eventGrid = document.querySelector(".events__grid");
    const eventCards = document.querySelectorAll(".events__grid .card");

    eventGrid.addEventListener("scroll", () => {
        let activeCard = null;
    
        eventCards.forEach((card, index) => {
            card.classList.remove("active");
            if (testInView(eventGrid, card, ((index + 1) === eventCards.length))) {
                activeCard = card;
            }
        });

        if (activeCard) {
            const eventDots = document.querySelectorAll(`.events__dots .dots-container__dot`);
            activeCard.classList.add("active");
            eventDots.forEach((dot, index) => {
                if ((index + 1) == activeCard.dataset.index) dot.classList.add("active");
                else dot.classList.remove("active");
            })
        }
    });
});

function toggleMobileNav () {
    const nav = document.getElementById("mainNav");
    mobileNavToggled = !mobileNavToggled;

    if (mobileNavToggled) nav.classList.add("nav-toggled");
    else nav.classList.remove("nav-toggled");
}

function testInView(container, el, endOfItems){
    const containerScrollLeft = container.pageXOffset || container.scrollLeft;
    const containerEdge = containerScrollLeft + container.offsetWidth;
    const elPos = el.offsetLeft;
    const elEdge = elPos + el.clientWidth;
    if (((container.clientWidth + (container.pageXOffset || container.scrollLeft)) >= container.scrollWidth) && endOfItems) {
        return true
    }
    else return ((elEdge <= containerEdge) && (elPos >= containerScrollLeft));
}