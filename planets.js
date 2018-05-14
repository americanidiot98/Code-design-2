/* circles.js */
/*
 * get the content of a JSON file using JSONP
 * update every 3 seconds.
 *
 */
var lastReportTime = 0;
window.onload = init;

// This is how often the data is retrieved.
function init() {
    var interval = setInterval(handleRefresh, 500);
    handleRefresh();
}


//This gets the data.
function handleRefresh() { //gets data from url.
    console.log("here");
    var url = "http://gumball.wickedlysmart.com" + //This is the link to the data set we are using.
        "?callback=updateSales" + 
        "&lastreporttime=" + lastReportTime +
        "&random=" + (new Date()).getTime();
    var newScriptElement = document.createElement("script");
    newScriptElement.setAttribute("src", url);
    newScriptElement.setAttribute("id", "jsonp");
    var oldScriptElement = document.getElementById("jsonp");
    var head = document.getElementsByTagName("head")[0];
    if (oldScriptElement == null) {
        head.appendChild(newScriptElement);
    } else {
        head.replaceChild(newScriptElement, oldScriptElement);
    }
}
 
// This outputs the data in HTML format.
function updateSales(sales) {
    var c = document.getElementById("canvas");
    var ctx = c.getContext("2d");
    
    
    
    // This is the fucntion to out planets.
    function makeCircle(x,y,r,c){ //This creates the circle.
        ctx.beginPath();// This begins the path.
        ctx.lineWidth = 8;// This is the line width of the outline of the planets (circles).
        ctx.arc(x,y,(r*15),0,2*Math.PI); // This creates the points we would like the planets to start and finish at.
        ctx.fillStyle = c;// This tells it to fill with colour.
        ctx.fill();// This tells it to fill the planet (cirlce)
        ctx.closePath();//This closes the path.
    }
    
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i]; //Sales array.
        
        var dataFromJson = sale.sales; //Grabbed copy of integer.
        var dataOutput = document.getElementById("data");
        dataOutput.innerHTML = dataFromJson;
        
        function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
        }//New number each loop.
        
        var xPos = getRandomArbitrary(100, 1800); //Random x co-ordinate.
        var yPos = getRandomArbitrary(100, 750); //Random y co-ordinate.
        
        var colour = ["Tomato", "Orange", "DodgerBlue", "MediumSeaGreen", "SlateBlue", "Violet"];//Changing the colours of our planets (circles).
        var randC= colour[Math.floor(Math.random() * colour.length)];
        
        
        makeCircle(xPos, yPos ,dataFromJson, randC); //Feed in the integer.
        
        
        //Order the output divs.
        if (salesDiv.childElementCount == 0) { //Manipulates.
            salesDiv.appendChild(div);
        } else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
        }
    }
    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}
    