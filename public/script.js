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

  worksWork: document.querySelectorAll(".works__work"),
  worksImg: document.querySelectorAll(".img--slide"),
  worksTitle: document.querySelectorAll(".works__title"),

  worksNextBtn: document.querySelector(".works__arrow--next"),
  worksPrevBtn: document.querySelector(".works__arrow--prev"),

  flag: {
    smallScreen: false
  },

  actualWork: 0,

  loadWorks: (way = 0) => {
    myDOM.worksWork.forEach(work => {
      work.classList.remove("fadeIn");

      work.classList.add("fadeIn");
      setTimeout(() => {
        work.classList.remove("fadeIn");
      }, 500);
    });
    myDOM.actualWork += way;
    const actual = myDOM.actualWork;
    const lastI = worksSrc.length - 1;
    let worksNew = [];

    const stdChange = () => {
      for (let i = 0; i < 3; i++) {
        // console.log("kolejne", myDOM.actualWork + i);
        worksNew[i] = myDOM.actualWork + i;
      }
    };
    stdChange();

    if (worksNew[2] > lastI) {
      worksNew[2] = 0;
      if (worksNew[1] == lastI + 1) {
        worksNew[2] = 1;
        worksNew[1] = 0;
      } else if (worksNew[0] == lastI + 1) {
        myDOM.actualWork = 0;
        stdChange();
      }
    } else if (actual < 0) {
      if (actual == -1) {
        worksNew[0] = lastI;
        worksNew[1] = 0;
        worksNew[2] = 1;
      } else if (actual == -2) {
        worksNew[0] = lastI - 1;
        worksNew[1] = lastI;
        worksNew[2] = 0;
      } else if (actual <= -3) {
        myDOM.actualWork = lastI - 2;
        stdChange();
      }
    }
    worksNew.forEach((workNew, i) => {
      myDOM.worksImg[i].src = worksSrc[workNew];
      myDOM.worksTitle[i].innerText = worksTitle[workNew];
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
      myDOM.navLinks.forEach((link, i) => {
        const time = Number(String(i + 1) + "00");
        const linkN = link;
        console.log(typeof time);
        setTimeout(() => {
          console.log(link);
        }, time);
      });
      // myDOM.nav.classList.toggle("goInRight");
    });

    //

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

    //

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
  worksSrc.forEach(src => {
    myDOM.worksImg[0].src = src;
  });
  myDOM.loadWorks();
};
window.onload = init;
