

function changeColor() {
	console.log(document.getElementById("title").value);
	var budget = location.href.substring(location.href.indexOf("=")+1);
    var a = document.getElementById("transactions");
    var b = a.getElementsByTagName("ul");
    for (i = 0; i < b.length; ++i) {
    	if (parseFloat(b[i].innerHTML) > budget) {
        	b[i].innerHTML = "OVER";
        }
    }
}


