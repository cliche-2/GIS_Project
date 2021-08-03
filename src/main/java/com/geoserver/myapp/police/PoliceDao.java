package com.geoserver.myapp.police;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class PoliceDao {

	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<PoliceDto> selectAll(){
		return sqlSession.selectList("sql.policeSelectAll");
	}
	
	
	// 목적 검색
	public List<PoliceDto> selectPurpose(String detail){
		//String val = "||.*("+detail+").*||";
		String val = detail;
		return sqlSession.selectList("sql.policeSelectInspurposeLike", val);
	}
	
	// 목적과 지역 검색
	public List<PoliceDto> selectBoth(String detail, String area){
		Map map = new HashMap();
		map.put("detail", detail);
		map.put("area", area);
		//hmap map = new 
		//map에다가 담아서 넘겨주고 
		System.out.println("areaRegexp:"+area);
		return sqlSession.selectList("sql.policeSelectBothLike", map);
	//	return null;
	}
	

	
	
}
