// Good Pick Coffee Cart — shared behaviour

document.addEventListener("DOMContentLoaded", function () {
  // Mobile nav toggle
  var toggle = document.querySelector(".nav__toggle");
  if (toggle) {
    toggle.addEventListener("click", function () {
      document.body.classList.toggle("menu-open");
    });
  }

  // Close mobile menu when a link is tapped
  document.querySelectorAll(".nav__mobile a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
    });
  });

  // Nav dropdowns (desktop nav) — Services, Locations, etc.
  var dropdowns = Array.prototype.slice.call(document.querySelectorAll(".nav__dropdown"));
  if (dropdowns.length) {
    function closeAllDropdowns() {
      dropdowns.forEach(function (d) {
        d.classList.remove("is-open");
        d.querySelector(".nav__dropdown-toggle").setAttribute("aria-expanded", "false");
      });
    }

    dropdowns.forEach(function (dropdown) {
      var dropdownToggle = dropdown.querySelector(".nav__dropdown-toggle");
      dropdownToggle.setAttribute("aria-expanded", "false");

      dropdownToggle.addEventListener("click", function (e) {
        e.stopPropagation();
        var wasOpen = dropdown.classList.contains("is-open");
        closeAllDropdowns();
        if (!wasOpen) {
          dropdown.classList.add("is-open");
          dropdownToggle.setAttribute("aria-expanded", "true");
        }
      });
    });

    document.addEventListener("click", function (e) {
      var clickedInside = dropdowns.some(function (d) { return d.contains(e.target); });
      if (!clickedInside) closeAllDropdowns();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeAllDropdowns();
    });
  }

  // Hero carousel (only present on index.html)
  var heroCarousel = document.querySelector("#heroCarousel");
  var heroMediaImg = document.querySelector("#heroMediaImg");
  if (heroCarousel && heroMediaImg) {
    var thumbs = Array.prototype.slice.call(heroCarousel.querySelectorAll(".hero__thumb"));
    var activeIndex = 0;
    var rotateTimer = null;

    function setActive(index) {
      activeIndex = index;
      thumbs.forEach(function (t, i) {
        t.classList.toggle("active", i === index);
      });
      var img = thumbs[index].getAttribute("data-img");
      var pos = thumbs[index].getAttribute("data-pos") || "center center";
      if (img) {
        heroMediaImg.style.opacity = "0";
        setTimeout(function () {
          heroMediaImg.src = img;
          heroMediaImg.style.objectPosition = pos;
          heroMediaImg.style.opacity = "1";
        }, 200);
      }
    }

    function startRotation() {
      if (rotateTimer) clearInterval(rotateTimer);
      rotateTimer = setInterval(function () {
        setActive((activeIndex + 1) % thumbs.length);
      }, 4500);
    }

    thumbs.forEach(function (thumb, i) {
      thumb.addEventListener("click", function () {
        setActive(i);
        startRotation();
      });
    });

    startRotation();
  }

  // Gallery filter (only present on gallery.html)
  var filterBtns = document.querySelectorAll(".gallery-filter button");
  var galleryItems = document.querySelectorAll(".gallery-grid .ph");
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        filterBtns.forEach(function (b) { b.classList.remove("active"); });
        btn.classList.add("active");
        var cat = btn.getAttribute("data-cat");
        galleryItems.forEach(function (item) {
          if (cat === "all" || item.getAttribute("data-cat") === cat) {
            item.style.display = "flex";
          } else {
            item.style.display = "none";
          }
        });
      });
    });
  }

});
