// from data.js
var data;
var filter = d3.select("#filter-btn");

var reset = d3.select("#reset-btn");

var tbody = d3.select("tbody");

d3.json("static/data/dataFULL.json",function(d) {
	data = d;
	console.log(d);
	runCode(data);

});

function runCode(data){
	var tableData = data;

	renderTable(tableData);
	filter.on("click", filterTableBottun );
	reset.on("click", resetTableBottun );

}

function renderTable(referenceDatas) {
	referenceDatas.forEach(datas => {
		var row = tbody.append("tr");
		Object.entries(datas).forEach(d =>{
		var key = d[0];
		var value = d[1];
		var cell = row.append("td");
		if (key != "URL") {
			cell.text(value);
		}
		else {
		var URL = d[1]
		console.log(URL);
		// console.log(key);
		// console.log(value)
		//cell.append("a").attr("xlink:href", URL).text(URL);
		cell.html("<a href=" + URL + " target='_blank'" +">" + URL + "</a>");

		}

	});
	
	});	
}

function filterTableBottun() {
	
	d3.event.preventDefault();
	
	var searchPart = d3.select("#Part_Count").property("value");
	var searchChapter = d3.select("#Chapter_Count").property("value");
	var searchPage = d3.select("#Page_Number").property("value");
	var searchInstitution = d3.select("#Institution").property("value");
	var searchLanguage = d3.select("#Language").property("value");

	var filteredDatas = data;

	if (searchPart != ""){
		filteredDatas = filteredDatas.filter(filterdata => filterdata.Part_Count === searchPart);
	}
	if (searchChapter !=""){
		filteredDatas = filteredDatas.filter(filterdata => filterdata.Chapter_Count === searchChapter);
	}
	if (searchPage !=""){
		filteredDatas = filteredDatas.filter(filterdata => filterdata.Page_Number === searchPage);
		}
	if (searchInstitution !=""){
		filteredDatas = filteredDatas.filter(filterdata => filterdata.Institution.toLowerCase() === searchInstitution.toLowerCase());
		}
	if (searchLanguage !=""){
		filteredDatas = filteredDatas.filter(filterdata => filterdata.Language.toLowerCase() === searchLanguage.toLowerCase());
		}

	tbody.html('');
	renderTable(filteredDatas);
}

function resetTableBottun() {
	tbody.html('');
	renderTable(tableData);
}

