const setAlarmBtn = document.querySelector(".set_alarm");

const snooze = document.querySelector(".snooze");
const disable = document.querySelector(".disable");

const main = document.querySelector(".main");
const sub = document.querySelector(".sub");

const alarmSound = new Audio();
alarmSound.src = "./alarm tone.mp3";

let timeOutFun;
let timeText = '';
let timeTitle = '';
let timeUrl = '';

function setAlarm() {
    const ms = document.querySelector("#time").valueAsNumber;
    timeTitle = document.getElementById("title").value;
    timeUrl = document.getElementById("url").value;

    

	if (isNaN(ms)) {
		alert("Date is not mention");
		return;
	}

	const alarm = new Date(ms);
	const alarmTime = new Date(
		alarm.getUTCFullYear(),
		alarm.getUTCMonth(),
		alarm.getUTCDate(),
		alarm.getUTCHours(),
		alarm.getUTCMinutes(),
		alarm.getUTCSeconds(),
		alarm.getUTCMilliseconds()
	);

	let temp;
	let AM_PM;
	if (alarmTime.getHours() > 12) {
        temp = alarmTime.getHours() - 12;
        AM_PM = 'PM';
    } else {
        temp = alarmTime.getHours();
        AM_PM = 'AM';
	}

	timeText = `${temp}:${alarmTime.getMinutes()} ${AM_PM}`;

	const differenceTime = alarmTime.getTime() - new Date().getTime();

	if (differenceTime < 0) {
		alert("Specified Time is already Passed");
		return;
	}

	timeOutFun = setTimeout(initAlarm, differenceTime);

	setAlarmBtn.innerText = "Cancel Alarm";
	setAlarmBtn.setAttribute("onclick", "cancelAlarm()");
	setAlarmBtn.style.background = "rgb(255, 58, 58)";
}

function cancelAlarm() {
	clearTimeout(timeOutFun);
	setAlarmBtn.innerText = "Set Alarm";
	setAlarmBtn.setAttribute("onclick", "setAlarm()");
	setAlarmBtn.style.background = "";
}

function initAlarm() {
	main.style.display = "none";
	sub.style.display = "flex";

    alarmSound.play();
    document.getElementById("time_text").innerText = timeText;
    document.getElementById("setTitle").innerText = timeTitle;
    window.open(timeUrl);
}

disable.addEventListener(
	"click",
	(stopAlarm = () => {
		main.style.display = "flex";
		sub.style.display = "none";

		alarmSound.pause();
        alarmSound.currentTime = 0;
        cancelAlarm();
	})
);

snooze.addEventListener("click", () => {
	stopAlarm();
	timeOutFun = setTimeout(initAlarm, 300000);
});
