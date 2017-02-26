module.exports.startDate = (available, start) => {
	let availableArr = available.split('-');
	let startArr = start.split('-');
	let x,y;
	for(let i =0;i<3;i++){
		if((x = parseInt(availableArr[i],10))<(y=parseInt(startArr[i],10))){
			return start;
		} else if(x===y){
			continue;
		}
		else{
			return available;
		}
	}
}

