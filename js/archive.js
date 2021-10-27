
loadPage =()=>{
	$("#main").text("");
	/* URI hash match */
	const r = /#.+/
	const a = document.URL.match(r);
	let st = "";
	if(a != null){
		st = a[0].substr(1);
	}
	let index = 0;
	for(var e of list){
		if( st != "" && e.tags.indexOf(st) == -1){
			index++;
			continue;
		}
		/* create sections */
		const page = $("<div></div>",{addClass:"page"});
		const title = $("<div></div>",{addClass:"title"});
		const author = $("<div></div>",{addClass:"author"});
		const date = $("<div></div>",{addClass:"date"});
		const tags = $("<div></div>",{addClass:"tags"});
		const content = $("<div></div>",{addClass:"content"});
		/* content add to sections */
		const titleLink = $("<a></a>",{href:"article.html#"+index})
		titleLink.text(e.title);
		title.append(titleLink);
		author.text(e.author);
		date.text(e.date);
		
		for(let t of e.tags){
			const tag = $("<div></div>",{addClass:"tag"});
			const a = $("<a></a>",{href:"archive.html#" + t});
			a.text(t);
			tag.append(a);
			tags.append(tag);
		}
		var i=0;
		for(let r of e.contents){
			if(i == 3){
				content.append($("<p></p>",{addClass:"more"}).append($("<a>more...</a>").attr("href","article.html#"+index)));
				break;
			}
			const row = createRow(r);
			content.append(row);
			i++;
		}
		page.append(title, author, date, tags, content);
		$("#main").append(page);
		$("#main").append($("<hr>"));
		
		index++;
	}
	
	
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
