window.onload = function() {
	// Define task space
	var canvas = document.getElementById('cvs_task_space'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var mouseX = 0,
		mouseY = 0;
    var fixX = 0,
        fixY = 0;
    var isDraw = true;

    // (ipad touch) define touch movement
    canvas.addEventListener('touchstart', beginMove);
    canvas.addEventListener('touchend', endMove);

    // (ipad touch) begin arm movement
    function beginMove(e) {
        e.preventDefault();
        mouseX = e.pageX;
        mouseY = e.pageY;
    }

    // (ipad touch) end arm movement
    function endMove(e) {
        e.preventDefault();
        canvas.addEventListener('touchmove', beginMove);
    }

	// (1) Task space
	var iks = IKSystem.create(width/2, height/2); // define arms
	iks.addArm(100);  // bottom
	iks.addArm(100);  // center
	iks.addArm(100);  // top

	// track mouse movement
	canvas.addEventListener("mousemove", function(e){
		mouseX = e.clientX;
		mouseY = e.clientY;
	})
    
    // click to draw a red dot
    canvas.addEventListener("click", function(e) {
        context.fillStyle = "#ff2626"; // Red color
        context.beginPath();
        fixX = e.clientX;
        fixY = e.clientY;
        context.arc(fixX, fixY, 10, 0, Math.PI * 2, true);
        context.fill();
    })

    // allow keypress to freeze
    canvas.addEventListener('keypress', function() {
        if (isDraw==true) {
            isDraw = false;
        } else {
            isDraw = true;
        }
    })

	update();

	function update() {
        if (isDraw) {
            context.clearRect(0, 0, width, height);
            drawCoordinates(fixX, fixY)

            iks.reach(mouseX, mouseY); // drag arms
            iks.render(context); // draw arms
        }

		requestAnimationFrame(update);
	}

    function drawCoordinates(x, y) {
        context.fillStyle = "#ff2626"; // Red color
        context.beginPath();
        context.arc(x, y, 10, 0, Math.PI * 2, true);
        context.fill();
    }

    function getPosition(event){
        var rect = canvas.getBoundingClientRect();
        var x = event.clientX - rect.left;
        var y = event.clientY - rect.top;
            
        drawCoordinates(x,y);
    }

}
