/* circles.js */
/*
 * get the content of a JSON file using JSONP
 * update every 3 seconds.
 *
 */
var lastReportTime = 0;
window.onload = init;

// how often the data is retrieved
function init() {
    var interval = setInterval(handleRefresh, 500);
    handleRefresh();
}


//gets the data
function handleRefresh() { //gets data from url
    console.log("here");
    var url = "http://gumball.wickedlysmart.com" + 
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
 
//outputs the data in HTML format
function updateSales(sales) {
    //var salesDiv = document.getElementById("sales");
    //loop for outputting data
    var c = document.getElementById("canvas");
     var ctx = c.getContext("2d");
    
    function makeCircle(x,y,r,c){
        ctx.beginPath();
        ctx.lineWidth = 8;
        ctx.arc(x,y,(r*15),0,2*Math.PI);
        ctx.fillStyle = c;
        ctx.fill();
        ctx.closePath();
    }
    
    for (var i = 0; i < sales.length; i++) {
        var sale = sales[i]; // sales array
        
        var dataFromJson = sale.sales; //grabbed copy of integer
        var dataOutput = document.getElementById("data");
        dataOutput.innerHTML = dataFromJson;
        
        function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
        }//new number each loop
        
        var xPos = getRandomArbitrary(100, 1800); //random x co-ordinate
        var yPos = getRandomArbitrary(100, 750); //random y co-ordinate
        
        var colour = ["Tomato", "Orange", "DodgerBlue", "MediumSeaGreen", "SlateBlue", "Violet"];
        var randC= colour[Math.floor(Math.random() * colour.length)];
        
        
        makeCircle(xPos, yPos ,dataFromJson, randC); //feed in the integer
        
        //creates the div on the fly
        //var div = document.createElement("div");
        //div.setAttribute("class", "saleItem");
        //div.innerHTML = sale.name + " Text " + sale.sales;
        //salesDiv.appendChild(div);
        
        
        
        //order the output divs
        if (salesDiv.childElementCount == 0) { //manipulates
            salesDiv.appendChild(div);
        } else {
            salesDiv.insertBefore(div, salesDiv.firstChild);
        }
    }
    if (sales.length > 0) {
        lastReportTime = sales[sales.length - 1].time;
    }
}
    