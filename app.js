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
window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	renderer.setSize( width, height )
	camera.aspect = width / height
	camera.updateProjectionMatrix()
});


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
var constantMoving = 1.7;

window.addEventListener("scroll", _u.throttle(function(){
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
}, 5, {leading: false, trailing: true}),{passive: true});

//This function could be just a call for oldPct = percent, if ComponentDidMount exists.
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
  // requestAnimationFrame(handleScroll)
  renderer.render(scene, camera)
}

render();