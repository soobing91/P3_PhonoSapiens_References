
var sampledata = 'static/data/data.json';
var fulldata = 'static/data/dataFULL.json';
var sampleinfo = d3.select('#selDataset');
var demoinfo = d3.select('#sample-metadata');

function metadata(subject) {

    d3.json(fulldata).then((entry) => {
        console.log(entry)
        var idInput = sampleinfo.property('value');
        var filtereddata = entry.filter((row) => row.Institution === idInput);
        console.log(filtereddata)
        var part_refs=[];
        var chapter_refs=[];
        var page_refs=[];
        var keywords=[];
        var ins_name=filtereddata[0]["Institution"]
        console.log(ins_name)
        demoinfo.html('');

        Object.entries(filtereddata).forEach((item) => {
            if (part_refs.includes(item[1]["Part_Count"])){
                var skipped = "yes";
                console.log("skipped")}
            else{part_refs.push(item[1]["Part_Count"]);
                }
            if (chapter_refs.includes(item[1]["Chapter_Count"])){
                var skipped = "yes";}
            else{chapter_refs.push(item[1]["Chapter_Count"]);
                }
            if (page_refs.includes(item[1]["Page_Number"])){
                var skipped = "yes";}
            else{page_refs.push(item[1]["Page_Number"]);
                }
            if (keywords.includes(item[1]["Keyword"])){
                var skipped = "yes";}
            else{keywords.push(` ${item[1]["Keyword"]}`);
                }
            }
        )


        
        var info_p1 = demoinfo.append('p');
        info_p1.text(`Institution:`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`${ins_name}`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`Referred to in Parts:`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`${part_refs}`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`Referred to in Chapters:`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`${chapter_refs}`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`Referred to on Pages:`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`${page_refs}`); 
        var info_p1 = demoinfo.append('p');
        info_p1.text(`Key Terms:`);
        var info_p1 = demoinfo.append('p');
        info_p1.text(`${keywords}`); 
        });        
};
    



function bargraph(subject) {
    d3.json(sampledata).then((entry) => {
        var sorteddata = entry.sort((firstNum, secondNum) => secondNum.Reference_Count - firstNum.Reference_Count).slice(1,21);
        console.log(sorteddata);

        var xdata = sorteddata.map(item=>item.Institution)
        var ydata = sorteddata.map(item=>item.Reference_Count)

        var trace1 = {
            x: xdata,
            y: ydata,
            text: xdata,
            type: 'bar',
            marker: {
              color: '#C71585',
              width: 1
            },
        };

        var data = [trace1];

        var layout = {
            title: `Number of references to Top 20 Institutions`,
        };

        Plotly.newPlot('bar', data, layout);
    }); 
};



function gaugechart(subject) {
    d3.json(sampledata).then((entry) => {
        var idInput = sampleinfo.property('value');
        var filtered_metadata = entry.filter((row) => row.Institution === idInput);
        console.log(filtered_metadata);
        console.log(filtered_metadata[0]["Reference_Count"])

        var trace1 = {
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            value: filtered_metadata[0]["Reference_Count"],
            title: 'Number of References of Institution vs Mean',
            type: 'indicator',
            mode: 'gauge+number+delta',
            delta: {reference: 2, increasing: {color: 'RebeccaPurple'} },
            gauge: {
                axis: {range: [null, 25]},
                bar: {color: 'black'},
                steps: [
                    {range: [0, 5], color: 'red'},
                    {range: [5, 10], color: 'salmon'},
                    {range: [10, 15], color: 'yellowgreen'},
                    {range: [15, 20], color: 'cyan'},
                    {range: [20, 25], color: 'steelblue'},
                ]
            }
        };

        var data = [trace1];

        var layout = {width: 500, height: 500, margin: {t: 0, b: 0}};
        
        Plotly.newPlot('gauge', data, layout);
    });  
};


function optionChanged(option) {
    metadata(option);
    bargraph(option);
    gaugechart(option)
};


function init() {
    d3.json(sampledata).then((entry) => {

        var ids = entry.map(sample => sample.Institution);

        ids.forEach((id) => {
            var idNo = sampleinfo.append('option');
            idNo.text(id);
        });

        metadata(ids[0]);
        gaugechart(ids[0]);
        bargraph(ids[0]);
    });
};

init();

