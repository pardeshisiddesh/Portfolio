function animateValue(id, start, end, duration) {
  if (start === end) return;
  var range = end - start;
  var current = start;
  var increment = end > start ? 1 : -1;
  var stepTime = Math.abs(Math.floor(duration / range));
  var obj = document.getElementById(id);
  var timer = setInterval(function () {
    current += increment;
    obj.innerHTML = current;
    if (current == end) {
      clearInterval(timer);
    }
  }, stepTime);
}
animateValue("value", 25, 232, 5000);
animateValue("value2", 25, 521, 5000);
animateValue("value3", 25, 1453, 5000);
animateValue("value4", 0, 32, 5000);

/*	gallery */
$(document).ready(function () {
  $(".filter-button").click(function () {
    var value = $(this).attr("data-filter");

    if (value == "all") {
      $(".filter").show("1000");
    } else {
      $(".filter")
        .not("." + value)
        .hide("3000");
      $(".filter")
        .filter("." + value)
        .show("3000");
    }

    if ($(".filter-button").removeClass("active")) {
      $(this).removeClass("active");
    }
    $(this).addClass("active");
  });
});
/*	end gallery */

$(document).ready(function () {
  $(".fancybox").fancybox({
    openEffect: "none",
    closeEffect: "none",
  });
});

/*	Testimonial */

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    mouseDrag: false,
    loop: true,
    margin: 2,
    nav: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 1,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".owl-prev").click(function () {
    $active = $(".owl-item .item.show");
    $(".owl-item .item.show").removeClass("show");
    $(".owl-item .item").removeClass("next");
    $(".owl-item .item").removeClass("prev");
    $active.addClass("next");
    if ($active.is(".first")) {
      $(".owl-item .last").addClass("show");
      $(".first").addClass("next");
      $(".owl-item .last").parent().prev().children(".item").addClass("prev");
    } else {
      $active.parent().prev().children(".item").addClass("show");
      if ($active.parent().prev().children(".item").is(".first")) {
        $(".owl-item .last").addClass("prev");
      } else {
        $(".owl-item .show").parent().prev().children(".item").addClass("prev");
      }
    }
  });

  $(".owl-next").click(function () {
    $active = $(".owl-item .item.show");
    $(".owl-item .item.show").removeClass("show");
    $(".owl-item .item").removeClass("next");
    $(".owl-item .item").removeClass("prev");
    $active.addClass("prev");
    if ($active.is(".last")) {
      $(".owl-item .first").addClass("show");
      $(".owl-item .first").parent().next().children(".item").addClass("prev");
    } else {
      $active.parent().next().children(".item").addClass("show");
      if ($active.parent().next().children(".item").is(".last")) {
        $(".owl-item .first").addClass("next");
      } else {
        $(".owl-item .show").parent().next().children(".item").addClass("next");
      }
    }
  });
});

// Testimonial
$(".testi2").owlCarousel({
  loop: true,
  margin: 20,
  nav: false,
  dots: true,
  autoplay: true,
  responsiveClass: true,
  responsive: {
    0: {
      items: 1,
      nav: false,
    },
    1170: {
      items: 1,
    },
  },
});

$(function () {
  // 1) ASSIGN EACH 'DOT' A NUMBER
  dotcount = 1;
  $(".testi2 .owl-dot").each(function () {
    $(this).addClass("dotnumber" + dotcount);
    $(this).attr("data-info", dotcount);
    dotcount = dotcount + 1;
  });
  // 2) ASSIGN EACH 'SLIDE' A NUMBER
  slidecount = 1;
  $(".testi2 .owl-item")
    .not(".cloned")
    .each(function () {
      $(this).addClass("slidenumber" + slidecount);
      slidecount = slidecount + 1;
    });
  $(".testi2 .owl-dot").each(function () {
    grab = jQuery(this).data("info");
    slidegrab = $(".slidenumber" + grab + " img").attr("src");
    console.log(slidegrab);
    $(this).css("background-image", "url(" + slidegrab + ")");
  });
  // THIS FINAL BIT CAN BE REMOVED AND OVERRIDEN WITH YOUR OWN CSS OR FUNCTION, I JUST HAVE IT
  // TO MAKE IT ALL NEAT
});

// Contact form

$(".selection-2").select2({
  minimumResultsForSearch: 20,
  dropdownParent: $("#dropDownSelect1"),
});

// TypeWritter Effect

function myFunction() {
  var x = document.getElementById("#sidebar");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

// List of sentences
var _CONTENT = [
  "Twinkle, twinkle, little star",
  "How I wonder what you are",
  "Up above the world so high",
  "Like a diamond in the sky",
];

// Current sentence being processed
var _PART = 0;

// Character number of the current sentence being processed
var _PART_INDEX = 0;

// Holds the handle returned from setInterval
var _INTERVAL_VAL;

// Element that holds the text
var _ELEMENT = document.querySelector("#text");

// Cursor element
var _CURSOR = document.querySelector("#cursor");

// Implements typing effect
function Type() {
  // Get substring with 1 characater added
  var text = _CONTENT[_PART].substring(0, _PART_INDEX + 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX++;

  // If full sentence has been displayed then start to delete the sentence after some time
  if (text === _CONTENT[_PART]) {
    // Hide the cursor
    _CURSOR.style.display = "none";

    clearInterval(_INTERVAL_VAL);
    setTimeout(function () {
      _INTERVAL_VAL = setInterval(Delete, 50);
    }, 1000);
  }
}

// Implements deleting effect
function Delete() {
  // Get substring with 1 characater deleted
  var text = _CONTENT[_PART].substring(0, _PART_INDEX - 1);
  _ELEMENT.innerHTML = text;
  _PART_INDEX--;

  // If sentence has been deleted then start to display the next sentence
  if (text === "") {
    clearInterval(_INTERVAL_VAL);

    // If current sentence was last then display the first one, else move to the next
    if (_PART == _CONTENT.length - 1) _PART = 0;
    else _PART++;

    _PART_INDEX = 0;

    // Start to display the next sentence after some time
    setTimeout(function () {
      _CURSOR.style.display = "inline-block";
      _INTERVAL_VAL = setInterval(Type, 100);
    }, 200);
  }
}

// Start the typing effect on load
_INTERVAL_VAL = setInterval(Type, 100);
