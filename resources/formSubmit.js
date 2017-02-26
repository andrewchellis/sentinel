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
	$.post("/api/graphCalc", data)
	.done((response)=> {
		document.getElementById('results').innerHTML=JSON.stringify(response);
		graphing();
	});
}

function graphing() {

	var outData = {
		"APPL": {
			"total": 15900,
			"return": 159.00,
			"stock": 12345,
			"leftover": 121,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 200], ["2015-01-02", 201], ["2015-01-02", 202], ["2015-01-03", 203], ["2015-01-04", 204], ["2015-01-05", 205], ["2015-01-06", 206], ["2015-01-07", 207], ["2015-01-08", 208], ["2015-01-09", 209], ["2015-01-10", 210], ["2015-01-11", 211], ["2015-01-12", 212], ["2015-01-13", 213], ["2015-01-14", 214], ["2015-01-15", 215]]
		},

		"GOOG": {
			"total": 10000,
			"return": 100.00,
			"stock": 1250,
			"leftover": 11,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 100], ["2015-01-02", 101], ["2015-01-02", 102], ["2015-01-03", 103], ["2015-01-04", 104], ["2015-01-05", 105], ["2015-01-06", 106], ["2015-01-07", 107], ["2015-01-08", 108], ["2015-01-09", 109], ["2015-01-10", 110], ["2015-01-11", 111], ["2015-01-12", 112], ["2015-01-13", 113], ["2015-01-14", 114], ["2015-01-15", 115]]
		},
		"IBM": {
			"total": 20120,
			"return": 201.20,
			"stock": 90,
			"leftover": 12,
			"start": "2011-01-31",
			"end": "2017-01-25",
			"data": [["2015-01-01", 300], ["2015-01-02", 301], ["2015-01-02", 302], ["2015-01-03", 303], ["2015-01-04", 304], ["2015-01-05", 305], ["2015-01-06", 306], ["2015-01-07", 307], ["2015-01-08", 308], ["2015-01-09", 309], ["2015-01-10", 310], ["2015-01-11", 311], ["2015-01-12", 312], ["2015-01-13", 313], ["2015-01-14", 314], ["2015-01-15", 315]]
		},
	};

  TESTER = document.getElementById('tester');

  var xData = [
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025],
  [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025]
];

var yData = [
  [74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69, 74, 82, 80, 74, 73, 72, 74, 70, 70, 66, 66, 69],
  [45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28, 45, 42, 50, 46, 36, 36, 34, 35, 32, 31, 31, 28],
  [13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50, 13, 14, 20, 24, 20, 24, 24, 40, 35, 41, 43, 50],
  [18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23, 18, 21, 18, 21, 16, 14, 13, 18, 17, 16, 19, 23]
];

var colors = ['rgba(67,67,67,1)', 'rgba(115,115,115,1)', 'rgba(77,182,172, 1)',
  'rgba(189,189,189,1)'
];

var lineSize = [2, 2, 4, 2];

var labels = ['GOOG', 'APPL', 'IBM', 'FB'];

var data = [];

for ( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    x: xData[i],
    y: yData[i],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: colors[i],
      width: lineSize[i]
    }
  };
  var result2 = {
    x: [xData[i][0], xData[i][11]],
    y: [yData[i][0], yData[i][11]],
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: colors[i],
      size: 12
    }
  };
  data.push(result, result2);
}

var layout = {
  showlegend: false,
  height: 600,
  width: 600,
  xaxis: {
    showline: true,
    showgrid: false,
    showticklabels: false,
    linecolor: 'rgb(204,204,204)',
    linewidth: 2,
    autotick: false,
    ticks: 'outside',
    tickcolor: 'rgb(204,204,204)',
    tickwidth: 2,
    ticklen: 5,
    tickfont: {
      family: 'Arial',
      size: 12,
      color: 'rgb(82, 82, 82)'
    }
  },
  yaxis: {
    showgrid: false,
    zeroline: false,
    showline: false,
    showticklabels: false
  },
  autosize: false,
  margin: {
    autoexpand: false,
    l: 100,
    r: 20,
    t: 100
  },
  annotations: [
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.0,
      y: 1.05,
      xanchor: 'left',
      yanchor: 'bottom',
      text: '',
      font:{
        family: 'Arial',
        size: 30,
        color: 'rgb(37,37,37)'
      },
      showarrow: false
    },
    {
      xref: 'paper',
      yref: 'paper',
      x: 0.5,
      y: -0.1,
      xanchor: 'center',
      yanchor: 'top',
      text: 'Sentinel',
      showarrow: false,
      font: {
        family: 'Arial',
        size: 12,
        color: 'rgb(150,150,150)'
      }
    }
  ]
};

for( var i = 0 ; i < xData.length ; i++ ) {
  var result = {
    xref: 'paper',
    x: 0.05,
    y: yData[i][0],
    xanchor: 'right',
    yanchor: 'middle',
    text: labels[i] + ' $' + yData[i][0],
    showarrow: false,
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    }
  };
  var result2 = {
    xref: 'paper',
    x: 0.95,
    y: yData[i][11],
    xanchor: 'left',
    yanchor: 'middle',
    text: '$' + yData[i][11],
    font: {
      family: 'Arial',
      size: 16,
      color: 'black'
    },
    showarrow: false
  };

  layout.annotations.push(result, result2);
}

Plotly.newPlot(TESTER, data, layout);
}
