var codeFrom = document.getElementById("codeFrom");
var codeTo = document.getElementById("codeTo");

codeFrom.value = `public class Movie 
{
    public int ID { get; set; }
    public string Title { get; set; }
    public DateTime ReleaseDate { get; set; }
    public string Genre { get; set; }
    public decimal Price { get; set; }
}
`;

document.getElementById('generate').addEventListener('click', function() {
	var codeArray = codeFrom.value.split('\n');
	var thing = csharp.from(codeArray);
		console.warn("Done!", thing);
	
	var newClass = typescript.to(thing);
		console.warn("Done!", newClass);

	codeTo.value = newClass;
	console.info(codeTo.value);
});