
class csharp {
	static from(codeArray) {
		var classes = [];
		var newClass = new BaseClass();

		for (var i = 0; i < codeArray.length; i++){
			console.log('line', codeArray[i])
			var currentLine = codeArray[i].trim();
			if(currentLine.indexOf(" class ") != -1)	//new clss
			{
				newClass = new BaseClass();
				var words = currentLine.split(" ");
				newClass.access = words[0];
				newClass.name = words[2];
			}
			else if(currentLine === '}'){ //end of class
				classes.push(newClass)
			}
			else if(currentLine.length < 3) {
				console.info("We do nothing ...")
			}
			else {	//class property
				var prop = new ClassProperties();
				var words = currentLine.split(" ");
				console.log(words)
				newClass.properties.push(new ClassProperties(words[0], words[2], words[1]))
			}

		}
		console.log('classes', classes)
		return classes;
	}

	static to(values) {

	}
}