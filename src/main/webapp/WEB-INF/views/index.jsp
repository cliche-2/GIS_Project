<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ page contentType="text/html; charset=UTF-8"%>
<%@ page session="false"%>

<html>

<head>

<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport"
	content="width=device-width, initial-scale=1, shrink-to-fit=no">
<meta name="description" content="">
<meta name="author" content="">

<title>예의범절</title>

<!-- Custom fonts for this template-->
<link href="resources/vendor/fontawesome-free/css/all.min.css"
	rel="stylesheet" type="text/css">
<link
	href="https://fonts.googleapis.com/css?family=Nunito:200,200i,300,300i,400,400i,600,600i,700,700i,800,800i,900,900i"
	rel="stylesheet">

<!-- Custom styles for this template-->
<link href="resources/css/sb-admin-2.min.css" rel="stylesheet">
<link href="resources/css/pop.css" rel="stylesheet">
<link
	href="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/css/ol.css"
	rel="stylesheet">
<style>
#map {
	height: 500px;
	width: 100%;
}


.showArea {
	width:40px;
	height: 25px;
	color:#fff;
	background: #004fff;
	font-size: 10px;
	border:none;
	border-radius: 20px;
	top:70%;
}

#menu{
    position: absolute;
    top: 100px;
    right: 30px;
    list-style-type: none;
    border-radius: 4px;
    border: 3px solid #333;
    padding: 0;
    background-color: #eee;
}
#menu li{
    padding: 10px;
}
#menu li:hover{
    cursor: pointer;
    text-decoration: underline;         
}
</style>

<!-- for OpenLayers -->
<script
	src="https://cdn.jsdelivr.net/gh/openlayers/openlayers.github.io@master/en/v6.5.0/build/ol.js">
	
</script>

<script src="http://code.jquery.com/jquery-1.11.0.min.js"></script>
</head>

