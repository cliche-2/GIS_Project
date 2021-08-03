package com.geoserver.myapp.police;

public class PoliceDto {
	
	private int id;
	private String seo;
	private String inspurpose;
	private String x;
	private String y;
	private String address;
	
	public PoliceDto() {}
	
	public PoliceDto(int id, String seo, String  inspurpose, String x, String y, String address) {
		this.id = id;
		this.seo = seo;
		this.inspurpose =  inspurpose;
		this.x = x;
		this.y = y;
		this.address = address;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getSeo() {
		return seo;
	}

	public void setSeo(String seo) {
		this.seo = seo;
	}

	public String getInspurpose() {
		return inspurpose;
	}

	public void setInspurpose(String  inspurpose) {
		this.inspurpose =  inspurpose;
	}

	public String getX() {
		return x;
	}

	public void setX(String x) {
		this.x = x;
	}

	public String getY() {
		return y;
	}

	public void setY(String y) {
		this.y = y;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}
	
	
	
	

}
