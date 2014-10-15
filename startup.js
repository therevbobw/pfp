// No \n because I don't care what it looks like. Using single quotes because double inside text
var text1 = '<div id="modalSpace1" class="modalSpace"><div id="dialog1" class="dialog">' +
            '<form><ul>' +
            /*'<li><button type="button" name="forward" onclick="goForward()">Go forward</button>' +
            '<br><small class="notes">If you press the back button by accident, this corrects the mistake. ' +
            'If there is nowhere to go forward to, no action is taken.</small></li><hr>' +*/
            '<li><button type="button" name="previous" onclick="previousDirections()">' +
            'Previous directions</button><br><small class="notes">Look again at the directions ' +
            'to the place you are now near to.</small></li><hr>' +
            '<li><button type="button" name="next" onclick="nextDirections()">Next directions</button>' +
            '<br><small class="notes">Look at the directions which take you to the next place.</small></li><hr>' +
            '<li><button type="button" name="general" onclick="showGeneralInstructions()">General instructions' +
            '</button><br><small class="notes">Look at the general instructions for this app..</small></li><hr>' +
	    '<li><button type="button" name="mileage" onclick="toggleMileage()">Toggle mileage counter</button>' +
            '<br><small class="notes">Show or hide the mileage counter.</small></li><hr>' +
            '<li><button type="button" name="cancel" onclick="cancelMenu()">Cancel</button></li>' +
            '</ul></form></div></div>\n' +
            '<div id="messageSpace" class="messageSpace1"><div id="message" class="message1">' +
            '<div id="messageContent" class="messageContent1"></div>' +
            '<form><button type="button" name="messageCloser" onclick="closeMessage()">Close</button></form>' +
            '</div></div>\n' +
            '<div id="walkComputerSpace" class="walkComputerStyle"><div id="walkComputer" ' +
            'class="walkComputerStuff"></div></div>\n';
            //alert(text1);
document.addEventListener("backbutton", checkBack, false);
document.write(text1);
//document.getElementById("walkComputer").innerHTML = "<p>blablablabla</p>";
//alert("init " + document.getElementById("walkComputerSpace").style.visibility);
//alert("init2 " + document.getElementById("messageSpace").style.visibility);
/*alert("vis " + document.getElementById("walkComputer").style.visibility);
alert("ms " + document.getElementById("messageSpace").style.visibility);
alert("ms1 " + document.getElementById("modalSpace1").style.visibility);*/
displayMileage = "(no fix)";
infoString = "No fix yet<hr>";
aggregateDistance = 0;
lastMileageLatitude = 999;
lastMileageLongitude = 999;
currentTime = Date.now();
originalTime = currentTime;
lastTime = currentTime;
timeIncrement = 0;
aggregateTime = 0;
overallMean = 0;
currentMean = 0;
kcal = 0;
myAccuracy = 999999;
  //play the next one by ear - too much and you cut off corners - too little and you get 'noise'
  //also these may depend on type of journey. Consider revising if I do road/rail and include in
  //the 'by route' variables. Also later could include a 'settings' option also to specify km/miles TODO
mileageUpdateDistance = 30; //metres
mileageUpdateAccuracyRatio = 0.4;
mileageAccuracyThreshold = mileageUpdateDistance * mileageUpdateAccuracyRatio;
//matsq = mileageAccuracyThreshold * mileageAccuracyThreshold;
mudsq = mileageUpdateDistance * mileageUpdateDistance;
metresToMiles = 0.000621371192;
wantedConversion = metresToMiles;
hrpms = 1.0 / 3600000;
//alert('about to write form');
var text2 = '<div id="counter" class="mileage"></div>';
document.write(text2);
//alert('form written');
