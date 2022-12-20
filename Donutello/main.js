//import threejs

import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';



//Scene
const scene = new THREE.Scene();
//Camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5; // <- New code
//Renderer
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#233143");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})



//Lights
const light = new THREE.PointLight(0xFFFFFF, 1, 100);
light.position.set(5, 5, 5);
scene.add(light);

//orbit Controls for Camera 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 1;
controls.maxDistance = 5;


camera.position.set( 0, 20, 100 );
controls.update();


//omport donu tmodel from obj file
const loader = new OBJLoader();
loader.load(
    // resource URL
    '/assets/models/Donut.obj',
    // called when resource is loaded
    function ( object ) {

        //add color to Donut.obj from menu
        object.traverse( function ( child ) {
            if ( child.isMesh ) {
                child.material.color.set( 0x00ff00 );
            }
        } );
        
        
        object.scale.set( 10, 10, 10 );
        scene.add( object );
    },
    // called when loading is in progresses
    function ( xhr ) {
        console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

        document.getElementById("loading__time").innerHTML = ( xhr.loaded / xhr.total * 100 ) + '% loaded';
    },
    // called when loading has errors
    function ( error ) {
        console.log( 'An error happened' );
    }
);


// Rendering Function
const rendering = function() {
    requestAnimationFrame(rendering);

    // Update trackball controls
    controls.update();
    // Constantly rotate box
    scene.rotation.z -= 0.005;
    scene.rotation.x -= 0.01;
    renderer.render(scene, camera);
}
rendering();