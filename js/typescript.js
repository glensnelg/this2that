
class typescript {
	static from(codeArray) {

	}

	static to(data) {
		var newClass = "";
		newClass += "export class " + data.name + " {\n";
		for(var i = 0; i < data.properties.length; i++) {
			newClass += "\t" + data.properties[i].access + " " + data.properties[i].name + ": " + data.properties[i].type + ";\n";
		}
		newClass += "}";


		return newClass;
	}
}
