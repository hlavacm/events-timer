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
  startState();
});

stopButton.click(function () {
  stopState();
});

resetButton.click(function () {
  if (!confirm("Reset cancels countdown and restores default state. Do you really want to confirm it?")) {
    return;
  }
  resetState();
});

$("#countdown-container").click(function () {
  if (startButton.prop("disabled") == false) {
    startState();
  } else if (stopButton.prop("disabled") == false) {
    stopState();
  }
});

$(".modal-button").click(function () {
  $($(this).data("target")).addClass("is-active");
});

$(".close-modal,.modal-background,.close-modal-button").click(function () {
  closeModal($(this));
});

$("#save-settings-button").click(function () {
  updateSettings();
  closeModal($(this));
});

function startState() {
  countdown.runner("start");
  stopwatch.runner("start");

  startButton.prop("disabled", true);
  stopButton.prop("disabled", false);
  resetButton.prop("disabled", false);

  updateBackground("is-success");
}

function stopState() {
  countdown.runner("stop");
  stopwatch.runner("stop");

  startButton.prop("disabled", false);
  stopButton.prop("disabled", true);
  resetButton.prop("disabled", false);

  updateBackground("is-light");
}

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

function closeModal(element) {
  element.parents("div.modal").removeClass("is-active");
}

function updateSettings() {
  if (resetButton.prop("disabled") == false) {
    if (!confirm("Apply will do reset. Do you really want to confirm it?")) {
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