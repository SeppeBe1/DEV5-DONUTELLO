//import threejs
import * as THREE from 'three';
import {
    OBJLoader
} from 'three/examples/jsm/loaders/OBJLoader.js';
import {
    OrbitControls
} from 'three/examples/jsm/controls/OrbitControls.js';

//Scene
const scene = new THREE.Scene();
//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5; // <- New code
//Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("pink");
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Make Canvas Responsive
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

//Lights
const light = new THREE.PointLight(0xFFFFFF, 1, 200);
light.position.set(5, 5, 5);
scene.add(light);

//ambient light
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.4);
scene.add(ambientLight);

//orbit Controls for Camera 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.screenSpacePanning = false;
controls.minDistance = 3;
controls.maxDistance = 6;
camera.position.set(0, 20, 100);
controls.update();

//import donut object from obj file
const loader = new OBJLoader();
loader.load(
    // resource URL
    '/assets/models/Dough.obj',
    // called when resource is loaded
    function (object) {
        //add the color from the button when clicking button green
        object.traverse(function (child) {
            if (child.isMesh) {
                //add the color
                child.material.color.set("#F1B166");
            }
        });

        //object rotation set
        object.rotation.set(0.6, 5, 0.3);
        object.scale.set(15, 15, 15);
        scene.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        document.getElementById("loading__time").innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded';
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
)

let glaze = "none";

const loaderOne = new OBJLoader();
loaderOne.load(
    // resource URL
    '/assets/models/Glaze.obj',
    // called when resource is loaded
    function (object) {

        //add the color from the button when clicking button green
        object.traverse(function (child) {
            if (child.isMesh) {
                //add the color from the button when clicking button green

                const buttonsglaze = document.querySelectorAll('.color-circle-glaze');
                buttonsglaze.forEach(buttonglaze => {
                    buttonglaze.addEventListener('click', function () {
                        console.log("button clicked");
                        let color = buttonglaze.getAttribute("data-color");
                        console.log(color);

                        glaze = buttonglaze.getAttribute("data-name");

                        child.material.color.set(color);
                    })
                });
            }
        });
        //object rotation set
        object.rotation.set(0.6, 5, 0.3);
        object.scale.set(15, 15, 15);
        scene.add(object);
    },
    // called when loading is in progresses
    function (xhr) {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        document.getElementById("loading__time").innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded';
    },
    // called when loading has errors
    function (error) {
        console.log('An error happened');
    }
)


let sprinkles = "none";

const buttonssprinkles = document.querySelectorAll('.color-circle-sprinkles');
buttonssprinkles.forEach(buttonsprinkle => {
    buttonsprinkle.addEventListener('click', function () {
        console.log("button clicked");
        
    //dispose cuurnt obj
    
    scene.remove(scene.children[5]);

 
   
        let model = buttonsprinkle.getAttribute("data-model");
        let color = buttonsprinkle.getAttribute("data-color");

        
            sprinkles= buttonsprinkle.getAttribute("data-name");
        
      
        console.log(glaze)

       
    
        //omport donu tmodel from obj file
        const loader = new OBJLoader();
        loader.load(
            // resource URL
            model,
            // called when resource is loaded
            function (object) {

                //add the color from the button when clicking button green
                object.traverse(function (child) {
                    if (child.isMesh) {
                        //add color to the object
                        child.material.color.set(color);
                        
                    }
                });

                //object rotation set
                object.rotation.set(0.6, 5, 0.3);

                object.scale.set(15, 15, 15);
                scene.add(object);
            },
            // called when loading is in progresses
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

                document.getElementById("loading__time").innerHTML = (xhr.loaded / xhr.total * 100) + '% loaded';
            },
            // called when loading has errors
            function (error) {
                console.log('An error happened');
            }
        )

    });

});

//add a card tho the donut geometry
const geometry = new THREE.BoxGeometry(1, 0.05, 1);
const material = new THREE.MeshBasicMaterial({
    color: 0xffffff
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

cube.position.set(0.3, 0.5, 1.5);
cube.rotation.set(0.6, 0,0);

//add texture to little cube
const texture = new THREE.TextureLoader().load('/assets/textures/Donutello_card.jpg');
const materialTexture = new THREE.MeshBasicMaterial({
    map: texture
});
//texture rotation in degrees

cube.material = materialTexture;

console.log("halooooooooo")
// Rendering Function
const rendering = function () {
    requestAnimationFrame(rendering);

    // Update trackball controls
    controls.update();
    //rotate object
    renderer.render(scene, camera);
}
rendering();

console.log(glaze)
console.log(sprinkles)

// upload to the api
let btnSubmit = document.querySelector(".subBtn");


btnSubmit.addEventListener("click",function(e){
    e.preventDefault();
    fetch ("https://donuttelloapi.onrender.com/api/v1/donuts", {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
    },
    body: JSON.stringify({
        "donutTopping": glaze,

    }),
    }).then(response => {
        console.log(response);
        return response.json();

    }).then(json => {
        console.log(json.status);
        if(json.status == "failed"){
            validation.innerHTML = "Invalid username/password"
            console.log("geen kaas");
        } else  if(json.status == "success"){
            console.log(json.data.token);
            localStorage.setItem("token", json.data.token);
            window.location.href = "../Pages/backend.html";
        }
    });
});
