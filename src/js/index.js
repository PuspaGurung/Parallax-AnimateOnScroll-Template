import {
  CountUp
} from "countup.js";
import "./../scss/main.scss";

////////////////// RECENT-WORK FILTER NAVIGATION  /////////////////
//default
filterWorkSelection("all");
let getFilterNavigations = document.querySelectorAll(
  ".work-filter-nav__item button"
);
for (let i = 0; i < getFilterNavigations.length; i++) {
  getFilterNavigations[i].addEventListener("click", () => {
    // Apply work-group name to filterWorkSelection() function when click on individual filter navigation button
    filterWorkSelection(getFilterNavigations[i].name);

    // Add btn-active class to the current contrl button
    let getActiveBtn = document.querySelectorAll(".work-filter-nav__item .btn-active");
    getActiveBtn.length > 0 ?
      (getActiveBtn[0].className = getActiveBtn[0].className.replace("btn-active", "")) : "";
    getFilterNavigations[i].classList.add("btn-active");
  });
}

function filterWorkSelection(workGroup) {
  let workGalleryItems = document.querySelectorAll(".gallery-itme");
  let newClassName = "work-visible";
  if (workGroup == "all") workGroup = "";
  for (let i = 0; i < workGalleryItems.length; i++) {
    hideWorkGroup(workGalleryItems[i], newClassName);
    workGalleryItems[i].className.indexOf(workGroup) > -1 ?
      showWorkGroup(workGalleryItems[i], newClassName) :
      "";
  }
}
// Show filter work-group
function showWorkGroup(workGalleryItem, newClass) {
  //console.log(name)
  let i, arr1, arr2;
  arr1 = workGalleryItem.className.split(" ");
  arr2 = newClass.split(" ");
  // console.log(arr1)
  for (i = 0; i < arr2.length; i++) {
    if (arr1.indexOf(arr2[i]) == -1) {
      workGalleryItem.classList.add(arr2[i]);
    }
  }
}
// Hide work-group that are not selected
function hideWorkGroup(workGalleryItem, newClass) {
  let i, arr1, arr2;
  arr1 = workGalleryItem.className.split(" ");
  arr2 = newClass.split(" ");
  for (i = 0; i < arr2.length; i++) {
    while (arr1.indexOf(arr2[i]) > -1) {
      arr1.splice(arr1.indexOf(arr2[i]), 1);
    }
  }
  workGalleryItem.className = arr1.join(" ");
}


/////////////// GALLERY POPUP BOX:: Display individual selected(clicked) gallery item//////////////
let getVisibleWorkGallery = document.querySelectorAll(
  ".recent-work--gallery .work-visible"
);
for (let i = 0; i < getVisibleWorkGallery.length; i++) {
  getVisibleWorkGallery[i].addEventListener("click", () => {
    let getPopupContainer = document.getElementById("selected-work-popup-box");
    // add visible-popup-box class (for display:block;); initially the box would be display:none;
    getPopupContainer.classList.add("visible-popup-box");
    //close the popupBox when click on close icon
    setTimeout(() => {
      let getClosePopupBox = document.querySelector(".close-popup-box");
      getClosePopupBox.addEventListener("click", () => {
        getPopupContainer.className = getPopupContainer.className.replace(
          "visible-popup-box",
          ""
        );
      });
    }, 1000);

    let image = getVisibleWorkGallery[i].getElementsByTagName("img");
    let getImgPath = image[0].src;
    let getPara =
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sit amet est dignissim, pellentesque nulla ac, lacinia tellus. Sed eget metus interdum, ultrices mauris ac, dictum nibh. Proin vel interdum nisi, convallis mollis dui. Vivamus vestibulum lectus id nisi accumsan, at rutrum lectus lobortis. Mauris maximus odio elit.";
    let getTitle = getVisibleWorkGallery[i].getElementsByClassName(
      "overlay-info--title"
    )[0].innerText;
    let galleryItemDetail = `<div class="selected-work">
    <button class="close-popup-box">X</button>
            <div class="selected-work__title">${getTitle}</div>
            <div class="selected-work__para">${getPara}</div>
            <div class="selected-work__image"><img src=${getImgPath} alt="${getTitle}"></div>
        </div>`;
    getPopupContainer.innerHTML = galleryItemDetail;
  });
};


////////////////// STATUS:: CountUp - Animate on display number  ////////////////////
let createInterval = setInterval(() => {
  let targetElement = document.querySelectorAll(
    ".visible .status-box .status-box__count"
  );
  // Status number to display (static )
  let statusNumber = [5235, 25987, 895, 487, 3658];
  for (let i = 0; i < targetElement.length; i++) {
    const countUp = new CountUp(targetElement[i], statusNumber[i]);
    countUp.start();
  }
  // Stop interval after mouse scrolled to target element (or #status section in this case)
  targetElement.length > 0 ? clearInterval(createInterval) : "";
}, 10);


