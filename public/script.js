const myDOM = {
  wrapperPerspective: document.querySelector(".wrapper--perspective"),
  noneTransition: document.querySelector(".noneTransition"),

  hamburger: document.querySelector(".header__hamb"),
  nav: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav__link"),

  wrappers: document.querySelectorAll(".wrapper"),

  flag: {
    smallScreen: false
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
  }
};

const init = () => {
  myDOM.listen();
};
window.onload = init;
