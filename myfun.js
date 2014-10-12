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
    }

	
  }
function toggleMenu(){
	el = document.getElementById("modalSpace1");
	el.style.visibility = (el.style.visibility == "visible") ? "hidden" : "visible";

}
function hideMenu(){
	el = document.getElementById("modalSpace1");
	el.style.visibility = "hidden";

}
function showMenu(){
	el = document.getElementById("modalSpace1");
	el.style.visibility = "visible";

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
function goForward(){
	hideMenu();
	window.history.forward();
}
function closeMessage() {
	//alert("closing...");
	//should be redundant... hideMenu();
	el = document.getElementById("messageSpace");
	el.style.visibility = "hidden";
	//alert("should be closed now!");
}
function showMessage(messageText) {
	hideMenu();
	el = document.getElementById("messageSpace");
	el.style.visibility = "visible";
	content = document.getElementById("messageContent");
	content.innerHTML = messageText;
}
function dismissPreview() {
	el = document.getElementById("previewSpace");
	el.style.visibility = "hidden";
}
function previewWalk(index, title) {
	walkIndex = index;
	walkName = title;
	document.getElementById("previewContent").innerHTML = description[index];
	el = document.getElementById("previewSpace");
	el.style.visibility = "visible";
}
function confirmWalk() {
  var url = walkName + ".html";
  //alert(url);
  window.location=url;
	
}
