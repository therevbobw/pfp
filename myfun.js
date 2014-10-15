var generalInstructions = "<p><small class='detail'>To start off, select the walk you are interested in. " +
	"A brief description will appear. If this is the one you want, confirm by tapping the button.<br>" +
	"At the start, and between prayer locations, there will be instructions on how to get to the " +
	"next place. At the prayer places, your device may vibrate or make a sound, and there will appear " +
	"maybe brief pieces of information, and then the " +
	"texts of prayers.<br>For a couple of minutes after starting the app., the satellite positioning " +
	"system will be settling down and results may be unreliable: this varies depending on your hardware.<br>" +
	"At any time, pressing the menu button in the bottom right hand corner yields whichever of these options " +
	"is appropriate;- 'Go forwards', to undo the effect of accidentally pressing the 'back' button, " +
	"see the directions to get you right to the place you are near, see the directions to get you to the next " +
	"place, and show these instructions.</small></p>";
function onDeviceReady() {
  // Now safe to use the PhoneGap API
  //navigator.notification.alert("Starting", doLittle);
  //var bong = new Media(bongsrc);
  //bong.play;
  //navigator.notification.vibrate(2000);
  getLocation();
}
//var interval01 = setInterval(getLocation, 3000);
function geo_error() {
  alert("Sorry, no position available.\n"+error.message);
}
function getLocation()
  {
    //form0['mark'].value = "in";
    if (navigator.geolocation)
    {
      navigator.geolocation.watchPosition(usePosition, geo_error, geo_options);
    }
  //else{x.innerHTML="Geolocation is not supported by this browser.";}
    //form0['mark'].value = "out";
  }
function OpenPopup(i)
  {
//   if(isOpen == "false")
//   {
         //alert("Going in "+i); 
         //popped = window.open(textlocs[i]);
         navigator.notification.vibrate(1200);
         navigator.notification.beep(1); //shouldn't have second parameter
         document.getElementById('stuff').innerHTML = texts[i];
         lastPoint = i;
         //bong.play;
         //navigator.notification.alert("New prayer now", doLittle());
         //$('#stuff').attr('src', textlocs[i]);
//    }
  } 
function doLittle()
  {
  	//not sure what to do here yet...
  }
