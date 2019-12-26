// IMPORT SCSS
import "./../scss/main.scss";

// FILTER WORK SELECTION
//default
filterWorkSelection("all");
let getWorkFilterBtn = document.querySelectorAll(
  ".work-filter-nav__item button"
);
for (let i = 0; i < getWorkFilterBtn.length; i++) {
  getWorkFilterBtn[i].addEventListener("click", () => {
    // Apply work-group name to filterWorkSelection() function when click on individual filter navigation button
    filterWorkSelection(getWorkFilterBtn[i].name);

    // Add btn-active class to the current contrl button
    let getActiveBtn = document.querySelectorAll(
      ".work-filter-nav__item .btn-active"
    );
    getActiveBtn.length > 0 ?
      (getActiveBtn[0].className = getActiveBtn[0].className.replace(
        "btn-active",
        ""
      )) :
      "";
    getWorkFilterBtn[i].classList.add("btn-active");
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

//GALLERY POPUP BOX:: Display individual selected(clicked) gallery item
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
    <i class="close-popup-box fa fa-window-close"></i>
            <div class="selected-work__title">${getTitle}</div>
            <div class="selected-work__para">${getPara}</div>
            <div class="selected-work__image"><img src=${getImgPath} alt="${getTitle}"></div>
        </div>`;
    getPopupContainer.innerHTML = galleryItemDetail;
  });
};