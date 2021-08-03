
const style1 = new ol.style.Style({
				      stroke: new ol.style.Stroke({
				          color: 'rgba( 255, 133, 133 ,0.9)',
				          width: 1
				      }),
				      fill:   new ol.style.Fill({
				          color: 'rgba( 255, 133, 133 ,0.4)'
				      })
				  });
const style2 = new ol.style.Style({
				      stroke: new ol.style.Stroke({
				          color: 'rgba( 133, 255, 133 ,0.9)',
				          width: 1
				      }),
				      fill:   new ol.style.Fill({
				          color: 'rgba( 133, 255, 133 ,0.4)'
				      })
				  });
const style3 = new ol.style.Style({
				      stroke: new ol.style.Stroke({
				          color: 'rgba( 0, 0, 128, 0.9)',
				          width: 1
				      }),
				      fill:   new ol.style.Fill({
				          color: 'rgba( 0, 0, 128, 0.4)'
				      })
				  });

/****
 * 안전 범위 조회 버튼 클릭 시
 * 조건에 맞는 좌표 리스트 받아서
 * 원 그리기
 */
//var vectorLayer;
var officeArea0Layer; //dprc
var officeArea1Layer;
var officeArea2Layer;
var officeArea3Layer;
var lampLayer;
var cctvArea1Layer,cctvArea2Layer,cctvArea3Layer,cctvArea4Layer,cctvArea5Layer,cctvArea6Layer,cctvArea7Layer,cctvArea8Layer,cctvArea9Layer,cctvArea10Layer;


//...

function offWhenChkboxUnchk(chkboxId){

	var chkId = chkboxId;
	chkId = chkId.slice(0,-4);
	var chkBtn= document.querySelector('#'+chkId);
	if(chkBtn.value === "on" ){
		safeArea(chkId);
	}
}


function changeGuArea(){
	var allBtn = document.querySelectorAll('.showArea');

	for (let i=0; i<allBtn.length; i++){
		if(allBtn[i].value === "on"){
			allBtn[i].value = "off";
			safeArea(allBtn[i].id);
		}
	}
}


