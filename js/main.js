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
	var codeArray = codeFrom.innerText.split('\n');
	var thing = csharp.from(codeArray);
		console.warn("Done!", thing);

	var newClass = typescript.to(thing);
		console.warn("Done!", newClass);

	codeTo.innerText = newClass;
	hljs.highlightBlock(codeTo);
	console.info(codeTo.value);
});