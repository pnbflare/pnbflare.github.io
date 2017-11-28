
var renderLocations = masterLocations;

var map; 
var geocoder;
var markers = [];
var marker_old_index = '';
var skipScrollAnimation = false;
var skipColorChange = false;

var mobileWindowWidth = 980;


$(document).ready(function(){
	//Trigger click when you click 'view on map'
	$(document).on('click', '.viewOnMapTrigger', function(){
		$(this).closest('.mapLocationBox').find('.goToMarker').first().click();
	});
		
	$(window).resize(function(){
		var mapheight = $(window).height()-$("#mainMenu").height()+3; 
		$("#map-canvas").css({"height":mapheight+"px", "margin-top":"-3px"});
		if($(window).width()>mobileWindowWidth && $(".mapLocationContain").height() > 100){
			$("#map-locations").css("padding-bottom",$("#map-canvas").height()-$('.mapLocationBox:last-child').height()-35);
		}else{
			$("#map-locations").css("padding-bottom","");
		}
	});
	$(window).resize();
	
	$("body").on("click",".detailsToggle", function(){
		$(this).prev().slideToggle();
		$(this).toggleClass("active");
	});
	
	renderLocationHTML();


	
});

$(window).load(function(){
	setTimeout(function(){$(window).resize();},1000);
});


function renderLocationHTML(){
	$(".mapLocationContain").html("Loading...");
	$(".mapLocationContain").html("");
	for(var i = 0; i < renderLocations.length; i++){
		$(".mapLocationContain").append(renderLocations[i].html)
	}
}

