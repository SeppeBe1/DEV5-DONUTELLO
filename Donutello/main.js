//import latetst version three.js from unpkg

import * as THREE from 'https://unpkg.com/three@0.147.0/build/three.module.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
console.log(scene);
console.log(camera);
console.log(renderer);

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );