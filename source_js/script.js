//toggle
$('button').click(function() {
  $(this).toggleClass('expanded').siblings('div').slideToggle();
});

// Write any custom javascript functions here
/**$(document).ready(function () {
    $('.crsl').slick({
        centerMode: true,
        centerPadding: '3px',
        autoplay: true,
        autoplaySpeed: 2000,
        dots: true, 
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        slidesToScroll: 6,
        arrows: true
    });
});**/

/* fixed menu */
$(window).scroll(function() {
  if ($(document).scrollTop() > 10) {
    $('#nav').addClass('shrink');
  } else {
    $('#nav').removeClass('shrink');
  }
});

/* smooth scroll */
$(document).ready(function(){
    $('a[href^="#"]').on('click',function (e) {
        e.preventDefault();
        var wdw = this.hash;
        var $wdw = $(wdw);
        $('html, body').stop().animate({
            'scrollTop': $wdw.offset().top
        }, 700, 'swing', function () {
            window.location.hash = wdw;
        });
    });
});

/* canvas */
function previewHandler(canvas, document) {
    var context = canvas.getContext("2d");
    /*  We're adding the call to fillBackgroundColor before we draw square or cirle
        So it covers up the previous drawing and gives us a clean background for our new drawing
    */
    fillBackgroundColor(canvas, context, document);
    
    var selectObj = document.getElementById("shape");
    var index = selectObj.selectedIndex;
    var shape = selectObj[index].value;
    var gimme = document.getElementById("filter");
    var index2 = gimme.selectedIndex;
    var filter = gimme[index2].value;

    
    if(shape=="pattern"){
        
        make_base(canvas, context);
    }
    // Check if the selected shape is square or circle
    if (shape == "squares") {
        for (var squares = 0; squares < 20; squares++) {
            // to draw a square, we are callig a new function drawSquare
            drawSquare(canvas, context);
        }
    } else if (shape == "circles") {
        for (var circles = 0; circles < 20; circles++) {
            // to draw a circle, we are calling a new function drawCircle
            drawCircle(canvas, context);
        }
    }
   if(filter=="grayscale"){
    filterImage(canvas, context);
   }
   if(filter=="brighten"){
    brightenImage(canvas, context);
   }
   if(filter="threshold"){
    thresholdImage(canvas, context);
   }
   drawText(canvas, context, document);

}

//Function to fill image
function make_base(canvas, context)
{
  base_image = new Image();
  var randnumbr = Math.floor(Math.random()*3);
  image_arr = ['img/base.png', 'img/base2.png', 'img/base3.png'];
  base_image.src = image_arr[randnumbr];
  var x = canvas.width;
  var y = canvas.height;
  base_image.onload = function(){
    context.drawImage(base_image, 0, 0, x, y);
        drawText(canvas, context);
  };
}
// Function to create an image in PNG format
function makeImage() {
    var canvas = document.getElementById("art-board");
    window.location = canvas.toDataURL("image/png");
    canvas.onclick = function () {
        window.location = canvas.toDataURL("image/png");
    };
}

// Function to draw Square on canvas
function drawSquare(canvas, context) {
    // Here we created a random width and height for a square
    var w = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);

    // Just a add a color we are using fillStyle
    context.fillStyle = "#DA4453";

    // Draw the actual square with fillRect
    context.fillRect(x, y, w, w);
}

// Function to fill background color
function fillBackgroundColor(canvas, context, document) {
    // Get the selected background color and set it on canvas
    var selectObj = document.getElementById("bgColor");
    var index = selectObj.selectedIndex;
    var bgColor = selectObj.options[index].value;
    context.fillStyle = bgColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
}

// Function to draw Circle on canvas
function drawCircle(canvas, context) {
    // Here we created a random raidus for circle
    var radius = Math.floor(Math.random() * 40);
    var x = Math.floor(Math.random() * canvas.width);
    var y = Math.floor(Math.random() * canvas.height);
    
    context.beginPath();
    context.arc(x, y, radius, 0, 360 * Math.PI / 180, true);
/*    context.fillStyle = "#fac922";*/
    context.fillStyle = "red";
    context.fill();
}

// Function to add static and dynamic text on canvas
function drawText(canvas, context, document) {
    var selectObj = document.getElementById("textColor");

    // Get content from textfield
    var content = document.getElementById("content").value;
    var index = selectObj.selectedIndex;
    var fgColor = selectObj[index].value;

    // Added some style to text
    context.fillStyle = fgColor;
    context.font = "bold 1em sans-serif";
    context.textAlign = "left";
    // Last two parameters of fillText is X and Y positions for the text.
    //context.fillText("I am static text here ! :(", 20, 40);
    context.font = "bold 1em sans-serif";
    context.textAlign = "right";
    context.fillText(content, canvas.width-20, canvas.height-40);
}

function filterImage(canvas, context){
    //var selectval = document.getElementById("filterme");
    
     imageData = context.getImageData(0, 0, canvas.width, canvas.height),
     data = imageData.data,
     iLen = data.length;

      for (i = 0; i < iLen; i+=4) {
        avg = 0.3  * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
        data[i] = avg + 100;
        data[i + 1] = avg + 50;
        data[i + 2] = avg + 255;
      }

      context.putImageData(imageData, 0, 0);    
    
 }

function thresholdImage(canvas, context){
    imageData = context.getImageData(0, 0, canvas.width, canvas.height),
    data = imageData.data,
        iLen = data.length;
    var threshold = 100;
    for (var i=0; i<data.length; i+=4) {
            var r = data[i];
            var g = data[i+1];
            var b = data[i+2];
            var v = (0.2126*r + 0.7152*g + 0.0722*b >= threshold) ? 255 : 0;
            data[i] = data[i+1] = data[i+2] = v
    }
    context.putImageData(imageData, 0, 0); 
}

function brightenImage(canvas, context){
        imageData = context.getImageData(0, 0, canvas.width, canvas.height),
    adjustment = 200,
        data = imageData.data,
        iLen = data.length;
    for (var i=0; i<data.length; i+=4) {
            data[i] += adjustment;
            data[i+1] += adjustment;
            data[i+2] += adjustment;
    }
    context.putImageData(imageData, 0, 0); 

}
 
 