//START - initialize
function initialize() {
	markers = [];
	
	geocoder = new google.maps.Geocoder();
	
	map = new google.maps.Map( document.getElementById('map-canvas'),{
		center: new google.maps.LatLng(41.923, 12.513), 
		zoom: 8,
		panControl: false,
		zoomControl: true,
		mapTypeControl: false,
		scaleControl: false,
		streetViewControl: false,
		overviewMapControl: false
	});
	
	var bounds = new google.maps.LatLngBounds();
	var infowindow = new google.maps.InfoWindow();
	var marker, i, marker_old;
	
	var markerimage = {
		url:'/wp-content/themes/patriotbank/images/map-pin-selected.png',
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(12,36)
		};
	var markerimageselected = {
		url:'/wp-content/themes/patriotbank/images/map-pin.png',
		origin: new google.maps.Point(0, 0),
		anchor: new google.maps.Point(12,36)
		};

	//START - Loop Markers
	for (i = 0; i < renderLocations.length; i++) {  
		
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(renderLocations[i]['lat'], renderLocations[i]['lng']),
			map: map,
			icon: markerimage,
			category:renderLocations[i]['categories']
		});
		markers.push(marker);
		bounds.extend(marker.position);
		
		
		//START - Map Location Select
		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				if( marker_old){
					marker_old.setIcon(markerimage);
				}
				marker_old = marker;
				marker_old_index = i;
				marker.setIcon(markerimageselected); 
				//scroll to location
				
				var topPos = document.getElementById("mapLocationBox"+i).offsetTop;
				$('.mapLocationBox').removeClass("selected");
				$("#mapLocationBox"+(i)).addClass("selected");
			
				if(!skipScrollAnimation){
					skipColorChange = true;
					var timeout = setTimeout(function(){skipColorChange = false;},550);
					if($(window).width()>mobileWindowWidth){
						$("#map-locations").stop(true,false).animate({ scrollTop: (topPos)+"px" },500);
					}else{
						$("html, body").stop(true,false).animate({ scrollTop: (topPos+3)+"px" },500);
					}
				}
				skipScrollAnimation = false;
				//map.panTo(marker.position)
			}
		})(marker, i));
		//END - Map Location Select		
		
		//START - Visible Marker Filter
		google.maps.event.addListener(map, 'idle', function(event) { 
			bounds = map.getBounds();
			for(var i = 0; i < markers.length; i++){ // looping through my Markers Collection        
				if(markers[i].visible && bounds.contains(markers[i].position)){
					$("#mapLocationBox"+i).addClass('active').show();
				}else{
					if(marker_old_index == i){ marker_old_index = null; if(marker_old){ marker_old.setIcon(markerimage);} marker_old = null;}
					$("#mapLocationBox"+i).removeClass('active').hide().removeClass('selected');
				}
			}
			updateFoundString();
			//keep selected at the top
			var topPos = 0;
			if(marker_old_index){
				topPos = document.getElementById("mapLocationBox"+marker_old_index).offsetTop;
			}
			if($(window).width()>mobileWindowWidth){
				$("#map-locations").stop(true,false).animate({ scrollTop: (topPos)+"px" },0);
			}else{
				$("html, body").stop(true,false).animate({ scrollTop: (topPos+3)+"px" },0);
			}
			
		});
		
		
		//START - Filters
		$("body").on("click",".filterButton",function(e){
			e.preventDefault();
			$(".mapLocationBox").removeClass('selected');
			$(".filterButton").removeClass('active');
			$(this).addClass('active');
			filterMapByCat($(this).attr("data-filterby"));
			return false;
		});
		function filterMapByCat(category){
			bounds = map.getBounds();
			$.each(markers, function(i, marker) {
				if( category=="" || $.inArray( category , marker.category ) > -1){
					marker.visible = true;
					marker.setIcon(markerimage); 
					if( bounds.contains(marker.position)){
						$("#mapLocationBox"+i).show();
					}else{
						$("#mapLocationBox"+i).hide();
					}
				}else{
					marker.visible = false;
					marker.setIcon(null); 
					$("#mapLocationBox"+i).hide();
				}
			});			
			updateFoundString();	
			//map.fitBounds(bounds);
		};
		//END - Filters
		
		
		//START - Header
		$("body").on("click",".goToMarker",function(e){
			e.preventDefault();
			$(".mapLocationBox").removeClass('selected');
			$("#mapLocationBox"+$(this).attr("data-markerid")).addClass('selected');
			
			marker_old_index = null;
			if(marker_old){
				marker_old.setIcon(markerimage);
				marker_old = null;
			}
			markers[$(this).attr("data-markerid")].setIcon(markerimageselected); 
			marker_old_index = $(this).attr("data-markerid");
			marker_old = markers[$(this).attr("data-markerid")];
			
			if($(window).width()>mobileWindowWidth){
				//map.setZoom(12)
			}else{
				//map.setZoom(10)
			}
			
			map.panTo(marker_old.position);
					
			return false;
		});
		//END - Header
		
	}
	//END - Loop Markers
	
	
	map.fitBounds(bounds);
	
	
	//START - dynamically click marker
	function activateMarker(markerID){
		skipScrollAnimation = true;
		google.maps.event.trigger(markers[markerID], 'click');
	}
	
	
	/*
	$("#map-locations").scroll(function(){
		var marker_temp_index = -1;
		if(!skipColorChange){
			$.each(renderLocations, function(i, location){
				if($("#mapLocationBox"+(i)).css("display") != "none"){
					if(document.getElementById("map-locations").scrollTop < document.getElementById("mapLocationBox"+(i)).offsetTop-80){return false;}
					marker_temp_index = i;
				}
			});
			$('.mapLocationBox').removeClass("selected");
			$("#mapLocationBox"+(marker_temp_index)).addClass("selected");
			if(marker_temp_index == -1){
				marker_old_index=null;
				if(marker_old){
					marker_old.setIcon(markerimage);
					marker_old = null;
				}
				//map.fitBounds(bounds);
			}else{
				if (marker_old_index != marker_temp_index){
					activateMarker(marker_temp_index);
				}
			}
		}
	})
	*/
	//END - dynamically click marker
	
	
	$('.locationSearch form').submit(function(e){
		e.preventDefault();
		if($(".locationSearch .zipcode").val()){
			$(".locationSearchInfo-zipCode").addClass("active");
			$(".locationSearchInfo-zipCode span").text($(".locationSearch .zipcode").val());
			codeAddress($(".locationSearch .zipcode").val());
		}else{
			$(".locationSearchInfo-zipCode").removeClass("active");
		}
		return false;
	})
	if(getUrlParam('zipcode')){
		codeAddress(getUrlParam('zipcode'));
		$(".locationSearch .zipcode").val(getUrlParam('zipcode'));
		$(".locationSearchInfo-zipCode").addClass("active");
		$(".locationSearchInfo-zipCode span").text(getUrlParam('zipcode'));
	}
	
	
	function updateFoundString(){
		var foundCatregories = {'atm':0, 'branch':0, 'service':0};
		categoryHTML = "";
		$.each(markers, function(i, marker) {
			if(markers[i].visible && bounds.contains(markers[i].position)){
				if( $.inArray( 'ATM' , marker.category ) > -1){
					foundCatregories.atm++;
				}
				if( $.inArray( 'Branch' , marker.category ) > -1){
					foundCatregories.branch++;
				}
				
				if( $.inArray( 'Live Banker ATMs' , marker.category ) > -1){
					foundCatregories.service++;
				}
				
				console.log(marker.category);
			}
			console.log(foundCatregories)
		});	
		categoryHTML = ""+foundCatregories.branch+" Branches - "+foundCatregories.atm+" ATMs - "+foundCatregories.service+" Live Banker ATMs";
		$(".locationSearchInfo-foundCat > span").html(categoryHTML);
	}

}
//END - Initialize



google.maps.event.addDomListener(window, 'load', initialize);
//google.maps.event.addDomListener(window, 'resize', initialize);



function codeAddress(zipCode) {
	geocoder = new google.maps.Geocoder();
	geocoder.geocode( { 'address': zipCode}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			map.setCenter(results[0].geometry.location);
			var searchLocation = results[0].geometry.location;
			for (var i = 0; i < renderLocations.length; i++) { 
				var renderLocationPosition = new google.maps.LatLng(renderLocations[i]['lat'], renderLocations[i]['lng']);
				renderLocations[i].distance = (google.maps.geometry.spherical.computeDistanceBetween (searchLocation, renderLocationPosition)* 0.000621371192).toFixed(1);
			}
			renderLocations.sort(SortByDistance);
			renderLocationHTML();
					
			if($(window).width()>mobileWindowWidth){
				map.setZoom(11)
			}else{
				map.setZoom(9)
			}
		} else {
			console.log("Geocode was not successful for the following reason: " + status);
		}
	});
}

function SortByDistance(a, b){
	var aName = parseFloat(a.distance);
	var bName = parseFloat(b.distance); 
	return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
}

function getUrlParam(name){
	var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
	if (results==null){
	   return null;
	}
	else{
	   return results[1] || 0;
	}
}
