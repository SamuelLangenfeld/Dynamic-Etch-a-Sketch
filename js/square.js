
$(document).ready(function(){
	

//create the original 8x8 sketchpad
	var squareNum=document.getElementById("squareValue").innerHTML;
	drawSquare(squareNum);
	
//default setting is to change the bgcolor to green on mouseenter
	greenBackground(squareNum);

//If the user clicks on new sketch pad button, we redraw the pad and reinstate most default
//settings but keep the new number of squares per side
	$(document.getElementById("squareButton")).click(function(){

		do{

		var number=window.prompt("Enter a whole number of squares per side between 2 and 250", "");
		squareNum=parseInt(number, 10);
		var remainder=number%squareNum;
		} while(isNaN(squareNum) || squareNum<2 || squareNum>250 || remainder!=0);

		document.getElementById('squareValue').innerHTML=squareNum;
		drawSquare(squareNum);
		greenBackground(squareNum);

	});

//This is code I'm not using but I want to save it. It could be useful in the future.
//If the user hits the enter key in the square number input box, we suppress the default
//submit form action and instead redraw the sketch pad 
/*	$("#squareValue").keydown(function(event){

    	if(event.keyCode == 13){
    		event.preventDefault();
    		squareNum=document.getElementById("squareValue").value;
    		$("#squareButton").click();
    	}

	});
*/

//If the user clicks the random colors button we bind the random bg color function to each
//square.
	$(document.getElementById("randomButton")).click(function(){
		
		
		randomBackground(squareNum);
	});


//When the user clicks the "make the squares darker" button we bind the darker function to
//each square
	$(document.getElementById("darkerButton")).click(function(){
		
		darker(squareNum);
	});



	$(document.getElementById("resetButton")).click(function(){
		
		
		resetGrid(squareNum);
	});


	$(document.getElementById("greenButton")).click(function(){
		
		
		greenBackground(squareNum);
	});


	
	



});



function greenBackground(squareNum){
	var idNo="";

	for(var i=0;i<squareNum;i++){
		for (var n=0;n<squareNum;n++){
			idNo="n"+n+"i"+i;
			$(document.getElementById(idNo)).off('mouseenter');

//Here we bind a mouseenter function to each square that sets the bg color to green
			$(document.getElementById(idNo)).mouseenter(function(){
				
					this.style.backgroundColor="#080";
				
			
			});
		}
	}
	


}

//This function binds a mouseenter function to each square that chooses a new random bg color
function randomBackground(squareNum){
	var idNo="";

	
	for(var i=0;i<squareNum;i++){
		for (var n=0;n<squareNum;n++){
			idNo="n"+n+"i"+i;

			$(document.getElementById(idNo)).off('mouseenter');
			$(document.getElementById(idNo)).mouseenter(function(){
				
					this.style.backgroundColor="#"+randomHexNum()+randomHexNum()+randomHexNum();
				
			
		});
		}
	}
	
	
	

	





}


//This function chooses a random hexadecimal number and passes it back. 
function randomHexNum(){

	var hexArray=['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	var hexNum=hexArray[Math.floor(Math.random()*16)];
	return hexNum;

}

//I never used this function but I created it early on in case I needed to reset the bg
//colors on the squares without changing anything else.

function resetGrid(squareNum){
	var idNo="";
		for(var i=0;i<squareNum;i++){
			for (var n=0;n<squareNum;n++){
				idNo="n"+n+"i"+i;

				document.getElementById(idNo).style.backgroundColor='#888';

			
			}
		}
}


//This function creates a new sketch pad by redoing the inner html code of the pad's div
//container. It takes the value of the user entered number of squares per side, or default of
//8, and sets up a table data entry with an individual id for each square.
function drawSquare(squareNum){

	
	innerString="";
	innerString+="<table>";

	for(var i=0;i<squareNum;i++){

		innerString+="<tr>";

			for(var n=0;n<squareNum;n++){
				
				innerString+="<td ";
				innerString+='id="n'+n+"i"+i+'" class="squareTD" style="background-color:#888;">';
				innerString+="</td>";
				
			}
		innerString+="</tr>";


	}
	innerString+="</table>";
	document.getElementById("squareDiv").innerHTML=innerString;

}


//This function binds a mouseenter function to each square that darkens its pre-existing
//bg color
function darker(squareNum){

	var oldColor1="";
	var oldColor2="";
	var oldColor3="";
	var index1="";
	var index2="";
	var oldColorString="";
	var idNo="";
	var newColor1="";
	var newColor2="";
	var newColor3="";
	for(var i=0;i<squareNum;i++){
		for (var n=0;n<squareNum;n++){
			idNo="n"+n+"i"+i;

//For each element we remove the pre-existing mouseenter function to bind our new one
			$(document.getElementById(idNo)).off('mouseenter');

			$(document.getElementById(idNo)).mouseenter(function(){

//To get the color code from the old bg color we have to do get the string in the form of
//rgb(x,y,z) and then slice the string up several times to get the actual numbers.
//Once we have the numbers we convert them from a string value to a number value and then
//subtract 25 or 10% of the color from each of the values and create and assign the new color
//to the square's bg color.				
				oldColorString=this.style.backgroundColor;
				index1="4";
				index2=oldColorString.search(",");
				oldColor1=oldColorString.slice(index1,index2);
				oldColorString=oldColorString.slice(index2+2,oldColorString.length);
				index1="0";
				index2=oldColorString.search(",");
				oldColor2=oldColorString.slice(index1, index2);

				oldColorString=oldColorString.slice(index2+1,oldColorString.length);

				index1="0";
				index2=oldColorString.length;
				oldColor3=oldColorString.slice(index1, index2-1);
				
				oldColor1=Number(oldColor1);
				oldColor2=Number(oldColor2);
				oldColor3=Number(oldColor3);
				
				newColor1=oldColor1-25;
				newColor2=oldColor2-25;
				newColor3=oldColor3-25;

				this.style.backgroundColor="rgb("+newColor1+", "+newColor2+", "+newColor3+")";




			
			});
		}
	}
}