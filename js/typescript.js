function getType(type) {
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

	}

	static to(classes) {
		var newClass = "";

		for(var c = 0; c< classes.length; c++){
			var data = classes[c];
			newClass += "export class " + data.name + " {\n";
			for(var i = 0; i < data.properties.length; i++) {
				newClass += "\t" + data.properties[i].access + " " + deCapitalizeFirstLetter(data.properties[i].name) + ": " + getType(data.properties[i].type) + ";\n";
			}
			newClass += "} \n";


		}

		return newClass;
	}
}
