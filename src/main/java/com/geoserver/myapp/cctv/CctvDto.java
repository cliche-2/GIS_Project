package com.geoserver.myapp.cctv;

public class CctvDto {

	private int id;
	private String la;
	private String lo;
	private String inspurpose;
	private String address;
	
	public CctvDto() {}
	public CctvDto(int id, String la, String lo, String inspurpose, String address) {
	
		this.id = id;
		this.la = la;
		this.lo = lo;
		this.inspurpose = inspurpose;
		this.address = address;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getLa() {
		return la;
	}
	public void setLa(String la) {
		this.la = la;
	}
	public String getLo() {
		return lo;
	}
	public void setLo(String lo) {
		this.lo = lo;
	}
	public String getInspurpose() {
		return inspurpose;
	}
	public void setInspurpose(String inspurpose) {
		this.inspurpose = inspurpose;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	
	
	

	
}
