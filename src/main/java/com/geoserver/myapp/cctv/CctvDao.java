package com.geoserver.myapp.cctv;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

@Repository
public class CctvDao {
	
	@Autowired
	private SqlSessionTemplate sqlSession;
	
	public List<CctvDto> selectPurpose(String detail){
		return sqlSession.selectList("sql.cctvSelectInspurposeLike", detail);
	}
	
	
	public List<CctvDto> selectBoth(String detail, String area){
		Map map  = new HashMap();
		map.put("detail", detail);
		map.put("area", area);
		return sqlSession.selectList("sql.cctvSelectBothLike", map);
	}
}
