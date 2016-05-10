
/////////////////////////////////////////
///////// MAIN THREE JS FILE ///////////
///////////////////////////////////////

///////////////////////////////////////
//app vars, particles and control default settings
///////////////////////////////////////
var app = app || {};
app.step = 0;

app.testcube = {};
app.jsondata = {};

app.controller = {
  rotationSpeed: 0.0 //0.002
};
/////////////////////////////////////////////

///////////////////////////////////////
/////// animate earth function ///////
/////////////////////////////////////
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


///////////////////////////////////////
////////////// camera ////////////////
/////////////////////////////////////
  app.camera = new THREE.PerspectiveCamera(80, app.width/app.height, 0.1, 1000);

  app.camera.position.x = 200;
  app.camera.position.y = 0;
  app.camera.position.z = -150;

  app.camera.lookAt( app.scene.position );

  app.renderer = new THREE.WebGLRenderer();
  app.renderer.setSize(app.width, app.height);
  app.renderer.setClearColor( 0x111111 );

/////////////////////////////////////////////


//////////////////////////////////////////
//////////// Rendering Globe ////////////
////////////////////////////////////////


  var sphereGeometry = new THREE.SphereGeometry(100, 60, 60, 20);
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

  /* --shadow off while testing (or to save battery)
  app.spotLight.castShadow = true;
  */
  app.scene.add( app.spotLight );


  var light = new THREE.PointLight( 0x000000, 10000, 1000 );
  light.position.set( 150, 10, 10 );
  app.scene.add( light );


/* --add particle renderer */

/////////////////////////////////////////////

//
// var lat = 28.165547;
// var long = 71.185474;
// var testpoint = latLongToVector3(lat, long, 100, 0.1);
// console.log(testpoint);
//
// var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000, opacity:0.6});
// var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2));
// cube.position.x = testpoint.x; //new THREE.Vector3(100, 100, 100); //testpoint;
// cube.position.y = testpoint.y; //new THREE.Vector3(100, 100, 100); //testpoint;
// cube.position.z = testpoint.z; //new THREE.Vector3(100, 100, 100); //testpoint;
// app.scene.add(cube);
// app.testcube = cube;

////////////////////////////////////////////
//////////// Controls for orbit ///////////
//////////////////////////////////////////

  app.controls = new THREE.OrbitControls( app.camera, app.renderer.domElement );

  app.gui = new dat.GUI();
  app.gui.add(app.controller, 'rotationSpeed', 0, 0.1);
  app.stats = app.addStats();

  document.getElementById("output").appendChild( app.renderer.domElement );

  app.animate();

  $.getJSON("/js/list.geo.json", function(json){

    console.log(json);
    app.jsondata = json;
    addDensity(json);
  });


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




////////////////////////////////////////////////////
/// change from cartesian co-ords to long + lat ///
//////////////////////////////////////////////////
function latLongToVector3(lat, lon, radius, height) {
    var phi = (lat)*Math.PI/180;
    var theta = (lon-180)*Math.PI/180;

    var x = -(radius+height) * Math.cos(phi) * Math.cos(theta);
    var y = (radius+height) * Math.sin(phi);
    var z = (radius+height) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x,y,z);
}
/////////////////////////////////////////////

// simple function that converts the density data to the markers on screen
// the height of each marker is relative to the density.
function addDensity(data) {


data = data.features[2].geometry.coordinates[0];
//first loop: over data.features[]
  //2nd loop: over data.features[n].geometry.coordinates[] - in case of multiple shapes

      //third loop: over each set of points, as below: coordinates.length


    // the geometry that will contain all our cubes
    var geom = new THREE.Geometry();
    // material to use for each of our elements. Could use a set of materials to
    // add colors relative to the density. Not done here.
    var cubeMat = new THREE.MeshLambertMaterial({color: 0x000000,opacity:0.6, emissive:0xffffff});
    for (var i = 0 ; i < data.length-1 ; i++) {

        //get the data, and set the offset, we need to do this since the x,y coordinates
        //from the data aren't in the correct format
        //var x = parseInt(data[i][0])+180;
        //var y = parseInt((data[i][1])-84)*-1;
        var value = 50; //parseFloat(data[i][2]);

        //var lat = 28.165547;
        //var long = 71.185474;

        // calculate the position where we need to start the cube
        var position = latLongToVector3(data[i][0], data[i][1], 100, 1);
        // console.log(position, data[i][0], data[i][1]);
        // create the cube
        //var cube = new THREE.Mesh(new THREE.CubeGeometry(5,5,1+value/8,1,1,1,cubeMat));


        var cubeMat = new THREE.MeshLambertMaterial({color: 0xff0000, opacity:0.6});
        var cube = new THREE.Mesh(new THREE.CubeGeometry(1, 1, 1));
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;
        // position the cube correctly

        //cube.lookAt( new THREE.Vector3(0,0,0) );

        // merge with main model
        cube.updateMatrix();
        geom.merge(cube.geometry, cube.matrix);
    }

    // create a new mesh, containing all the other meshes.
    var matty = new THREE.MeshPhongMaterial({color: 0xFF0000});
    var total = new THREE.Mesh(geom, matty);

    // and add the total mesh to the scene
    //console.log(app.scene);

    app.scene.add(total);
}
