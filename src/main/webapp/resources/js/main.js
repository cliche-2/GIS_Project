
var cctv_ch; // 체크박스 필터링 변수(cctv)
var crmprvlmp_ch; // 체크박스 필터링 변수(보안등)
var police_ch;// 체크박스 필터링 변수(경찰서)
var crimerate_ch; // 체크박스 필터링 변수(범죄율)

var wmsSource;
var cctv_wmsSource;
var police_wmsSource;
var crmprvlmp_wmsSource;

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

//맵데이터 선택한값
var input="";

//어떤서비스를 선택했는지 알기위한 배열
var arr = new Array();

//지역이름이 들어있는 
var add = "";
var add2 = new Array();

// 체크박스 선택해제 이벤트(지역구)
$(document).ready(function(){
	$(".ch1").change(function(){// input class=ch1값을 가져옴
		if($(".ch1").is(":checked")){
			
				if(arr.length==0){
			    	alert('서비스를 먼저 선택해주세요!!!!');
			    	$('.ch1').prop("checked",false);
			    	return;
			    }
					
				address2 = "";// 변수값 null 초기화
				add = "^.*(";
				
				map.removeLayer(cctv_layers);// 맵화면에 레이어 제거
				map.removeLayer(crmprvlmp_layers);// 맵화면에 레이어 제거
				map.removeLayer(police_layers);// 맵화면에 레이어 제거
				map.removeLayer(crimerate_layers);// 맵화면에 레이어 제거
				
				var areaFilterChkbox = document.getElementsByName('ch1');
	
				var chkCount=0;

				for(var i=0; i<areaFilterChkbox.length; i++){
					if(areaFilterChkbox[i].checked == true)
						chkCount++;
				}

				var chkCount2=0;
				for(var i=0; i<areaFilterChkbox.length; i++){
					if(areaFilterChkbox[i].checked == true){
						address2 += " address ilike '%"+areaFilterChkbox[i].value+"%' ";
						add += areaFilterChkbox[i].value;
						chkCount2++;
						if( (chkCount>1) ){
							address2 += " or";
							add += "|";
						}
					}
				} 
				

				if ( chkCount >1 ){
					address2 = address2.slice(0,-2); //마지막 or 제거
					add = add.slice(0,-1);
				}
				
				add+= ").*";

				changeGuArea();
				
				if(arr.includes("service:cctv")){//배열안에 해당하는 값이 있으면
					cctv_wmsSource = ServicemakeSource("service:cctv",cctv_ins); //cctv서비스 구분목적값이 cctv_ins값을 보내줌
					cctv_layers = makeLayer(cctv_wmsSource);
					cctv_layers.setZIndex(4);
					
					map.on("moveend",function(e){
						var zoom = map.getView().getZoom(); //줌값 가져옴
					    //map.removeLayer(cctv_layers);
					    //줌값 12이상 체크박서 값 선택시
					    if(zoom >= 12 && cctv_ins!=""){
					    	cctv_ch = true;//클릭 이벤트 활성화
					    	map.removeLayer(cctv_layers);
							map.addLayer(cctv_layers);// 맵화면에 레이어 추가
					    }else{
					    	cctv_ch = false;//클릭 이벤트 비활성화
					    	map.removeLayer(cctv_layers);
					    }
					}); 
				}
				if(arr.includes("service:crmprvlmp")){//배열안에 해당하는 값이 있으면
					crmprvlmp_wmsSource = ServicemakeSource("service:crmprvlmp",""); //서비스 구분목적값이 없으므로 ""값으로 보내줌
					crmprvlmp_layers = makeLayer(crmprvlmp_wmsSource);
					crmprvlmp_layers.setZIndex(3);
					map.removeLayer(crmprvlmp_layers);
					
					map.on("moveend",function(e){
						var zoom = map.getView().getZoom(); //줌값 가져옴
					   
						 console.log(cql);
					    //줌값 12이상 체크박서 값 선택시
					    if(zoom >= 12 && cql!=""){
					    	crmprvlmp_ch = true;//클릭 이벤트 활성화
					    	map.removeLayer(crmprvlmp_layers);
							map.addLayer(crmprvlmp_layers);// 맵화면에 레이어 추가
					    }else{
					    	crmprvlmp_ch = false;//클릭 이벤트 비활성화
					    	map.removeLayer(crmprvlmp_layers);
					    }
					});
					
				}
				if(arr.includes("service:police")){//배열안에 해당하는 값이 있으면
					police_wmsSource = ServicemakeSource("service:police",police_ins);//cctv서비스 구분목적값이 police_ins값을 보내줌
					police_layers = makeLayer(police_wmsSource);
					police_layers.setZIndex(4);
					
					map.on("moveend",function(e){
						var zoom = map.getView().getZoom(); //줌값 가져옴
					    //map.removeLayer(police_layers);
					    //줌값 12이상 체크박서 값 선택시
					    if(zoom >= 12 && police_ins!=""){
					    	police_ch = true;//클릭 이벤트 활성화
					    	map.removeLayer(police_layers);
							map.addLayer(police_layers);// 맵화면에 레이어 추가
					    }else{
					    	police_ch = false;//클릭 이벤트 비활성화
					    	map.removeLayer(police_layers);
					    }
					}); 
					
				}
				 
    }else{ 
    	//체크박스 해제 
    	add="";
    	address2="";
		map.removeLayer(cctv_layers);// 맵화면에 레이어 제거
		map.removeLayer(crmprvlmp_layers);// 맵화면에 레이어 제거
		map.removeLayer(police_layers);// 맵화면에 레이어 제거
		map.removeLayer(crimerate_layers);// 맵화면에 레이어 제거
    
    		changeGuArea();

    			
    		if(arr.includes("service:cctv")){
				address2="";
				cctv_wmsSource = ServicemakeSource("service:cctv",cctv_ins);
				cctv_layers = makeLayer(cctv_wmsSource);
				cctv_layers.setZIndex(4);
				
				map.on("moveend",function(e){
					var zoom = map.getView().getZoom(); //줌값 가져옴
				    //map.removeLayer(cctv_layers);
				    //줌값 12이상 체크박서 값 선택시
				    if(zoom >= 12 && cctv_ins!=""){
				    	cctv_ch = true;//클릭 이벤트 활성화
				    	map.removeLayer(cctv_layers);
						map.addLayer(cctv_layers);// 맵화면에 레이어 추가
				    }else{
				    	cctv_ch = false;//클릭 이벤트 비활성화
				    	map.removeLayer(cctv_layers);
				    }
				}); 
			}
			if(arr.includes("service:crmprvlmp")){
				address2="";
				crmprvlmp_wmsSource = ServicemakeSource("service:crmprvlmp","");
				crmprvlmp_layers = makeLayer(crmprvlmp_wmsSource);
				crmprvlmp_layers.setZIndex(3);
				
				map.on("moveend",function(e){
					var zoom = map.getView().getZoom(); //줌값 가져옴
				    //map.removeLayer(cctv_layers);
				    //줌값 12이상 체크박서 값 선택시
				    if(zoom >= 12 && cql!=""){
				    	crmprvlmp_ch = true;//클릭 이벤트 활성화
				    	map.removeLayer(crmprvlmp_layers);
						map.addLayer(crmprvlmp_layers);// 맵화면에 레이어 추가
				    }else{
				    	crmprvlmp_ch = false;//클릭 이벤트 비활성화
				    	map.removeLayer(crmprvlmp_layers);
				    }
				});
				
			}
			if(arr.includes("service:police")){
				address2="";
				police_wmsSource = ServicemakeSource("service:police",police_ins);
				police_layers = makeLayer(police_wmsSource);
				police_layers.setZIndex(4);
				
				map.on("moveend",function(e){
					var zoom = map.getView().getZoom(); //줌값 가져옴
				    //map.removeLayer(police_layers);
				    //줌값 12이상 체크박서 값 선택시
				    if(zoom >= 12 && police_ins!=""){
				    	police_ch = true;//클릭 이벤트 활성화
				    	map.removeLayer(police_layers);
						map.addLayer(police_layers);// 맵화면에 레이어 추가
				    }else{
				    	police_ch = false;//클릭 이벤트 비활성화
				    	map.removeLayer(police_layers);
				    }
				});
				
			}
			
    		
        	
        }
    });
});



