
self.importScripts("CompteurJetons.js");
var compteur = new CompteurJetons();

self.addEventListener('message', function(e) {

	var progress = compteur.compterJetons(e.data);
	
	postMessage(progress.next().value);

	
  
}, false);