function usePosition(position)
  {
    //navigator.geolocation.clearWatch(watching);
    thisTime = Date.now();
    if ((thisTime - lastUpdateTime) > interval)
    {
    	lastUpdateTime = thisTime;
	var myLatitude = position.coords.latitude;
	var myLongitude = position.coords.longitude;
	myAccuracy = position.coords.accuracy;
	//alert(myAccuracy);
	form0['lat'].value = myLatitude;
    	form0['lon'].value = myLongitude;
        then = now;
    	now = Date.now();
    	timegap = now-then;
    	form0['mark'].value = timegap;
    	anyOpen = "false";
    	for (i = 0; i < nPlaces; i++) { 
      		dy = (myLatitude - lats[i+1])*111300;
      		dx = (myLongitude - longs[i+1])*111300*Math.cos(myLatitude*angConv);
      		//d = Math.sqrt(dx*dx+dy*dy);
      		dsq = dx*dx+dy*dy;
      		if (dsq < tsq){
        		anyOpen = "true";
        		indexOfWanted = i+1;
      		}
    	}
    	if (anyOpen == "false" && isOpen == "true"){
        	isOpen = "false";
        	//alert("Going out");
        	//popped.close();
        	navigator.notification.beep(1); //shouldn't have second parameter
        	navigator.notification.vibrate(1200);
        	document.getElementById('stuff').innerHTML = froms[lastPoint];
        	//$('#stuff').attr('src', "null.html");
    	}
    	if (anyOpen == "false" && isOpen == "false"){
        	// no action
    	}
    	if (anyOpen == "true" && isOpen == "false"){
        	isOpen = "true";
        	OpenPopup(indexOfWanted);
    	}
    	if (anyOpen == "true" && isOpen == "true"){
        	/*TODO allow for (currently impossible) case where go from
        	one point to another without passing through empty space
        	currently no action in this case*/
    	}
    	//alert(myAccuracy+","+mileageAccuracyThreshold);
        // do nothing at all about mileage unless accuracy is good enough...
        if ( myAccuracy < mileageAccuracyThreshold) {
          //alert("accurate enough");
          if ( lastMileageLatitude > 99 ) {
            //first measurement...
            //document.getElementById('displayMiles').value = "0";
            //alert("first time");
            showMiles(2,0,myAccuracy,0,0,0);
            originalTime = Date.now();
            lastTime = originalTime;
            lastMileageLatitude = myLatitude;
            lastMileageLongitude = myLongitude;
          }
          else {
            //alert("subsequent");
            dy = (myLatitude - lastMileageLatitude)*111300;
            dx = (myLongitude - lastMileageLongitude)*111300*Math.cos(myLatitude*angConv);
            dsq = dx*dx+dy*dy;
            //alert(dsq);
            if ( dsq > mudsq ){
              currentTime = Date.now();
              distanceIncrement = Math.sqrt(dsq);
              aggregateDistance = aggregateDistance + distanceIncrement;
              aggregateMileage = aggregateDistance * wantedConversion;
              timeIncrement = hrpms*(currentTime - lastTime);
              aggregateTime = hrpms*(currentTime - originalTime);
              currentMean = wantedConversion * distanceIncrement / timeIncrement;
              overallMean = aggregateMileage / aggregateTime;
              kcal = kcalCalc(aggregateMileage, overallMean);
              //displayMileage = aggregateMileage.toFixed(2);
              //document.getElementById('displayMiles').value = displayMileage;
              //var counterArea = document.getElementById("counter");
              showMiles(2,aggregateMileage,myAccuracy, currentMean, overallMean,kcal);
              /*var counterText = document.getElementById("counter").innerHTML;
              var counterLength = counterText.length;
              if ( counterLength > 20 ) {
              	//i.e. field is currently displayed
              	counterText = "<p class='mileage'>Distance so far: " + displayMileage + " miles</p><hr>";
              	document.getElementById("counter").innerHTML = counterText;
              }*/
              lastMileageLatitude = myLatitude;
              lastMileageLongitude = myLongitude;
              lastTime = currentTime;
            }
          }
        }
        else {
        	//infoString = "<p>Not accurate enough - accuracy: " + myAccuracy.toFixed(2) + "m.</p><hr>";
        	showMiles(2,aggregateMileage,myAccuracy, currentMean, overallMean,kcal);
        }
    }
    //alert("ready to display infoString");
    var counterSpace = document.getElementById("counter");
    var vy = counterSpace.innerHTML;
    var lv = vy.length;
    if ( lv > 4 ) {
    counterSpace.innerHTML = infoString;
    //var mileageText = "<p class='mileage'>Distance so far: " + displayMileage + " miles.</p><hr>";
    //counterSpace.innerHTML = mileageText;
    
    }
  }
