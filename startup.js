// No \n because I don't care what it looks like. Using single quotes because double inside text
var text1 = '<div id="modalSpace1" class="modalSpace"><div id="dialog1" class="dialog">' +
            '<form><ul><li><button type="button" name="forward" onclick="goForward()">Go forward</button>' +
            '<br><small class="notes">If you press the back button by accident, this corrects the mistake. ' +
            'If there is nowhere to go forward to, no action is taken.</small></li><hr>' +
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
            '</ul></form></div></div>' +
            '<div id="messageSpace" class="messageSpace"><div id="message" class="message">' +
            '<div id="messageContent"></div>' +
            '<form><button type="button" name="messageCloser" onclick="closeMessage()">Close</button></form>' +
            '</div></div>';
document.write(text1);
displayMileage = "(no fix)";
infoString = "<p class='mileage'>No fix yet</p><hr>";
aggregateDistance = 0;
lastMileageLatitude = 999;
lastMileageLongitude = 999;
myAccuracy = 999999;
  //play the next one by ear - too much and you cut off corners - too little and you get 'noise'
  //also these may depend on type of journey. Consider revising if I do road/rail and include in
  //the 'by route' variables. Also later could include a 'settings' option also to specify km/miles TODO
mileageUpdateDistance = 50; //metres
mileageUpdateAccuracyRatio = 0.3;
mileageAccuracyThreshold = mileageUpdateDistance * mileageUpdateAccuracyRatio;
matsq = mileageAccuracyThreshold * mileageAccuracyThreshold;
metresToMiles = 0.000621371192;
wantedConversion = metresToMiles;
//alert('about to write form');
var text2 = '<div id="counter"></div>';
document.write(text2);
//alert('form written');
