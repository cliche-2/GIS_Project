

// (x, y)를 중심으로 하는 반지름 rad미터의 원 그리기

function drawAreaCircle(radius, x, y){

	var view = map.getView();
	var projection = view.getProjection();
	var resolutionAtEquator = view.getResolution(); 
	//var center = map.getView().getCenter(); // 그릴 원의 중심좌표
	var center = ol.proj.transform([x*1,y*1], 'EPSG:4326', 'EPSG:3857'); 
	//console.log(center);
	// OpenLayers 최신버전 ol.proj.getPointResolution(p, r, c) 사용해야 함
	var pointResolution = ol.proj.getPointResolution(projection, resolutionAtEquator, center);
    var resolutionFactor = resolutionAtEquator/pointResolution;

    // Cannot read property 'm' of undefined
    //radius = (radius / ol.proj.METERS_PER_UNIT.m) * resolutionFactor;

    var circle = new ol.geom.Circle(center, radius);

    return new ol.Feature(circle);

}