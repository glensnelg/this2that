function BaseClass(){
	this.access = 'public';
	this.name;
	this.properties = [];
}

function ClassProperties(access,name,type){
	this.access = access ? access : 'public';
	this.name = name ? name : '';
	this.type = type ? type : '';
}

function ParseSettings(){
	this.firstLetterLower = false;
	this.fromLanguage = '';
	this.toLanguage = '';
	this.generateCSharpGetSet = false;
}