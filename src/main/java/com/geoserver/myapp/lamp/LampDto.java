package com.geoserver.myapp.lamp;

public class LampDto {
	

	private int id;
	private String la;
	private String lo;
	private String tel;
	private String address;
	
	public LampDto() {}
	
	public LampDto(int id, String la, String lo, String tel, String address) {
	
		this.id = id;
		this.la = la;
		this.lo = lo;
		this.tel = tel;
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

	public String getTel() {
		return tel;
	}

	public void setTel(String tel) {
		this.tel = tel;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	
	
	
	
}
