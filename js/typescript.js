function getTypescriptType(type) {
	var isGeneric = false;
	var typeMap = {};
	var insideBrackets = "";
	typeMap['int'] = "number";
	typeMap['decimal'] = "number";
	typeMap['float'] = "number";
	typeMap['double'] = "number";
	typeMap['bigint'] = "number";
	typeMap['long'] = "number";
	typeMap['short'] = "number";
	typeMap['uint'] = "number";
	typeMap['ushort'] = "number";
	typeMap['bool'] = "boolean";
	typeMap['char'] = "string";
	typeMap['string'] = "string";
	typeMap['String'] = "string";
	typeMap['DateTime'] = "string";
	typeMap['object'] = "any";

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

function deCapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

class typescript {


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
				newClass.properties.push(new ClassProperties(words[0], words[1].slice(0,-1), words[2].slice(0,-1)))
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
			newClass += "export class " + data.name + " {\n";
			for(var i = 0; i < data.properties.length; i++) {
				newClass += "\t" + data.properties[i].access + " " + (settings.firstLetterLower ? deCapitalizeFirstLetter(data.properties[i].name) : data.properties[i].name) + ": " + getTypescriptType(data.properties[i].type) + ";\n";
			}
			newClass += "} \n";


		}

		return newClass;
	}
}
