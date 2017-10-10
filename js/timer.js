var spanClock = document.querySelector('.clock');
var containerStart = document.querySelector('.container-start');
var containerPause = document.querySelector('.container-pause');
var containerReset = document.querySelector('.container-reset');
var containerButtonsIncrement = document.querySelector('.container-buttons-increment');
var containerButtonsDecrement = document.querySelector('.container-buttons-decrement');



var buttonStart = document.querySelector('.start');
var buttonPause = document.querySelector('.pause');
var buttonReset = document.querySelector('.reset');
var buttonsIncrement = document.querySelectorAll('.increment');
var buttonsDecrement = document.querySelectorAll('.decrement');

buttonStart.addEventListener('click', writeTick);
buttonPause.addEventListener('click', stopTick);
buttonReset.addEventListener('click', resetClock);
buttonsIncrement.forEach(function(btn, i) {
   btn.addEventListener('click', function() {
       incrementSpan(i);
   });
});

buttonsDecrement.forEach(function(btn, i) {
    btn.addEventListener('click', function() {
        decrementSpan(i);
    });
});


function Timer(){
    this._startDate = Date.now(); // стартовое время работы таймера
    this._finishDate = Date.now(); // финишное время работы таймера
    this._pauseDate = Date.now(); // когда таймер был заморожен
    this._frizeDate = Date.now(); // сколько таймер был в заморозке
    this._isRun = false;
}

Timer.prototype.start = function(wt) {
    if (this._isRun) return;
    var workTime = wt || 0;
    this._isRun = true;
    var pauseTime = Date.now() - this._pauseDate;
    this._finishDate = this._finishDate + pauseTime + workTime;
};

Timer.prototype.stop = function() {
    if (!this._isRun) return;
    this._isRun = false;
    this._pauseDate = Date.now();
    this._frizeDate = Date.now();

};

Timer.prototype.reset = function() {
    this._isRun = false;
    this._startDate = Date.now();
    this._finishDate = Date.now();
    this._pauseDate = Date.now();
    this._frizeDate = Date.now();
};

Timer.prototype.getTime = function() {
    var now = new Date();
    now.setHours(now.getHours() + 3);
    var diffrentSeconds = this._isRun ? this._finishDate - Date.now() : this._finishDate - this._frizeDate;
    var diffrentDate = diffrentSeconds < 0 ? new Date(0) : new Date(diffrentSeconds);
    var hours = (diffrentDate.getHours() - 3) < 10 ? '0' + (diffrentDate.getHours() - 3) : '' + diffrentDate.getHours() - 3;
    var minutes = diffrentDate.getMinutes() < 10 ? '0' + diffrentDate.getMinutes() : '' + diffrentDate.getMinutes();
    var seconds = diffrentDate.getSeconds() < 10 ? '0' + diffrentDate.getSeconds() : '' + diffrentDate.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
};

var timer = new Timer();
var si;

function writeTick() {
    buttonStart.removeEventListener('click', writeTick);
    containerStart.classList.add('invisible');
    containerButtonsIncrement.classList.add('invisible');
    containerButtonsDecrement.classList.add('invisible');
    containerPause.classList.remove('invisible');
    containerReset.classList.remove('invisible');

    console.log(+ parseTime());
    timer.start((+ parseTime() + 2) * 1000);
    si = setInterval(function() {
        spanClock.innerHTML = timer.getTime();
    }, 1000);
}

function stopTick() {
    if (timer._isRun) {
        timer.stop();
        buttonPause.innerHTML = 'Пуск';
        clearInterval(si);
    }
    else {
        timer.start();
        buttonPause.innerHTML = 'Пауза';
        si = setInterval(function() {
            spanClock.innerHTML = timer.getTime();
        }, 1000);
    }
}

function resetClock() {
    buttonStart.addEventListener('click', writeTick);

    containerStart.classList.remove('invisible');
    containerButtonsIncrement.classList.remove('invisible');
    containerButtonsDecrement.classList.remove('invisible');
    containerPause.classList.add('invisible');
    containerReset.classList.add('invisible');

    timer.reset();
    clearInterval(si);
    spanClock.innerHTML = timer.getTime();
}

function parseTime() {
    var time = spanClock.innerHTML;
    var hours = + time.slice(0, 2);
    var minutes = + time.slice(3, 5);
    var seconds = + time.slice(6, 8);
    return new Date(hours * 3600 + minutes * 60 + seconds);
}

function incrementSpan(i) {
    var time = spanClock.innerHTML;
    var hours = + time.slice(0, 2);
    var minutes = + time.slice(3, 5);
    var seconds = + time.slice(6, 8);
    if (i === 0) hours = hours < 10 ? ++hours : hours;
    if (i === 1) minutes = minutes < 59 ? ++minutes : minutes;
    if (i === 2) seconds = seconds < 59 ? ++seconds : seconds;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    time = hours + ':' + minutes +  ':' + seconds;
    spanClock.innerHTML = time;
}

function decrementSpan(i) {
    var time = spanClock.innerHTML;
    var hours = + time.slice(0, 2);
    var minutes = + time.slice(3, 5);
    var seconds = + time.slice(6, 8);
    if (i === 0) hours = hours > 0 ? --hours : hours;
    if (i === 1) minutes = minutes > 0 ? --minutes : minutes;
    if (i === 2) seconds = seconds > 0 ? --seconds : seconds;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    time = hours + ':' + minutes +  ':' + seconds;
    spanClock.innerHTML = time;
}