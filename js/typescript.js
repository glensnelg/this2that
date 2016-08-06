
class typescript {
	static from(codeArray) {

	}

	static to(classes) {
		var newClass = "";

		for(var c = 0; c< classes.length; c++){
			var data = classes[c];
			newClass += "export class " + data.name + " {\n";
			for(var i = 0; i < data.properties.length; i++) {
				newClass += "\t" + data.properties[i].access + " " + data.properties[i].name + ": " + data.properties[i].type + ";\n";
			}
			newClass += "} \n";


		}

		return newClass;
	}
}
