/////////////////////////////////////////
///////// MAIN THREE JS FILE ///////////
///////////////////////////////////////

///////////////////////////////////////
//app vars, particles and control default settings
///////////////////////////////////////
var app = app || {};
app.step = 0;

app.group = new THREE.Object3D();

app.total = {};
app.testcube = {};
app.jsondata = {};

app.controller = {
  rotationSpeed: 0.0 //0.002
};
/////////////////////////////////////////////

///////////////////////////////////////
/////// animate earth function ///////
/////////////////////////////////////
app.animate = function() {

  app.stats.update();


  //app.group.rotation.y += app.controller.rotationSpeed;

  //app.sphere.rotation.y += app.controller.rotationSpeed;
  //console.log(app.total.rotation);

  if(typeof(app.group.rotation) !== 'undefined')
    app.group.rotation.y += app.controller.rotationSpeed;

  // if(typeof(app.total.rotation) !== 'undefined')
  //   app.total.rotation.y += app.controller.rotationSpeed;

  //need to add cube rotation
  // app.cube.rotation.y += app.controller.rotationSpeed;

  app.renderer.render(app.scene, app.camera);

  requestAnimationFrame(app.animate);

};
/////////////////////////////////////////////

////////////////////////////////////////
///// Animate background function /////
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
    app.camera = new THREE.PerspectiveCamera(90, app.width / app.height, 0.1, 2000);

    app.camera.position.x = 190;
    app.camera.position.y = 0;
    app.camera.position.z = 0;

    app.camera.lookAt(app.scene.position);

    app.renderer = new THREE.WebGLRenderer();
    app.renderer.setSize(app.width, app.height);
    app.renderer.setClearColor(0x111111);

    /////////////////////////////////////////////


    //////////////////////////////////////////
    //////////// Rendering Globe ////////////
    ////////////////////////////////////////


    var sphereGeometry = new THREE.SphereGeometry(100, 60, 60, 0);
    var sphereMaterial = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      map: THREE.ImageUtils.loadTexture("images/worldtexture1.jpg")
    });

    app.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    app.sphere.position.set(0, 0, 0);
    // app.sphere.castShadow = true;


    //app.scene.add(app.sphere);

    /////////////////////////////////////////////

    //////////////////////////////////////////
    ////// rendering cloud diff layer //////
    ///////////////////////////////////////

    /* WIP */

    /////////////////////////////////////////////
    ////////////// Spotlight 1 /////////////////
    ///////////////////////////////////////////

    app.spotLight = new THREE.SpotLight(0xFFFFFF);
    app.spotLight.position.set(500, 100, 100);

    /* --shadow off while testing (or to save battery)
    app.spotLight.castShadow = true;
    */
    app.scene.add(app.spotLight);

    //backlight

    app.spotLight = new THREE.SpotLight(0xFFFFFF);
    app.spotLight.position.set(-500, 100, 400);

    /* --shadow off while testing (or to save battery)
    app.spotLight.castShadow = true;
    */
    app.scene.add(app.spotLight);


    /* --test sphere for postioning lights
    var sphereGeometry2 = new THREE.SphereGeometry(10, 60, 60, 0);
    var sphereMaterial2 = new THREE.MeshLambertMaterial({
      color: 0xFFFFFF,
      map: THREE.ImageUtils.loadTexture("images/worldtexture.jpg")
    });
      */
    /* --add particle renderer */

    /////////////////////////////////////////////


    ////////////////////////////////////////////
    //////////// Controls for orbit ///////////
    //////////////////////////////////////////

    app.controls = new THREE.OrbitControls(app.camera, app.renderer.domElement);
    app.gui = new dat.GUI();
    app.gui.add(app.controller, 'rotationSpeed', 0, 0.1);
    app.stats = app.addStats();

    document.getElementById("output").appendChild(app.renderer.domElement);

    app.animate();

    ///

    // simple function that converts the density data to the markers on screen
    // the height of each marker is relative to the density.

    // // Probably don't need this - duplicate of renderOverlay function
    // function addDensity(data) {
    //
    //   // the geometry that will contain all our cubes
    //   var geom = new THREE.Geometry();
    //   // material to use for each of our elements. Could use a set of materials to
    //   // add colors relative to the density. Not done here.
    //   var cubeMat = new THREE.MeshLambertMaterial({
    //     color: 0xff0000,
    //     opacity: 0.6,
    //     emissive: 0xffffff
    //   });
    //   for (var i = 0; i < data.length - 1; i++) {
    //
    //     var value = 50;
    //
    //     // calculate the position where we need to start the cube
    //     var position = latLongToVector3(data[i][1], data[i][0], 100, 1);
    //
    //     var cubeMat = new THREE.MeshLambertMaterial({
    //       color: 0xff0000,
    //       opacity: 0.6
    //     });
    //     var cube = new THREE.Mesh(new THREE.CubeGeometry(2, 2, 2));
    //     cube.position.x = position.x;
    //     cube.position.y = position.y;
    //     cube.position.z = position.z;
    //
    //     // position the cube correctly
    //     cube.lookAt(new THREE.Vector3(0, 0, 0));
    //
    //     // merge with main model
    //     cube.updateMatrix();
    //     geom.merge(cube.geometry, cube.matrix);
    //   }
    //
    //   // create a new mesh, containing all the other meshes.
    //   var material = new THREE.MeshPhongMaterial({
    //     color: 0xFF0000
    //   });
    //   var total = new THREE.Mesh(geom, material);
    //
    //   // and add the total mesh to the scene
    //   //console.log(app.scene);
    //
    //   app.scene.add(total);
    // }
    //
    // // testing

    var renderOverlay = function(points, speed) {
      // console.log(points)

      // the geometry that will contain all our cubes
      var geom = new THREE.Geometry();

      // add colors relative to the density. Not done here.
      var cubeMat = new THREE.MeshLambertMaterial({
        color: 0xff0000,
        opacity: 0.6,
        emissive: 0xffffff
      });
      for (var i = 0; i < points.length; i++) {

        var value = 50;

        // calculate the position where we need to start the cube
        var position = latLongToVector3(points[i][1], points[i][0], 100, 0);
        // console.log(position, data[i][0], data[i][1]);
        // create the cube
        //var cube = new THREE.Mesh(new THREE.CubeGeometry(5,5,1+value/8,1,1,1,cubeMat));


        var cubeMat = new THREE.MeshPhongMaterial({
          color: 0x000000,
          opacity: 0.1
        });
        ////////////////////////////////////////////
        //// defines individual cube dimensions ///
        //////////////////////////////////////////
        var cube = new THREE.Mesh(new THREE.CubeGeometry(0.2, 0.2, (speed * 10)));
        cube.position.x = position.x;
        cube.position.y = position.y;
        cube.position.z = position.z;

        // position the cube correctly
        cube.lookAt(new THREE.Vector3(0, 0, 0));

        // merge with main model
        cube.updateMatrix();
        geom.merge(cube.geometry, cube.matrix);
      }

      // create a new mesh, containing all the other meshes. //
      ////////////////// Defines cube COLOR //////////////////
      ///////////////////////////////////////////////////////
      var material = new THREE.MeshLambertMaterial({
        color: 0xFF0000 //0xFFFFFF
      });
      //console.log(geom);
      app.total = new THREE.Mesh(geom, material);

      // and add the total mesh to the scene
      //console.log(app.scene);



      app.group.add( app.total );
  //    console.log("total", app.total );

      app.group.add( app.sphere );

      app.scene.add( app.group );
      //app.scene.add(app.total);
    }
    /////////////////////////////////////////////////////
    ////////// array to loop through json file /////////
    ///////////////////////////////////////////////////
    $.getJSON("/js/list.geo.json", function(json) {
      // console.log(json);
      app.jsondata = json;
      // addDensity(json);

      allCountries = json['features'];
      for (var i = 0; i < allCountries.length; i++) {
        var points = [];
        var country = allCountries[i];
        var countrySpeed = country.speed
        var isSingleLandMass = country.geometry.coordinates.length === 1;
        if (isSingleLandMass) {
          var landmass = country.geometry.coordinates[0];
          for (var j = 0; j < landmass.length; j++) {
            points.push(landmass[j])
          }
          renderOverlay(points, countrySpeed);
          // create shape
        } else { //multiple landmasses
          for (var n = 0; n < country.geometry.coordinates.length; n++) {
            points = [];
            var landmass = country.geometry.coordinates[n][0];
            for (var x = 0; x < landmass.length; x++) {
              points.push(landmass[x]);
            }
            renderOverlay(points, countrySpeed);
          }
        }
      }
    });
  }
  /////////////////////////////////////////////



/////////////////////////////////////////////
/////////// initiate + add stats ///////////
///////////////////////////////////////////

window.onload = app.init;

app.addStats = function() {

  var stats = new Stats();
  stats.setMode(0);
  stats.domElement.style.position = 'absolute';
  stats.domElement.style.top = '0px';
  stats.domElement.style.left = '0px';

  document.getElementById("stats").appendChild(stats.domElement);

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

app.onResize = function() {

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
  var phi = (lat) * Math.PI / 180;
  var theta = (lon - 180) * Math.PI / 180;

  var x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
  var y = (radius + height) * Math.sin(phi);
  var z = (radius + height) * Math.cos(phi) * Math.sin(theta);

  return new THREE.Vector3(x, y, z);
}
/////////////////////////////////////////////
