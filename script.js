const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(25,window.innerWidth/window.innerHeight,0.1,1000);
camera.position.z = 100;

const renderer = new THREE.WebGLRenderer({antialias:true , alpha:true});
renderer.setSize(window.innerWidth,(window.innerHeight-1));
renderer.setPixelRatio(window.devicePixelRatio);

const element = document.getElementById("3d");
element.appendChild(renderer.domElement);

var mars;

let loader = new THREE.GLTFLoader();
loader.load('./mars/scene.gltf', (gltf) => {
    scene.add(gltf.scene);
    renderer.render(scene, camera);
    mars = gltf.scene.children[0];
    animate();
});

const animate = ()=>{
    requestAnimationFrame(animate)
    mars.rotation.z += 0.002;
    contorls.update();
    renderer.render(scene,camera)
}

var light = new THREE.PointLight(0xFFFFFF,1,200)
light.position.set(30,25,15)
scene.add(light);

// const ambinet = new THREE.AmbientLight(0xffffff,1);
// scene.add(ambinet);
const contorls = new THREE.OrbitControls(camera,renderer.domElement);
contorls.enableDamping = true;
contorls.enablePan = false;
contorls.enableZoom = false;
contorls.autoRotate = true;
contorls.autoRotateSpeed = 5;

console.log("object")

window.addEventListener("resize",()=>{
    renderer.setSize(window.innerWidth,(window.innerHeight-1));
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
})

