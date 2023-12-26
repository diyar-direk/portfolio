// start setting
let settingButton = document.querySelector(".gear");
let setting = document.querySelector("aside");

settingButton.onclick = function () {
  this.classList.toggle("rotate");
  setting.classList.toggle("open");
};
setting.onclick = function (e) {
  e.stopPropagation();
};
// start with lis
let lis = document.querySelectorAll(".box ul li");

lis.forEach((element) => {
  element.addEventListener("click", (e) => {
    lis.forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    addToLocalStorage("color", e.target.dataset.color);
  });
});

if (localStorage.getItem("color")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color")
  );
  getFromLocalStorage("color", "color", lis);
}

// end lis

// start random background

let array = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];
let landing = document.querySelector(".landing");
let interval;

changeBac();

document.querySelectorAll(".box .select .background").forEach((ele) => {
  ele.addEventListener("click", (e) => {
    document.querySelectorAll(".box .select .background").forEach((e) => {
      e.classList.remove("active");
    });
    e.target.classList.add("active");
    addToLocalStorage("change", e.target.dataset.change);
    if (e.target.dataset.change == "yes") {
      changeBac();
    } else {
      clearInterval(interval);
    }
  });
});

if (localStorage.getItem("change")) {
  if (localStorage.getItem("change") == "yes") {
    changeBac();
  } else {
    clearInterval(interval);
  }
  getFromLocalStorage(
    "change",
    "change",
    document.querySelectorAll(".box .select .background")
  );
}
if (localStorage.getItem("random")) {
  landing.style.backgroundImage = `url(img/${localStorage.getItem("random")})`;
}
// end random background

// start navbar

let navbar = document.querySelector("nav");

active(
  document.querySelectorAll(".box .select .fixed"),
  "position",
  "position",
  navbar,
  "position"
);
if (window.localStorage.getItem("position")) {
  getFromLocalStorage(
    "position",
    "position",
    document.querySelectorAll(".box .select .fixed")
  );
  navbar.style.position = window.localStorage.getItem("position");
}

// end navbar

// start popup

let popup = document.querySelector(".popup");

active(
  document.querySelectorAll(".box .select .display"),
  "display",
  "display",
  popup,
  "display"
);
if (window.localStorage.getItem("display")) {
  getFromLocalStorage(
    "display",
    "display",
    document.querySelectorAll(".box .select .display")
  );
  popup.style.display = window.localStorage.getItem("display");
}
// end popup

//start background color

let btns = document.querySelector(".change");
btns.onclick = function () {
  if (btns.classList.contains("light")) {
    btns.classList.remove("light");
    btns.classList.add("dark");
    document.body.dataset.theme = "dark";
    window.localStorage.setItem("background", document.body.dataset.theme);
  } else if (btns.classList.contains("dark")) {
    btns.classList.remove("dark");
    btns.classList.add("light");
    document.body.dataset.theme = "light";
    window.localStorage.setItem("background", document.body.dataset.theme);
  }
};

if (localStorage.getItem("background")) {
  if (localStorage.getItem("background") == "dark") {
    btns.classList.remove("light");
    btns.classList.add("dark");
    document.body.dataset.theme = localStorage.getItem("background");
  } else {
    btns.classList.remove("dark");
    btns.classList.add("light");
    document.body.dataset.theme = localStorage.getItem("background");
  }
}
//end background color

// reste button start

document.querySelector("aside > .button").onclick = () => {
  localStorage.clear();
  window.location.reload();
};

// reste button end

// end settnig

// start about

let arr = ["diyar direki", "front end developer", "web developer"];

setInterval(() => {
  let random = Math.floor(Math.random() * arr.length);
  document.querySelector("#about .text > h2 > span").innerHTML = arr[random];
}, 4000);

// end about

// start gallery

let images = document.querySelectorAll("#gallery .img img");

let overlay = document.createElement("div");
overlay.className = "img-overlay";

let changeIndex = 0;

