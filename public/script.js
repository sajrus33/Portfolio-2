"ue strict";
/** Works image sources */
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
/* Works titles */
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
/** @property myDOM 
 * @type DOM 
 * @description elements and listeners */
const myDOM = {

  wrapperPerspective: document.querySelector(".wrapper--perspective"),
  noneTransition: document.querySelector(".noneTransition"),

  headerBtn: document.querySelector(".header__button"),

  hamburger: document.querySelector(".header__hamb"),
  nav: document.querySelector(".nav"),
  navLinks: document.querySelectorAll(".nav__link"),

  wrappers: document.querySelectorAll(".wrapper"),

  worksWork: document.querySelectorAll(".works__work"),
  worksImg: document.querySelectorAll(".img--slide"),
  worksTitle: document.querySelectorAll(".works__title"),

  worksNextBtn: document.querySelector(".works__arrow--next"),
  worksPrevBtn: document.querySelector(".works__arrow--prev"),

  mailForm: {
    message: document.querySelector(".contact__input--message"),
    name: document.querySelector(".contact__input--name"),
    email: document.querySelector(".contact__input--email"),
    submit: document.querySelector(".contact__input--submit")
  },

  flag: {
    smallScreen: false
  },

  actualWork: 0,
  myAlert: (describe) => {
    const oldAlert = document.querySelector(".tip");
    if (oldAlert) {
      oldAlert.remove();
    }
    const newAlert = document.createElement("div");
    newAlert.classList.add("tip");
    newAlert.innerText = String(describe);
    document.body.appendChild(newAlert);
  },
  /*  Function for works carousele, change works images display */
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
  sendEmail: () => {
    event.preventDefault();
    const name = myDOM.mailForm.name.value;
    const email = myDOM.mailForm.email.value;
    const message = myDOM.mailForm.message.value;

    if (email && message && name) {
      //  creating new message from inputs values
      const newMessage = {
        replay_to: "new portfolio",
        from_name: String(name) + " " + String(email),
        to_name: "Brian W.",
        message_html: String(message)
      };
      // send email with emailjs
      emailjs
        .send("brianwala22_gmail_com", "template_gqc9FdOP", newMessage)
        .then(
          response => {
            // console.log(response)
            myDOM.myAlert("Message has been sent");
            // grecaptcha.reset();
            for (let property in myDOM.mailForm) {
              if (myDOM.mailForm.hasOwnProperty(property)) {
                if (property !== "submit") {
                  myDOM.mailForm[property].value = "";
                }
              }
            }
          },
          error => {
            let alertString;
            if (error.status == 400) {
              alertString = "Verification by reCAPTCHA is needed !";
            } else {
              alertString = "We are sorry, automatic mailbox is full !";
            }
            myDOM.myAlert(alertString);
          }
        );
      // clean inputs values
    } else myDOM.myAlert("Please fill out all form positions");
  },
  /*    All listeners */
  listen: () => {
    /*    Hamburger ico click listener */

    myDOM.hamburger.addEventListener("click", () => {

      myDOM.noneTransition.classList.remove("noneTransition");
      myDOM.wrapperPerspective.classList.toggle("onPerspective");
      myDOM.nav.classList.toggle("displayNone");
      myDOM.navLinks.forEach((link, i) => {
        setTimeout(() => {
          link.classList.toggle("goInRight");
        }, ((i + 1) * 4) + "0");
      });
    });

    /*  Navigation links click listener */

    myDOM.navLinks.forEach((link, linkI) => {
      link.addEventListener("click", () => {
        myDOM.navLinks.forEach(linke => {
          linke.classList.remove("onMark");
        });

        link.classList.add("onMark");

        myDOM.wrappers.forEach((wrapper, wrapperI) => {

          wrapper.classList.add("displayNone");
          if (linkI == wrapperI) {
            wrapper.classList.remove("displayNone");
          }
        });
        myDOM.hamburger.click();
      });
    });

    /*   Works carousel click listener */

    myDOM.worksPrevBtn.addEventListener("click", () => {
      myDOM.loadWorks(-1);
    });

    myDOM.worksNextBtn.addEventListener("click", () => {
      myDOM.loadWorks(1);
    });

    /* Send Email, form submit listener */
    myDOM.mailForm.submit.addEventListener("click", myDOM.sendEmail);
  }
};

/*  Function, init main app */
const init = () => {
  myDOM.listen();
  worksSrc.forEach(src => {
    myDOM.worksImg[0].src = src;
  });
  myDOM.loadWorks();
};
window.addEventListener("load", init);



(() => {
  const canvas = document.querySelector(".canvas--rain");

  const ctx = canvas.getContext("2d");

  ctx.lineJoin = "round";
  canvas.height = window.innerHeight;
  canvas.width = window.innerWidth;
  canvas.style = "background: radial-gradient(#246, #123); background: black";

  let x = 0;

  class Drop {
    constructor(height, width, startPositionX, startPositionY, speed, colorOpacity) {
      this.height = height;
      this.width = width;
      this.startPositionX = startPositionX;
      this.startPositionY = startPositionY;
      this.currentPositionY = startPositionY;
      this.speed = speed;
      this.colorOpacity = colorOpacity;
    }
    draw() {
      ctx.beginPath();
      ctx.moveTo(this.startPositionX, this.currentPositionY);
      ctx.lineTo(this.startPositionX, this.currentPositionY + this.height);
      ctx.strokeStyle = "rgba(150, 150, 150, " + this.colorOpacity + ")";
      ctx.lineWidth = this.width;
      ctx.stroke();
      this.update();
    }

    update() {
      if (this.currentPositionY + this.height > canvas.height) {
        this.currentPositionY = 0;
      } else {
        this.currentPositionY += this.speed;
      }
    }
  }

  const rain = [];
  for (let i = 0; i < 800; i++) {
    rain.push(new Drop(
      Math.round(Math.random() * 10) + 10, /*height*/

      Math.round(Math.random() * 20) / 10, /*width*/
      Math.round(Math.random() * canvas.width), /*startPositionX*/
      Math.round(Math.random() * canvas.height), /*startPositionY*/
      Math.round(Math.random() * 5) + 5, /*speed*/
      Math.random() * .3 /* colorOpacity */
    ))
  }



  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < rain.length; i++) {
      rain[i].draw();
    }
    requestAnimationFrame(animate);
  }

  animate();
})();