// 체크박스 선택해제 이벤트(cctv)
$(document).ready(function(){
	$(".ch2").change(function(){// input class=ch2값을 가져옴

		if($(".ch2").is(":checked")){
			
			cat = "service:cctv"; 
		
			//체크박스 선택시 해당하는 cat값 배열에 저장
			if(!arr.includes(cat) && cat != ""){
				arr.push(cat);
			}
			
			// 설치 목적 구분
			cctv_ins="";//변수값 초기화
			
			map.removeLayer(cctv_layers);// 맵화면에 레이어 제거
			
			var areaFilterChkbox = document.getElementsByName('ch2');
			var cctv_chkCount=0;

			for(var i=0; i<areaFilterChkbox.length; i++){
				if(areaFilterChkbox[i].checked == true){
					cctv_chkCount++;
					
				}  else { // chkbox 해제 시 ON인 safeArea 제거
					offWhenChkboxUnchk(areaFilterChkbox[i].id);
				}
			}

			var cctv_chkCount2=0;
			for(var i=0; i<areaFilterChkbox.length; i++){
				if(areaFilterChkbox[i].checked == true){
					// 나중에 넘겨주는 변수값 설정
					cctv_ins += " inspurpose ilike '%"+areaFilterChkbox[i].value+"%' ";
					cctv_chkCount2++;
					if( (cctv_chkCount>1) ){
						cctv_ins += " or";
					}
				}
			}

			if ( cctv_chkCount >1 ){
				cctv_ins = cctv_ins.slice(0,-2);
			}
			
			// 조건절
			cctv_wmsSource = ServicemakeSource(cat,cctv_ins);
			cctv_layers = makeLayer(cctv_wmsSource);
			cctv_layers.setZIndex(4);

			//줌 이벤트 
			map.on("moveend",function(e){
			    var zoom = map.getView().getZoom(); //줌값 가져옴
			    console.log(zoom);
			    //줌이 12이상 체크박스를 선택했을때
			    if(zoom >= 12 && cctv_ins!=""){
			    	console.log(arr);
			    	cctv_ch=true;//클릭 이벤트 활성화
			    	map.removeLayer(cctv_layers);// 맵화면에 레이어 제거
			    	map.addLayer(cctv_layers);// 맵화면에 레이어 추가
			    }else{
			    	cctv_ch=false;//클릭 이벤트 비활성화
			    	map.removeLayer(cctv_layers);			    
			    	}
			}); 

			
       }else{//cctv 서비스 체크해제시


       		var areaFilterChkbox = document.getElementsByName('ch2');
       		for(var i=0; i<areaFilterChkbox.length; i++){
				offWhenChkboxUnchk(areaFilterChkbox[i].id);
			}


    	   //값 초기화
	       	cctv_ch=false;
	  //     	cctv_url = "";
	       	cctv_ins ="";
	       	cat= "";
	       	//배열에 값 제거
	       	arr.splice(arr.indexOf("service:cctv"),1);
	       	//배열에 값이 없으면 지역필터링 체크박스 해제
	    	if(arr.length==0){
	    		$('.ch1').prop("checked",false);
	    	}
	    	//맵 레이어 제거
	       	map.removeLayer(cctv_layers);
	       }
   });
});




