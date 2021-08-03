var container1 = document.getElementById('popup'); //팝업
var content1 = document.getElementById('popup-content'); //팝업 내용
var closer1 = document.getElementById('popup-closer'); //팝업 취소

//url
//var webUrl = 'http://192.168.0.13:8080/myapp';
var webUrl = 'http://localhost:19090/myapp';
var GeoUrl = 'http://192.168.0.13:8088/geoserver/service/wms';
var GeoUrlWfs= 'http://192.168.0.13:8088/geoserver/service/wfs';

var overlay = new ol.Overlay({ //팝업창 설정
	element : container1, 
});



var layers_2d = new ol.layer.Tile({ source : new ol.source.XYZ({ 
	//2d
	  url: 'http://xdworld.vworld.kr:8080/2d/Base/201802/{z}/{x}/{y}.png'
}) 
}); 

var layers_3d = new ol.layer.Tile({ source : new ol.source.XYZ({ 
	//3d
	url : 'http://api.vworld.kr/req/wmts/1.1.1/141462B5-0158-3828-BF31-D1258463B92D/Satellite/{z}/{y}/{x}.jpeg'
}) 
}); 

closer1.onclick = function () { //레이어를 클릭했을시 
	overlay.setPosition(undefined); 
	closer1.blur(); 
	return false; 
};


//해당하는 레이어 클릭시 기본지도 변경
var switchLayer = function(evt){
    var attr = this.getAttribute('data-type');
    
    switch(attr){
        case '2d':
        	//기본 vworld 지도
        	map.removeLayer(layers_3d);
        	layers_2d.setZIndex(-1);
        	map.addLayer(layers_2d);
        	break;
        case '3d':
        	map.removeLayer(layers_2d);
        	layers_3d.setZIndex(-1);
        	map.addLayer(layers_3d);
        	break;
    }
};

//li 리스트 선택한 값 switchLayer 함수로 값 전달
var lis = document.getElementById('menu').getElementsByTagName('li');
var lis_array = [].slice.call(lis); //convert to array
lis_array.forEach(function(li){
	li.addEventListener('click', switchLayer, false);
});


var view = new ol.View({ //view 변수 생성후 처음띄우는 화면
	center: [14128579.82, 4512570.74], 
	zoom: 11 
});
//map 설정값
var map = new ol.Map({ 
	layers: [layers_2d], 
	overlays: [overlay], 
	target: 'map', 
	view: view, 
}); 


