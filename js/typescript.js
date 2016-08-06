
class typescript {
	static from(array) {
		var thing = {};
		for (var i = 0; i < codeArray.length; i++){
			if(codeArray[i].indexOf(" class ") != -1)
			{
				var words = codeArray.split(" ");
				var thing = {
					access: words[0],
					name: words[2],
					properties: []
				};
			}
			else if(codeArray[i].length < 3) {
				console.info("We do nothing ...")
			}
			else {
				var words = codeArray.split(" ");

				thing.properties.push({
					access: words[0],
					type: words[1],
					name: words[2],
				});
			}

		}
		console.warn("Done!", thing);
	}

	static to(values) {

	}
}
