// Place where things will be rendered overall
const scene = new THREE.Scene()

/*
*   The Camera that will be the way to "film" the scene
*   PerspectiveCamera() is a function which mimics the human eye.
*   PerspectiveCamera(Field of view,
*   width / height, 
*   Kinda serves as Z-index but anything below which is setted will not be showed,
*   the end of the Z-index and anything setted further away will not be showed) 
*/
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )

// The render per say with just a antialyser for smoothest edges
const renderer = new THREE.WebGLRenderer({ antialias: true})

// The main size of the render.
renderer.setSize( window.innerWidth, window.innerHeight)

// Set the color of the background.
renderer.setClearColor("#6acdff")

// The camera position in/out.
camera.position.z = 20

// Append itself to the body of the html.
document.body.appendChild( renderer.domElement )


// Rezise the render with the size of view.
window.addEventListener( 'resize', () => {
	let width = window.innerWidth
	let height = window.innerHeight
	renderer.setSize( width, height )
	camera.aspect = width / height
	camera.updateProjectionMatrix()
})


// Set the Type of geometric object which is going to be rendered, made up of vertices (points) and faces.
var geometry = new THREE.BoxGeometry( 1, 1, 1)
// Set the material which forms the object, includes color and the way that light will be interacting whith it
var material = new THREE.MeshStandardMaterial( { color: "aquamarine" })
// Transform as one the Geometry and the Material of the object that will be rendered.
var cube = new THREE.Mesh ( geometry, material )
scene.add( cube )


/*
* Here we create another box, but larger than the first one.
* With a basic material which doesn't reflect light and setting wireframe visible and the faces transparent.
*/
var geometry = new THREE.BoxGeometry( 3, 3, 3)
var material = new THREE.MeshBasicMaterial( {
 color: "#000", wireframe: true, transparent: true
})
var wireframeCube = new THREE.Mesh ( geometry, material )
scene.add( wireframeCube )

// The wireframe of the cone.
var geometry = new THREE.ConeGeometry( 12, 12, 12)
var material = new THREE.MeshBasicMaterial({
    color: "white", wireframe: true, transparent: false
})
var wireframeCone = new THREE.Mesh (geometry, material)
scene.add(wireframeCone)

/*
*  This function got the color and how intense the light should be.
*   It will just change how our colors appear.
*   Ambient light is omnipresent and applied to everything equally.
*/
var ambientLight = new THREE.AmbientLight ( 0xffffff, 0.5)
scene.add( ambientLight )



// A Point Light, it's like a lightbulb. Light from this will spread in all directions equally from the point of origin.
var pointLight = new THREE.PointLight( 0xffffff, 1 );
// This set the position on the Point Light, being (y, x, z), axis-x up/down and axis-y left/right, axis-z in/out
pointLight.position.set( 25, 50, 25);
scene.add( pointLight );

/* 
*   Like all requestAnimationFrame functions, this will be called 60 times every second,
*   creating our smooth 60 FPS 3D render animation.
*   Those commands below will make the cube inside the scene move itself in .04 radian.
*   axis-x left/right and axis-y up/down 
*/
function animate () {
    requestAnimationFrame( animate )
    cube.position.y = -2;
    cube.rotation.x += 0.04;
    cube.rotation.y += 0.04;
    wireframeCube.rotation.x -= 0.01;
    wireframeCube.rotation.y -= 0.01;
    wireframeCone.rotation.y -= 0.02;
    wireframeCube.position.y = -2;
    renderer.render( scene, camera )
}

animate()