// 체크박스 선택해제 이벤트(crmprvlmp)
$(document).ready(function(){
	$(".ch3").change(function(){// input class=ch3값을 가져옴
		if($(".ch3").is(":checked")){

			cat = "service:crmprvlmp";
			cql ="filter";//넘겨주는 설치목적구분 값이 없어서 null값으로 저장
			
			//배열에 값 추가
			if(!arr.includes(cat) && cat != ""){
				arr.push(cat);
			}
			//조건절
			crmprvlmp_wmsSource = ServicemakeSource(cat,"");
			crmprvlmp_layers = makeLayer(crmprvlmp_wmsSource);
			crmprvlmp_layers.setZIndex(3);//zindex값 설정
			
			//줌 이벤트
			map.on("moveend",function(e){
			    var zoom = map.getView().getZoom(); //줌값 가져옴
			    console.log(zoom);
			    
			    if(zoom >= 12 && cql != ""){
			    	crmprvlmp_ch=true;//클릭 이벤트 활성화
			    	map.removeLayer(crmprvlmp_layers);	
			    	map.addLayer(crmprvlmp_layers);// 맵화면에 레이어 추가
			    }else{
			    	crmprvlmp_ch=false;//클릭 이벤트 비활성화
			    	map.removeLayer(crmprvlmp_layers);			    
			    	}
			});


			
       }else{//방범등 서비스 체크해제시
    	   
       		var areaFilterChkbox = document.getElementsByName('ch3');
       		for(var i=0; i<areaFilterChkbox.length; i++){
				offWhenChkboxUnchk(areaFilterChkbox[i].id);
			}

    	   //값 초기화
	       	crmprvlmp_ch  =false;
	     //  	crmprvlmp_url = "";
	       	cql = "";
	       	//배열에 해당하는 값 제거
	       	arr.splice(arr.indexOf("service:crmprvlmp"),1);
	       	//배열 크기가 0이면 지역필터링 체크박스해제
	    	if(arr.length==0){
	    		$('.ch1').prop("checked",false);
	    	}
	    	//맵 레이어 제거
	       	map.removeLayer(crmprvlmp_layers);
	   }
   });
});



