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
         navigator.notification.beep(1);
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
        	navigator.notification.beep(1);
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
//Thank you BillyB...
function fixiFrame () {
   if ((android) && (androidVersion > 3)) {
      iFrameContentHeight = document.getElementById('stuff').contentDocument.body.offsetHeight;
      document.getElementById('stuff').style.height = iFrameContentHeight + 'px';
   }
}
function showMenu(){
    navigator.notification.confirm(
        'Actions...',  // message
        doMenuActions,              // callback to invoke with index of button pressed
        'Prayers for Places control',            // title
        'Undo back arrow,See directions to next place,See last directions again,more stuff, foo bar,and more again,what does it do?'          // buttonLabels
    );
}
function doMenuActions(buttonIndex){
	alert(buttonIndex);
}
