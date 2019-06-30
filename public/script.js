const myDOM = {
  wrapperPerspective: document.querySelector(".wrapper--perspective"),
  noneTransition: document.querySelector(".noneTransition"),

  hamburger: document.querySelector(".header__hamb"),
  nav: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav__link"),

  listen: () => {
    myDOM.hamburger.addEventListener("click", () => {
      // myDOM.wrapperPerspective.classList.toggle("offPerspective");
      myDOM.noneTransition.classList.remove("noneTransition");
      myDOM.nav.style.transform = "translateX(-50%)";

      if (window.innerWidth <= 768) {
        myDOM.wrapperPerspective.classList.toggle("displayNone");
        myDOM.nav.style.transform = "none";
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
        myDOM.hamburger.click();
      });
    });
  }
};

const init = () => {
  myDOM.listen();
};
window.onload = init;
