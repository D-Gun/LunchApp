var infowindow = new kakao.maps.InfoWindow({zindex:1});

const position = new Promise((success, error) => {
	var pointArr = new Array();
	//위치 좌표값 얻기
	navigator.geolocation.getCurrentPosition((navposition) => {
	pointArr = getCenterPointInArr(navposition.coords.latitude, navposition.coords.longitude);
	console.log(pointArr);
	console.log("c: getCenterPoint");
	success(pointArr);
	});
});

//position 함수로 좌표값 얻어온 뒤에 mapContainer, mapOptions 값 입력
position.then((pointArr) => {
	var mapContainer = document.getElementById('map');
	var mapOptions = { //지도를 생성 할 때 필요한 기본 옵션
		center: new kakao.maps.LatLng(pointArr[0], pointArr[1]),
		level: 4
	};
	var map = new kakao.maps.Map(mapContainer, mapOptions);
	var center = map.getCenter();
	console.log("centerPosition: " + center);
    //centerDisplayMarker(mapOptions.center,map);
    // //센터위치 표시 maker
    // function centerDisplayMaker(position, map){
    // var centerMarker = new kakao.maps.Maker({
    //     position: position
    // });
    var centerMarker = new kakao.maps.Marker({
        position: mapOptions.center
    });
    centerMarker.setMap(map);

	return map;
})
.catch(function(error){
	console.log(error);
});
var placeSearch = new kakao.maps.services.Places(map);

// placeSearch.categorySearch('FD6', placesSearchCB, {useMapBounds:true});

//얻은 좌표값 배열로 저장 => setCenter에서 첫 지점의 재설정을 위함
function getCenterPointInArr(latitudePosition, longitudePosition){
	var pArr = new Array();
	pArr[0] = latitudePosition;
	pArr[1] = longitudePosition;
	return pArr;
}

function placesSearchCB (data, status, pagination){
	if(status === kakao.maps.services.Status.OK) {
		for (var i = 0; i < data.length; i++){
			displayMarker(data[i]);
		}
	}
}

//검색결과 위치 maker
function displayMarker(place) {
	var marker = new kakao.maps.Marker({
		map: map,
		position: new kakao.maps.LatLng(place.y,place.x)
	});
	kakao.maps.event.addListener(maker, 'click', function(){
		infowindow.setContent('<div style="padding:5px;font-size:12px;">' + place.place_name + '</div>');
		infowindow.open(map,marker);
	});
}

var places = new kakao.maps.services.Places();
places.setMap(map);

//키워드 검색 결과 기반으로 음식점 종류 추출
var kewordSearchcallback = function(result, status){
	if (status === kakao.maps.services.Status.OK) {
		var resultObj = result;
		var word = null;
		var wordArr = new Array();
		var idx = 0;
		console.log("resultObj Element: ");
		console.log(resultObj);
		resultObj.forEach(element => {
			word = element.category_name.trim().replace("음식점 > ","");
				if (word.indexOf(">") == -1){
					word = word.trim();
					wordArr[idx] = word
					idx++;
				} else {
					word = word.substring(0,word.indexof(">"));
					word = word.trim();
					wordArr[idx] = word;
					idx++;
				}
		});
        console.log("after Set wordArr: ");
        wordArr = new Set(wordArr);
        console.log(wordArr);
    } else {
        console.log('failed');
    }
}
