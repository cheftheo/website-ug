
function updateOnlinePlayers() {
	let apiLink = `https://servers-frontend.fivem.net/api/servers/single/v4vedx`;

	fetch(apiLink).then(response => response.json()).then(data => {

		if(data.error) {
			$('#centredDivs h2').html("Server offline momentan");
		} else {
			$('#centredDivs h2').html("Online: <span>" + data.Data.clients + "/" + data.Data.sv_maxclients + "</span>");
		}

	});
}

$(document).ready(function () {
	updateOnlinePlayers()

	setInterval(function() { 
		updateOnlinePlayers()
	}, 5000)

});

