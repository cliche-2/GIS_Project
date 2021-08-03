
var wmsSource; 

var cctv_layers =""; //cctv 레이어 저장변수
var crmprvlmp_layers =""; //crmprvlmp 레이어 저장변수
var police_layers =""; //police 레이어 저장변수
var crimerate_layers ="";//crimerate 저장변수


// 선택한 서비스 변수
var cat ="";
// 선택한 서비스 필터변수
var cql ="";
// 지역필터링 value값
var address2 = "";

//서비스 분류변수
var cctv_ins ="";
var police_ins ="";

//어떤서비스를 선택했는지 알기위한 배열
var arr = new Array();

function ServicemakeSource(cat, cql){

	// 레이어 변수
    var layer;
    // source 변수
    var source;
    
    
    // 레이어 받아올 때 사용할 파라미터
    if(cql == ""){ 
    	//cql =="" 이면 서비스 설치구분목적이 없다는 뜻
    	//보안등, 범죄울 
    	
    	if(address2 != ""){ // 지역필터링 값이 있으면
    		source = new ol.source.TileWMS({
    	    url: 'http://192.168.0.13:8088/geoserver/service/wms',
    	    //url: 'http://localhost:8080/geoserver/service/wms',
    	    params: { 'layers':cat, 'TILED':true ,'CQL_FILTER':address2},
    	    serverType: 'geoserver',  
    	    transition: 0, projection: 'EPSG:3857'
    	    });
    		
    	}else{ //지역필터링 값이 없으면
	        source = new ol.source.TileWMS({
	        url: 'http://192.168.0.13:8088/geoserver/service/wms',
	        //url: 'http://localhost:8080/geoserver/service/wms',
	        params: { 'layers':cat, 'TILED':true},
	        serverType: 'geoserver',  
	        transition: 0, projection: 'EPSG:3857'
	        });
    	}
    	
    } else {
    	//cql !="" 이면 서비스 설치구분목적이 있다는뜻 
    	//cctv,police
    	
    	
    		if(cql==cctv_ins){ //cctv 서비스를 선택
    			
    			console.log("cctv");
    			if(address2 != ""){ //지역필터링 값이 있으면
    				
    				cql = "("+cctv_ins+") and ("+address2+")";  
    	    		source = new ol.source.TileWMS({
    	    	    url: 'http://192.168.0.13:8088/geoserver/service/wms',
    	    	    //url: 'http://localhost:8080/geoserver/service/wms',
    	    	    params: { 'layers':cat, 'TILED':true ,'CQL_FILTER':cql},
    	    	    serverType: 'geoserver',  
    	    	    transition: 0, projection: 'EPSG:3857'
    	    	    });
    	    		
    	    	}else{ //지역필터링 값이 없으면
    	    		
    		        source = new ol.source.TileWMS({
    		        url: 'http://192.168.0.13:8088/geoserver/service/wms',
    		        //url: 'http://localhost:8080/geoserver/service/wms',
    		        params: { 'layers':cat, 'TILED':true ,'CQL_FILTER':cctv_ins},
    		        serverType: 'geoserver',  
    		        transition: 0, projection: 'EPSG:3857'
    		        });
    	    	}
    		}
    		
    		if(cql==police_ins){ //police 서비스를 선택
    			
    			console.log("police");
    			if(address2 != ""){ //지역필터링 값이 있으면
    				
    				cql = "("+police_ins+")and("+address2+")";  
    	    		source = new ol.source.TileWMS({
    	    	    url: 'http://192.168.0.13:8088/geoserver/service/wms',
    	    	    //url: 'http://localhost:8080/geoserver/service/wms',
    	    	    params: { 'layers':cat, 'TILED':true ,'CQL_FILTER':cql},
    	    	    serverType: 'geoserver',  
    	    	    transition: 0, projection: 'EPSG:3857'
    	    	    });
    	    		
    	    	}else{//지역필터링 값이 없으면
    	    		
    		        source = new ol.source.TileWMS({
    		        url: 'http://192.168.0.13:8088/geoserver/service/wms',
    		        //url: 'http://localhost:8080/geoserver/service/wms',
    		        params: { 'layers':cat, 'TILED':true ,'CQL_FILTER':police_ins},
    		        serverType: 'geoserver',  
    		        transition: 0, projection: 'EPSG:3857'
    		        });
    	    	}
    			
    		}
    	
    	}

    return source;
}

function makeLayer(source){
    /* source를 입력하면 layer를 반환 */
    return new ol.layer.Tile({source: source});

}