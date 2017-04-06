var codeFrom = document.getElementById("codeFrom");
var codeTo = document.getElementById("codeTo");

codeFrom.innerText = `public class Movie 
{
    public int ID { get; set; }
    public List<string> Title { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; }
    public decimal Price { get; set; }
    public List<Actor> Actors { get; set; }
}

public class Actor {
	public string Name { get; set; }
	public int Age { get; set; }
}
`;

document.getElementById('generate').addEventListener('click', function() {
	//Get settings
	var settings = getSettings();
	if(!settings){
		return;
	}
	//parse from
	var fromLang = getLanguageParser(settings.fromLanguage);
	var codeArray = codeFrom.innerText.split('\n');
	var thing = fromLang.from(codeArray);
		console.warn("Done!", thing);

	//parse to
	var toLang = getLanguageParser(settings.toLanguage);
	var newClass = toLang.to(thing, settings);
		console.warn("Done!", newClass);

	codeTo.innerText = newClass;
	hljs.highlightBlock(codeTo);
	console.info(codeTo.value);
});


function getSettings(){
	var settings = new ParseSettings()
	settings.firstLetterLower = document.getElementById('lowerCaseFirstLetter').checked;
	settings.fromLanguage = document.getElementById('fromLanguage').value;
	settings.toLanguage = document.getElementById('toLanguage').value;
	settings.generateCSharpGetSet = document.getElementById('generateCSharpGetSet').checked;
	if(!settings.toLanguage || !settings.fromLanguage){
		console.warn('Language missing');
		return null;
	}
	return settings;
}

function getLanguageParser(lang){
	switch (lang) {
		case 'c#':
			return csharp;
		case 'ts':
			return typescript;
		default:
			return csharp;
	}
}