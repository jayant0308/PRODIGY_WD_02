const playbutton = document.getElementsByClassName("play")[0];
const lapbutton = document.getElementsByClassName("lap")[0];
const resetbutton = document.getElementsByClassName("reset")[0];
const minute = document.getElementsByClassName("minute")[0];
const second = document.getElementsByClassName("sec")[0];
const centisecond = document.getElementsByClassName("msec")[0];
const laps = document.getElementsByClassName("laps")[0];
const clearbutton = document.getElementsByClassName("lap-clear-button")[0];
const bg = document.getElementsByClassName("outer-circle")[0];

let isPlay = false
let isreset = false
let seccounter = 0;
let sec;
let min;
let centisec;
let centicounter = 0;
let mincounter = 0;
let lapitem = 0;


const togglebutton = () => {
    lapbutton.classList.remove("hidden")
    resetbutton.classList.remove("hidden")
}

const play = () => {
    if (!isPlay && !isreset) {
        playbutton.innerHTML = 'Pause';
        bg.classList.add("animation-bg");
        min = setInterval(() => {
            if (mincounter === 60) {
                mincounter = 0;
            }
            minute.innerHTML = `${++mincounter} :`;
        }, 60 * 1000);
        sec = setInterval(() => {
            if (seccounter === 60) {
                seccounter = 0;
            }
            second.innerHTML = `&nbsp;${++seccounter} :`;
        }, 1000);
        centisec = setInterval(() => {
            if (centicounter === 100) {
                centicounter = 0;
            }
            centisecond.innerHTML = `&nbsp;${++centicounter}`;
        }, 10);
        isPlay = true;
    } else {
        playbutton.innerHTML = 'Play';
        clearInterval(min);
        clearInterval(sec);
        clearInterval(centisec);
        isPlay = false;
        isreset = false;
        bg.classList.remove("animation-bg");
    }
    togglebutton();
}

const reset = () => {
    seccounter = 0;
    isreset = true;
    play();
    lapbutton.classList.add("hidden");
    resetbutton.classList.add("hidden");
    minute.innerHTML = '0 :';
    second.innerHTML = '&nbsp;0 :';
    centisecond.innerHTML = '&nbsp;0';
}

const lap = () => {
    const li = document.createElement("li");
    const number = document.createElement("span");
    const timestamp = document.createElement("span");

    li.setAttribute("class", "lap-item")
    number.setAttribute("class", "number")
    timestamp.setAttribute("class", "time-stamp")

    number.innerText = `#${++lapitem}`;
    timestamp.innerHTML = `${mincounter} : ${seccounter} : ${centicounter}`;

    li.append(number, timestamp);
    laps.append(li);

    clearbutton.classList.remove("hidden");
}

const clearAll = () => {
    laps.innerHTML = '';
    laps.append(clearbutton);
    clearbutton.classList.add("hidden");
}
playbutton.addEventListener("click", play);
resetbutton.addEventListener("click", reset);
lapbutton.addEventListener("click", lap);
clearbutton.addEventListener("click", clearAll);


