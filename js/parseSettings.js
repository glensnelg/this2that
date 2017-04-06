
function deCapitalizeFirstLetter(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
}

function showGenerateCSharpGetSet(elem){
   if(elem.value == "c#")
      document.getElementById('generateCSharpGetSetContainer').style.display = "block";
}