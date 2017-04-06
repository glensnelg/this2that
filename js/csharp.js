function getSharperType(type) {
	var isGeneric = false;
	var typeMap = {};
	var insideBrackets = "";
	typeMap['number'] = "double";
	typeMap['string'] = "string";
	typeMap['object'] = "object";
	typeMap['any'] = "object";

	if(type.indexOf("<") != -1) {
		var regExp = /<(.*?)>/;
		insideBrackets = regExp.exec(type);

		isGeneric = true;
	}

	var returnVal = typeMap[type];
	if(!returnVal)
	{
		return isGeneric ? insideBrackets[1] + "[]" : type;
	}
	else
	{
		return isGeneric ? insideBrackets[1] + "[]" : returnVal;
	}
}

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
				var words = currentLine.split(/[ ,]+/);
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
				var words = currentLine.split(/[ ,]+/);
				console.log(words)
				newClass.properties.push(new ClassProperties(words[0], words[2], words[1]))
			}

		}
		console.log('classes', classes)
		return classes;
	}

	static to(classes, settings) {
		if(!settings){
			settings = new ParseSettings()
		}
		console.log('settings', settings)
		var newClass = "";
		
		for(var c = 0; c< classes.length; c++){
			var data = classes[c];
			newClass += "public class " + data.name + " {\n";
			for(var i = 0; i < data.properties.length; i++) {
				newClass += "\t" 
					+ data.properties[i].access + " " + 
					getSharperType(data.properties[i].type) + " " +
					 (settings.firstLetterLower ? deCapitalizeFirstLetter(data.properties[i].name) : data.properties[i].name) +
					 (settings.generateCSharpGetSet ? " { get; set; }" : "") +
					 ";\n";
			}
			newClass += "} \n";
		}

		return newClass;
	}
}