<body id="page-top">

	<!-- Page Wrapper -->
	<div id="wrapper">

		<!-- Sidebar -->
		<ul
			class="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
			id="accordionSidebar">

			<!-- Sidebar - Brand -->
			<a
				class="sidebar-brand d-flex align-items-center justify-content-center"
				href="/myapp/">
				<div class="sidebar-brand-text mx-3">
					<h4>예의범절</h4>
				</div>
			</a>

			<!-- Divider -->
			<hr class="sidebar-divider my-0">

			<!-- Nav Item - Dashboard -->


			<li class="nav-item active"><a class="nav-link collapsed"
				href="#" data-toggle="collapse" data-target="#collapseOne"
				aria-expanded="true" aria-controls="collapseOne"> <i
					class="fas fa-fw fa-chart-area"></i> <span>지역명</span>
			</a>
				<div id="collapseOne" class="collapse" aria-labelledby="headingTwo"
					data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">서울특별시 지역구별</h6>
						&nbsp; 
						<font size="2">
						<input type="checkbox" class="ch1" name="selectall"
							value="" onclick="selectAll(this)" />서울시 전체&nbsp; <br>&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="종로구"
							onclick='checkSelectAll()' />종로구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="중구" 
							onclick='checkSelectAll()' />중구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="용산구"
							onclick='checkSelectAll()' />용산구&nbsp; 	
						<br>&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="성동구"
							onclick='checkSelectAll()' />성동구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="광진구" 
						onclick='checkSelectAll()' />광진구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="동대문구"
							onclick='checkSelectAll()' />동대문구
						<br>&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="중랑구"
							onclick='checkSelectAll()' />중랑구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="성북구" 
							onclick='checkSelectAll()' />성북구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="강북구"
							onclick='checkSelectAll()' />강북구&nbsp; 	
						<br>&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="도봉구"
							onclick='checkSelectAll()' />도봉구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="노원구" 
						onclick='checkSelectAll()' />노원구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="은평구"
							onclick='checkSelectAll()' />은평구
						<br>&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="서대문구"
							onclick='checkSelectAll()' />서대문구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="마포구" 
							onclick='checkSelectAll()' />마포구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="양천구"
							onclick='checkSelectAll()' />양천구&nbsp; 	
						<br>&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="강서구"
							onclick='checkSelectAll()' />강서구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="구로구" 
						onclick='checkSelectAll()' />구로구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="금천구"
							onclick='checkSelectAll()' />금천구
						<br>&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="영등포구"
							onclick='checkSelectAll()' />영등포구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="동작구" 
							onclick='checkSelectAll()' />동작구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="관악구"
							onclick='checkSelectAll()' />관악구&nbsp; 	
						<br>&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="서초구"
							onclick='checkSelectAll()' />서초구&nbsp; 
						<input type="checkbox" class="ch1" name="ch1" value="강남구" 
						onclick='checkSelectAll()' />강남구&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="송파구"
							onclick='checkSelectAll()' />송파구
						<br>&nbsp;
						<input type="checkbox" class="ch1" name="ch1" value="강동구"
							onclick='checkSelectAll()' />강동구
							
						</font>
					</div>
				</div></li>

			<!-- Divider -->
			<hr class="sidebar-divider">

			<!-- Heading -->
			<div class="sidebar-heading">서비스</div>

			<!-- Nav Item - Pages Collapse Menu -->
			<li class="nav-item"><a class="nav-link collapsed" href="#"
				data-toggle="collapse" data-target="#collapseTwo"
				aria-expanded="true" aria-controls="collapseTwo"> <i
					class="fas fa-fw fa-folder"></i> <span>CCTV</span>
			</a>
				<div id="collapseTwo" class="collapse" aria-labelledby="headingTwo"
					data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">설치목적구분</h6>
						
						<font size="1">
						&nbsp; <input type="checkbox" class="ch2" name="selectcctvall"
							value="" onclick="selectcctvAll(this)" />전체&nbsp; 
							
							<br>&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea1_chk" value="교통단속"
							onclick='checkcctvSelectAll()' />교통단속&nbsp;
							<input type="number" id="getcctvArea1" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea1"
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea2_chk" value="교통정보수집"
							onclick='checkcctvSelectAll()' />교통정보수집&nbsp;
							<input type="number" id="getcctvArea2" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea2" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea3_chk" value="다목적"
							onclick='checkcctvSelectAll()' />다목적&nbsp;
							<input type="number" id="getcctvArea3" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea3"
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea4_chk" value="생활방범"
							onclick='checkcctvSelectAll()' />생활방범&nbsp;
							<input type="number" id="getcctvArea4" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea4"
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea5_chk" value="시설물관리"
							onclick='checkcctvSelectAll()' />시설물관리&nbsp;
							<input type="number" id="getcctvArea5" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea5" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea6_chk" value="쓰레기단속"
							onclick='checkcctvSelectAll()' />쓰레기단속&nbsp;
							<input type="number" id="getcctvArea6" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea6" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea7_chk" value="어린이보호"
							onclick='checkcctvSelectAll()' />어린이보호&nbsp;
							<input type="number" id="getcctvArea7" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea7" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea8_chk" value="재난재해"
							onclick='checkcctvSelectAll()' />재난재해&nbsp;
							<input type="number" id="getcctvArea8" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea8" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea9_chk" value="차량방범"
							onclick='checkcctvSelectAll()' />차량방범&nbsp;
							<input type="number" id="getcctvArea9" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea9" 
									onclick="safeArea(this.id)" value="off"/><br/>
							&nbsp;
							<input type="checkbox" class="ch2" name="ch2" id="cctvArea10_chk" value="기타"
							onclick='checkcctvSelectAll()' />기타&nbsp;
							<input type="number" id="getcctvArea10" placeholder="단위:m" min="1" max="1000" />
							<input type="button" class="showArea" id="cctvArea10"
									onclick="safeArea(this.id)" value="off"/><br/>
			
						</font>
					</div>
				</div></li>
			<li class="nav-item"><a class="nav-link collapsed" href="#"
				data-toggle="collapse" data-target="#collapseTre"
				aria-expanded="true" aria-controls="collapseTre"> <i
					class="fas fa-fw fa-folder"></i> <span>방범등</span>
			</a>
				<div id="collapseTre" class="collapse" aria-labelledby="headingTwo"
					data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Custom Components:</h6>
						&nbsp;&nbsp;&nbsp;
						<input type="checkbox" class="ch3" name="ch3" value="" id="lampArea_chk"/>방범등&nbsp;
						<input type="number" id="getlampArea" placeholder="단위:m" min="1" max="1000" />
						<input type="button"  class="showArea" id="lampArea"
								onclick="safeArea(this.id)" value="off" /><br/>

					</div>
				</div></li>

			<li class="nav-item"><a class="nav-link collapsed" href="#"
				data-toggle="collapse" data-target="#collapseFour"
				aria-expanded="true" aria-controls="collapseFour"> <i
					class="fas fa-fw fa-folder"></i> <span>PoliceOffice</span></a>
				<div id="collapseFour" class="collapse" aria-labelledby="headingTwo"
					data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">Custom Components:</h6>

						&nbsp;&nbsp; 
						<input type="checkbox" class="ch4" name="selectpoliceall" value="" 
						onclick="selectpoliceAll(this)"/>전체&nbsp;

						<br>&nbsp;&nbsp; 
						<input type="checkbox" class="ch4" name="ch4" id="officeArea1_chk"
							value="경찰서" onclick="checkpoliceSelectAll()"/>경찰서
						<input type="number" id="getofficeArea1" placeholder="단위:m"
							min="1" max="1000" />
						<input type="button"  class="showArea" id="officeArea1" 
								onclick="safeArea(this.id)" value="off" />

						<br>&nbsp;&nbsp; 
						<input type="checkbox" class="ch4" name="ch4" id="officeArea2_chk"
							value="지구대" onclick="checkpoliceSelectAll()" />지구대
						<input type="number" id="getofficeArea2" placeholder="단위:m"
							min="1" max="1000" />
						<input type="button"  class="showArea" id="officeArea2"
								onclick="safeArea(this.id)" value="off" />

						<br>&nbsp;&nbsp; 
						<input type="checkbox" class="ch4" name="ch4" id="officeArea3_chk"
							value="파출소" onclick="checkpoliceSelectAll()" />파출소
						<input type="number" id="getofficeArea3" placeholder="단위:m"
							min="1" max="1000" />
						<input type="button"  class="showArea" id="officeArea3"
								onclick="safeArea(this.id)" value="off" />
						

					</div>
				</div></li>


			<li class="nav-item"><a class="nav-link collapsed" href="#"
				data-toggle="collapse" data-target="#collapseFive"
				aria-expanded="true" aria-controls="collapseFive"> <i
					class="fas fa-fw fa-folder"></i> <span>맵 데이터</span></a>
				<div id="collapseFive" class="collapse" aria-labelledby="headingTwo"
					data-parent="#accordionSidebar">
					<div class="bg-white py-2 collapse-inner rounded">
						<h6 class="collapse-header">서울특별시 맵 데이터 &nbsp;</h6>
						&nbsp;&nbsp;&nbsp; 
						<input type="radio" class="ch5" name="ch5" value="crimerate" />범죄율&nbsp;
						<input type="radio" class="ch5" name="ch5" value="night" />밤거리 안전도&nbsp;
						<br>&nbsp;&nbsp;&nbsp; 
						<input type="radio" class="ch5" name="ch5" value="ingu" />인구밀도&nbsp;
						<input type="radio" class="ch5" name="ch5" value="foreigner" />외국인 거주&nbsp;
						<br>&nbsp;&nbsp;&nbsp; 
						<input type="radio" class="ch5" name="ch5" value="null" />없음&nbsp;

					</div>
				</div></li>


			<!-- Divider -->
			<hr class="sidebar-divider d-none d-md-block">

			<!-- Sidebar Toggler (Sidebar) -->
			<div class="text-center d-none d-md-inline">
				<button class="rounded-circle border-0" id="sidebarToggle"></button>
			</div>



		</ul>
		<!-- End of Sidebar -->

		<!-- Content Wrapper -->
		<div id="content-wrapper" class="d-flex flex-column">

			<!-- Main Content -->
			<div id="content">

				<!-- Topbar -->
				<nav
					class="navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow">

					<!-- Sidebar Toggle (Topbar) -->
					<button id="sidebarToggleTop"
						class="btn btn-link d-md-none rounded-circle mr-3">
						<i class="fa fa-bars"></i>
					</button>

					<!-- Topbar Search -->
					<form onsubmit="return false;"	
						class="d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search">
						<div class="input-group">
							<select id="s_cat" class="small">
								<!-- Layer.js 에 맞춰서 option value 수정하기 -->
								<option value="cctv">CCTV</option>
								<option value="crmprvlmp">방범등</option>
								<option value="police">경찰서</option>
							</select> 
							<input type="text" class="form-control bg-light border-0 small"
								placeholder="Search for..." id="getsearchKeyword" onkeydown="focusEnter(this.id)"
								aria-label="Search" aria-describedby="basic-addon2">
							<div class="input-group-append">
								<button class="btn btn-primary" type="button" id="searchKeyword"
									onclick="showSearchLayer()">
									<i class="fas fa-search fa-sm"></i>
								</button>

							</div>
							
						</div>
					</form>

					<!-- Topbar Navbar -->
					<ul class="navbar-nav ml-auto">

						<!-- Nav Item - Search Dropdown (Visible Only XS) -->
						<li class="nav-item dropdown no-arrow d-sm-none"><a
							class="nav-link dropdown-toggle" href="#" id="searchDropdown"
							role="button" data-toggle="dropdown" aria-haspopup="true"
							aria-expanded="false"> <i class="fas fa-search fa-fw"></i>
						</a> <!-- Dropdown - Messages -->
							<div
								class="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
								aria-labelledby="searchDropdown">
								<form class="form-inline mr-auto w-100 navbar-search" onsubmit="return false;">
									<div class="input-group">
										<select id="s_cat2">
											<option value="cctv">CCTV</option>
											<option value="light">Light</option>
											<option value="office">Office</option>
										</select> <input type="text"
											class="form-control bg-light border-0 small"
											placeholder="Search for...." aria-label="Search"
											id="searchKeyword2" aria-describedby="basic-addon2">
										<div class="input-group-append">
											<button class="btn btn-primary" type="button" onclick="showSearchLayer()">
												<i class="fas fa-search fa-sm"></i>
											</button>
										</div>
									</div>
								</form>
							</div></li>

					</ul>

				</nav>
				<!-- End of Topbar -->




				<!-- Begin Page Content -->
				<div class="container-fluid">
					<div id="map" class="map"></div>
					<ul id="menu">
					    <li data-type="2d">2D</li>
					    <li data-type="3d">3D</li>
					</ul>
					<div id="popup" class="ol-popup">
						<a href="#" id="popup-closer" class="ol-popup-closer"></a>
						<div id="popup-content"></div>
					</div>

					<div id="info"></div>

				</div>
				<!-- /.container-fluid -->




			</div>
			<!-- End of Main Content -->

			<!-- Footer -->
			<footer class="sticky-footer bg-white">
				<div class="container my-auto">
					<div class="copyright text-center my-auto">
						<span>Copyright &copy; Your Website 2021</span>
					</div>
				</div>
			</footer>
			<!-- End of Footer -->

		</div>
		<!-- End of Content Wrapper -->

	</div>
	<!-- End of Page Wrapper -->

	<!-- Scroll to Top Button-->
	<a class="scroll-to-top rounded" href="#page-top"> <i
		class="fas fa-angle-up"></i>
	</a>

	<!-- Logout Modal-->
	<div class="modal fade" id="logoutModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
					<button class="close" type="button" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">×</span>
					</button>
				</div>
				<div class="modal-body">Select "Logout" below if you are ready
					to end your current session.</div>
				<div class="modal-footer">
					<button class="btn btn-secondary" type="button"
						data-dismiss="modal">Cancel</button>
					<a class="btn btn-primary" href="login.html">Logout</a>
				</div>
			</div>
		</div>
	</div>

	<!-- OpenLayers Custom -->
	<!--<script src="js/wms.js"></script>-->
	<script src="resources/js/map.js"></script>
	<script src="resources/js/main.js"></script>
	<script src="resources/js/safearea.js"></script>
	<script src="resources/js/draw.js"></script>
	<script src="resources/js/search.js"></script>
	<script src="resources/js/checkbox.js"></script>
	<script src="resources/js/servicemakesource.js"></script>
	<script src="resources/js/layer.js"></script>
	<script src="resources/js/util.js"></script>

	<!-- Bootstrap core JavaScript-->
	<script src="resources/vendor/jquery/jquery.min.js"></script>
	<script src="resources/vendor/bootstrap/js/bootstrap.bundle.min.js"></script>

	<!-- Core plugin JavaScript-->
	<script src="resources/vendor/jquery-easing/jquery.easing.min.js"></script>

	<!-- Custom scripts for all pages-->
	<script src="resources/js/sb-admin-2.min.js"></script>

	<!-- Page level plugins 
<script src="vendor/chart.js/Chart.min.js"></script>
-->
	<!-- Page level custom scripts 
<script src="js/demo/chart-area-demo.js"></script>
<script src="js/demo/chart-pie-demo.js"></script>

-->
</body>

</html>