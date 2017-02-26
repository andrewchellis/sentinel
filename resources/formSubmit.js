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
	var myJSON = JSON.stringify(data);
	document.getElementById("results").innerHTML = myJSON;
}
