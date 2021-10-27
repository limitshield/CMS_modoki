
loadPage =()=>{
	$("#main").text("");
	
	/* URI hash match */
	const r = /#.+/
	const a = document.URL.match(r);
	let n = 0;
	if(a != null){
		n = parseInt(a[0].substr(1)).toString();
	}
	if(a < 0 || list.length <= a)
	{
		n = 0;
	}
	/* create sections */
	const title = $("<div></div>",{addClass:"title"});
	const author = $("<div></div>",{addClass:"author"});
	const date = $("<div></div>",{addClass:"date"});
	const tags = $("<div></div>",{addClass:"tags"});
	const content = $("<div></div>",{addClass:"content"});
	/* content add to sections */
	title.text(list[n].title);
	document.title = list[n].title;
	author.text(list[n].author);
	date.text(list[n].date);
	
	for(let t of list[n].tags){
		const tag = $("<div></div>",{addClass:"tag"});
		const a = $("<a></a>",{href:"archive.html#" + t});
		a.text(t);
		tag.append(a);
		tags.append(tag);
	}
	
	for(let r of list[n].contents){
		const row = createRow(r);
		content.append(row);
	}
	/* append sections */
	$("#main").append(title, author, date, tags, content);
	
	return $("#main");
}

createRow=(str)=>{
	
	let r = $("<p></p>",{addClass:"row"});
	
	while(str.match(reg_a)){
		const a = $("<a></a>",{ href:str.match(reg_a_val)[0] });
		a.text(str.match(reg_a_str)[0]);
		str = str.replace(reg_a, a[0].outerHTML);
	}
	while(str.match(reg_s)){
		const a = $("<span></span>",{ addClass:str.match(reg_s_val) });
		a.text(str.match(reg_s_str)[0]);
		str = str.replace(reg_s, a[0].outerHTML);
	}
	r.html(str);
	
	return r;
}
const reg_a = /@\[.*?\].*?@/;
const reg_a_val = /(?<=\[).*?(?=\])/
const reg_a_str = /(?<=(@\[.*\])).*?(?=@)/
const reg_s = /%\[.*?\].*?%/
const reg_s_val = /(?<=\[).*?(?=\])/
const reg_s_str = /(?<=(%\[.*\])).*?(?=%)/

/* main */
let list = [];
$.ajax({url:"./data/list.json",type:"json"}).then(e=>{
	list = JSON.parse(e);
	$(document).ready(loadPage);
	onhashchange = loadPage;
});