function safeArea(id){
	
	// 지우는 건 버튼 or 체크박스 evt리스너
	var clickedBtn = id;
	var url;	// 대분류에 따른 url
	var detail; // 웹서버에 보내줄 세분류 조건 변수
	var area;	// 웹서버에 보내줄 지역구 조건 변수
	var vectorSource;
	var vectorLayer;
	var rad=document.getElementById('get'+clickedBtn).value *1;
	//console.log(clickedBtn);
	//console.log('rad '+rad);


	// Detail 처리
	// 선택한 카테고리
	// -경찰서
	if(clickedBtn.includes('office')){
		switch(clickedBtn){
			case 'officeArea1': // 경찰서 - 경찰서
				url = webUrl+"/police/select";
				detail = '경찰서';
				map.removeLayer(officeArea1Layer);
				break;
			case 'officeArea2': // 경찰서 - 지구대
				url = webUrl+"/police/select";
				detail = '지구대';
				map.removeLayer(officeArea2Layer);
				break;
			case 'officeArea3': // 경찰서 - 파출소
				url = webUrl+"/police/select";
				detail = '파출소';
				map.removeLayer(officeArea3Layer);
				break;
			default:            // 경찰서 - 전체 //deprecated
				url = webUrl+"/police/selectAll";
				detail = '';
				map.removeLayer(officeArea0Layer);
		} // switch


	// -CCTV ...
	}else if(clickedBtn.includes('cctv')){
		switch(clickedBtn){
			case 'cctvArea1':
				url=webUrl+"/cctv/select";
				detail = '교통단속';
				map.removeLayer(cctvArea1Layer);
				break;
			case 'cctvArea2':
				url=webUrl+"/cctv/select";
				detail = '교통정보수집';
				map.removeLayer(cctvArea2Layer);
				break;
			case 'cctvArea3':
				url=webUrl+"/cctv/select";
				detail = '다목적';
				map.removeLayer(cctvArea3Layer);
				break;
			case 'cctvArea4':
				url=webUrl+"/cctv/select";
				detail = '생활방범';
				map.removeLayer(cctvArea4Layer);
				break;
			case 'cctvArea5':
				url=webUrl+"/cctv/select";
				detail = '시설물관리';
				map.removeLayer(cctvArea5Layer);
				break;
			case 'cctvArea6':
				url=webUrl+"/cctv/select";
				detail = '쓰레기단속';
				map.removeLayer(cctvArea6Layer);
				break;
			case 'cctvArea7':
				url=webUrl+"/cctv/select";
				detail = '어린이보호';
				map.removeLayer(cctvArea7Layer);
				break;
			case 'cctvArea8':
				url=webUrl+"/cctv/select";
				detail = '재난재해';
				map.removeLayer(cctvArea8Layer);
				break;
			case 'cctvArea9':
				url=webUrl+"/cctv/select";
				detail = '차량방범';
				map.removeLayer(cctvArea9Layer);
				break;
			case 'cctvArea10':
				url=webUrl+"/cctv/select";
				detail = '기타';
				map.removeLayer(cctvArea10Layer);
				break;							
						
		}
	}else{
		url=webUrl+"/lamp/select";
		detail ='';
		map.removeLayer(lampLayer);
	}


	// Area 처리
	// 선택한 지역
	area = add;




	// button toggle
	
	if (document.querySelector('#'+clickedBtn).value === "on"){
		document.querySelector('#'+clickedBtn).value = "off";
		console.log("change to "+document.querySelector('#'+clickedBtn).value);
		return;
	} else {
		document.querySelector('#'+clickedBtn).value = "on";
		console.log("change to "+document.querySelector('#'+clickedBtn).value);
	}


	
	$.ajax({
		  url: url,
		  method:"GET",
		  data:{
		  	"detail":detail,
		  	"area": area
		  }
	}).done(function(data) {
		var res = JSON.parse(data);
		var length = res.length;
		var vectorSource = new ol.source.Vector({
	           //projection: 'EPSG:4326'
	           projection: 'EPSG:3857'
        	});

		for(let i=0; i<res.length; i++){
			// draw로 만든 feat를 source에 add
			vectorSource.addFeature(drawAreaCircle(rad, res[i].x, res[i].y));
		}


		// source로 layer 만들고 레이어 add
        	// cat에 따른 style
        style=style3;
        if(clickedBtn.includes('cctv')) style=style2;
       	else if(clickedBtn.includes('office')) style=style1;
        vectorLayer = new ol.layer.Vector({
        	source: vectorSource,
        	style : [style]
        });
        vectorLayer.setZIndex(2);
        //map.addLayer(vectorLayer);




	    // 클릭한 버튼의 카테고리 확인
		// 만든 layer를 map에 추가하기
		// -경찰서
		if(clickedBtn.includes('office')){
			switch(clickedBtn){
				case 'officeArea1': // 경찰서 - 경찰서
					officeArea1Layer = vectorLayer;
					map.addLayer(officeArea1Layer);
					break;
				case 'officeArea2': // 경찰서 - 지구대
					officeArea2Layer = vectorLayer;
					map.addLayer(officeArea2Layer);
					break;
				case 'officeArea3': // 경찰서 - 파출소
					officeArea3Layer = vectorLayer;
					map.addLayer(officeArea3Layer);
					break;
				default:            // 경찰서 - deprecated
					officeArea0Layer = vectorLayer;
					map.addLayer(officeArea0Layer);
			} // switch

		// -cctv
		}else if(clickedBtn.includes('cctv')){
			switch(clickedBtn){
				case 'cctvArea1':
					cctvArea1Layer = vectorLayer;
					map.addLayer(cctvArea1Layer);
					break;
				case 'cctvArea2':
					cctvArea2Layer = vectorLayer;
					map.addLayer(cctvArea2Layer);
					break;
				case 'cctvArea3':
					cctvArea3Layer = vectorLayer;
					map.addLayer(cctvArea3Layer);
					break;
				case 'cctvArea4':
					cctvArea4Layer = vectorLayer;
					map.addLayer(cctvArea4Layer);
					break;
				case 'cctvArea5':
					cctvArea5Layer = vectorLayer;
					map.addLayer(cctvArea5Layer);
					break;
				case 'cctvArea6':
					cctvArea6Layer = vectorLayer;
					map.addLayer(cctvArea6Layer);
					break;
				case 'cctvArea7':
					cctvArea7Layer = vectorLayer;
					map.addLayer(cctvArea7Layer);
					break;
				case 'cctvArea8':
					cctvArea8Layer = vectorLayer;
					map.addLayer(cctvArea8Layer);
					break;
				case 'cctvArea9':
					cctvArea9Layer = vectorLayer;
					map.addLayer(cctvArea9Layer);
					break;
				case 'cctvArea10':
					cctvArea10Layer = vectorLayer;
					map.addLayer(cctvArea10Layer);
					break;					

			} // switch		
			
		} else {
			lampLayer = vectorLayer;
			map.addLayer(lampLayer);
		}
	}); // ajax GET


}




