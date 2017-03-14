$(function() {

	var w = new Worker('worker.js');

	var canceled = false;
	var cancelAllowed = false;
	
	//Si on clique sur Compter!
	$(".count").click(function () {
		cancelAllowed = true;
		$("#mainBar").css("width","0%");
		$(".number").text("0");
		w.postMessage($(".form-control").val());
		//Change les couleurs des boutons pour indiquer leur état
		$('.cancel').removeClass('cancelNotAllowed');
		$('.count').addClass('countNotAllowed');
		//Si on clique sur cancel
		$('.cancel').click(function(){
			if(cancelAllowed){
				canceled = true;
				$('.cancel').addClass('cancelNotAllowed');
				$('.count').removeClass('countNotAllowed');
			}
		});
	});

	//Quand on reçoit un message du worker
	w.onmessage = function (e) {

		//Si la progression est de moins de 100
		if(e.data[0]<100){
			if(canceled){ //On arrete le calcul
				canceled = false;
				//Message spécifique pour arrete le travail
				w.postMessage("!!cancel!!");
				//On ajuste tous les indiquateurs
				$("#mainBar").css("width","0%");
				$('#mainPourcentage').text("0%");
				$(".number").text("Annule");
				$("#smallBar").css("width",e.data[0]+"%");
				$("#smallPourcentage").text(e.data[0]+"%");
				$('#jetons').text(e.data[1]+" jetons");
			}
			else { //On continue la progression
				w.postMessage($(".form-control").val());
				$("#mainBar").css("width",e.data[0]+"%");
				$('#mainPourcentage').text(e.data[0]+"%");
				$(".number").text(""+e.data[1]);
			}
		}
		else { //La progression est de 100%, comptage terminé
			cancelAllowed = false;
			//Message spécifique pour arrete le travail
			w.postMessage("!!cancel!!");
			//On ajuste tous les indiquateurs
			$("#mainBar").css("width",e.data[0]+"%");
			$('#mainPourcentage').text(e.data[0]+"%");
			$(".number").text(""+e.data[1]);
			$('.cancel').addClass('cancelNotAllowed');
			$('.count').removeClass('countNotAllowed');
			$("#smallBar").css("width","100%");
			$("#smallPourcentage").text("100%");
			$('#progress').text("100%");
			$('#jetons').text(e.data[1]+" jetons");
		}
	}

	//Pour effacer le texte
	$('.eraseText').click(function(){
		$('textarea').val('');
		$("#mainBar").css("width","0%");
		$('#mainPourcentage').text("0%");
		$(".number").text("0");
	});



});

