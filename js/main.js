
//app vars, particles and control default settings

var app = app || {};
app.step = 0;


app.controller = {
  rotationSpeed: 0.002,
  bouncingSpeed: 0.00
};
/////////////////////////////////////////////

///animate function

app.animate = function(){

  app.stats.update();

  app.sphere.rotation.y += app.controller.rotationSpeed;

  app.renderer.render( app.scene, app.camera );

  requestAnimationFrame( app.animate );

};
/////////////////////////////////////////////

///////////////////////////////////////
///// Animate particles function /////
//////////////////////////////////////

/* removed until needed */

/////////////////////////////////////////////



/////////////////////////////////////////////
//////////// Creating Scene ////////////////
///////////////////////////////////////////

app.init = function() {

  app.scene = new THREE.Scene();

  app.width = window.innerWidth;
  app.height = window.innerHeight;



//camera
  app.camera = new THREE.PerspectiveCamera(60, app.width/app.height, 0.1, 3000);

  app.camera.position.x = 150;
  app.camera.position.y = 30;
  app.camera.position.z = -150;

  app.camera.lookAt( app.scene.position );

  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize(app.width, app.height);
  app.renderer.setClearColor( 0x111111 );

/////////////////////////////////////////////


//////////////////////////////////////////
//////////// Rendering Globe ////////////
////////////////////////////////////////


  var sphereGeometry = new THREE.SphereGeometry(100, 60, 60);
  var sphereMaterial = new THREE.MeshLambertMaterial({
    color: 0xFFFFFF,
    map: THREE.ImageUtils.loadTexture("images/worldtexture.jpg")
  });

  app.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

  app.sphere.position.set(00, 00, 00);
  // app.sphere.castShadow = true;
  app.scene.add( app.sphere );

/////////////////////////////////////////////




/////////////////////////////////////////////
////////////// Spotlight 1 /////////////////
///////////////////////////////////////////

  app.spotLight = new THREE.SpotLight( 0xFFFFFF );
  app.spotLight.position.set(10000, 100, 100);
  // app.spotLight.castShadow = true;
  app.scene.add( app.spotLight );


  var light = new THREE.PointLight( 0x000000, 10000, 1000 );
  light.position.set( 150, 10, 10 );
  app.scene.add( light );


/* --add particle renderer */

/////////////////////////////////////////////




////////////////////////////////////////////
//////////// Controls for orbit ///////////
//////////////////////////////////////////

  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );

  app.gui = new dat.GUI();
  app.gui.add(app.controller, 'rotationSpeed', 0, 0.1);
  app.gui.add(app.controller, 'bouncingSpeed', 0, 2.0);

  app.stats = app.addStats();

  document.getElementById("output").appendChild( app.renderer.domElement );

  app.animate();
}
/////////////////////////////////////////////



/////////////////////////////////////////////
/////////// initiate + add stats ///////////
///////////////////////////////////////////

window.onload = app.init;

app.addStats = function(){

  var stats = new Stats();
  stats.setMode(0);

  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.left = '0px';

  document.getElementById("stats").appendChild( stats.domElement );

  return stats;
};
/////////////////////////////////////////////



/////////////////////////////////////////////
//////////// Generate particles ////////////
///////////////////////////////////////////

/* Function for particles */

/////////////////////////////////////////////



/////////////////////////////////////////////
////////// update view on resize ///////////
///////////////////////////////////////////

app.onResize = function(){

  app.width = window.innerWidth;
  app.height = window.innerHeight;

  app.camera.aspect = app.width / app.height;
  app.camera.updateProjectionMatrix();

  app.renderer.setSize(app.width, app.height);

};

window.addEventListener("resize", app.onResize);
/////////////////////////////////////////////
