
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();


self.addEventListener('message', function(e) {

	//Message spécifique pour recommencer du début
	if(e.data == "!!cancel!!"){
		//On utilise un nouveau compteur
		compteur = new CompteurJetons();
	}
	else { //Sinon on continue le travail
		var progress = compteur.compterJetons(e.data);
		var jetons = compteur.getJetons();
		var value = progress.next().value;
		postMessage([value, jetons]);
	}

}, false);

