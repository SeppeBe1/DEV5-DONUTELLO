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
const renderer = new THREE.WebGLRenderer({
    antialias: true
});
renderer.setClearColor("pink");
renderer.setSize(window.innerWidth, window.innerHeight);


//add the canvas to the html with id

document.body.appendChild(renderer.domElement);
renderer.domElement.id = "canvas";



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


        sprinkles = buttonsprinkle.getAttribute("data-name");


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
cube.rotation.set(0.6, 0, 0);

//add texture to little cube
const texture = new THREE.TextureLoader().load('/assets/textures/Donutello_card.jpg');

//replace texture with image from input and update texture
const input = document.querySelector('#logo');
input.addEventListener('change', function (e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.addEventListener('load', function (e) {
        texture.image.src = e.target.result;
        texture.needsUpdate = true;
        
        //texture full size
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        texture.generateMipmaps = false;
        texture.flipY = true;
        texture.unpackAlignment = 1;

        //texture rotation in degrees






    });
    reader.readAsDataURL(file);
});


const materialTexture = new THREE.MeshBasicMaterial({
    map: texture
});
//texture rotation in degrees

cube.material = materialTexture;


// Rendering Function
const rendering = function () {
    requestAnimationFrame(rendering);

    // Update trackball controls
    controls.update();
    //rotate object
    renderer.render(scene, camera);
}
rendering();

//-_______________________API__________________________-//


console.log(glaze)
console.log(sprinkles)


let logoUrl;
let datum = Date.now();


let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");
let reader = new FileReader();
let img = new Image();









let cloudinaryAPI = "734646525192331";
let cloudName = "dq2ctla9j";
let button = document.querySelector(".subBtn");
button.addEventListener("click", (e) => {
    let preview = canvas.toDataURL("image/png");

    let formData = new FormData();
    formData.append("file", preview);
    formData.append("upload_preset", "eg0z27kj");
    fetch("https://api.cloudinary.com/v1_1/dq2ctla9j/image/upload", {
            method: "POST",
            body: formData

        })

        .then(response => response.json())
        .then(data => {
            let previewURL = data.secure_url;
            console.log(previewURL);

           

            if (document.querySelector("#logo").files.length == 0) {




                let apiUrl = "https://donuttelloapi.onrender.com/api/v1/donuts";

                let donutDeeg = "Standaard deeg"
                let donutVulling = "test"
                let donutGlazuur = glaze
                let donutTopping = sprinkles
                let donutNaam = "Donuttello";

                let bedrijfsnaam = "test"
                let email = "test"
                let telefoonnummer = "1234567891"
                let adres = "test"
                let huisnr = "23"
                let postcode = "2244"
                let woonplaats = "test"
                let logo = "Donutello Logo"
                console.log(donutDeeg, donutVulling, donutGlazuur, donutTopping, bedrijfsnaam, email, telefoonnummer, adres, huisnr, postcode, woonplaats, logo, datum);


                fetch(apiUrl, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            "donutPreview": previewURL,
                            "donutNaam": donutNaam,
                            "donutDeeg": donutDeeg,
                            "donutVulling": donutVulling,
                            "donutGlazuur": donutGlazuur,
                            "donutTopping": donutTopping,
                            "bedrijfsnaam": bedrijfsnaam,
                            "email": email,
                            "telefoon": telefoonnummer,
                            "straat": adres,
                            "straatnr": huisnr,
                            "postcode": postcode,
                            "gemeente": woonplaats,
                            "logo": "",
                            "ready": "false",
                            "hoeveelheid": "5",
                            //datum now
                            "datum": datum
                        })
                    })


                    .then(response => response.json())
                    .then(json => {

                        if (json.status === "success") {
                            alert("Donut toegevoegd");
                          

                            //de donut komt in de database


                        } else {
                            alert("Donut niet toegevoegd");
                        }


                    })
            } else {

                let logo = document.querySelector("#logo").files[0];
                let formData = new FormData();
                formData.append("file", logo);
                formData.append("upload_preset", "eg0z27kj");
                fetch("https://api.cloudinary.com/v1_1/dq2ctla9j/image/upload", {
                        method: "POST",
                        body: formData

                    })

                    .then(response => response.json())
                    .then(data => {
                        logoUrl = data.secure_url;


                        let apiUrl = "https://donuttelloapi.onrender.com/api/v1/donuts";

                        let donutDeeg = "test"
                        let donutVulling = "test"
                        let donutGlazuur = "test"
                        let donutTopping = "test"
                        let donutNaam = "Donuttello";
        
                        let bedrijfsnaam = "test"
                        let email = "test"
                        let telefoonnummer = "1234567891"
                        let adres = "test"
                        let huisnr = "23"
                        let postcode = "2244"
                        let woonplaats = "test"


                        fetch(apiUrl, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },

                                body: JSON.stringify({

                                    "donutPreview": previewURL,
                                    "donutNaam": donutNaam,
                                    "donutDeeg": donutDeeg,
                                    "donutVulling": donutVulling,
                                    "donutGlazuur": donutGlazuur,
                                    "donutTopping": donutTopping,
                                    "bedrijfsnaam": bedrijfsnaam,
                                    "email": email,
                                    "telefoon": telefoonnummer,
                                    "straat": adres,
                                    "straatnr": huisnr,
                                    "postcode": postcode,
                                    "gemeente": woonplaats,
                                    "logo": logoUrl,
                                    "ready": "false",
                                    "hoeveelheid": "5",
                                    //datum now
                                    "datum": datum
                                })
                            })
                            .then(response => response.json())
                            .then(json => {

                                if (json.status === "success") {
                                    alert("Donut toegevoegd");
         
                                } else {
                                    alert("Donut niet toegevoegd");
                                }




                            })









                    })
            };



















        })









    e.preventDefault();



});





