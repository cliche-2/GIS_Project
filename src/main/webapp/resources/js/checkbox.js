
// 체크박스 전체선택 해제시 전체선택해제
// 지역필터링
function checkSelectAll()  {
// 전체 체크박스
const checkboxes 
  = document.querySelectorAll('input[name="ch1"]');
// 선택된 체크박스
const checked 
  = document.querySelectorAll('input[name="ch1"]:checked');
// select all 체크박스
const selectAll 
  = document.querySelector('input[name="selectall"]');

if(checkboxes.length === checked.length)  {
  selectAll.checked = true;
}else {
  selectAll.checked = false;
}

}

// 체크박스 전체선택 해제시 전체선택해제
// 서비스 cctv
function checkcctvSelectAll()  {
// 전체 체크박스
const checkboxes 
  = document.querySelectorAll('input[name="ch2"]');
// 선택된 체크박스
const checked 
  = document.querySelectorAll('input[name="ch2"]:checked');
// select all 체크박스
const selectcctvAll 
  = document.querySelector('input[name="selectcctvall"]');

if(checkboxes.length === checked.length)  {
  selectcctvAll.checked = true;
}else {
  selectcctvAll.checked = false;
}

}


//체크박스 전체선택 해제시 전체선택해제
//서비스 police
function checkpoliceSelectAll()  {
//전체 체크박스
const checkboxes 
= document.querySelectorAll('input[name="ch4"]');
//선택된 체크박스
const checked 
= document.querySelectorAll('input[name="ch4"]:checked');
//select all 체크박스
const selectpoliceAll 
= document.querySelector('input[name="selectpoliceall"]');

if(checkboxes.length === checked.length)  {
selectpoliceAll.checked = true;
}else {
selectpoliceAll.checked = false;
}

}

// 체크박스 전체선택
// 전체 선택 클릭시 해당하는 클래스 전체 선택

// 지역구 필터
function selectAll(selectAll)  {
const checkboxes 
   = document.getElementsByName('ch1');

checkboxes.forEach((checkbox) => {
  checkbox.checked = selectAll.checked
})
}

// cctv 설치목적
function selectcctvAll(selectcctvAll)  {
const checkboxes 
     = document.getElementsByName('ch2');

checkboxes.forEach((checkbox) => {
  checkbox.checked = selectcctvAll.checked;
})
}

// police 설치목적
function selectpoliceAll(selectpoliceAll)  {
const checkboxes 
     = document.getElementsByName('ch4');

checkboxes.forEach((checkbox) => {
  checkbox.checked = selectpoliceAll.checked;
})
}