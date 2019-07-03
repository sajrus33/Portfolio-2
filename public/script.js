"ue strict";
const worksSrc = [
  "public/img/works/web-flubmaster.png",
  "public/img/works/web-portfolio.png",
  "public/img/works/web-escape.png",
  "public/img/works/app-maps.png",
  "public/img/works/app-todo.png",
  "public/img/works/game-cards.png",
  "public/img/works/game-memory.png",
  "public/img/works/game-tower.png",
  "public/img/works/lib-circle.png"
];
const worksTitle = [
  "flubmaster",
  "portfolio",
  "escape",
  "maps",
  "todo",
  "cards",
  "memory",
  "tower",
  "circle"
];

const myDOM = {
  wrapperPerspective: document.querySelector(".wrapper--perspective"),
  noneTransition: document.querySelector(".noneTransition"),

  hamburger: document.querySelector(".header__hamb"),
  nav: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav__link"),

  wrappers: document.querySelectorAll(".wrapper"),

  worksImg: document.querySelectorAll(".img--slide"),
  worksTitle: document.querySelectorAll(".works__title"),

  worksNextBtn: document.querySelector(".works__arrow--next"),
  worksPrevBtn: document.querySelector(".works__arrow--prev"),

  flag: {
    smallScreen: false
  },

  actualWork: 0,

  loadWorks: (way = 0) => {
    myDOM.actualWork += way;
    const actual = myDOM.actualWork;
    const lastI = worksSrc.length - 1;
    let first = myDOM.actualWork,
      second = myDOM.actualWork + 1,
      thirt = myDOM.actualWork + 2;
    if (thirt > lastI) {
      thirt = 0;
      if (second == lastI + 1) {
        thirt = 1;
        second = 0;
      } else if (first == lastI + 1) {
        myDOM.actualWork = 0;
        first = myDOM.actualWork;
        second = myDOM.actualWork + 1;
        thirt = myDOM.actualWork + 2;
      }
    } else if (actual < 0) {
      if (actual == -1) {
        first = lastI;
        second = 0;
        thirt = 1;
      } else if (actual == -2) {
        first = lastI - 1;
        second = lastI;
        thirt = 0;
      } else if (actual <= -3) {
        myDOM.actualWork = lastI - 2;
        first = myDOM.actualWork;
        second = myDOM.actualWork + 1;
        thirt = myDOM.actualWork + 2;
      }
    }
    console.log(first);

    myDOM.worksImg[0].src = worksSrc[first];
    myDOM.worksImg[1].src = worksSrc[second];
    myDOM.worksImg[2].src = worksSrc[thirt];
    myDOM.worksTitle[0].innerText = worksTitle[first];
    myDOM.worksTitle[1].innerText = worksTitle[second];
    myDOM.worksTitle[2].innerText = worksTitle[thirt];

    // .forEach((workImg, index) => {
    //   console.log("work src work");
    //   workImg.src = worksSrc[myDOM.actualWork + index];
    // });
  },

  listen: () => {
    myDOM.hamburger.addEventListener("click", () => {
      // myDOM.wrapperPerspective.classList.toggle("offPerspective");
      myDOM.noneTransition.classList.remove("noneTransition");

      myDOM.nav.style.transform = "translateX(-50%)";

      if (window.innerWidth <= 768) {
        myDOM.flag.smallScreen = true;
        myDOM.wrapperPerspective.classList.toggle("displayNone");
        myDOM.nav.style.transform = "translateX(0)";
      }
      myDOM.wrapperPerspective.classList.toggle("onPerspective");
      myDOM.nav.classList.toggle("displayNone");
    });

    myDOM.navLinks.forEach(link => {
      link.addEventListener("click", () => {
        myDOM.navLinks.forEach(link => {
          link.classList.remove("onMark");
        });
        link.classList.add("onMark");
        myDOM.wrappers.forEach(wrapper => {
          // console.log(link.innerText.toLowerCase());
          wrapper.classList.add("displayNone");
          if (link.innerText.toLowerCase() == wrapper.classList[0]) {
            wrapper.classList.remove("displayNone");
          }
        });
        myDOM.hamburger.click();
      });
    });

    myDOM.worksPrevBtn.addEventListener("click", () => {
      myDOM.loadWorks(-1);
    });

    myDOM.worksNextBtn.addEventListener("click", () => {
      myDOM.loadWorks(1);
    });
  }
};

const init = () => {
  myDOM.listen();
  myDOM.loadWorks();
};
window.onload = init;
