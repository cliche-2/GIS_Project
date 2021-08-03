
var searchLayer;

function showSearchLayer(){

	map.removeLayer(searchLayer);

	// 검색할 DB 필드명 ex. address
	// s_cat = HTML s_cat combobox의 각 option value로 지정할 것
	var s_cat= document.getElementById('s_cat').value;
	var s_keyword = document.getElementById('getsearchKeyword').value;
//	    console.log(s_keyword);
	var s_field;
	var s_sql;

	switch(s_cat){
		case 'cctv':
			s_field='number'; //id
			s_sql = s_field+" ="+s_keyword;
			break;
		case 'crmprvlmp':
			s_field='id'; //id
			s_sql = s_field+" ="+s_keyword;
			break;
		case 'police':
			s_field='seo'; // 서이름
			s_sql = s_field+" ilike '%"+s_keyword+"%'";
			break;
	}

	//console.log(s_cat+" "+s_keyword+" "+s_sql);

	var sSource = makeSource(s_cat, s_sql);
	searchLayer = makeLayer(sSource);
	map.addLayer(searchLayer);


     var tNames = 'service:'+s_cat;
	if(s_cat=="cctv" || s_cat=="crmprvlmp"){
	   var pptName = 'lo,la';
	} else {
		pptName = 'x,y';
	}
	//	console.log(s_cat+" "+tNames);


		$.ajax({


			url: GeoUrlWfs, //?
			type: 'get',
			data: {
					service: 'wfs', 
					version: '2.0.0', 
					request: 'GetFeature', 
					outputFormat: 'json',
					typeNames: tNames,
					cql_filter: s_sql,
					propertyName: pptName
					} 
		}).then(function(res){

			var s_x, s_y;
			//console.log('get');
			if(s_cat=="cctv" || s_cat=="crmprvlmp"){
			     s_x = res.features[0].properties.lo;
			     s_y = res.features[0].properties.la;
			} else {
				// 검색 첫 번째 결과값
				 s_x = res.features[0].properties.x;
			     s_y = res.features[0].properties.y;
			}
			
			// view.centerOn
			var s_center = ol.proj.transform([s_x, s_y],'EPSG:4326','EPSG:3857')
			map.getView().setCenter(s_center);
			map.getView().setZoom(17);
		});



	map.on('singleclick', function (evt) {
				var viewResolution = (view.getResolution()); 
				var sUrl = sSource.getFeatureInfoUrl(
					evt.coordinate, 
					viewResolution, 
					'EPSG:3857', 
					{ 'INFO_FORMAT' : 'text/html', 
					'QUERY_LAYERS' : s_cat
				});

			//	if (crmprvlmp_ch) {// 체크 해제시 ch = false
					if (sUrl) { 
						fetch(sUrl).then(function(response) { 
							return response.text(); 
						}).then(function(html) {
							if(html.includes('<table class="featureInfo">')){
								//document.getElementById('info').innerHTML = html; 
								content1.innerHTML = html; 
								overlay.setPosition(evt.coordinate);
							}
						}); 
					}
			//	}
			});
	


}


