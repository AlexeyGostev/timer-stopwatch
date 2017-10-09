var spanClock = document.querySelector('.clock');
var buttonStart = document.querySelector('.start');
var buttonStop = document.querySelector('.stop');
var buttonReset = document.querySelector('.reset');

buttonStart.addEventListener('click', writeTick);
buttonStop.addEventListener('click', stopTick);
buttonReset.addEventListener('click', resetTick);



function StopWatch(){
    this._startDate = Date.now();
    this._pauseDate = Date.now();
    this._isRun = false;
}

StopWatch.prototype.start = function() {
    if (this._isRun) return;
    this._isRun = true;
    var pauseTime = Date.now() - this._pauseDate;
    this._startDate = this._startDate + pauseTime;
};

StopWatch.prototype.stop = function() {
    if (!this._isRun) return;
    this._isRun = false;
    this._pauseDate = Date.now();
};

StopWatch.prototype.reset = function() {
    this._isRun = false;
    this._startDate = Date.now();
    this._pauseDate = Date.now();
};

StopWatch.prototype.getTime = function() {
    var diffrentDate = new Date(Date.now() - this._startDate);
    var hours = (diffrentDate.getHours() - 3) < 10 ? '0' + (diffrentDate.getHours() - 3) : '' + diffrentDate.getHours() - 3;
    var minutes = diffrentDate.getMinutes() < 10 ? '0' + diffrentDate.getMinutes() : '' + diffrentDate.getMinutes();
    var seconds = diffrentDate.getSeconds() < 10 ? '0' + diffrentDate.getSeconds() : '' + diffrentDate.getSeconds();
    return hours + ':' + minutes + ':' + seconds;
};

var stopWatch = new StopWatch();
var si;

function writeTick() {
    buttonStart.removeEventListener('click', writeTick);
    stopWatch.start();
    si = setInterval(function() {
       spanClock.innerHTML = stopWatch.getTime();
    }, 1000);
}

function stopTick() {
    buttonStart.addEventListener('click', writeTick);
    stopWatch.stop();
    clearInterval(si);
}

function resetTick() {
    buttonStart.addEventListener('click', writeTick);
    stopWatch.reset();
    clearInterval(si);
    spanClock.innerHTML = stopWatch.getTime();
}