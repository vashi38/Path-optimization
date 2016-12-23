getValue = function(input)
{
	switch(input){
		case 'S':return 0;
		case 'T':return 1;
		case 'U':return 2;
		case 'V':return 3;
		case 'W':return 4;
		case 'X':return 5;
		default:return -1;
	}
}
getChar = function(input){
	switch(input){
		case 0:return 'S';
		case 1:return 'T';
		case 2:return 'U';
		case 3:return 'V';
		case 4:return 'W';
		case 5:return 'X';
		
	}
}
getClass= function(e,arr,i){
	if(e[arr[i-1]][arr[i]]<3)
		return "hr-3";
	else if(e[arr[i-1]][arr[i]]>3 && e[arr[i-1]][arr[i]]<6)
		return "hr-6";
	else	
		return "hr-9";
			
}

getTime = function(arr){
	var time = 0;
	for(i=1;i<10;i++)
	{
		if(arr[i]==-1)
			break;
		time+=e_speed[arr[i-1]][arr[i]];
		
	}
	console.log(time);
	return time;
}
getDistance = function(arr){
	var distance = 0;
	for(i=1;i<10;i++)
	{
		if(arr[i]==-1)
			break;
		distance+=e_dist[arr[i-1]][arr[i]];
		
	}
	console.log(distance);
	return distance;
}

sortByDistance = function(){
	for(i=0;i<path.length;i++)
		for(j=i+1;j<path.length;j++)
			if(path[i].distance>path[j].distance)
			{
				temp = path[i];
				path[i] = path[j];
				path[j] = temp;
			}
}

sortByTime = function(){
	for(i=0;i<path.length;i++)
		for(j=i+1;j<path.length;j++)
			if(path[i].time>path[j].time)
			{
				temp = path[i];
				path[i] = path[j];
				path[j] = temp;
			}
}


display = function(){
	var display_block = document.getElementById("res");
	var myclass = "";
	display_block.innerHTML="";
	for (i=0;i<path.length;i++)
	{
		var text ="";
		for(j=0;j<10;j++)
		{
			if(path[i].arr[j]==-1)
				break;
			if(j==0)
				text+="<h2>"+getChar(path[i].arr[j])+"</h2>";
			else
			{
				myclass = getClass(e_dist,path[i].arr,j);
				text+="<hr class="+myclass+"><h2>"+getChar(path[i].arr[j])+"</h2>";
			}
		}		
		display_block.innerHTML+="<div  class='container width100'>"+text+"</br></br></br></br><h3 class='time'>Time: "+path[i].time+"</h3><h3 class='distance'> Distance: "+path[i].distance+"</h3></div>";
	}	
}

show =function(val){
	if(val==0)
		sortByDistance();
	else
		sortByTime();
	display();
}

addToObj = function(arr){
	new_arr = JSON.parse(JSON.stringify(arr));
	time = getTime(new_arr);
	distance = getDistance(new_arr);
	
	path.push({arr:new_arr,time:time,distance:distance});
	console.log(path);

}

print = function(e,arr){
	for(i=index;i<6;i++)
		arr[i]=-1;
	console.log(arr);
	addToObj(arr);
}

findpaths = function(curr,dest,e){
	if(e[curr][dest]!=100)
	{
		arr[index++]=dest;
		print(e,arr);
		return;
	}
	else{
		for(i=0;i<6;i++)
		{
			if(e[curr][i]!=100 && e[curr][i]!=0)
			{
				arr[index++]=i;
				
				backup_a.push(i);
				backup_b.push(index);
				
				findpaths(i,dest,e);
				
				i = backup_a.pop();
				index = backup_b.pop()-1;
			}
		}
	}
	
}

var index = 1;
var arr = new Array(10);
var backup_a = new Array(10);
var backup_b = new Array(10);
var path = [];

var e_speed = [
  [0,100,100,100,100,100],
  [100,0,100,100,100,100],
  [100,100,0,100,100,100],
  [100,100,100,0,100,100],
  [100,100,100,100,0,100],
  [100,100,100,100,100,0] 
];
var e_dist = [
  [0,100,100,100,100,100],
  [100,0,100,100,100,100],
  [100,100,0,100,100,100],
  [100,100,100,0,100,100],
  [100,100,100,100,0,100],
  [100,100,100,100,100,0] 
];
init = function(){
	index = 1;
	arr = [];
	backup_a = [];
	backup_b = [];
	path = []
}
function find(val){
	init();
	var source = getValue(document.getElementById('from_before').value);
	var destination = getValue(document.getElementById('to_before').value);
	if(source == -1)
	{
		var source = getValue(document.getElementById('from_after').value);
		var destination = getValue(document.getElementById('to_after').value);
	}	
	arr[0]=source;
	findpaths(source,destination,e_dist);
	show(val);
}
//document.getElementById('myApp').onscroll = function() {onscrollFun()};

function onscrollFun(){
	console.log(document.body.scrollTop);
	var els = document.getElementsByClassName('scroll');
		
	if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) 
	{
    	document.getElementById("after_scroll").style.display="block";
		document.getElementById("before_scroll").style.display="none";
		
	}
	else 
	{
        
		document.getElementById("before_scroll").style.display="block";		
		document.getElementById("after_scroll").style.display="none";
	}
}