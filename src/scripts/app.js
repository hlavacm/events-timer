const DEFAULT_START_AT = 1800000; // = milliseconds -> 00:30:00
const MAX_STOP_AT = 8006300; // = milliseconds -> 23:59:59
const WARNING_PERCETANGE = 20; // %
const PULSE_PERCETANGE = 10; // %

var countdownValue, countdownPercentage, warningPercentage, pulsePercentage, pulseInterval;

var stopwatch = $("#stopwatch");
var countdown = $("#countdown");
var heroSection = $("#hero-section");

initialize();

function initialize() {
  countdown.on("runnerFinish", function (eventObject, info) {
    updateBackground("is-danger");
    countdown.runner({
      autostart: true,
      countdown: false,
      startAt: 0,
      stopAt: MAX_STOP_AT,
      format: formatNegativeCountdown
    })
  });
  stopwatch.runner({
    autostart: false,
    countdown: false,
    milliseconds: false,
    startAt: 0,
    stopAt: MAX_STOP_AT,
    format: formatTimeValue
  });
  setDefaults();
}

function setDefaults() {
  countdownValue = tryGetCookieNumberValue("events-timer-countdown-value", DEFAULT_START_AT, MAX_STOP_AT);
  countdownPercentage = countdownValue / 100;
  $("#countdown-hours-field").val(parseInt((countdownValue / (1000 * 60 * 60)) % 24));
  $("#countdown-minutes-field").val(parseInt((countdownValue / (1000 * 60)) % 60));
  $("#countdown-seconds-field").val(parseInt((countdownValue / 1000) % 60));

  warningPercentage = tryGetCookieNumberValue("events-timer-warning-value", WARNING_PERCETANGE, 100);
  $("#warning-field").val(warningPercentage);

  pulsePercentage = tryGetCookieNumberValue("events-timer-pulse-value", PULSE_PERCETANGE, 100);
  $("#pulse-field").val(pulsePercentage);

  countdown.runner({
    autostart: false,
    countdown: true,
    milliseconds: false,
    startAt: countdownValue,
    stopAt: 0,
    format: formatCountdown
  });

  var date = new Date(countdownValue);
  $("#countdown").html(formatTimeValue(date.getTime()));

  clearInterval(pulseInterval);
  pulseInterval = null;
}

function updateBackground(newClass) {
  heroSection.removeClass("is-dark");
  heroSection.removeClass("is-light");
  heroSection.removeClass("is-success");
  heroSection.removeClass("is-warning");
  heroSection.removeClass("is-danger");
  heroSection.addClass(newClass);
}

function formatTimeValue(value) {
  var date = new Date(value);
  return date.toISOString().substr(11, 8);
}

function formatCountdown(value) {
  if (value > 0) {
    var currentPercentage = Math.round(value / countdownPercentage);
    if (!heroSection.hasClass("is-warning") && currentPercentage <= warningPercentage) {
      updateBackground("is-warning");
    }
    if (!pulseInterval && currentPercentage <= pulsePercentage) {
      pulseInterval = setInterval(pulseCountdown, 1000);
    }
  }
  return formatTimeValue(value);
}

function formatNegativeCountdown(value) {
  return "-" + formatTimeValue(value);
}

function pulseCountdown() {
  countdown.fadeOut(250);
  countdown.fadeIn(250);
}

function tryGetNumberValue(value, defaultNumber, maxNumber) {
  var number = parseInt(value);
  if (number >= 0) {
    return Math.min(number, maxNumber);
  }
  return defaultNumber;
}

function tryGetCookieNumberValue(key, defaultNumber, maxNumber) {
  var value = Cookies.get(key);
  if (value && value.length > 0) {
    return tryGetNumberValue(value, defaultNumber, maxNumber);
  }
  return defaultNumber;
}