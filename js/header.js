/* main */
$(document).ready(()=>{
	const h = $("<h1></h1>");
	const a = $("<a></a>",{href:"archive.html"});
	a.text("header");
	h.append(a);
	$("#header").append(h);
	$("#header").append($("<hr>"));
});