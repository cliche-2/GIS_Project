function makeSource(cat, cql){
    /***
     * 
     *  카테고리에 따른 레이어 받아와서 return
     *  수정 시 url의 레이어 명, DB명 주의
     *  cat: 서비스 카테고리(서울맵, CCTV, 보안등...) 
     *  cql: SQL필터 or NULL
     * 
     */

    var layer;
    var source;


    // 카테고리에 따른 레이어명 설정
    if(cat == 'cctv'){
        layer='service:cctv';
    } else if (cat == 'crmprvlmp'){
        layer='service:crmprvlmp';
    } else if (cat == 'police'){
        layer='service:police';
    }

    console.log('cat: '+cat+" cql: "+cql);

    // 레이어 받아올 때 사용할 파라미터
    if(cql != ""){
    // 조건문인 경우
        source = new ol.source.TileWMS({
        url: GeoUrl, 
        params: { 'layers':layer, 'TILED':true, 'CQL_FILTER':cql},
        serverType: 'geoserver',  
        transition: 0, projection: 'EPSG:3857'
        });

    } else {
    // 조건문 없는 경우
        source =new ol.source.TileWMS({
        url: GeoUrl, 
        params: { 'layers':layer, 'TILED':true},
        serverType: 'geoserver',  
        transition: 0, projection: 'EPSG:3857'
        });
    }

        return source;
}


/*
function makeLayer(source){
    // source를 입력하면 layer를 반환
    return new ol.layer.Tile({source: source});

}
*/