images.forEach((e, index) => {
  let img = document.createElement("img");
  img.src = e.src;
  let title = document.createElement("h2");
  title.innerHTML = e.alt;
  let div = document.createElement("div");

  let close = document.createElement("span");
  close.className = "close";
  close.innerHTML = "x";
  div.appendChild(close);
  div.appendChild(img);
  div.appendChild(title);
  overlay.appendChild(div);
  e.setAttribute("data-index", index);
  close.onclick = function () {
    overlay.remove();
  };
  e.addEventListener("click", (e) => {
    let right = document.createElement("p");
    right.className = "right";
    right.innerHTML = "›";
    let left = document.createElement("p");
    left.className = "left";
    left.innerHTML = "‹";
    changeIndex = e.target.dataset.index;
    overlay.childNodes[changeIndex].className = "active";

    overlay.appendChild(left);
    overlay.appendChild(right);

    document.body.appendChild(overlay);

    // changeIndex++

    right.onclick = function () {
      document.querySelectorAll(".img-overlay div").forEach((e) => {
        e.classList.remove("active");
      });
      changeIndex++;
      overlay.childNodes[changeIndex].className = "active";
      if (changeIndex >= document.querySelectorAll(".img-overlay div").length) {
        changeIndex = 0;
        overlay.childNodes[changeIndex].className = "active";
        left.className = "left";
      }
    };

    left.onclick = function () {
      if (changeIndex > 0) {
        changeIndex--;
        document.querySelectorAll(".img-overlay div").forEach((e) => {
          e.classList.remove("active");
        });
        overlay.childNodes[changeIndex].classList.add("active");
      } else {
        document.querySelectorAll(".img-overlay div").forEach((e) => {
          e.classList.remove("active");
        });
        changeIndex = document.querySelectorAll(".img-overlay div").length - 1;
        overlay.childNodes[changeIndex].classList.add("active");
      }
    };
  });
});

// end gallery

//start navbar in resiz

let navbarBtns = document.querySelectorAll(".menu i");

navbarBtns.forEach((e) => {
  e.addEventListener("click", () => {
    document.querySelector(".menu").classList.toggle("opend");
    document.querySelector("nav .link").classList.toggle("opend");
  });
});

// end navbar in resiz

// start scrolling

let allSpans = document.querySelectorAll("#skills .skills .skil span");

let allsections = document.querySelectorAll("main[data-href]");

window.onscroll = function () {
  if (window.scrollY > 100) {
    if (navbar.style.position == "fixed") {
      navbar.classList.add("scroll");
    }
  } else {
    navbar.classList.remove("scroll");
  }
  if (window.scrollY >= document.querySelector("#skills").offsetTop - 200) {
    allSpans.forEach((e) => {
      e.style.width = e.dataset.width;
    });
  }
  for (let i = 0; i < allsections.length - 1; i++) {
    if (
      window.scrollY >= allsections[i].offsetTop - 150 &&
      window.scrollY < allsections[i + 1].offsetTop
    ) {
      removeActive(
        document.querySelectorAll("nav .link .links"),
        document.querySelector(
          `nav .link a[data-href="${allsections[i].dataset.href}"`
        )
      );
      removeActive(
        document.querySelectorAll(".popup a"),
        document.querySelector(
          `.popup a[data-href="${allsections[i].dataset.href}"`
        )
      );
    }
  }
  if (window.scrollY >= document.querySelector("#contact").offsetTop) {
    removeActive(
      document.querySelectorAll("nav .link .links"),
      document.querySelector(`nav .link a[data-href="contact"`)
    );
    removeActive(
      document.querySelectorAll(".popup a"),
      document.querySelector(`.popup a[data-href="contact"`)
    );
  }
};

////end scrolling

document.addEventListener("click", (e) => {
  if (
    !e.target.classList.contains("setting") &&
    !e.target.classList.contains("fa-gear")
  ) {
    if (setting.classList.contains("open")) {
      setting.classList.remove("open");
      settingButton.classList.remove("rotate");
    }
  }
  if (e.target != document.querySelector(".menu i")) {
    document.querySelector("nav .link").classList.remove("opend");
    document.querySelector("nav .menu").classList.remove("opend");
  }
});

function active(ele, key, data, change, style) {
  ele.forEach((element) => {
    element.addEventListener("click", (e) => {
      ele.forEach((e) => {
        e.classList.remove("active");
      });
      e.target.classList.add("active");
      window.localStorage.setItem(key, e.target.dataset[data]);
      change.style[style] = e.target.dataset[data];
    });
  });
}

function addToLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

function getFromLocalStorage(key, dataset, element) {
  element.forEach((e) => {
    e.classList.remove("active");
  });
  document
    .querySelector(`[data-${dataset}="${window.localStorage.getItem(key)}"]`)
    .classList.add("active");
}

function changeBac() {
  interval = setInterval(() => {
    let random = Math.floor(Math.random() * array.length);
    landing.style.backgroundImage = `url(img/${array[random]})`;
    window.localStorage.setItem("random", array[random]);
  }, 10000);
}

//onload
window.onload = function () {
  if (window.localStorage.getItem("position") == "fixed") {
    if (window.scrollY > 100) navbar.classList.add("scroll");
  }
  document.querySelector(".loader").remove();
};

function removeActive(removing, element) {
  removing.forEach((e) => {
    e.classList.remove("active");
  });
  element.classList.add("active");
}
