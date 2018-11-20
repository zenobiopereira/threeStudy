const scene = new THREE.Scene();

const origin = new THREE.Vector3(0,0,0);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 1, -30);
camera.lookAt(origin);

const renderer = new THREE.WebGLRenderer({ antialias: true});

renderer.setSize( window.innerWidth, window.innerHeight);

renderer.setClearColor("#ccc");

document.body.appendChild( renderer.domElement );

//ambient white light
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5);
scene.add( ambientLight );

//Light which makes
var pointLight = new THREE.PointLight( 0xffffff, 1 );
// This set the position on the Point Light, being (y, x, z), axis-x up/down and axis-y left/right, axis-z in/out
pointLight.position.set( 25, 50, 25);
scene.add( pointLight );

// Rezise the render with the size of view.
// window.addEventListener( 'resize', () => {
// 	let width = window.innerWidth
// 	let height = window.innerHeight
// 	renderer.setSize( width, height )
// 	camera.aspect = width / height
// 	camera.updateProjectionMatrix()
// });


var geometry = new THREE.CubeGeometry( 3, 8, 3);
// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.1, 0 ));
var material = new THREE.MeshStandardMaterial( { color: "aquamarine" });
var buildingMesh= new THREE.Mesh( geometry, material);
scene.add( buildingMesh );

buildingMesh.position.set(9, 4.0, 3.8)
buildingMesh.rotateX(3.13);

var geometry = new THREE.CubeGeometry( 3, 8, 3);
// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.1, 0 ));
var material = new THREE.MeshStandardMaterial( { color: "red" });
var buildingMesh2= new THREE.Mesh( geometry, material);
scene.add( buildingMesh2);

buildingMesh2.position.set(-9, 4.0, 3.8)
buildingMesh2.rotateX(3.13);

var geometry = new THREE.PlaneGeometry(5, 1000, 0);
var material = new THREE.MeshBasicMaterial({color: "#ff9911", side: THREE.DoubleSide});
var plane = new THREE.Mesh (geometry, material);
scene.add(plane);


var geometry = new THREE.PlaneGeometry(30, 1000, 0);
var material = new THREE.MeshBasicMaterial({color: "#999", side: THREE.DoubleSide});
var planeBelow = new THREE.Mesh (geometry, material);
scene.add(planeBelow);


plane.rotateX(Math.PI / 2);
plane.position.set(0,0,0);
planeBelow.rotateX( Math.PI/2);
planeBelow.position.set(0, -0.01, 0);


// const orbitControls = new THREE.OrbitControls(camera, document);
// orbitControls.autoRotate = false;
// orbitControls.autoRotateSpeed = 10.0;
// orbitControls.maxPolarAngle = (Math.PI/2 
//   - Math.PI/64
//   );
// Stop the orbit control of zooming in/out, just move around
// orbitControls.enableZoom = false;
// orbitControls.enableDamping = false;
// orbitControls.screenSpacePanning = false;

var percent = 0;
var oldPct = 0;

window.addEventListener("wheel", _u.throttle(function(){
  let scrollHeight = window.scrollY;
  let bodyHeight = document.body.clientHeight;
  let windowHeight = window.innerHeight;
  let scrollP = scrollHeight / (bodyHeight - windowHeight);
  percent = Math.round(scrollP*100);
  handleScroll()
  render();
}, 150, {'trailing': false}),{passive: true});

var constantMoving = 0.8;

function handleScroll (){
  // console.log('actual', percent)
  // console.log('old', oldPct)
  if(percent == 0 || percent == 100){
    return
  }

  if(window.scrollY > oldPct){
    console.log('if')
    camera.position.z += constantMoving;
    oldPct = window.scrollY;
  } else {
    console.log('else')
    camera.position.z -= constantMoving;
    oldPct = window.scrollY;
    console.log(percent)
    console.log(oldPct)
  }
}

function render () {
  requestAnimationFrame(handleScroll)
  renderer.render(scene, camera)
}

render();