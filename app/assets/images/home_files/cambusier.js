const agelimit = 18;
var slider_width = 0;
var slider_lock = false;
$j = jQuery;

$j(function() {
  // run cocktails slider
  cocktails_slider_init();

  // back to top button on scroll
  $j(window).on("scroll", backtotop);

  // home page arrow disapearance function
  //   $j(window).on("scroll", function() {
  //     if ($j(".home")) {
  //       if ($j(window).scrollTop() > 150) {
  //         $j(".home-arrow-down").fadeTo("fast", 0);
  //       } else {
  //         $j(".home-arrow-down").fadeTo("fast", 1);
  //       }
  //     }
  //   });

  // check if cookie exists
  if ($j.cookie("check_age") == 1) return;

  // show popup centered on screen
  var overlay = $j("#overlay").show();
  var popup = $j("#agepopup");
  popup
    // .css({
    //   left: ($j(window).width() - popup.width()) / 2,
    //   top: ($j(window).height() - popup.height()) / 2
    // })
    .show();

  // allow return key to work
  popup.on("keyup", function(e) {
    if (e.keyCode == 13) check_age();
  });
});

// fade arrow on scroll home
var arrow = document.querySelector(".home-arrow-down");
var timeout_debounce;

window.addEventListener("scroll", debounce);

function debounce(event) {
  if (timeout_debounce) {
    return;
  }

  timeout_debounce = setTimeout(clearDebounce, 250);
  // Pass the event to the actual callback.
  actualCallback(event);
}

function clearDebounce() {
  timeout_debounce = null;
}

function actualCallback(event) {
  // Perform your logic here with no CPU hogging.

  if ($j(window).scrollTop() > 150) {
    $j(arrow).fadeTo("fast", 0);
  } else {
    $j(arrow).css("opacity", 1);
  }
}

// check age limit for welcome popup
function check_age(field) {
  // need to change field?
  if (field != undefined && $j(field).val().length == 2)
    $j(field)
      .next()
      .focus();

  // get popup & year
  var popup = $j("#agepopup");
  var date = new Date();
  var year = date.getFullYear();

  // get the fields values
  var jj = parseInt(popup.find("input[name=jj]").val()) || 01;
  var mm = parseInt(popup.find("input[name=mm]").val()) || 01;
  var aaaa = parseInt(popup.find("input[name=aaaa]").val()) || 1990;

  // must have numbers
  var error = false;
  if (
    isNaN(jj) ||
    isNaN(mm) ||
    isNaN(aaaa) ||
    // numbers must be valid
    jj <= 0 ||
    jj > 31 ||
    mm <= 0 ||
    mm > 12 ||
    aaaa <= year - 100 ||
    aaaa > year ||
    // old enough just looking at year
    aaaa > year - agelimit
  ) {
    error = true;
  }
  // limit year? check month & day
  else if (aaaa == year - agelimit) {
    if (mm > date.getMonth()) error = true;
    // must check day to be sure
    else if (mm == date.getMonth() && jj > date.getDay()) error = true;
  }

  if (error) {
    // disable button
    popup.addClass("off");
    return;
  }

  // enable button
  popup.removeClass("off");

  // close popup if asked
  if (field == undefined) {
    // hide popup
    $j("#overlay").hide();
    popup.hide();

    // store in cookie
    if ($j.cookie("check_age") == undefined) {
      $j.cookie("check_age", 1, { expires: 180 });
    }
  }
}

function backtotop() {
  var scrolltrigger = $j(window).height() / 2;
  var scrollTop = $j(window).scrollTop();

  if (scrollTop < scrolltrigger) $j("#backtotop").hide();
  else $j("#backtotop").show();
}

/* cocktails slider */
function cocktails_slider_init() {
  // get lines if any in this page
  var lines = $j("#post-2 > .cocktails-list, #post-2254 > .cocktails-list");
  /*if (lines.length == 0){
        lines = $j("#post-2254 > .cocktails-list");
    } */

  if (lines.length == 0) return;

  // get block & margin width
  var main = $j("#post-2, #post-2254").width();
  /*if( main == null ) {
        main     = $j("#post-2254").width();
    }*/
  var block = $j(".wpb_single_image");
  var w_block = block.width();
  var w_margin = parseInt(block.css("margin-right").replace("px", ""));

  // we want to run this again on window resize
  $j(window).resize(function() {
    var new_slider_width =
      ($j("#post-2, #post-2254").width() + w_margin) / (w_block + w_margin);
    if (slider_width != new_slider_width) cocktails_slider_init();
  });

  // need to see how many blocks we can show
  slider_width = (main + w_margin) / (w_block + w_margin);

  // look at each line
  lines.each(function() {
    // get cols and work only if more than 3 (or 2 or 1) of them
    var cols = $j(this)
      .children()
      .not(".cocktails_slider")
      .filter(":first")
      .children()
      .children();

    // reset wrapper margins
    $j(this)
      .find(".wpb_wrapper")
      .css("margin-left", 0);

    // continue only if there is more cocktails to see
    if (cols.length < slider_width) {
      $j(this)
        .find(".cocktails_slider")
        .remove();
      return;
    }

    // add arrows
    $j(this).prepend(
      "<div class='cocktails_slider cocktails_slider_left'></div>"
    );
    $j(this).append(
      "<div class='cocktails_slider cocktails_slider_right'></div>"
    );

    // preload hover state
    $j("<img/>")[0].src = nm_wp_vars.themeUri + "/img/left_hover.png";
    $j("<img/>")[0].src = nm_wp_vars.themeUri + "/img/right_hover.png";

    // bind events on them
    $j(this)
      .find(".cocktails_slider")
      .on("click", function() {
        // only one click at a time
        if (slider_lock) return;
        slider_lock = true;

        // get all wrappers to scroll
        var wrappers = $j(this)
          .siblings()
          .children(".wpb_wrapper");
        if (wrappers.length == 0) {
          slider_lock = false;
          return;
        }

        // get slide position
        var position = parseInt(wrappers.css("margin-left").replace("px", ""));

        // left click or right click?
        if ($j(this).hasClass("cocktails_slider_left")) {
          // we are already on the left, clone content
          if (-position <= w_block) {
            var compute = true;
            wrappers.each(function() {
              // compute new margin only once
              if (compute) {
                position = 0;
                $j(this)
                  .children()
                  .each(function() {
                    position -=
                      $j(this).width() +
                      parseInt(
                        $j(this)
                          .css("margin-right")
                          .replace("px", "")
                      );
                  });
                compute = false;
              }
              $j(this)
                .css({ marginLeft: position, width: $j(this).width() * 2 })
                .prepend($j(this).html());
            });
          }

          // scroll left
          wrappers.each(function() {
            $j(this).animate(
              { marginLeft: position + w_block + w_margin },
              500,
              "swing",
              function() {
                slider_lock = false;
              }
            );
          });
        } else {
          // compute limit
          var limit =
            ($j(this)
              .siblings()
              .not(".cocktails_slider")
              .filter(":first")
              .children()
              .children().length -
              slider_width) *
            (w_block + w_margin);

          // we are already on the right, clone content
          if (-position >= limit) {
            wrappers.each(function() {
              $j(this)
                .css({ width: $j(this).width() * 2 })
                .append($j(this).html());
            });
          }

          // scroll right
          wrappers.each(function() {
            $j(this).animate(
              { marginLeft: position - w_block - w_margin },
              500,
              "swing",
              function() {
                slider_lock = false;
              }
            );
          });
        }
      });
  });
}
