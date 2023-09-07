var clock = document.getElementById('clock');


var min = document.getElementById('min');
var hour = document.getElementById('hour');
var theTime = { hour: 12, min: 0 };
var movingElem = null;
function mouseDown(e) {	movingElem = e.target; }
    
const correctMin = 42;
const correctHour = 9;

function mouseUp(e) {	
	movingElem = null; 

  if (theTime.hour === correctHour && theTime.min === correctMin) {
    alert("You solved the puzzle")
  }
}

function mouseMove(e) {
  e.preventDefault();
  if (movingElem) {
	  var vwp = movingElem.nearestViewportElement,
		    ctm = vwp.getScreenCTM(),
        pnt = vwp.createSVGPoint();
		  pnt.x = e.clientX || e.touches[0].clientX;
			pnt.y = e.clientY || e.touches[0].clientY;
    var loc = pnt.matrixTransform(ctm.inverse());
		var deg = 90 - Math.atan2(50 - loc.y, loc.x - 50) * 180 / Math.PI;
    deg = deg + 15 - (deg + 15 + 360) % 2;
    var val = (12 + (deg / 30)) % 12;
    const roundVal = Math.round(val);
    theTime[movingElem.id] = movingElem.id == 'min' ? Math.round(val * 5) : (roundVal == 0 ? 12 : roundVal);
    console.log(theTime);
		movingElem.setAttribute('transform', 'rotate(' + deg + ' 50 50)');
  }
}


min.setAttribute('transform', 'rotate(60 50 50)');

min.addEventListener('mousedown', mouseDown, false);
hour.addEventListener('mousedown', mouseDown, false);
document.addEventListener('mouseup', mouseUp, false);
document.addEventListener('mousemove', mouseMove, false);



min.addEventListener('touchstart', mouseDown, false);
hour.addEventListener('touchstart', mouseDown, false);
document.addEventListener('touchend', mouseUp, false);
document.addEventListener('touchmove', mouseMove, false);