//체크박스 선택해제 이벤트(police)
$(document).ready(function(){
	$(".ch4").change(function(){// input class=ch4값을 가져옴
		if($(".ch4").is(":checked")){
			
			cat = "service:police";
			
			//배열에 값 추가
			if(!arr.includes(cat) && cat != ""){
				arr.push(cat);
			}
			// 설치 목적 구분
			police_ins="";
			
			map.removeLayer(police_layers);// 맵화면에 레이어 제거
			
			var areaFilterChkbox = document.getElementsByName('ch4');
			var police_chkCount=0;

			for(var i=0; i<areaFilterChkbox.length; i++){
				if(areaFilterChkbox[i].checked == true){
					police_chkCount++;
				} else { // chkbox 해제 시 ON인 safeArea 제거
					offWhenChkboxUnchk(areaFilterChkbox[i].id);
				}
			}

			var police_chkCount2=0;
			for(var i=0; i<areaFilterChkbox.length; i++){
				if(areaFilterChkbox[i].checked == true){
					// 나중에 넘겨주는 변수값 설정
					police_ins += " inspurpose ilike '%"+areaFilterChkbox[i].value+"%' ";
					police_chkCount2++;
					if( (police_chkCount>1) ){
						police_ins += " or";
					}
				}
			} 

			if ( police_chkCount >1 ){
				police_ins = police_ins.slice(0,-2);
			}
			
			// 조건절
			police_wmsSource = ServicemakeSource(cat,police_ins);
			police_layers = makeLayer(police_wmsSource);
			police_layers.setZIndex(4);//zindex 값 설정
			
			//줌 이벤트
			map.on("moveend",function(e){
			    var zoom = map.getView().getZoom(); //줌값 가져옴
			    console.log(zoom);
			    
			    map.removeLayer(police_layers);
			    //줌값 12이상 체크박서 값 선택시
			    if(zoom >= 12 && police_ins!=""){
			    	police_ch = true;//클릭 이벤트 활성화
			    	map.removeLayer(police_layers);
					map.addLayer(police_layers);// 맵화면에 레이어 추가
			    }else{
			    	police_ch = false;//클릭 이벤트 비활성화
			    	map.removeLayer(police_layers);
			    }
			}); 

			
        
	    }else{

	    	var areaFilterChkbox = document.getElementsByName('ch4');
       		for(var i=0; i<areaFilterChkbox.length; i++){
				offWhenChkboxUnchk(areaFilterChkbox[i].id);
			}

	    	//값 초기화
		    police_ch=false;
		  //  police_url = "";
		    police_ins = "";
		    cat="";
		    //배열에 해당하는 값 제거
		    arr.splice(arr.indexOf("service:police"),1);
		    //배열 크기가 0이면 지역필터링 체크박스해제
		    if(arr.length==0){
		    	$('.ch1').prop("checked",false);
		    }
		    map.removeLayer(police_layers);
	    }
	});
});


