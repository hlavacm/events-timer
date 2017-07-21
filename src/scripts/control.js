const DEFAULT_COOKIE_EXPIRES = 90;

// The following code is based off a toggle menu by @Bradcomp
// source: https://gist.github.com/Bradcomp/a9ef2ef322a8e8017443b626208999c1
(function () {
  var burger = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  burger.addEventListener('click', function () {
    burger.classList.toggle('is-active');
    menu.classList.toggle('is-active');
  });
})();

var startButton = $("#start-button");
var stopButton = $("#stop-button");
var resetButton = $("#reset-button");

startButton.click(function () {
  countdown.runner("start");
  stopwatch.runner("start");

  startButton.prop("disabled", true);
  stopButton.prop("disabled", false);
  resetButton.prop("disabled", false);

  updateBackground("is-success");
});

stopButton.click(function () {
  countdown.runner("stop");
  stopwatch.runner("stop");

  startButton.prop("disabled", false);
  stopButton.prop("disabled", true);
  resetButton.prop("disabled", false);

  updateBackground("is-light");
});

resetButton.click(function () {
  resetState();
});

$(".modal-button").click(function () {
  $($(this).data("target")).addClass("is-active");
});

$(".close-modal,.modal-background").click(function () {
  if ($("#settings-modal").hasClass("is-active")) {
    updateSettings();
  }
  $(this).parents("div.modal").removeClass("is-active");
});

function resetState() {
  countdown.runner("stop");
  countdown.runner("reset");
  stopwatch.runner("stop");
  stopwatch.runner("reset");

  startButton.prop("disabled", false);
  stopButton.prop("disabled", true);
  resetButton.prop("disabled", true);

  updateBackground("is-dark");
  setDefaults();
}

function updateSettings() {
  if (countdown.runner("info").running) {
    if (!confirm("Settings update will reset. Do you want to continue?")) {
      return;
    }
  }
  var hours = tryGetNumberValue($("#countdown-hours-field").val(), 0, 23);
  var minutes = tryGetNumberValue($("#countdown-minutes-field").val(), 0, 59);
  var seconds = tryGetNumberValue($("#countdown-seconds-field").val(), 0, 59);
  if (hours > 0 || minutes > 0 || seconds > 0) {
    var countdownValue = (hours * 60 * 60 * 1000) + (minutes * 60 * 1000) + (seconds * 1000);
    Cookies.set("events-timer-countdown-value", countdownValue, { expires: DEFAULT_COOKIE_EXPIRES });
  } else {
    Cookies.remove("events-timer-countdown-value");
  }

  warningPercentage = tryGetNumberValue($("#warning-field").val(), WARNING_PERCETANGE, 100);
  Cookies.set("events-timer-warning-value", warningPercentage, { expires: DEFAULT_COOKIE_EXPIRES });

  pulsePercentage = tryGetNumberValue($("#pulse-field").val(), PULSE_PERCETANGE, 100);
  Cookies.set("events-timer-pulse-value", pulsePercentage, { expires: DEFAULT_COOKIE_EXPIRES });

  resetState();
}