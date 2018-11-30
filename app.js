const scene = new THREE.Scene();

const origin = new THREE.Vector3(0,0,0);

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(0, 1, -30);
camera.lookAt(origin);

const renderer = new THREE.WebGLRenderer({ antialias: true});
renderer.shadowMap.enabled = true;

renderer.setSize( window.innerWidth, window.innerHeight);

renderer.setClearColor("#ffffe6");

document.body.appendChild( renderer.domElement );

// ambient white light
var ambientLight = new THREE.AmbientLight ( "#ffffe6", 0.5);
ambientLight.castShadow = true;
scene.add( ambientLight );


//Almost like a sun.
var opositeLight = new THREE.PointLight( "#ffffe6", 0.5 );
// This set the position on the Point Light, being (y, x, z), axis-x up/down and axis-y left/right, axis-z in/out
opositeLight.position.set( -35, 30, -90);
opositeLight.castShadow = true;
scene.add( opositeLight );


// Rezise the render with the size of view.
window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	renderer.setSize( width, height )
  camera.aspect = width / height
  camera.updateProjectionMatrix()
});

var loader = new THREE.GLTF2Loader();
loader.load("./models/yellowStore.glb" , object => {
  scene.add(object.scene)
})

//Blue Building
var geometry = new THREE.CubeGeometry( 3, 8, 3);
// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.1, 0 ));
var material = new THREE.MeshStandardMaterial( { color: "blue" });
var buildingMesh = new THREE.Mesh( geometry, material);
buildingMesh.castShadow = true;
buildingMesh.receiveShadow = false; 
scene.add( buildingMesh );

buildingMesh.position.set(6, 4.0, 3.8)
buildingMesh.rotateX(3.13);


//Red Building
var geometry = new THREE.CubeGeometry( 3, 8, 3);
// geometry.applyMatrix( new THREE.Matrix4().makeTranslation( 0, 0.1, 0 ));
var material = new THREE.MeshStandardMaterial( { color: "red" });
var buildingMesh2= new THREE.Mesh( geometry, material);
buildingMesh2.castShadow = true;
buildingMesh2.receiveShadow = false; 
scene.add( buildingMesh2);

buildingMesh2.position.set(-7, 4.0, 3.8)
buildingMesh2.rotateX(3.13);

//The whine path.
var geometry = new THREE.PlaneGeometry(5, 1000, 0);
var material = new THREE.MeshStandardMaterial({color: "#990000", side: THREE.DoubleSide});
var plane = new THREE.Mesh (geometry, material);
plane.receiveShadow = true;
scene.add(plane);

//The below plane.
var geometry = new THREE.PlaneGeometry(30, 1000, 0);
var material = new THREE.MeshStandardMaterial({color: "#fff", side: THREE.DoubleSide});
var planeBelow = new THREE.Mesh (geometry, material);
planeBelow.receiveShadow = true;
scene.add(planeBelow);


plane.rotateX(Math.PI / 2);
plane.position.set(0,-0.01,0);
planeBelow.rotateX( Math.PI/2);
planeBelow.position.set(0, -0.02, 0);

// const controls = new THREE.OrbitControls(camera);
// controls.autoRotate = false;
// controls.autoRotateSpeed = 10.0;
// controls.maxPolarAngle = (Math.PI/2 
//   - Math.PI/64
//   );
// Stop the orbit control of zooming in/out, just move around
// controls.enableZoom = true;
// controls.enableDamping = true;
// controls.screenSpacePanning = true;

var percent = 0;
var oldPct = 0;
var constantMoving = 1.7;

window.addEventListener("scroll", _u.debounce(function(){
  requestAnimationFrame(handleScroll)
  let scrollHeight = window.scrollY;
  let bodyHeight = document.body.clientHeight;
  let windowHeight = window.innerHeight;
  let scrollP = scrollHeight / (bodyHeight - windowHeight);
  percent = Math.round(scrollP*100);
  if(percent === oldPct){
    return
  }
  handleScroll();
  setValue();
  render();
}, 3, {leading: false, trailing: true}),{passive: true});

//This function could be just a call for oldPct = percent, if a state for oldPct exists.
function setValue (){
  oldPct = percent;
  console.log('setValue',oldPct)
}

/* Doing the scrollbound this way, we cannot control the ease
/ it is better to make a simple function to control the way
/ the ease work with a example below;
/  handleScroll = () => {
    const finalPos = -52;

    const newPosition = this.percent / 100 * finalPos;
    this.camera.position.z += (newPosition - this.camera.position.z) / 16;
  }
/
*/
function handleScroll (){
  let finalPos = 0;
  let initialPos = -30;

  let newPosition = (percent/100) * finalPos;

  if(percent > oldPct && camera.position.z < 0){
    // console.log('if')
    camera.position.z += (newPosition - camera.position.z) / 24;
  } else if(percent < oldPct && camera.position.z > -30){
    // console.log('else')
    camera.position.z -= (newPosition - camera.position.z) / 24;
  }
  console.log(camera.position.z)
}

function render () {
  // requestAnimationFrame(render);
  // controls.update();
  renderer.render(scene, camera)
}

render();
