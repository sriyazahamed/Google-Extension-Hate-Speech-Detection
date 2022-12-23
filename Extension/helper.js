function hate_speech(){	

let area = document.getElementById("bfTqV")
if (area == null) {
	console.log("not present");
	setTimeout(hate_speech, 5000);
	return;
}
function httpGet(theUrl) {
	let xmlHttpReq = new XMLHttpRequest();
	xmlHttpReq.open("GET", theUrl, false); 
	xmlHttpReq.send(null);
	console.log(xmlHttpReq.responseText)
	return xmlHttpReq.responseText;
  }   
console.log("added");

const igoreAbsurdIcon = document.createElement("img"); // creating icon for ignoring absurd
document.getElementsByClassName("bXH0G")[0].append(igoreAbsurdIcon);
igoreAbsurdIcon.setAttribute("src","https://icons.veryicon.com/png/o/miscellaneous/safe-and-rational-drug-use-operation-icon/ignore-1.png");
igoreAbsurdIcon.style.height="20px";
igoreAbsurdIcon.style.visibility="hidden";


const deleteChatsIcon = document.createElement("img"); // creating icon for deleting chats
document.getElementsByClassName("BReBS IZY82c")[0].append(deleteChatsIcon);
deleteChatsIcon.setAttribute("src","https://cdn-icons-png.flaticon.com/512/3814/3814912.png");
deleteChatsIcon.style.height="20px";
deleteChatsIcon.style.left="10px";


const chatWindow=document.getElementsByClassName("z38b6")[0];


sendBtn=document.getElementsByClassName("VfPpkd-Bz112c-LgbsSe yHy1rc eT1oJ QDwDD tWDL4c  Cs0vCd")[0];
enterToSend=document.getElementsByClassName("bXH0G")[0];

igoreAbsurdIcon.onclick = function(){
	igoreAbsurdIcon.style.visibility="hidden";
	sendBtn.removeAttribute("disabled");
	enterToSend.removeAttribute("jscontroller");
};

deleteChatsIcon.onclick = function(){
	while(chatWindow.hasChildNodes()){
		chatWindow.removeChild(chatWindow.firstChild);
	}
};

area.addEventListener('input', function(event) {
    
console.log(event)
let inp = area.value;

let isAbsurd = "";
isAbsurd = httpGet(`http://127.0.0.1:5000/isAbsurd/${inp}`);

if(isAbsurd=="1"){
	igoreAbsurdIcon.style.visibility="visible";
	sendBtn.setAttribute("disabled","");
	enterToSend.setAttribute("jscontroller","");
	console.log("absurd");
}
else{
	igoreAbsurdIcon.style.visibility="hidden";
	sendBtn.removeAttribute("disabled");
	enterToSend.removeAttribute("jscontroller");
	
}

let len =inp.length;

if(inp[len-1]==" "){
	let out =  httpGet(`http://127.0.0.1:5000/${inp}`);
	if(out=="Offensive Language"){
		area.value = "****";
}
}



}, false);

}


hate_speech();