//체크박스 선택해제 이벤트(crimerate)
$(document).ready(function(){
	$(".ch5").change(function(){// input class=ch5값을 가져옴
		if($(".ch5").is(":checked")){

			map.removeLayer(crimerate_layers);
			//선택한 라디오 value값 가져옴
			input = $(':input:radio[name=ch5]:checked').val(); 
			
			//라디오버튼 없음 선택시
			if(input == "null"){
				map.removeLayer(crimerate_layers);
				//배열에 해당하는 값 제거
		    	arr.splice(arr.indexOf("service:"+input),1);
		    	//배열 크기가 0이면 지역필터링 체크박스해제
		    	if(arr.length==0){
		    		$('.ch1').prop("checked",false);
		    	}
				crimerate_url = "";
				crimerate_ch=false;
				return;
			}
			
			cat = "service:"+input;
			cql = "";//넘겨주는 설치목적구분값이 없으니 null값으로 저장
			
			//조건절
			wmsSource = ServicemakeSource(cat,cql);
			crimerate_layers = makeLayer(wmsSource);
			crimerate_layers.setZIndex(1);
			map.addLayer(crimerate_layers);// 맵화면에 레이어 추가
			
			//클릭이벤트
			crimerate_ch = true;

		}else{
    		//값 초기화
			crimerate_ch=false;
	    	//crimerate_url = "";
	    	input = "";
	    	//배열에 해당하는 값 제거
	    	arr.splice(arr.indexOf("service:"+input),1);
	    	//배열 크기가 0이면 지역필터링 체크박스해제
	    	if(arr.length==0){
	    		$('.ch1').prop("checked",false);
	    	}
	    	//맵 레이어제거
	    	map.removeLayer(crimerate_layers);
    	}
	});
});


//클릭이벤트
//$(document).ready(function(){
	map.on('singleclick', function (evt) {
		var viewResolution = (view.getResolution());
		var cctv_url	  = "";
		var crmprvlmp_url = "";
		var police_url	  = "";

		// CCTV
		if($(".ch2").is(":checked")){
			cctv_url = cctv_wmsSource.getFeatureInfoUrl(
				evt.coordinate, 
				viewResolution, 
				'EPSG:3857', 
				{ 'INFO_FORMAT' : 'text/html', 
				'QUERY_LAYERS' : 'cctv' 
			});

			if (cctv_url) { 
				fetch(cctv_url).then(function(response) { 
					return response.text(); 
				}).then(function(html) {
					if(html.includes('<table class="featureInfo">')){
						//document.getElementById('info').innerHTML = html; 
						content1.innerHTML = html; 
						overlay.setPosition(evt.coordinate);
					}
					//return;
				}); 
			}
		}



		// Lamp
		if($(".ch3").is(":checked")){
			crmprvlmp_url = crmprvlmp_wmsSource.getFeatureInfoUrl(
				evt.coordinate, 
				viewResolution, 
				'EPSG:3857', 
				{ 'INFO_FORMAT' : 'text/html', 
				'QUERY_LAYERS' : 'crmprvlmp' 
			});

			if (crmprvlmp_url) { 
				fetch(crmprvlmp_url).then(function(response) { 
					return response.text(); 
				}).then(function(html) {
					if(html.includes('<table class="featureInfo">')){
						//document.getElementById('info').innerHTML = html; 
						content1.innerHTML = html; 
						overlay.setPosition(evt.coordinate);
					}
					//return;
				}); 
			}
		}

		// Police
		if($(".ch4").is(":checked")){
			police_url = police_wmsSource.getFeatureInfoUrl(
				evt.coordinate, 
				viewResolution, 
				'EPSG:3857', 
				{ 'INFO_FORMAT' : 'text/html', 
				'QUERY_LAYERS' : 'police' 
			});

			if (police_url) { 
				fetch(police_url).then(function(response) { 
					return response.text(); 
				}).then(function(html) {
					if(html.includes('<table class="featureInfo">')){
						//document.getElementById('info').innerHTML = html; 
						content1.innerHTML = html; 
						overlay.setPosition(evt.coordinate);
					}
				}); 
			}
		}

	});
//});


