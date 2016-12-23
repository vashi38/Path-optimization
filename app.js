var createMatrix = function(response){
	connections = response.connections;
	stations = response.stations;
	for (i=0;i<connections.length;i++)
	{
		temp_souce = getValue(connections[i].source);
		temp_destination = getValue(connections[i].destination);
		temp_speed = connections[i].speed;
		temp_time = connections[i].time;
		
		e_speed[temp_souce][temp_destination] = temp_speed;
		e_dist[temp_souce][temp_destination] = temp_time;
	}
}

var connections = [];
var stations = [];

 var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
     createMatrix(JSON.parse(this.responseText));
    }
  };
  xhttp.open("GET", "response.json", true);
  xhttp.send();
