import "./style.css";
import * as THREE from "three";

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(300);
camera.position.setX(-3);

renderer.render(scene, camera);

// Background

const spaceTexture = new THREE.TextureLoader().load("./assets/art.jpg");
scene.background = spaceTexture;

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//Stars

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const starTexture = new THREE.TextureLoader().load("./assets/glow.jpg");

  const material = new THREE.MeshStandardMaterial({ map: starTexture });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(500).fill().forEach(addStar);

// Avatar

const objTexture = new THREE.TextureLoader().load("./assets/rocket.jpg");

const obj = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: objTexture })
);

scene.add(obj);

// Avatar2

const objTexture2 = new THREE.TextureLoader().load("./assets/black holes.jpg");

const obj2 = new THREE.Mesh(
  new THREE.BoxGeometry(3, 3, 3),
  new THREE.MeshBasicMaterial({ map: objTexture2 })
);
scene.add(obj2);

// Avatar3

const objTexture3 = new THREE.TextureLoader().load("./assets/star_life.jpg");

const obj3 = new THREE.Mesh(
  new THREE.BoxGeometry(2, 2, 2),
  new THREE.MeshBasicMaterial({ map: objTexture3 })
);
scene.add(obj3);

// Mars

const marsTexture = new THREE.TextureLoader().load("./assets/mars.gif");

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
  })
);

scene.add(mars);

// glow

const glowTexture = new THREE.TextureLoader().load("./assets/yellow_glow.jpg");

const glow = new THREE.Mesh(
  new THREE.SphereGeometry(0.1, 30, 30),
  new THREE.MeshStandardMaterial({
    map: glowTexture,
    
  })
);

scene.add(glow);

//cubes

function addBox() {

  const geometry = new THREE.BoxGeometry(0.5, 1, 5);
  const cubeTexture = new THREE.TextureLoader().load("./assets/green_glow.jpg");
  const normalTexture = new THREE.TextureLoader().load("./assets/normal.jpg");

  const material = new THREE.MeshStandardMaterial({
    map: cubeTexture,
    normalMap: normalTexture,
  });

  const cubes = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  cubes.position.set(x, y, z);
  scene.add(cubes);
}
Array(10).fill().forEach(addBox);

obj.position.z = -6;
obj.position.x = 4;

obj2.position.z = 8;
obj2.position.x = -5;

obj3.position.z = 36;
obj3.position.x = 1.5;

mars.position.z = 29;
mars.position.setX(-10);

glow.position.z = 20;
glow.position.setX(5);

// Scroll Animation

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  mars.rotation.x += 0.05;
  mars.rotation.y += 0.05;
  mars.rotation.z += 0.05;

  obj.rotation.y += 0.008;
  obj.rotation.z += 0.008;

  obj2.rotation.y += 0.04;
  obj2.rotation.z += 0.04;

  obj3.rotation.y += 0.04;
  obj3.rotation.z += 0.04;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  mars.rotation.x += 0.005;

  obj.rotation.x += 0.002;
  obj.rotation.y += 0.001;

  obj2.rotation.x += 0.002;
  obj2.rotation.y += 0.001;

  obj3.rotation.x += 0.002;
  obj3.rotation.y += 0.001;

  renderer.render(scene, camera);
}

animate();
