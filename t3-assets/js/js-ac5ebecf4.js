;var BT=BT||{};(function(){BT.Base64=new Class({Implements:[Options,Events],options:{},initialize:function(a){this.setOptions(a)},keyString:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",UTF8Encode:function(b){b=b.replace(/\x0d\x0a/g,"\x0a");var a="";for(var e=0;e<b.length;e++){var d=b.charCodeAt(e);if(d<128){a+=String.fromCharCode(d)}else{if((d>127)&&(d<2048)){a+=String.fromCharCode((d>>6)|192);a+=String.fromCharCode((d&63)|128)}else{a+=String.fromCharCode((d>>12)|224);a+=String.fromCharCode(((d>>6)&63)|128);a+=String.fromCharCode((d&63)|128)}}}
return a},UTF8Decode:function(a){var b="";var d=0;var e=c1=c2=0;while(d<a.length){e=a.charCodeAt(d);if(e<128){b+=String.fromCharCode(e);d++}else{if((e>191)&&(e<224)){c2=a.charCodeAt(d+ 1);b+=String.fromCharCode(((e&31)<<6)|(c2&63));d+=2}else{c2=a.charCodeAt(d+ 1);c3=a.charCodeAt(d+ 2);b+=String.fromCharCode(((e&15)<<12)|((c2&63)<<6)|(c3&63));d+=3}}}
return b},base64Encode:function(c){var a="";var k,h,f,j,g,e,d;var b=0;c=this.UTF8Encode(c);while(b<c.length){k=c.charCodeAt(b++);h=c.charCodeAt(b++);f=c.charCodeAt(b++);j=k>>2;g=((k&3)<<4)|(h>>4);e=((h&15)<<2)|(f>>6);d=f&63;if(isNaN(h)){e=d=64}else{if(isNaN(f)){d=64}}
a=a+ this.keyString.charAt(j)
+ this.keyString.charAt(g)
+ this.keyString.charAt(e)
+ this.keyString.charAt(d)}
return a},base64Decode:function(c){var a="";var k,h,f;var j,g,e,d;var b=0;c=c.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(b<c.length){j=this.keyString.indexOf(c.charAt(b++));g=this.keyString.indexOf(c.charAt(b++));e=this.keyString.indexOf(c.charAt(b++));d=this.keyString.indexOf(c.charAt(b++));k=(j<<2)|(g>>4);h=((g&15)<<4)|(e>>2);f=((e&3)<<6)|d;a=a+ String.fromCharCode(k);if(e!=64){a=a+ String.fromCharCode(h)}
if(d!=64){a=a+ String.fromCharCode(f)}}
a=this.UTF8Decode(a);return a}})})();;function initializeMap(configs,markersCode,stylesCode,boxStyles){var myLatlng;configs.width=configs.width=='auto'||configs.width=='100%'?"100%":configs.width+'px';configs.height=configs.height=='auto'||configs.height=='100%'?"100%":configs.height+'px';document.getElementById(configs.cavas_id).style.width=configs.width;document.getElementById(configs.cavas_id).style.height=configs.height;var markersJson=new BT.Base64().base64Decode(markersCode);var markers=JSON.decode(markersJson);var max=markers.length;var stylesJson=new BT.Base64().base64Decode(stylesCode);var styles=JSON.decode(stylesJson);var infowindowData=Array();var map=createMapCenter(configs,markers,styles,boxStyles);function createMapCenter(configs,markers,styles,boxStyles){if(configs.mapCenterType=='address'&&configs.mapCenterAddress==''||configs.mapCenterType=='coordinate'&&configs.mapCenterCoordinate==''){if(markers.length==0){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':'A2DN3 Nguyen Khanh Toan, Cau Giay, Ha Noi'},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode map center was not successful for the following reason: "+status);}});}else{if(markers[0].markerType=='address'){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':markers[0].markerValue},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode was not successful for the following reason: "+status+'! Map address: '+markers[0].markerValue);}})}else{mapCenterCoordinate=markers[0].markerValue.split(',');mapCenter=new google.maps.LatLng(mapCenterCoordinate[0],mapCenterCoordinate[1]);return createMap(configs,styles,markers,mapCenter,boxStyles);}}}else{if(configs.mapCenterType=='address'){var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':configs.mapCenterAddress},function(results,status){if(status==google.maps.GeocoderStatus.OK){mapCenter=results[0].geometry.location;return createMap(configs,styles,markers,mapCenter,boxStyles);}else{alert("Geocode was not successful for the following reason: "+status+'! Map address: '+configs.mapCenterAddress);}})}else{mapCenterCoordinate=configs.mapCenterCoordinate.split(',');mapCenter=new google.maps.LatLng(mapCenterCoordinate[0],mapCenterCoordinate[1]);return createMap(configs,styles,markers,mapCenter,boxStyles);}}}
function createMap(configs,styles,markers,mapCenter,boxStyles){if(configs.enableStyle==1||configs.enableStyle=='1'){var stylesArr=[];for(var j=0;j<styles.length;j++)
{var style={};style.stylers=[];if(styles[j].featureType!='all'){style.featureType=styles[j].featureType;}
if(styles[j].elementType!='all'){style.elementType=styles[j].elementType;}
if(styles[j].invertLightness=='true'){style.stylers.push({"invert_lightness":true});}
if(styles[j].visibility){style.stylers.push({"visibility":styles[j].visibility});}
if(styles[j].mapColor){style.stylers.push({"color":styles[j].mapColor});}
if(styles[j].weight){style.stylers.push({"weight":styles[j].weight});}
if(styles[j].hue){style.stylers.push({"hue":styles[j].hue});}
if(styles[j].saturation){style.stylers.push({"saturation":styles[j].saturation});}
if(styles[j].lightness){style.stylers.push({"lightness":styles[j].lightness});}
if(styles[j].gamma){style.stylers.push({"gamma":styles[j].gamma});}
stylesArr.push(style);}
if(configs.createNewOrDefault=="applyDefault"){if(stylesArr.length!=0){var mapOptions={scrollwheel:false,zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,center:mapCenter,mapTypeId:configs.mapType,styles:stylesArr}}else{var mapOptions={scrollwheel:false,zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,center:mapCenter,mapTypeId:configs.mapType}}}else{var mapOptions={scrollwheel:false,zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,center:mapCenter,mapTypeControlOptions:{mapTypeIds:[configs.mapType,'map_style']}}
var styledMap=new google.maps.StyledMapType(stylesArr,{name:configs.styleTitle});}}else{var mapOptions={scrollwheel:false,zoom:configs.zoom,zoomControl:configs.zoomControl,scaleControl:configs.scaleControl,mapTypeControl:configs.mapTypeControl,panControl:configs.panControl,streetViewControl:configs.streetViewControl,overviewMapControl:configs.overviewMapControl,center:mapCenter,mapTypeId:configs.mapType}}
var map=new google.maps.Map(document.getElementById(configs.cavas_id),mapOptions);if((configs.enableStyle==1||configs.enableStyle=='1')&&configs.createNewOrDefault=="createNew"){map.mapTypes.set('map_style',styledMap);map.setMapTypeId('map_style');}
if(configs.weather){var weatherLayer=new google.maps.weather.WeatherLayer({temperatureUnits:configs.temperatureUnit});weatherLayer.setMap(map);if(configs.cloud){var cloudLayer=new google.maps.weather.CloudLayer();cloudLayer.setMap(map);}}
for(i=0;i<markers.length;i++){getMarker(configs,markers[i],map,boxStyles);}}
function getMarker(configs,markerSource,map,boxStyles){if(markerSource.markerType=='coordinate'){coordinate=markerSource.markerValue.split(',');var pos=new google.maps.LatLng(coordinate[0],coordinate[1]);createMarker(configs,markerSource,map,pos,boxStyles);}else{var geocoder=new google.maps.Geocoder();geocoder.geocode({'address':markerSource.markerValue},function(results,status){if(status==google.maps.GeocoderStatus.OK){var pos=results[0].geometry.location;createMarker(configs,markerSource,map,pos,boxStyles);}else{alert("Geocode was not successful for the following reason: "+status+'! Map address: '+markerSource.markerValue);}})}}
function createMarker(configs,markerSource,map,pos,boxStyles){var marker,image,shadow;if(markerSource.markerIcon==''){markerSource.markerIcon=configs.url+'modules/mod_bt_googlemaps/tmpl/images/marker.png';}else{markerSource.markerIcon=configs.url+markerSource.markerIcon;}
if(markerSource.markerShadowImage==''){markerSource.markerShadowImage=configs.url+'modules/mod_bt_googlemaps/tmpl/images/shadow.png';}else{markerSource.markerShadowImage=configs.url+markerSource.markerShadowImage;}
image=new google.maps.MarkerImage(markerSource.markerIcon);shadow=new google.maps.MarkerImage(markerSource.markerShadowImage,new google.maps.Size(41,32),new google.maps.Point(0,0),new google.maps.Point(11,32));marker=new google.maps.Marker({position:pos,map:map,shadow:shadow,icon:image,title:markerSource.markerTitle});if(configs.enableCustomInfoBox==1||configs.enableCustomInfoBox=='1'){var pixelOffset=configs.boxPosition.split(',');if(configs.closeBoxImage==''){configs.closeBoxImage='modules/mod_bt_googlemaps/tmpl/images/close.gif';}
var infoBoxOption={content:markerSource.markerInfoWindow,disableAutoPan:true,maxWidth:0,pixelOffset:new google.maps.Size(Number(pixelOffset[0]),Number(pixelOffset[1])),zIndex:null,boxStyle:boxStyles,closeBoxMargin:configs.closeBoxMargin,closeBoxURL:configs.url+'/'+configs.closeBoxImage,infoBoxClearance:new google.maps.Size(1,1),isHidden:false,pane:"floatPane",enableEventPropagation:false}
var infowindow=new InfoBox(infoBoxOption);}else{var infowindow=new google.maps.InfoWindow({content:markerSource.markerInfoWindow});}
infowindowData.push(infowindow);if(markerSource.markerShowInfoWindow==1){infowindow.open(map,marker);}
google.maps.event.addListener(marker,'click',function(){infowindowData.each(function(el){el.close();});infowindow.open(map,marker);});}};(function($){$(document).ready(function(){$('#sp-quickcontact-form').submit(function(){var value=$(this).serializeArray(),request={'option':'com_ajax','module':'sp_quickcontact','data':value,'format':'jsonp'};$.ajax({type:'POST',data:request,beforeSend:function(){$('#sp_qc_submit').before('<p class="sp_qc_loading"></p>');},success:function(response){$('#sp_qc_status').hide().html(response).fadeIn().delay(2000).fadeOut(500);$('.sp_qc_loading').fadeOut(function(){$(this).remove();});}});return false;});});})(jQuery);