function getDate(start) {
	var parts = start.split(" ");
    
    if (parts[0].length < 2) {
    	parts[0] = "0".concat(parts[0]);
    }
    
    switch (parts[1]) {
    	case "January,":
        	parts[2] = "01-";
        	break;
    	case "February,":
        	parts[1] = "02-";
        	break;
        case "March,":
        	parts[1] = "03-";
        	break;
        case "April,":
        	parts[1] = "04-";
        	break;
        case "May,":
        	parts[1] = "05-";
        	break;
        case "June,":
        	parts[1] = "06-";
        	break;
        case "July,":
        	parts[1] = "07-";
        	break;
        case "August,":
        	parts[1] = "08-";
        	break;
        case "September,":
        	parts[1] = "09-";
        	break;
        case "October,":
        	parts[1] = "10-";
        	break;
        case "November,":
        	parts[1] = "11-";
        	break;
        case "December,":
        	parts[1] = "12-";
        	break;
        default:
        	break;
    }
    
    var final = ((parts[2].concat("-")).concat(parts[1])).concat(parts[0]);
    return final;
}

function submission() {
	var stringInvestment = document.getElementById("investment").value;
	if (isNaN(stringInvestment)) {
		document.getElementById("results").innerHTML = "Investment amount was not valid";
		return;
	}
	var investment = parseInt(stringInvestment);
	var start = getDate(document.getElementById("start").value);

	var end = getDate(document.getElementById("end").value);

	var dividends = document.querySelector("#dividends").checked;
	var companies = [];
	var fields = document.getElementsByName("comp[]");
	for (var i = 0; i < fields.length; i++) {
		companies.push(fields[i].value);
	}

	//document.getElementById("results").innerHTML = companies.join(", ");
	var data = {
		"amount": investment,
		"start": start,
		"end": end,
		"reinvest": dividends,
		"companies": companies
	};
	// $.post("/api/graphCalc", data)
	// .done((response)=> {
	// 	document.getElementById('results').innerHTML=JSON.stringify(response);
	// 	graphing(response);
	// });


	graphing(data);
}

function graphing(response) {

	var outData = {
		"APPL": {
			"total": 15900,
			"return": 159.00,
			"stock": 12345,
			"leftover": 121,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 200], ["2015-01-02", 201], ["2015-01-02", 202], ["2015-01-03", 203], ["2015-01-04", 204], ["2015-01-05", 205], ["2015-01-06", 206], ["2015-01-07", 207], ["2015-01-08", 208], ["2015-01-09", 209], ["2015-01-10", 210], ["2015-01-11", 211], ["2015-01-12", 212], ["2015-01-13", 213]]
		},

		"GOOG": {
			"total": 10000,
			"return": 100.00,
			"stock": 1250,
			"leftover": 11,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 100], ["2015-01-02", 101], ["2015-01-02", 102], ["2015-01-03", 103], ["2015-01-04", 104], ["2015-01-05", 105], ["2015-01-06", 106], ["2015-01-07", 107], ["2015-01-08", 108], ["2015-01-09", 109], ["2015-01-10", 110], ["2015-01-11", 111], ["2015-01-12", 112], ["2015-01-13", 113]]
		},
		"IBM": {
			"total": 20120,
			"return": 201.20,
			"stock": 90,
			"leftover": 12,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 300], ["2015-01-02", 301], ["2015-01-02", 302], ["2015-01-03", 303], ["2015-01-04", 304], ["2015-01-05", 305], ["2015-01-06", 306], ["2015-01-07", 307], ["2015-01-08", 308], ["2015-01-09", 309], ["2015-01-10", 310], ["2015-01-11", 311], ["2015-01-12", 312], ["2015-01-13", 313]]
		},
	};

  TESTER = document.getElementById('tester');

  	
	var yData = [];
	var xData = [];
	var subListSizes = [];
	var lineSize = [];
	var labels = [];
	var i = 0;
	Object.keys(outData).forEach((element)=> {
		lineSize.push(2);
		labels.push(element);
		var entryy = [];
		var entryx = [];
		let evaluate = outData[element];
		subListSizes.push(evaluate.data.length);
		for (var j = 0; j < evaluate.data.length; j++) {
			entryy.push(evaluate.data[j][1]);
			entryx.push(evaluate.data[j][0]);
		}
		yData.push(entryy);
		xData.push(entryx);
		i++;
	});
	//document.getElementById("results").innerHTML = subListSizes[0];
	var finalData = [];
	for (var i = 0; i < labels.length; i++) {
		var trace = {
			x: xData[i],
			y: yData[i],
			mode: 'lines',
			name: labels[i],
			connectgaps: true
		};
		finalData.push(trace);
	}

	var layout = {
	  title: 'Connect the Gaps Between Data',
	  showlegend: true,
	  filename: "legend-labels"
	};

	Plotly.newPlot(TESTER, finalData, layout);

}
