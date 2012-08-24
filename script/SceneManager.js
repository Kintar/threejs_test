var SceneManager = SceneManager || {};

SceneManager.setupStats = function() {
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0px';
    $(document.body).append(this.stats.domElement);
};

SceneManager.setupRenderer = function() {
    this.renderer = null;

    this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        preserveDrawingBuffer: true
    });
    this.renderer.setClearColorHex(0xBBBBBB, 1);
    
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    this.container.appendChild(this.renderer.domElement);
};

SceneManager.setupScene = function() {
    SceneManager.scene = new THREE.Scene();
    SceneManager.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    SceneManager.camera.position.set(0, 4, 20);
    SceneManager.camera.lookAt(new THREE.Vector3(0,0,0));
    SceneManager.scene.add(SceneManager.camera);
    
    // create a camera contol
    //SceneManager.cameraControls = new THREE.TrackballControls(SceneManager.camera, SceneManager.container);
    
    // Create some lighting
    var light = new THREE.AmbientLight(0xffffff);
    this.scene.add(light);
    var light = new THREE.DirectionalLight(0xffffff);
    light.position.set(Math.random(), Math.random(), Math.random()).normalize();
    this.scene.add(light);
    
    // Add our model
    this.scene.add(ContentManager.Models.cube);
    
    // Set up our time-based rotation
    SceneManager.angle = 0;
    SceneManager.rotation = new THREE.Quaternion();
    SceneManager.YAxis = new THREE.Vector3(0, 1, 0);
};
    
SceneManager.init = function () {
    if (!ContentManager.initialied)
        ContentManager.init();
        
    this.container = document.getElementById('glContainer');
    this.setupRenderer();
    this.setupScene();
    this.setupStats();
    
    SceneManager.clock = new THREE.Clock();
    SceneManager.clock.start();
};

SceneManager.update = function() {
    SceneManager.angle += SceneManager.clock.getDelta();
    SceneManager.angle %= 360;
    ContentManager.Models.cube.quaternion.setFromAxisAngle(SceneManager.YAxis, SceneManager.angle);

    // update camera controls
    if (this.cameraControls)
        this.cameraControls.update();
};

SceneManager.render = function() {
    this.renderer.render(this.scene, this.camera);
};

SceneManager.animate = function() {
    requestAnimationFrame(SceneManager.animate);
    SceneManager.update();
    SceneManager.render();
    SceneManager.stats.update();
};