///////////////////// TEAM SECTION:: CONTROL DISPLAY TEAM LIST ////////////////////////
let allTeams = document.querySelectorAll(".team");
let getTeamCtrolBtm = document.querySelector(".link-other-team");
let incrementBy = 0;
getTeamCtrolBtm.addEventListener("click", () => {
  incrementBy += 4;
  contrlDisplayTeam(incrementBy);
});

function contrlDisplayTeam(incrementBy) {
  let defaultTeamLength = 4;
  let teamLength =
    defaultTeamLength + incrementBy > allTeams.length ?
    allTeams.length :
    incrementBy ?
    defaultTeamLength + incrementBy :
    defaultTeamLength;
  // hide 'OTHER TEAM MEMBER' button if all teams are display
  teamLength == allTeams.length ? (getTeamCtrolBtm.style.display = "none") : "";
  for (let i = 0; i < teamLength; i++) {
    // add class team-visible ( for display:flex;)
    allTeams[i].classList.add("team-visible");
  }
}
contrlDisplayTeam();



//////////////////// PARALLAX EFFECT ///////////////////////
let header = document.getElementById("header");
let banner = document.getElementById("banner");
let services = document.getElementById("services");
let stats = document.getElementById("status");
let teams = document.getElementById("teams");
let footerTop = document.querySelector(".footer--top");

window.addEventListener("scroll", () => {
  let yOffset = window.pageYOffset;
  let xOffset = window.pageXOffset;

  //section:: header
  yOffset <= 500 ?
    (header.className = header.className.replace("scroll-fixed", "")) :
    yOffset >= 500 ?
    header.classList.add("scroll-fixed") :
    "";
  // section :: banner
  banner.style.backgroundPositionY = `${-yOffset * 0.3}px`;

  //section :: status
  stats.style.backgroundPositionX = `${-yOffset * 0.3}px`;

  //section :: services
  services.style.backgroundPositionY = `${-yOffset * 0.1}px`;

  //section :: teams
  teams.style.backgroundPositionX = `${yOffset * 0.5}px`;
});


////////////////////// SMOOTH NAVIGATION //////////////////////
// Browser support for to requestAnimationFrame method
let requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.emRequestAnimationFrame ||
  // for IE support
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };
let navLinks = document.querySelectorAll(".navigation a");
for (let i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", e => {
    // active navigation link
    let getActiveNavLink = document.querySelectorAll(".active-nav");
    getActiveNavLink.length > 0 ?
      (getActiveNavLink[0].className = getActiveNavLink[0].className.replace(
        "active-nav",
        ""
      )) :
      "";
    navLinks[i].classList.add("active-nav");
    //Call smoothScroll function
    smoothScroll(e);
  });
}

function smoothScroll(e) {
  e.preventDefault();
  let currentId =
    e.currentTarget.getAttribute("href") == "#" ?
    "header" :
    e.currentTarget.getAttribute("href");

  //return distance of current element relative to the top of the offsetParent node
  let targetPosition = document.querySelector(currentId).offsetTop;

  // return the number of the pixels the document is currently scrolled along the vertical ais with a value of 0.0.
  let startPosition = window.pageYOffset;
  let distance = targetPosition - startPosition;
  let durationTime = 1000;
  let start = null;
  requestAnimationFrame(step);
  //console.log(requestAnimationFrame(step))

  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    //window.scrollTo(0, distance * (progress / durationTime) + startPosition);
    window.scrollTo(
      0,
      easeInOutCubic(progress, startPosition, distance, durationTime)
    );
    if (progress < durationTime) window.requestAnimationFrame(step);
  }
}

// easing function
/** cubic easing in/out - acceleration until halfway, then deceleration
Source::http: //gizma.com/easing/  ***/
function easeInOutCubic(t, b, c, d) {
  t /= d / 2;
  if (t < 1) return (c / 2) * t * t * t + b;
  t -= 2;
  return (c / 2) * (t * t * t + 2) + b;
};

////////////////////// RESPONSIVE HEADER NAV /////////////////////
let getNavigation = document.querySelector('.navigation');
let getResponsiveNavTriggerBtn = document.getElementById('responsive-nav-trigger-btn');
getResponsiveNavTriggerBtn.addEventListener('click', () => {
  getResponsiveNavTriggerBtn.classList.toggle('active-trigger-btn');
  getNavigation.classList.toggle('show-navigation');

  setTimeout(() => {
    let getNavLink = document.querySelectorAll('.show-navigation li a');
    for (let i = 0; i < getNavLink.length; i++) {
      getNavLink[i].addEventListener('click', () => {
        getNavigation.className = getNavigation.className.replace('show-navigation', "");
        getResponsiveNavTriggerBtn.className = getResponsiveNavTriggerBtn.className.replace('active-trigger-btn', "");
      })
    }
  }, 1000);
});