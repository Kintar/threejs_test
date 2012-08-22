SceneManager = {};

SceneManager.setupStats = function() {
    this.stats = new Stats();
    this.stats.domElement.style.position = 'absolute';
    this.stats.domElement.style.bottom = '0px';
    $(document.body).append(this.stats.domElement);
}

SceneManager.setupRenderer = function() {
    this.renderer = null;

    if (Detector.webgl) {
        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            preserveDrawingBuffer: true
        });
        this.renderer.setClearColorHex(0xBBBBBB, 1);
    }
    else {
        this.renderer = new THREE.CanvasRenderer();
    }
    
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    $('#glContainer').append(this.renderer.domElement);
}

SceneManager.setupScene = function() {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 10000);
    this.camera.position.set(0, 0, 3);
    this.scene.add(this.camera);
    
    // create a camera contol
    this.cameraControls = new THREE.TrackballControls(camera, document.getElementById('container'))
    var light = new THREE.AmbientLight(Math.random() * 0xffffff);
    this.scene.add(light);
    var light = new THREE.DirectionalLight(Math.random() * 0xffffff);
    light.position.set(Math.random(), Math.random(), Math.random()).normalize();
    this.scene.add(light);
    
}
    
SceneManager.init = function () {
    if (!ContentManager.initialied)
        ContentManager.init();
        
    this.setupRenderer();
    this.setupScene();
    this.setupStats();
}

SceneManager.render = function() {

    // update camera controls
    this.cameraControls.update();

    // actually render the scene
    this.renderer.render(this.scene, this.camera);
}

SceneManager.animate = function() {
    requestAnimationFrame(this.animate);
    this.render();
    this.stats.update();
}