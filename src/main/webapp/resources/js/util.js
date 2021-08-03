
function focusEnter(id){

	var input= document.querySelector("#"+id);
	console.log(id.slice(3));
	var btn  = document.querySelector("#"+id.slice(3));

	// Enter
	if(event.keyCode == 13){
		if(input.value===""){
			alert('입력값없음');
			input.value="";
		}else{
			btn.focus();
		}
	}
}

