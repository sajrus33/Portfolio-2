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
const myDOM = {
  wrapperPerspective: document.querySelector(".wrapper--perspective"),
  noneTransition: document.querySelector(".noneTransition"),

  hamburger: document.querySelector(".header__hamb"),
  nav: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav__link"),

  wrappers: document.querySelectorAll(".wrapper"),

  worksImg: document.querySelectorAll(".img--slide"),
  worksNextBtn: document.querySelector(".works__arrow--next"),
  worksPrevBtn: document.querySelector(".works__arrow--prev"),

  flag: {
    smallScreen: false
  },

  actualWork: 0,

  loadWorks: (way = 0) => {
    myDOM.actualWork += way;

    if (way) {
      // const Work = myDOM.actualWork + way;
      // const firstWork = myDOM.actualWork + way;
      // const lastI = workSrc.length - 1;
      // if (firstWork < 0) {
      //   myDOM.actualWork = lastI;
      // } else if ((firstWork + 2) >= lastI) {
      //   myDOM.actualWork = ;
      // }
    }
    myDOM.worksImg.forEach((workImg, index) => {
      console.log("work src work");
      workImg.src = worksSrc[myDOM.actualWork + index];
    });
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
