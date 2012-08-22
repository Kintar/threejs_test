var ContentManager = ContentManager || {};

ContentManager.Textures = {};
ContentManager.Models = {};

ContentManager.initialized = false;
ContentManager.init = function() {
    if (ContentManager.iniinitialized) return;
    
    var webgltex = THREE.ImageUtils.loadTexture("content/webgl.png");
    ContentManager.Textures.webgl = webgltex;
    
    var cubeGeom = new THREE.CubeGeometry(5,5,5);
    var cubeMaterial = new THREE.MeshLambertMaterial({ 
            map: ContentManager.Textures.webgl
        });
    ContentManager.Models.cube = new THREE.Mesh(cubeGeom, cubeMaterial);
    ContentManager.Models.cube.useQuaternion = true;
};