function toggleMenu(){
	var el8 = document.getElementById("modalSpace1");
	el8.style.visibility = (el8.style.visibility == "visible") ? "hidden" : "visible";

}
function hideMenu(){
	var el7 = document.getElementById("modalSpace1");
	el7.style.visibility = "hidden";

}
function showMenu(){
	// reinstate this until I have time to do it properly ... TODO
	var el6 = document.getElementById("modalSpace1");
	el6.style.visibility = "visible";
	/*togglemenu();
	// ...because someone might hit the menu again wanting to dismiss it*/
}
function previousDirections(){
	    	if (lastPoint > 1){
    			showMessage(froms[lastPoint-1]);
    		}
    		else {
    			showMessage(intro);
    		}
    		//showMenu();
}
function nextDirections(){
		if (lastPoint > 0) {
        		showMessage(froms[lastPoint]);
        	}
        	else {
        		showMessage(intro);
        	}
        	//showMenu();
}
function showGeneralInstructions(){
	showMessage(generalInstructions);
}
function cancelMenu() {
	hideMenu();
}
function goForward(){
	hideMenu();
	window.history.forward();
}
function closeMessage() {
	//alert("closing...");
	//should be redundant... hideMenu();
	var el5 = document.getElementById("messageSpace");
	el5.style.visibility = "hidden";
	//alert("should be closed now!");
}
function showMessage(messageText) {
	hideMenu();
	var el4 = document.getElementById("messageSpace");
	el4.style.visibility = "visible";
	content = document.getElementById("messageContent");
	content.innerHTML = messageText;
}
function hideSelector(){
	document.getElementById("selector").visibility = "hidden";
}
function showSelector(){
	document.getElementById("selector").visibility = "visible";
}
function dismissPreview() {
	var el3 = document.getElementById("previewSpace");
	el3.style.visibility = "hidden";
	//showSelector();
}
function previewWalk(index, title) {
	walkIndex = index;
	walkName = title;
	//alert(descriptions[index]);
	document.getElementById("previewContent").innerHTML = descriptions[index];
	var el2 = document.getElementById("previewSpace");
	//hideSelector();
	el2.style.visibility = "visible";
}
function confirmWalk() {
  var url = walkName + ".html";
  //alert(url);
  window.location=url;
}
function toggleMileage() {
  hideMenu();
  var el20 = document.getElementById("walkComputer");
  var tmp = "It is " + String(el20);
  //alert(tmp);
  var el20s = el20.style;
  var tmp2 = "S is " + el20s.toString();
  //alert(tmp2);
  var el20sv = el20s.visibility.toString();
  var tmp3 = "V is " + el20sv;
  //alert(tmp3);
  //alert ("el20");
  var counterSpace = document.getElementById("counter");
  var vy = counterSpace.innerHTML;
  var lv = vy.length;
  if ( document.getElementById("walkComputer").style.visibility != "visible" ) {
  	document.getElementById("walkComputer").style.visibility = "hidden";
  }
  var visi = document.getElementById("walkComputer").style.visibility;
 //alert ("about to do ifs");
  alert (visi);
  if ( lv < 5 && visi == "hidden" ) {
  	//alert ("yes to 1");
    counterSpace.innerHTML = infoString;
    //var mileageText = "<p class='mileage'>Distance so far: " + displayMileage + " miles.</p><hr>";
    //counterSpace.innerHTML = mileageText;
  }
  else {
    if ( lv >= 5 && visi == "hidden" ) {
      //alert ("yes to 2");
      document.getElementById("walkComputer").style.visibility = "visible";
    }
    else {
      if ( visi == "visible" ) {
        //alert ("yes to 3");
        document.getElementById("walkComputer").style.visibility = "hidden";
       	counterSpace.innerHTML = "";
      }
      else {
      	alert ("case not found");
      }
    }
  }
}
function showMiles(dp,miles,accuracy,cMean,oMean,cal) {
	var milesText = miles.toFixed(dp);
	var accuracyText = accuracy.toFixed(1);
	var omText = oMean.toFixed(dp);
	var cmText = cMean.toFixed(1);
	var calText = cal.toFixed(0);
	var accuracyRatio = accuracy / mileageAccuracyThreshold;
	var accuracyColour = "#0000ff";
	if ( accuracyRatio >= 1 ){
		accuracyColor = "#ff0000";
	}
	if ( accuracyRatio <= 0.5 ) {
		accuracyColor = "#00ff00";
	
	}
	if (accuracyRatio > 0.4 && accuracyRatio < 1 ) {
		accuracyColor = "#ff9900";
	}
	infoString = "<span style='background-color: " + accuracyColor +"; color: " + accuracyColor +
	"'>-----</span><b>&nbsp;" + milesText + "</b>&nbsp;miles at&nbsp;" + omText +
	"&nbsp;mph, now&nbsp;" + cmText + "&nbsp;mph, " + calText + "&nbsp;kcal&nbsp;burnt.<hr>";
	var wcString = "<p>Accuracy:<br><b>" + accuracyText + "</b></p><p>Distance:<br>" +
	"<span class='bigNumber'>" + milesText + "</span><br>miles</p><p>Average speed:<br><b>" +
	omText + "</b> mph.<p>Current speed:<br><b>" + cmText + "</b> mph.</p><p>Approximate " +
	"kilocalories burned:<br><b>" + calText + "</b></p>";
	alert(wcString);
	document.getElementById("walkComputer").innerHTML = wcString;
}
function checkBack(){
	var backQuestion = "Are you sure? Leaving this page will make your device lose its place in the walk.";
	navigator.notification.confirm(backQuestion, backAction, "Checking...", "Confirm,Cancel");
}
function backAction(buttonIndex) {
	if ( buttonIndex == 1 ){
		document.removeEventListener("backbutton", checkBack);
		window.history.back();	
	}
}
function kcalCalc(distance, speed) {
	//Weight 75kg / 167lbs / 12st, speed variation made up for no good reason - unity at 3mph
	// There should be some kind of speed variation as a longer stride means you have to
	// lift your body higher, going roughly as square of stride length. Faster speeds I guess
	// mean a combination of longer and higher frequency strides. There is a 'sweet spot' as
	// the leg swings at pendulum feqeuncy, I guess, but I haven't looked into this.
	// FWIW I imagine both walking and running energy use are continuous functions of speed,
	// and people if they have any sense switch gait at the speed where the two functions
	// cross over.
	var kc =  distance * 50 * (40+speed*speed) / 49;
	return kc;
}
