
class csharp {
	static from(codeArray) {
		var classes = [];
		var newClass = new BaseClass();

		for (var i = 0; i < codeArray.length; i++){
			console.log('line', codeArray[i])
			if(codeArray[i].indexOf(" class ") != -1)	//new clss
			{
				newClass = new BaseClass();
				var words = codeArray[i].split(" ");
				newClass.access = words[0];
				newClass.name = words[2];
			}
			else if(codeArray[i].trim() === '}'){ //end of class
				classes.push(newClass)
			}
			else if(codeArray[i].length < 3) {
				console.info("We do nothing ...")
			}
			else {	//class property
				var prop = new ClassProperties();
				var words = codeArray[i].trim().split(" ");
				console.log(words)
				newClass.properties.push(new ClassProperties(words[0], words[1], words[2]))
			}

		}
		console.log('classes', classes)
		return classes;
	}

	static to(values) {

	}
}