$(function() {
	
	var w = new Worker('worker.js');
	
	$("#submit-button").click(function () {
		w.postMessage($("#text").val());
		$(this).text("Annuler");
		$(this).click(function(){
			w.terminate();
		});
	});
	
	
	w.onmessage = function (e) {
			$(".progress-bar").css("width",e.data+"%");
			if(e.data < 100){
				w.postMessage($("#text").val());
			}
	}

});

