var smoke = new Image();
smoke.src = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/15388/smoke.png';

$.fn.emitter = function(opts){
  var particles = [];
  var canvases = [];

  var particle = function(canvas){
    var x, y, size, speedX, speedY, opacity;
    reset();
    
    this.update = function(){
      if(opacity > 0){
        opacity -= (Math.random() / opts.speed.fade);
      }

      if(opacity <= 0){
        reset();
      }
      
      speedX -= Math.random() / opts.speed.acceleration;
      speedY -= Math.random() / opts.speed.acceleration;
      x += speedX;
      y += speedY;
      size += Math.random();
      drawParticle(x, y, size, opacity);
    };

    function drawParticle(x, y, size, opacity){
      canvas.globalAlpha = opacity;
      canvas.drawImage(smoke, 0, 0, opts.size, opts.size, x, y, size, size);
    }

    function reset(){
      x = opts.x;
      y = opts.y;
      size = opts.size;
      speedX = Math.random() * opts.speed.x;
      speedY = Math.random() * opts.speed.y;
      opacity = Math.random();
    }
  };

  var canvas = function(el){
    var canvas = el[0].getContext('2d');

    canvas.width = el.width();
    canvas.height = el.height();

    for(var c = 0; c < opts.particles; c++){
      particles.push(new particle(canvas));
    }

    this.clear = function(){
      canvas.clearRect(0, 0, canvas.width, canvas.height);
    };
  };

  $(this).each(function(){
    canvases.push(new canvas($(this)));
  });

  function render(){
    canvases.forEach(function(canvas){
      canvas.clear();
    });

    particles.forEach(function(particle){
      particle.update();
    });
    
    window.requestAnimationFrame(render);
  }

  return {
    render: render
  }
};

$('canvas').emitter({
  x: 350,
  y: 350,
  size: 100,
  particles: 10,
  speed: {
    x: -2,
    y: -2,
    fade: 130,
    acceleration: 10
  }
}).render();
