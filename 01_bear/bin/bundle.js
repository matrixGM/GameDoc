/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Main.ts":
/*!*********************!*\
  !*** ./src/Main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const GameApp_1 = __webpack_require__(/*! ./lib/GameApp */ "./src/lib/GameApp.ts");
const SceneGraphics_1 = __webpack_require__(/*! ./example/SceneGraphics */ "./src/example/SceneGraphics.ts");
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 764;
const GAME = new GameApp_1.GameApp(GAME_WIDTH, GAME_HEIGHT, false);
GAME.UseScenes = [SceneGraphics_1.SceneGraphics];
GAME.Load().then(() => {
    let l_Scene = new SceneGraphics_1.SceneGraphics(GAME);
    GAME.GoToCenter(l_Scene);
    GAME.stage.addChild(l_Scene);
    GAME.AddFPSInfo();
});


/***/ }),

/***/ "./src/SceneLoading.ts":
/*!*****************************!*\
  !*** ./src/SceneLoading.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneLoading = void 0;
const LoadingBar_1 = __webpack_require__(/*! ./modules/LoadingBar */ "./src/modules/LoadingBar.ts");
const ResourceTool_1 = __webpack_require__(/*! ./lib/ResourceTool */ "./src/lib/ResourceTool.ts");
const RESOURCE_LIST = {
    loading: "assets/loading/loading.json"
};
class SceneLoading extends PIXI.Container {
    constructor(a_GameApp) {
        super();
        this.x = a_GameApp.screen.width / 2;
        this.y = a_GameApp.screen.height / 2;
        let l_SpriteFrames = SceneLoading.Resource.GetResource(RESOURCE_LIST.loading).data.frames;
        let l_Frames = [];
        for (let n in l_SpriteFrames) {
            l_Frames.push(PIXI.Texture.from(n));
        }
        let l_LoadingAni = new PIXI.AnimatedSprite(l_Frames);
        l_LoadingAni.anchor.set(0.5, 0.5);
        l_LoadingAni.position.set(0, 0);
        this.addChild(l_LoadingAni);
        l_LoadingAni.animationSpeed = 0.5;
        l_LoadingAni.play();
        this.CreateBar(a_GameApp);
    }
    static InitResource() {
        SceneLoading.Resource = ResourceTool_1.ResourceTool.AddSceneResource(SceneLoading.name, RESOURCE_LIST);
    }
    CreateBar(a_GameApp) {
        const l_Loader = a_GameApp.GetLoader();
        let l_LoaderProcess = new LoadingBar_1.LoadingBar(a_GameApp);
        l_Loader.onProgress.add((_loader, _resources) => {
            l_LoaderProcess.UpdateBar(_loader.progress);
        });
        this.addChild(l_LoaderProcess);
    }
    Load() {
        ResourceTool_1.ResourceTool.PrepareResource();
        PIXI.Loader.shared.load((_loader, _resources) => {
            this.emit(SceneLoading.EventNames.OnLoaded);
        });
    }
    Destroy() {
        this.visible = false;
    }
}
exports.SceneLoading = SceneLoading;
SceneLoading.EventNames = {
    OnLoaded: "OnLoaded"
};


/***/ }),

/***/ "./src/example/SceneGraphics.ts":
/*!**************************************!*\
  !*** ./src/example/SceneGraphics.ts ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneGraphics = void 0;
const ResourceTool_1 = __webpack_require__(/*! ../lib/ResourceTool */ "./src/lib/ResourceTool.ts");
class SceneGraphics extends PIXI.Container {
    constructor(a_GameApp) {
        super();
        a_GameApp.renderer.backgroundColor = 0x1099bb;
        this.Test5(a_GameApp);
    }
    static InitResource() {
        this.Resource = ResourceTool_1.ResourceTool.AddSceneResource(this.name, this.ResourceList);
    }
    Test1() {
        let l_Line = new PIXI.Graphics();
        this.addChild(l_Line);
        l_Line.lineStyle(4, 0xffffff)
            .moveTo(0, 0)
            .lineTo(50, 50)
            .lineTo(100, 0)
            .lineTo(150, 50);
        let l_Points = [
            { x: 200, y: 50 }, { x: 150, y: 0 }
        ];
        l_Points.forEach(_V => {
            l_Line.lineTo(_V.x, _V.y);
        });
        let l_Triangle = new PIXI.Graphics();
        l_Triangle.beginFill(0xff0000, 0.3);
        l_Triangle.moveTo(0, 0);
        l_Triangle.lineTo(Math.cos(0 * (60) * (Math.PI / 180)) * 100, Math.sin(0 * (60) * (Math.PI / 180)) * 100);
        l_Triangle.lineTo(Math.cos(1 * (60) * (Math.PI / 180)) * 100, Math.sin(1 * (60) * (Math.PI / 180)) * 100);
        l_Triangle.lineTo(0, 0);
        this.addChild(l_Triangle);
    }
    Test2(a_GameApp) {
        this.interactive = true;
        let l_Line = new PIXI.Graphics();
        this.addChild(l_Line);
        let l_PointX = 0;
        let l_PointY = 0;
        let l_W = a_GameApp.renderer.width / 2;
        let l_H = a_GameApp.renderer.height / 2;
        this.on("mousemove", (_Event) => {
            if (l_PointX === 0) {
                l_PointX = _Event.data.getLocalPosition(this).x - l_W;
                l_PointY = _Event.data.getLocalPosition(this).y - l_H;
                return;
            }
            l_Line.lineStyle(4, 0xffffff);
            l_Line.moveTo(l_PointX, l_PointY);
            l_Line.lineTo(_Event.data.global.x - l_W, _Event.data.global.y - l_H);
            l_PointX = _Event.data.global.x - l_W;
            l_PointY = _Event.data.global.y - l_H;
        });
    }
    Test3() {
    }
    Test4() {
        let totalCount = 360;
        let l_Radius = 200;
        for (let i = 0; i < totalCount; i++) {
            let colorArray = hsvToRGB2(i * 360 / totalCount, 1, 1);
            let color = colorArray[0] * 65536 + colorArray[1] * 256 + colorArray[2];
            let arcGraphic = new PIXI.Graphics();
            arcGraphic.beginFill(color, 1);
            arcGraphic.arc(0, 0, l_Radius, (0) * (Math.PI / 180), (1) * (Math.PI / 180));
            arcGraphic.endFill();
            arcGraphic.beginFill(color, 1);
            arcGraphic.moveTo(0, 0);
            arcGraphic.lineTo(0, l_Radius);
            arcGraphic.lineTo(Math.sin(2 * (Math.PI / 180)) * l_Radius, Math.cos(2 * (Math.PI / 180)) * l_Radius);
            arcGraphic.lineTo(0, 0);
            arcGraphic.endFill();
            arcGraphic.rotation = i * (Math.PI / 180);
            this.addChild(arcGraphic);
        }
    }
    Test5(a_GameApp) {
        let l_Bear = new Bear();
        this.addChild(l_Bear);
        var tk = 0;
        let faceGraphic = l_Bear.faceGraphic;
        a_GameApp.ticker.add(function (delta) {
            tk += 1;
            var tmpPg = Math.sin(tk * (Math.PI / 180));
            faceGraphic.clear();
            faceGraphic.lineStyle(20, 0x000000, .75);
            faceGraphic.beginFill(0xffffff, 1);
            faceGraphic.moveTo(-100, -100);
            faceGraphic.quadraticCurveTo(0, -160, 100, -100);
            faceGraphic.quadraticCurveTo(l_Bear.mouseSpriteR.x, 0 + 30 + ((l_Bear.mouseSpriteR.y - 30) / (a_GameApp.renderer.height * 0.5)) * 100, 100, 100);
            faceGraphic.lineTo(-100, 100);
            faceGraphic.quadraticCurveTo(l_Bear.mouseSpriteL.x, 0 + 30 + ((l_Bear.mouseSpriteL.y - 30) / (a_GameApp.renderer.height * 0.5)) * 100, -100, -100);
        });
    }
}
exports.SceneGraphics = SceneGraphics;
SceneGraphics.ResourceList = {};
function hsvToRGB2(hue, saturation, value) {
    var hi;
    var f;
    var p;
    var q;
    var t;
    while (hue < 0) {
        hue += 360;
    }
    hue = hue % 360;
    saturation = saturation < 0
        ? 0 : saturation > 1
        ? 1 : saturation;
    value = value < 0 ? 0
        : value > 1 ? 1
            : value;
    value *= 255;
    hi = (hue / 60 | 0) % 6;
    f = hue / 60 - hi;
    p = value * (1 - saturation) | 0;
    q = value * (1 - f * saturation) | 0;
    t = value * (1 - (1 - f) * saturation) | 0;
    value |= 0;
    switch (hi) {
        case 0:
            return [value, t, p];
        case 1:
            return [q, value, p];
        case 2:
            return [p, value, t];
        case 3:
            return [p, q, value];
        case 4:
            return [t, p, value];
        case 5:
            return [value, p, q];
    }
}
class Bear extends PIXI.Container {
    constructor() {
        super();
        this.faceGraphic = new PIXI.Graphics;
        this.addChild(this.faceGraphic);
        this.eyeGraphic = new PIXI.Graphics();
        this.addChild(this.eyeGraphic);
        this.eyeGraphic.beginFill(0x000000, 1);
        this.eyeGraphic.drawCircle(-60, -45, 10);
        this.eyeGraphic.drawCircle(60, -45, 10);
        this.eyeGraphic.scale.y = 0.85;
        this.tearGraphic = new PIXI.Graphics();
        this.addChild(this.tearGraphic);
        this.tearGraphic.beginFill(0x53caf6);
        this.tearGraphic.drawCircle(70, -32, 8);
        this.tearGraphic.visible = false;
        this.cryGraphic = new PIXI.Graphics();
        this.addChild(this.cryGraphic);
        this.cryGraphic.lineStyle(10, 0x000000, 1);
        this.cryGraphic.moveTo(-75, -37);
        this.cryGraphic.lineTo(-45, -43);
        this.cryGraphic.moveTo(45, -43);
        this.cryGraphic.lineTo(75, -37);
        this.cryGraphic.visible = false;
        this.noseGraphic = new PIXI.Graphics();
        this.addChild(this.noseGraphic);
        this.noseGraphic.beginFill(0x000000, 1);
        this.noseGraphic.drawCircle(0, 0, 13);
        this.noseGraphic.scale.y = 0.85;
        this.topEarsBackGraphic = new PIXI.Graphics();
        this.addChild(this.topEarsBackGraphic);
        this.topEarsBackGraphic.beginFill(0xffffff, 1);
        this.topEarsBackGraphic.drawCircle(-85, -129, 25);
        this.topEarsBackGraphic.drawCircle(85, -129, 25);
        this.topEarsBackGraphic.scale.y = 0.9;
        this.topEarsFrontGraphic = new PIXI.Graphics();
        this.addChildAt(this.topEarsFrontGraphic, 0);
        this.topEarsFrontGraphic.lineStyle(40, 0x000000, .75);
        this.topEarsFrontGraphic.drawCircle(-85, -129, 25);
        this.topEarsFrontGraphic.drawCircle(85, -129, 25);
        this.topEarsFrontGraphic.scale.y = 0.9;
        this.mouseSpriteL = new PIXI.Graphics();
        this.addChild(this.mouseSpriteL);
        this.mouseSpriteL.beginFill(0xff0000, 1);
        this.mouseSpriteL.drawCircle(0, 0, 60);
        this.mouseSpriteL.endFill();
        this.mouseSpriteL.alpha = 0;
        this.mouseSpriteL.x = this.mouseSpriteL["defaultX"] = -150;
        this.mouseSpriteL.y = this.mouseSpriteL["defaultY"] = 30;
        this.mouseSpriteL["maxX"] = -100;
        this.mouseSpriteL["minX"] = -400;
        this.mouseSpriteR = new PIXI.Graphics();
        this.addChild(this.mouseSpriteR);
        this.mouseSpriteR.beginFill(0xff0000, 1);
        this.mouseSpriteR.drawCircle(0, 0, 60);
        this.mouseSpriteR.endFill();
        this.mouseSpriteR.alpha = 0;
        this.mouseSpriteR.x = this.mouseSpriteR["defaultX"] = 150;
        this.mouseSpriteR.y = this.mouseSpriteR["defaultY"] = 30;
        this.mouseSpriteR["maxX"] = 400;
        this.mouseSpriteR["minX"] = 100;
        this.mouseSpriteL.interactive = this.mouseSpriteL.buttonMode = true;
        this.mouseSpriteL
            .on('pointerdown', (e) => {
            this.onDragStart(e, this, this.mouseSpriteL);
        })
            .on('pointerup', (e) => {
            this.onDragEnd(e, this, this.mouseSpriteL);
        })
            .on('pointerupoutside', (e) => {
            this.onDragEnd(e, this, this.mouseSpriteL);
        })
            .on('pointermove', (e) => {
            this.onDragMove(e, this, this.mouseSpriteL);
        });
        this.mouseSpriteR.interactive = this.mouseSpriteR.buttonMode = true;
        this.mouseSpriteR
            .on('pointerdown', (e) => {
            this.onDragStart(e, this, this.mouseSpriteR);
        })
            .on('pointerup', (e) => {
            this.onDragEnd(e, this, this.mouseSpriteR);
        })
            .on('pointerupoutside', (e) => {
            this.onDragEnd(e, this, this.mouseSpriteR);
        })
            .on('pointermove', (e) => {
            this.onDragMove(e, this, this.mouseSpriteR);
        });
    }
    onDragStart(e, a_Bear, a_Mouse) {
        a_Mouse["data"] = e.data;
        a_Mouse["alpha"] = 0.3;
        a_Mouse["dragging"] = true;
        a_Bear.eyeGraphic.visible = false;
        a_Bear.cryGraphic.visible = true;
        a_Bear.tearGraphic.visible = true;
    }
    onDragEnd(e, a_Bear, a_Mouse) {
        a_Mouse.alpha = 0;
        if (e) {
            a_Mouse["dragging"] = false;
            a_Mouse["data"] = null;
            TweenMax.to(a_Mouse, 0.35, { delay: 0, x: a_Mouse["defaultX"], y: a_Mouse["defaultY"], ease: Back.easeOut });
            a_Bear.eyeGraphic.visible = true;
            a_Bear.cryGraphic.visible = false;
            a_Bear.tearGraphic.visible = false;
        }
        else {
            a_Mouse["dragging"] = false;
            a_Mouse["data"] = null;
        }
    }
    onDragMove(e, a_Bear, a_Mouse) {
        if (a_Mouse["dragging"] == true) {
            let newPosition = a_Mouse["data"].getLocalPosition(a_Mouse.parent);
            a_Mouse.x = newPosition.x;
            a_Mouse.y = newPosition.y;
            if (a_Mouse.x > a_Mouse["maxX"]) {
                a_Mouse["dragging"] = false;
                a_Mouse["data"] = null;
                a_Bear.onDragEnd(null, a_Bear, a_Mouse);
                TweenMax.to(a_Mouse, 0.35, { delay: 0, x: a_Mouse["defaultX"], y: a_Mouse["defaultY"], ease: Back.easeOut });
                a_Bear.eyeGraphic.visible = true;
                a_Bear.cryGraphic.visible = false;
                a_Bear.tearGraphic.visible = false;
            }
            if (a_Mouse.x < a_Mouse["minX"]) {
                a_Mouse["dragging"] = false;
                a_Mouse["data"] = null;
                a_Bear.onDragEnd(null, a_Bear, a_Mouse);
                TweenMax.to(a_Mouse, 0.35, { delay: 0, x: a_Mouse["defaultX"], y: a_Mouse["defaultY"], ease: Back.easeOut });
                a_Bear.eyeGraphic.visible = true;
                a_Bear.cryGraphic.visible = false;
                a_Bear.tearGraphic.visible = false;
            }
        }
    }
}


/***/ }),

/***/ "./src/lib/GameApp.ts":
/*!****************************!*\
  !*** ./src/lib/GameApp.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.GameApp = void 0;
const PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
const ResourceTool_1 = __webpack_require__(/*! ../lib/ResourceTool */ "./src/lib/ResourceTool.ts");
const SceneLoading_1 = __webpack_require__(/*! ../SceneLoading */ "./src/SceneLoading.ts");
class GameApp extends PIXI.Application {
    constructor(a_GameWidth, a_GameHeight, a_NoWebGL = false) {
        super({
            width: a_GameWidth,
            height: a_GameHeight,
            backgroundColor: 0x000000,
            transparent: true,
            forceCanvas: a_NoWebGL
        });
        this.Width = 0;
        this.Height = 0;
        this.UseScenes = [SceneLoading_1.SceneLoading];
        this._CanvasList = [];
        this.Width = a_GameWidth;
        this.Height = a_GameHeight;
        document.body.appendChild(this.view);
        this.AddCanvas(this.view, true);
        this.InitLoader();
        window.onresize = (_Event) => {
            this.OnResize(_Event);
        };
    }
    InitLoader() {
        let l_Loader = PIXI.Loader.shared;
        l_Loader.onError.add(() => {
            console.log("#Loader OnError");
        });
        l_Loader.onLoad.add(() => {
        });
        l_Loader.onComplete.add(() => {
            console.log("#Loader OnComplete");
        });
    }
    OnResize(a_Event) {
        let l_Width = window.innerWidth;
        let l_Height = window.innerHeight;
        let l_RatioWidth = l_Width / this.Width;
        let l_RatioHeight = l_Height / this.Height;
        let l_Ratio = l_RatioWidth < l_RatioHeight ? l_RatioWidth : l_RatioHeight;
        this._CanvasList.forEach(_Canvas => {
            _Canvas.style.width = ~~(this.Width * l_Ratio) + "px";
            _Canvas.style.height = ~~(this.Height * l_Ratio) + "px";
        });
    }
    GetLoader() {
        return PIXI.Loader.shared;
    }
    AddCanvas(a_Canvas, a_IsMaster = false) {
        a_Canvas.style.position = "absolute";
        a_Canvas.style.left = "50%";
        a_Canvas.style.top = "50%";
        a_Canvas.style.transform = "translate3d( -50%, -50%, 0 )";
        this._CanvasList.push(a_Canvas);
        if (!a_IsMaster) {
            this.view.insertAdjacentElement("beforebegin", a_Canvas);
        }
        this.OnResize(null);
    }
    GoToCenter(a_Container) {
        a_Container.position.set(this.Width / 2, this.Height / 2);
    }
    AddFPSInfo() {
        let l_textStyle = new PIXI.TextStyle({
            fontFamily: "Arial",
            fontSize: 36,
            fontStyle: "italic",
            fontWeight: "bold",
            fill: 0xfffff,
            stroke: 0xffffff
        });
        let l_fps = new PIXI.Text("FPS:", l_textStyle);
        l_fps.anchor.set(1, 0);
        l_fps.x = this.Width;
        l_fps.y = 0;
        this.stage.addChild(l_fps);
        let l_FPS = 0;
        this.ticker.add(() => {
            if (Math.abs(this.ticker.FPS - l_FPS) < 0.3) {
                return;
            }
            l_FPS = this.ticker.FPS;
            l_fps.text = "FPS: " + this.ticker.FPS.toFixed(2) + "\n" + this.ticker.elapsedMS.toFixed(2);
        });
    }
    Load() {
        return new Promise((resolve, reject) => {
            ResourceTool_1.ResourceTool.AddScenes([SceneLoading_1.SceneLoading]);
            ResourceTool_1.ResourceTool.PrepareResource();
            PIXI.Loader.shared.load((loader, resources) => {
                console.log("#OnBaseLoaded");
                let l_SceneLoading = new SceneLoading_1.SceneLoading(this);
                this.stage.addChild(l_SceneLoading);
                ResourceTool_1.ResourceTool.AddScenes(this.UseScenes);
                l_SceneLoading.on(SceneLoading_1.SceneLoading.EventNames.OnLoaded, (loader, resources) => {
                    console.log("#OnResourceLoaded");
                    l_SceneLoading.Destroy();
                    this.stage.removeChild(l_SceneLoading);
                    resolve();
                });
                l_SceneLoading.Load();
            });
        });
    }
}
exports.GameApp = GameApp;
GameApp.EventNames = {
    OnLoaded: "OnLoaded"
};


/***/ }),

/***/ "./src/lib/ResourceTool.ts":
/*!*********************************!*\
  !*** ./src/lib/ResourceTool.ts ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceTool = void 0;
const PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
const SceneResource_1 = __webpack_require__(/*! ./SceneResource */ "./src/lib/SceneResource.ts");
let AllSceneResource = [];
class ResourceTool {
    static AddScenes(a_Scenes) {
        a_Scenes.forEach(_Scene => {
            if (_Scene["InitResource"]) {
                _Scene["InitResource"]();
            }
        });
    }
    ;
    static AddSceneResource(a_Namespace, a_ResourceList) {
        let l_SceneResouece = new SceneResource_1.SceneResource(a_Namespace);
        AllSceneResource.push(l_SceneResouece);
        for (let _Key in a_ResourceList) {
            switch (typeof a_ResourceList[_Key]) {
                case "object":
                    for (let __Key in a_ResourceList[_Key]) {
                        if (a_ResourceList[_Key][__Key] === "") {
                            continue;
                        }
                        l_SceneResouece.AddResource(a_ResourceList[_Key][__Key], a_ResourceList[_Key][__Key]);
                    }
                    break;
                case "string":
                    if (a_ResourceList[_Key] === "") {
                        continue;
                    }
                    l_SceneResouece.AddResource(a_ResourceList[_Key], a_ResourceList[_Key]);
                    break;
            }
        }
        return l_SceneResouece;
    }
    static ClearTempResource() {
        AllSceneResource.length = 0;
    }
    ;
    static AddResource(a_ResourceList) {
        for (let _ResourceName in a_ResourceList) {
            PIXI.Loader.shared.add(_ResourceName, a_ResourceList[_ResourceName]);
        }
        return true;
    }
    ;
    static PrepareResource() {
        while (AllSceneResource.length) {
            let l_Resource = AllSceneResource.pop();
            this.AddResource(l_Resource.GetAllResource());
        }
    }
    ;
}
exports.ResourceTool = ResourceTool;


/***/ }),

/***/ "./src/lib/SceneResource.ts":
/*!**********************************!*\
  !*** ./src/lib/SceneResource.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneResource = void 0;
const PIXI = __webpack_require__(/*! pixi.js */ "pixi.js");
class SceneResource {
    constructor(a_NameSpace) {
        this._Namespace = "";
        this._ResourceList = {};
        this._Namespace = a_NameSpace;
    }
    get Namespace() {
        return this._Namespace;
    }
    GetResourceKey(a_ResourceName) {
        return `${this._Namespace}_${a_ResourceName}`;
    }
    AddResource(a_ResourceName, a_ResourcePath) {
        this._ResourceList[this.GetResourceKey(a_ResourceName)] = a_ResourcePath;
    }
    GetResource(a_ResourceName) {
        return PIXI.Loader.shared.resources[this.GetResourceKey(a_ResourceName)];
    }
    GetResourcePath(a_ResourceName) {
        return this._ResourceList[this.GetResourceKey(a_ResourceName)];
    }
    GetAllResource() {
        return this._ResourceList;
    }
}
exports.SceneResource = SceneResource;


/***/ }),

/***/ "./src/modules/LoadingBar.ts":
/*!***********************************!*\
  !*** ./src/modules/LoadingBar.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingBar = void 0;
const WIDTH = 400;
const BAR_HEIGHT = 14;
class LoadingBar extends PIXI.Container {
    constructor(a_GameApp) {
        super();
        this._ProcessBG = new PIXI.Graphics();
        this._ProcessBG.beginFill(0xffffff, 0.5);
        let l_AppWidth = a_GameApp.screen.width;
        let l_AppHeight = a_GameApp.screen.height;
        this._BarWidth = l_AppWidth - WIDTH;
        this._X = 0 - this._BarWidth / 2;
        this._Y = l_AppHeight / 2 - 100;
        this._ProcessBG.drawRect(this._X, this._Y, this._BarWidth, BAR_HEIGHT);
        this.addChild(this._ProcessBG);
        this._ProcessBar = new PIXI.Graphics();
        this.addChild(this._ProcessBar);
    }
    UpdateBar(a_Progress) {
        this._ProcessBar.clear();
        this._ProcessBar.beginFill(0xffffff, 1);
        this._ProcessBar.drawRect(this._X, this._Y, this._BarWidth * a_Progress / 100, BAR_HEIGHT);
    }
    Distroy() {
    }
}
exports.LoadingBar = LoadingBar;


/***/ }),

/***/ "pixi.js":
/*!***********************!*\
  !*** external "PIXI" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = PIXI;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL01haW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL1NjZW5lTG9hZGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXhhbXBsZS9TY2VuZUdyYXBoaWNzLnRzIiwid2VicGFjazovLy8uL3NyYy9saWIvR2FtZUFwcC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL1Jlc291cmNlVG9vbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbGliL1NjZW5lUmVzb3VyY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL21vZHVsZXMvTG9hZGluZ0Jhci50cyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJQSVhJXCIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTs7UUFFQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBOzs7UUFHQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0EsMENBQTBDLGdDQUFnQztRQUMxRTtRQUNBOztRQUVBO1FBQ0E7UUFDQTtRQUNBLHdEQUF3RCxrQkFBa0I7UUFDMUU7UUFDQSxpREFBaUQsY0FBYztRQUMvRDs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0EseUNBQXlDLGlDQUFpQztRQUMxRSxnSEFBZ0gsbUJBQW1CLEVBQUU7UUFDckk7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQSwyQkFBMkIsMEJBQTBCLEVBQUU7UUFDdkQsaUNBQWlDLGVBQWU7UUFDaEQ7UUFDQTtRQUNBOztRQUVBO1FBQ0Esc0RBQXNELCtEQUErRDs7UUFFckg7UUFDQTs7O1FBR0E7UUFDQTs7Ozs7Ozs7Ozs7OztBQ2xGYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDJDQUFlO0FBQ3pDLHdCQUF3QixtQkFBTyxDQUFDLCtEQUF5QjtBQUN6RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7O0FDYlk7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLHFCQUFxQixtQkFBTyxDQUFDLHlEQUFzQjtBQUNuRCx1QkFBdUIsbUJBQU8sQ0FBQyxxREFBb0I7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbERhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSx1QkFBdUIsbUJBQU8sQ0FBQyxzREFBcUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxnQkFBZ0IsR0FBRztBQUNoQztBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixnQkFBZ0I7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3Q0FBd0MsK0VBQStFO0FBQ3ZIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywrRUFBK0U7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDRDQUE0QywrRUFBK0U7QUFDM0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNuUmE7QUFDYiw4Q0FBOEMsY0FBYztBQUM1RDtBQUNBLGFBQWEsbUJBQU8sQ0FBQyx3QkFBUztBQUM5Qix1QkFBdUIsbUJBQU8sQ0FBQyxzREFBcUI7QUFDcEQsdUJBQXVCLG1CQUFPLENBQUMsOENBQWlCO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDakhhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQSxhQUFhLG1CQUFPLENBQUMsd0JBQVM7QUFDOUIsd0JBQXdCLG1CQUFPLENBQUMsbURBQWlCO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ3pEYTtBQUNiLDhDQUE4QyxjQUFjO0FBQzVEO0FBQ0EsYUFBYSxtQkFBTyxDQUFDLHdCQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLGdCQUFnQixHQUFHLGVBQWU7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDN0JhO0FBQ2IsOENBQThDLGNBQWM7QUFDNUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7QUM1QkEsc0IiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IFwiLi9zcmMvTWFpbi50c1wiKTtcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmNvbnN0IEdhbWVBcHBfMSA9IHJlcXVpcmUoXCIuL2xpYi9HYW1lQXBwXCIpO1xyXG5jb25zdCBTY2VuZUdyYXBoaWNzXzEgPSByZXF1aXJlKFwiLi9leGFtcGxlL1NjZW5lR3JhcGhpY3NcIik7XHJcbmNvbnN0IEdBTUVfV0lEVEggPSAxMjgwO1xyXG5jb25zdCBHQU1FX0hFSUdIVCA9IDc2NDtcclxuY29uc3QgR0FNRSA9IG5ldyBHYW1lQXBwXzEuR2FtZUFwcChHQU1FX1dJRFRILCBHQU1FX0hFSUdIVCwgZmFsc2UpO1xyXG5HQU1FLlVzZVNjZW5lcyA9IFtTY2VuZUdyYXBoaWNzXzEuU2NlbmVHcmFwaGljc107XHJcbkdBTUUuTG9hZCgpLnRoZW4oKCkgPT4ge1xyXG4gICAgbGV0IGxfU2NlbmUgPSBuZXcgU2NlbmVHcmFwaGljc18xLlNjZW5lR3JhcGhpY3MoR0FNRSk7XHJcbiAgICBHQU1FLkdvVG9DZW50ZXIobF9TY2VuZSk7XHJcbiAgICBHQU1FLnN0YWdlLmFkZENoaWxkKGxfU2NlbmUpO1xyXG4gICAgR0FNRS5BZGRGUFNJbmZvKCk7XHJcbn0pO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlNjZW5lTG9hZGluZyA9IHZvaWQgMDtcclxuY29uc3QgTG9hZGluZ0Jhcl8xID0gcmVxdWlyZShcIi4vbW9kdWxlcy9Mb2FkaW5nQmFyXCIpO1xyXG5jb25zdCBSZXNvdXJjZVRvb2xfMSA9IHJlcXVpcmUoXCIuL2xpYi9SZXNvdXJjZVRvb2xcIik7XHJcbmNvbnN0IFJFU09VUkNFX0xJU1QgPSB7XHJcbiAgICBsb2FkaW5nOiBcImFzc2V0cy9sb2FkaW5nL2xvYWRpbmcuanNvblwiXHJcbn07XHJcbmNsYXNzIFNjZW5lTG9hZGluZyBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGFfR2FtZUFwcCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy54ID0gYV9HYW1lQXBwLnNjcmVlbi53aWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy55ID0gYV9HYW1lQXBwLnNjcmVlbi5oZWlnaHQgLyAyO1xyXG4gICAgICAgIGxldCBsX1Nwcml0ZUZyYW1lcyA9IFNjZW5lTG9hZGluZy5SZXNvdXJjZS5HZXRSZXNvdXJjZShSRVNPVVJDRV9MSVNULmxvYWRpbmcpLmRhdGEuZnJhbWVzO1xyXG4gICAgICAgIGxldCBsX0ZyYW1lcyA9IFtdO1xyXG4gICAgICAgIGZvciAobGV0IG4gaW4gbF9TcHJpdGVGcmFtZXMpIHtcclxuICAgICAgICAgICAgbF9GcmFtZXMucHVzaChQSVhJLlRleHR1cmUuZnJvbShuKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGxldCBsX0xvYWRpbmdBbmkgPSBuZXcgUElYSS5BbmltYXRlZFNwcml0ZShsX0ZyYW1lcyk7XHJcbiAgICAgICAgbF9Mb2FkaW5nQW5pLmFuY2hvci5zZXQoMC41LCAwLjUpO1xyXG4gICAgICAgIGxfTG9hZGluZ0FuaS5wb3NpdGlvbi5zZXQoMCwgMCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChsX0xvYWRpbmdBbmkpO1xyXG4gICAgICAgIGxfTG9hZGluZ0FuaS5hbmltYXRpb25TcGVlZCA9IDAuNTtcclxuICAgICAgICBsX0xvYWRpbmdBbmkucGxheSgpO1xyXG4gICAgICAgIHRoaXMuQ3JlYXRlQmFyKGFfR2FtZUFwcCk7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgSW5pdFJlc291cmNlKCkge1xyXG4gICAgICAgIFNjZW5lTG9hZGluZy5SZXNvdXJjZSA9IFJlc291cmNlVG9vbF8xLlJlc291cmNlVG9vbC5BZGRTY2VuZVJlc291cmNlKFNjZW5lTG9hZGluZy5uYW1lLCBSRVNPVVJDRV9MSVNUKTtcclxuICAgIH1cclxuICAgIENyZWF0ZUJhcihhX0dhbWVBcHApIHtcclxuICAgICAgICBjb25zdCBsX0xvYWRlciA9IGFfR2FtZUFwcC5HZXRMb2FkZXIoKTtcclxuICAgICAgICBsZXQgbF9Mb2FkZXJQcm9jZXNzID0gbmV3IExvYWRpbmdCYXJfMS5Mb2FkaW5nQmFyKGFfR2FtZUFwcCk7XHJcbiAgICAgICAgbF9Mb2FkZXIub25Qcm9ncmVzcy5hZGQoKF9sb2FkZXIsIF9yZXNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgbF9Mb2FkZXJQcm9jZXNzLlVwZGF0ZUJhcihfbG9hZGVyLnByb2dyZXNzKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGxfTG9hZGVyUHJvY2Vzcyk7XHJcbiAgICB9XHJcbiAgICBMb2FkKCkge1xyXG4gICAgICAgIFJlc291cmNlVG9vbF8xLlJlc291cmNlVG9vbC5QcmVwYXJlUmVzb3VyY2UoKTtcclxuICAgICAgICBQSVhJLkxvYWRlci5zaGFyZWQubG9hZCgoX2xvYWRlciwgX3Jlc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmVtaXQoU2NlbmVMb2FkaW5nLkV2ZW50TmFtZXMuT25Mb2FkZWQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgRGVzdHJveSgpIHtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNjZW5lTG9hZGluZyA9IFNjZW5lTG9hZGluZztcclxuU2NlbmVMb2FkaW5nLkV2ZW50TmFtZXMgPSB7XHJcbiAgICBPbkxvYWRlZDogXCJPbkxvYWRlZFwiXHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuU2NlbmVHcmFwaGljcyA9IHZvaWQgMDtcclxuY29uc3QgUmVzb3VyY2VUb29sXzEgPSByZXF1aXJlKFwiLi4vbGliL1Jlc291cmNlVG9vbFwiKTtcclxuY2xhc3MgU2NlbmVHcmFwaGljcyBleHRlbmRzIFBJWEkuQ29udGFpbmVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGFfR2FtZUFwcCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgYV9HYW1lQXBwLnJlbmRlcmVyLmJhY2tncm91bmRDb2xvciA9IDB4MTA5OWJiO1xyXG4gICAgICAgIHRoaXMuVGVzdDUoYV9HYW1lQXBwKTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBJbml0UmVzb3VyY2UoKSB7XHJcbiAgICAgICAgdGhpcy5SZXNvdXJjZSA9IFJlc291cmNlVG9vbF8xLlJlc291cmNlVG9vbC5BZGRTY2VuZVJlc291cmNlKHRoaXMubmFtZSwgdGhpcy5SZXNvdXJjZUxpc3QpO1xyXG4gICAgfVxyXG4gICAgVGVzdDEoKSB7XHJcbiAgICAgICAgbGV0IGxfTGluZSA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZChsX0xpbmUpO1xyXG4gICAgICAgIGxfTGluZS5saW5lU3R5bGUoNCwgMHhmZmZmZmYpXHJcbiAgICAgICAgICAgIC5tb3ZlVG8oMCwgMClcclxuICAgICAgICAgICAgLmxpbmVUbyg1MCwgNTApXHJcbiAgICAgICAgICAgIC5saW5lVG8oMTAwLCAwKVxyXG4gICAgICAgICAgICAubGluZVRvKDE1MCwgNTApO1xyXG4gICAgICAgIGxldCBsX1BvaW50cyA9IFtcclxuICAgICAgICAgICAgeyB4OiAyMDAsIHk6IDUwIH0sIHsgeDogMTUwLCB5OiAwIH1cclxuICAgICAgICBdO1xyXG4gICAgICAgIGxfUG9pbnRzLmZvckVhY2goX1YgPT4ge1xyXG4gICAgICAgICAgICBsX0xpbmUubGluZVRvKF9WLngsIF9WLnkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIGxldCBsX1RyaWFuZ2xlID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICBsX1RyaWFuZ2xlLmJlZ2luRmlsbCgweGZmMDAwMCwgMC4zKTtcclxuICAgICAgICBsX1RyaWFuZ2xlLm1vdmVUbygwLCAwKTtcclxuICAgICAgICBsX1RyaWFuZ2xlLmxpbmVUbyhNYXRoLmNvcygwICogKDYwKSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDAsIE1hdGguc2luKDAgKiAoNjApICogKE1hdGguUEkgLyAxODApKSAqIDEwMCk7XHJcbiAgICAgICAgbF9UcmlhbmdsZS5saW5lVG8oTWF0aC5jb3MoMSAqICg2MCkgKiAoTWF0aC5QSSAvIDE4MCkpICogMTAwLCBNYXRoLnNpbigxICogKDYwKSAqIChNYXRoLlBJIC8gMTgwKSkgKiAxMDApO1xyXG4gICAgICAgIGxfVHJpYW5nbGUubGluZVRvKDAsIDApO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQobF9UcmlhbmdsZSk7XHJcbiAgICB9XHJcbiAgICBUZXN0MihhX0dhbWVBcHApIHtcclxuICAgICAgICB0aGlzLmludGVyYWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICBsZXQgbF9MaW5lID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGxfTGluZSk7XHJcbiAgICAgICAgbGV0IGxfUG9pbnRYID0gMDtcclxuICAgICAgICBsZXQgbF9Qb2ludFkgPSAwO1xyXG4gICAgICAgIGxldCBsX1cgPSBhX0dhbWVBcHAucmVuZGVyZXIud2lkdGggLyAyO1xyXG4gICAgICAgIGxldCBsX0ggPSBhX0dhbWVBcHAucmVuZGVyZXIuaGVpZ2h0IC8gMjtcclxuICAgICAgICB0aGlzLm9uKFwibW91c2Vtb3ZlXCIsIChfRXZlbnQpID0+IHtcclxuICAgICAgICAgICAgaWYgKGxfUG9pbnRYID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBsX1BvaW50WCA9IF9FdmVudC5kYXRhLmdldExvY2FsUG9zaXRpb24odGhpcykueCAtIGxfVztcclxuICAgICAgICAgICAgICAgIGxfUG9pbnRZID0gX0V2ZW50LmRhdGEuZ2V0TG9jYWxQb3NpdGlvbih0aGlzKS55IC0gbF9IO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxfTGluZS5saW5lU3R5bGUoNCwgMHhmZmZmZmYpO1xyXG4gICAgICAgICAgICBsX0xpbmUubW92ZVRvKGxfUG9pbnRYLCBsX1BvaW50WSk7XHJcbiAgICAgICAgICAgIGxfTGluZS5saW5lVG8oX0V2ZW50LmRhdGEuZ2xvYmFsLnggLSBsX1csIF9FdmVudC5kYXRhLmdsb2JhbC55IC0gbF9IKTtcclxuICAgICAgICAgICAgbF9Qb2ludFggPSBfRXZlbnQuZGF0YS5nbG9iYWwueCAtIGxfVztcclxuICAgICAgICAgICAgbF9Qb2ludFkgPSBfRXZlbnQuZGF0YS5nbG9iYWwueSAtIGxfSDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIFRlc3QzKCkge1xyXG4gICAgfVxyXG4gICAgVGVzdDQoKSB7XHJcbiAgICAgICAgbGV0IHRvdGFsQ291bnQgPSAzNjA7XHJcbiAgICAgICAgbGV0IGxfUmFkaXVzID0gMjAwO1xyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdG90YWxDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxldCBjb2xvckFycmF5ID0gaHN2VG9SR0IyKGkgKiAzNjAgLyB0b3RhbENvdW50LCAxLCAxKTtcclxuICAgICAgICAgICAgbGV0IGNvbG9yID0gY29sb3JBcnJheVswXSAqIDY1NTM2ICsgY29sb3JBcnJheVsxXSAqIDI1NiArIGNvbG9yQXJyYXlbMl07XHJcbiAgICAgICAgICAgIGxldCBhcmNHcmFwaGljID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpYy5iZWdpbkZpbGwoY29sb3IsIDEpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljLmFyYygwLCAwLCBsX1JhZGl1cywgKDApICogKE1hdGguUEkgLyAxODApLCAoMSkgKiAoTWF0aC5QSSAvIDE4MCkpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljLmVuZEZpbGwoKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpYy5iZWdpbkZpbGwoY29sb3IsIDEpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljLm1vdmVUbygwLCAwKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpYy5saW5lVG8oMCwgbF9SYWRpdXMpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljLmxpbmVUbyhNYXRoLnNpbigyICogKE1hdGguUEkgLyAxODApKSAqIGxfUmFkaXVzLCBNYXRoLmNvcygyICogKE1hdGguUEkgLyAxODApKSAqIGxfUmFkaXVzKTtcclxuICAgICAgICAgICAgYXJjR3JhcGhpYy5saW5lVG8oMCwgMCk7XHJcbiAgICAgICAgICAgIGFyY0dyYXBoaWMuZW5kRmlsbCgpO1xyXG4gICAgICAgICAgICBhcmNHcmFwaGljLnJvdGF0aW9uID0gaSAqIChNYXRoLlBJIC8gMTgwKTtcclxuICAgICAgICAgICAgdGhpcy5hZGRDaGlsZChhcmNHcmFwaGljKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBUZXN0NShhX0dhbWVBcHApIHtcclxuICAgICAgICBsZXQgbF9CZWFyID0gbmV3IEJlYXIoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKGxfQmVhcik7XHJcbiAgICAgICAgdmFyIHRrID0gMDtcclxuICAgICAgICBsZXQgZmFjZUdyYXBoaWMgPSBsX0JlYXIuZmFjZUdyYXBoaWM7XHJcbiAgICAgICAgYV9HYW1lQXBwLnRpY2tlci5hZGQoZnVuY3Rpb24gKGRlbHRhKSB7XHJcbiAgICAgICAgICAgIHRrICs9IDE7XHJcbiAgICAgICAgICAgIHZhciB0bXBQZyA9IE1hdGguc2luKHRrICogKE1hdGguUEkgLyAxODApKTtcclxuICAgICAgICAgICAgZmFjZUdyYXBoaWMuY2xlYXIoKTtcclxuICAgICAgICAgICAgZmFjZUdyYXBoaWMubGluZVN0eWxlKDIwLCAweDAwMDAwMCwgLjc1KTtcclxuICAgICAgICAgICAgZmFjZUdyYXBoaWMuYmVnaW5GaWxsKDB4ZmZmZmZmLCAxKTtcclxuICAgICAgICAgICAgZmFjZUdyYXBoaWMubW92ZVRvKC0xMDAsIC0xMDApO1xyXG4gICAgICAgICAgICBmYWNlR3JhcGhpYy5xdWFkcmF0aWNDdXJ2ZVRvKDAsIC0xNjAsIDEwMCwgLTEwMCk7XHJcbiAgICAgICAgICAgIGZhY2VHcmFwaGljLnF1YWRyYXRpY0N1cnZlVG8obF9CZWFyLm1vdXNlU3ByaXRlUi54LCAwICsgMzAgKyAoKGxfQmVhci5tb3VzZVNwcml0ZVIueSAtIDMwKSAvIChhX0dhbWVBcHAucmVuZGVyZXIuaGVpZ2h0ICogMC41KSkgKiAxMDAsIDEwMCwgMTAwKTtcclxuICAgICAgICAgICAgZmFjZUdyYXBoaWMubGluZVRvKC0xMDAsIDEwMCk7XHJcbiAgICAgICAgICAgIGZhY2VHcmFwaGljLnF1YWRyYXRpY0N1cnZlVG8obF9CZWFyLm1vdXNlU3ByaXRlTC54LCAwICsgMzAgKyAoKGxfQmVhci5tb3VzZVNwcml0ZUwueSAtIDMwKSAvIChhX0dhbWVBcHAucmVuZGVyZXIuaGVpZ2h0ICogMC41KSkgKiAxMDAsIC0xMDAsIC0xMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuU2NlbmVHcmFwaGljcyA9IFNjZW5lR3JhcGhpY3M7XHJcblNjZW5lR3JhcGhpY3MuUmVzb3VyY2VMaXN0ID0ge307XHJcbmZ1bmN0aW9uIGhzdlRvUkdCMihodWUsIHNhdHVyYXRpb24sIHZhbHVlKSB7XHJcbiAgICB2YXIgaGk7XHJcbiAgICB2YXIgZjtcclxuICAgIHZhciBwO1xyXG4gICAgdmFyIHE7XHJcbiAgICB2YXIgdDtcclxuICAgIHdoaWxlIChodWUgPCAwKSB7XHJcbiAgICAgICAgaHVlICs9IDM2MDtcclxuICAgIH1cclxuICAgIGh1ZSA9IGh1ZSAlIDM2MDtcclxuICAgIHNhdHVyYXRpb24gPSBzYXR1cmF0aW9uIDwgMFxyXG4gICAgICAgID8gMCA6IHNhdHVyYXRpb24gPiAxXHJcbiAgICAgICAgPyAxIDogc2F0dXJhdGlvbjtcclxuICAgIHZhbHVlID0gdmFsdWUgPCAwID8gMFxyXG4gICAgICAgIDogdmFsdWUgPiAxID8gMVxyXG4gICAgICAgICAgICA6IHZhbHVlO1xyXG4gICAgdmFsdWUgKj0gMjU1O1xyXG4gICAgaGkgPSAoaHVlIC8gNjAgfCAwKSAlIDY7XHJcbiAgICBmID0gaHVlIC8gNjAgLSBoaTtcclxuICAgIHAgPSB2YWx1ZSAqICgxIC0gc2F0dXJhdGlvbikgfCAwO1xyXG4gICAgcSA9IHZhbHVlICogKDEgLSBmICogc2F0dXJhdGlvbikgfCAwO1xyXG4gICAgdCA9IHZhbHVlICogKDEgLSAoMSAtIGYpICogc2F0dXJhdGlvbikgfCAwO1xyXG4gICAgdmFsdWUgfD0gMDtcclxuICAgIHN3aXRjaCAoaGkpIHtcclxuICAgICAgICBjYXNlIDA6XHJcbiAgICAgICAgICAgIHJldHVybiBbdmFsdWUsIHQsIHBdO1xyXG4gICAgICAgIGNhc2UgMTpcclxuICAgICAgICAgICAgcmV0dXJuIFtxLCB2YWx1ZSwgcF07XHJcbiAgICAgICAgY2FzZSAyOlxyXG4gICAgICAgICAgICByZXR1cm4gW3AsIHZhbHVlLCB0XTtcclxuICAgICAgICBjYXNlIDM6XHJcbiAgICAgICAgICAgIHJldHVybiBbcCwgcSwgdmFsdWVdO1xyXG4gICAgICAgIGNhc2UgNDpcclxuICAgICAgICAgICAgcmV0dXJuIFt0LCBwLCB2YWx1ZV07XHJcbiAgICAgICAgY2FzZSA1OlxyXG4gICAgICAgICAgICByZXR1cm4gW3ZhbHVlLCBwLCBxXTtcclxuICAgIH1cclxufVxyXG5jbGFzcyBCZWFyIGV4dGVuZHMgUElYSS5Db250YWluZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmZhY2VHcmFwaGljID0gbmV3IFBJWEkuR3JhcGhpY3M7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmZhY2VHcmFwaGljKTtcclxuICAgICAgICB0aGlzLmV5ZUdyYXBoaWMgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5leWVHcmFwaGljKTtcclxuICAgICAgICB0aGlzLmV5ZUdyYXBoaWMuYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcclxuICAgICAgICB0aGlzLmV5ZUdyYXBoaWMuZHJhd0NpcmNsZSgtNjAsIC00NSwgMTApO1xyXG4gICAgICAgIHRoaXMuZXllR3JhcGhpYy5kcmF3Q2lyY2xlKDYwLCAtNDUsIDEwKTtcclxuICAgICAgICB0aGlzLmV5ZUdyYXBoaWMuc2NhbGUueSA9IDAuODU7XHJcbiAgICAgICAgdGhpcy50ZWFyR3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLnRlYXJHcmFwaGljKTtcclxuICAgICAgICB0aGlzLnRlYXJHcmFwaGljLmJlZ2luRmlsbCgweDUzY2FmNik7XHJcbiAgICAgICAgdGhpcy50ZWFyR3JhcGhpYy5kcmF3Q2lyY2xlKDcwLCAtMzIsIDgpO1xyXG4gICAgICAgIHRoaXMudGVhckdyYXBoaWMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY3J5R3JhcGhpYyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRDaGlsZCh0aGlzLmNyeUdyYXBoaWMpO1xyXG4gICAgICAgIHRoaXMuY3J5R3JhcGhpYy5saW5lU3R5bGUoMTAsIDB4MDAwMDAwLCAxKTtcclxuICAgICAgICB0aGlzLmNyeUdyYXBoaWMubW92ZVRvKC03NSwgLTM3KTtcclxuICAgICAgICB0aGlzLmNyeUdyYXBoaWMubGluZVRvKC00NSwgLTQzKTtcclxuICAgICAgICB0aGlzLmNyeUdyYXBoaWMubW92ZVRvKDQ1LCAtNDMpO1xyXG4gICAgICAgIHRoaXMuY3J5R3JhcGhpYy5saW5lVG8oNzUsIC0zNyk7XHJcbiAgICAgICAgdGhpcy5jcnlHcmFwaGljLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLm5vc2VHcmFwaGljID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMubm9zZUdyYXBoaWMpO1xyXG4gICAgICAgIHRoaXMubm9zZUdyYXBoaWMuYmVnaW5GaWxsKDB4MDAwMDAwLCAxKTtcclxuICAgICAgICB0aGlzLm5vc2VHcmFwaGljLmRyYXdDaXJjbGUoMCwgMCwgMTMpO1xyXG4gICAgICAgIHRoaXMubm9zZUdyYXBoaWMuc2NhbGUueSA9IDAuODU7XHJcbiAgICAgICAgdGhpcy50b3BFYXJzQmFja0dyYXBoaWMgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy50b3BFYXJzQmFja0dyYXBoaWMpO1xyXG4gICAgICAgIHRoaXMudG9wRWFyc0JhY2tHcmFwaGljLmJlZ2luRmlsbCgweGZmZmZmZiwgMSk7XHJcbiAgICAgICAgdGhpcy50b3BFYXJzQmFja0dyYXBoaWMuZHJhd0NpcmNsZSgtODUsIC0xMjksIDI1KTtcclxuICAgICAgICB0aGlzLnRvcEVhcnNCYWNrR3JhcGhpYy5kcmF3Q2lyY2xlKDg1LCAtMTI5LCAyNSk7XHJcbiAgICAgICAgdGhpcy50b3BFYXJzQmFja0dyYXBoaWMuc2NhbGUueSA9IDAuOTtcclxuICAgICAgICB0aGlzLnRvcEVhcnNGcm9udEdyYXBoaWMgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGRBdCh0aGlzLnRvcEVhcnNGcm9udEdyYXBoaWMsIDApO1xyXG4gICAgICAgIHRoaXMudG9wRWFyc0Zyb250R3JhcGhpYy5saW5lU3R5bGUoNDAsIDB4MDAwMDAwLCAuNzUpO1xyXG4gICAgICAgIHRoaXMudG9wRWFyc0Zyb250R3JhcGhpYy5kcmF3Q2lyY2xlKC04NSwgLTEyOSwgMjUpO1xyXG4gICAgICAgIHRoaXMudG9wRWFyc0Zyb250R3JhcGhpYy5kcmF3Q2lyY2xlKDg1LCAtMTI5LCAyNSk7XHJcbiAgICAgICAgdGhpcy50b3BFYXJzRnJvbnRHcmFwaGljLnNjYWxlLnkgPSAwLjk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZUwgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tb3VzZVNwcml0ZUwpO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVMLmJlZ2luRmlsbCgweGZmMDAwMCwgMSk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZUwuZHJhd0NpcmNsZSgwLCAwLCA2MCk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZUwuZW5kRmlsbCgpO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVMLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlTC54ID0gdGhpcy5tb3VzZVNwcml0ZUxbXCJkZWZhdWx0WFwiXSA9IC0xNTA7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZUwueSA9IHRoaXMubW91c2VTcHJpdGVMW1wiZGVmYXVsdFlcIl0gPSAzMDtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlTFtcIm1heFhcIl0gPSAtMTAwO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVMW1wibWluWFwiXSA9IC00MDA7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZVIgPSBuZXcgUElYSS5HcmFwaGljcygpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5tb3VzZVNwcml0ZVIpO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVSLmJlZ2luRmlsbCgweGZmMDAwMCwgMSk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZVIuZHJhd0NpcmNsZSgwLCAwLCA2MCk7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZVIuZW5kRmlsbCgpO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVSLmFscGhhID0gMDtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlUi54ID0gdGhpcy5tb3VzZVNwcml0ZVJbXCJkZWZhdWx0WFwiXSA9IDE1MDtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlUi55ID0gdGhpcy5tb3VzZVNwcml0ZVJbXCJkZWZhdWx0WVwiXSA9IDMwO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVSW1wibWF4WFwiXSA9IDQwMDtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlUltcIm1pblhcIl0gPSAxMDA7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZUwuaW50ZXJhY3RpdmUgPSB0aGlzLm1vdXNlU3ByaXRlTC5idXR0b25Nb2RlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLm1vdXNlU3ByaXRlTFxyXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkRyYWdTdGFydChlLCB0aGlzLCB0aGlzLm1vdXNlU3ByaXRlTCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXAnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uRHJhZ0VuZChlLCB0aGlzLCB0aGlzLm1vdXNlU3ByaXRlTCk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAgICAgLm9uKCdwb2ludGVydXBvdXRzaWRlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkRyYWdFbmQoZSwgdGhpcywgdGhpcy5tb3VzZVNwcml0ZUwpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbigncG9pbnRlcm1vdmUnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLm9uRHJhZ01vdmUoZSwgdGhpcywgdGhpcy5tb3VzZVNwcml0ZUwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMubW91c2VTcHJpdGVSLmludGVyYWN0aXZlID0gdGhpcy5tb3VzZVNwcml0ZVIuYnV0dG9uTW9kZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5tb3VzZVNwcml0ZVJcclxuICAgICAgICAgICAgLm9uKCdwb2ludGVyZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25EcmFnU3RhcnQoZSwgdGhpcywgdGhpcy5tb3VzZVNwcml0ZVIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwJywgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkRyYWdFbmQoZSwgdGhpcywgdGhpcy5tb3VzZVNwcml0ZVIpO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5vbigncG9pbnRlcnVwb3V0c2lkZScsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMub25EcmFnRW5kKGUsIHRoaXMsIHRoaXMubW91c2VTcHJpdGVSKTtcclxuICAgICAgICB9KVxyXG4gICAgICAgICAgICAub24oJ3BvaW50ZXJtb3ZlJywgKGUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5vbkRyYWdNb3ZlKGUsIHRoaXMsIHRoaXMubW91c2VTcHJpdGVSKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uRHJhZ1N0YXJ0KGUsIGFfQmVhciwgYV9Nb3VzZSkge1xyXG4gICAgICAgIGFfTW91c2VbXCJkYXRhXCJdID0gZS5kYXRhO1xyXG4gICAgICAgIGFfTW91c2VbXCJhbHBoYVwiXSA9IDAuMztcclxuICAgICAgICBhX01vdXNlW1wiZHJhZ2dpbmdcIl0gPSB0cnVlO1xyXG4gICAgICAgIGFfQmVhci5leWVHcmFwaGljLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICBhX0JlYXIuY3J5R3JhcGhpYy52aXNpYmxlID0gdHJ1ZTtcclxuICAgICAgICBhX0JlYXIudGVhckdyYXBoaWMudmlzaWJsZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBvbkRyYWdFbmQoZSwgYV9CZWFyLCBhX01vdXNlKSB7XHJcbiAgICAgICAgYV9Nb3VzZS5hbHBoYSA9IDA7XHJcbiAgICAgICAgaWYgKGUpIHtcclxuICAgICAgICAgICAgYV9Nb3VzZVtcImRyYWdnaW5nXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgIGFfTW91c2VbXCJkYXRhXCJdID0gbnVsbDtcclxuICAgICAgICAgICAgVHdlZW5NYXgudG8oYV9Nb3VzZSwgMC4zNSwgeyBkZWxheTogMCwgeDogYV9Nb3VzZVtcImRlZmF1bHRYXCJdLCB5OiBhX01vdXNlW1wiZGVmYXVsdFlcIl0sIGVhc2U6IEJhY2suZWFzZU91dCB9KTtcclxuICAgICAgICAgICAgYV9CZWFyLmV5ZUdyYXBoaWMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgIGFfQmVhci5jcnlHcmFwaGljLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICAgICAgYV9CZWFyLnRlYXJHcmFwaGljLnZpc2libGUgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGFfTW91c2VbXCJkcmFnZ2luZ1wiXSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBhX01vdXNlW1wiZGF0YVwiXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgb25EcmFnTW92ZShlLCBhX0JlYXIsIGFfTW91c2UpIHtcclxuICAgICAgICBpZiAoYV9Nb3VzZVtcImRyYWdnaW5nXCJdID09IHRydWUpIHtcclxuICAgICAgICAgICAgbGV0IG5ld1Bvc2l0aW9uID0gYV9Nb3VzZVtcImRhdGFcIl0uZ2V0TG9jYWxQb3NpdGlvbihhX01vdXNlLnBhcmVudCk7XHJcbiAgICAgICAgICAgIGFfTW91c2UueCA9IG5ld1Bvc2l0aW9uLng7XHJcbiAgICAgICAgICAgIGFfTW91c2UueSA9IG5ld1Bvc2l0aW9uLnk7XHJcbiAgICAgICAgICAgIGlmIChhX01vdXNlLnggPiBhX01vdXNlW1wibWF4WFwiXSkge1xyXG4gICAgICAgICAgICAgICAgYV9Nb3VzZVtcImRyYWdnaW5nXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhX01vdXNlW1wiZGF0YVwiXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIub25EcmFnRW5kKG51bGwsIGFfQmVhciwgYV9Nb3VzZSk7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50byhhX01vdXNlLCAwLjM1LCB7IGRlbGF5OiAwLCB4OiBhX01vdXNlW1wiZGVmYXVsdFhcIl0sIHk6IGFfTW91c2VbXCJkZWZhdWx0WVwiXSwgZWFzZTogQmFjay5lYXNlT3V0IH0pO1xyXG4gICAgICAgICAgICAgICAgYV9CZWFyLmV5ZUdyYXBoaWMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIuY3J5R3JhcGhpYy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIudGVhckdyYXBoaWMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChhX01vdXNlLnggPCBhX01vdXNlW1wibWluWFwiXSkge1xyXG4gICAgICAgICAgICAgICAgYV9Nb3VzZVtcImRyYWdnaW5nXCJdID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhX01vdXNlW1wiZGF0YVwiXSA9IG51bGw7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIub25EcmFnRW5kKG51bGwsIGFfQmVhciwgYV9Nb3VzZSk7XHJcbiAgICAgICAgICAgICAgICBUd2Vlbk1heC50byhhX01vdXNlLCAwLjM1LCB7IGRlbGF5OiAwLCB4OiBhX01vdXNlW1wiZGVmYXVsdFhcIl0sIHk6IGFfTW91c2VbXCJkZWZhdWx0WVwiXSwgZWFzZTogQmFjay5lYXNlT3V0IH0pO1xyXG4gICAgICAgICAgICAgICAgYV9CZWFyLmV5ZUdyYXBoaWMudmlzaWJsZSA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIuY3J5R3JhcGhpYy52aXNpYmxlID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBhX0JlYXIudGVhckdyYXBoaWMudmlzaWJsZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2FtZUFwcCA9IHZvaWQgMDtcclxuY29uc3QgUElYSSA9IHJlcXVpcmUoXCJwaXhpLmpzXCIpO1xyXG5jb25zdCBSZXNvdXJjZVRvb2xfMSA9IHJlcXVpcmUoXCIuLi9saWIvUmVzb3VyY2VUb29sXCIpO1xyXG5jb25zdCBTY2VuZUxvYWRpbmdfMSA9IHJlcXVpcmUoXCIuLi9TY2VuZUxvYWRpbmdcIik7XHJcbmNsYXNzIEdhbWVBcHAgZXh0ZW5kcyBQSVhJLkFwcGxpY2F0aW9uIHtcclxuICAgIGNvbnN0cnVjdG9yKGFfR2FtZVdpZHRoLCBhX0dhbWVIZWlnaHQsIGFfTm9XZWJHTCA9IGZhbHNlKSB7XHJcbiAgICAgICAgc3VwZXIoe1xyXG4gICAgICAgICAgICB3aWR0aDogYV9HYW1lV2lkdGgsXHJcbiAgICAgICAgICAgIGhlaWdodDogYV9HYW1lSGVpZ2h0LFxyXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IDB4MDAwMDAwLFxyXG4gICAgICAgICAgICB0cmFuc3BhcmVudDogdHJ1ZSxcclxuICAgICAgICAgICAgZm9yY2VDYW52YXM6IGFfTm9XZWJHTFxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMuV2lkdGggPSAwO1xyXG4gICAgICAgIHRoaXMuSGVpZ2h0ID0gMDtcclxuICAgICAgICB0aGlzLlVzZVNjZW5lcyA9IFtTY2VuZUxvYWRpbmdfMS5TY2VuZUxvYWRpbmddO1xyXG4gICAgICAgIHRoaXMuX0NhbnZhc0xpc3QgPSBbXTtcclxuICAgICAgICB0aGlzLldpZHRoID0gYV9HYW1lV2lkdGg7XHJcbiAgICAgICAgdGhpcy5IZWlnaHQgPSBhX0dhbWVIZWlnaHQ7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZCh0aGlzLnZpZXcpO1xyXG4gICAgICAgIHRoaXMuQWRkQ2FudmFzKHRoaXMudmlldywgdHJ1ZSk7XHJcbiAgICAgICAgdGhpcy5Jbml0TG9hZGVyKCk7XHJcbiAgICAgICAgd2luZG93Lm9ucmVzaXplID0gKF9FdmVudCkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLk9uUmVzaXplKF9FdmVudCk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIEluaXRMb2FkZXIoKSB7XHJcbiAgICAgICAgbGV0IGxfTG9hZGVyID0gUElYSS5Mb2FkZXIuc2hhcmVkO1xyXG4gICAgICAgIGxfTG9hZGVyLm9uRXJyb3IuYWRkKCgpID0+IHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCIjTG9hZGVyIE9uRXJyb3JcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbF9Mb2FkZXIub25Mb2FkLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgbF9Mb2FkZXIub25Db21wbGV0ZS5hZGQoKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcIiNMb2FkZXIgT25Db21wbGV0ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIE9uUmVzaXplKGFfRXZlbnQpIHtcclxuICAgICAgICBsZXQgbF9XaWR0aCA9IHdpbmRvdy5pbm5lcldpZHRoO1xyXG4gICAgICAgIGxldCBsX0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgICAgICBsZXQgbF9SYXRpb1dpZHRoID0gbF9XaWR0aCAvIHRoaXMuV2lkdGg7XHJcbiAgICAgICAgbGV0IGxfUmF0aW9IZWlnaHQgPSBsX0hlaWdodCAvIHRoaXMuSGVpZ2h0O1xyXG4gICAgICAgIGxldCBsX1JhdGlvID0gbF9SYXRpb1dpZHRoIDwgbF9SYXRpb0hlaWdodCA/IGxfUmF0aW9XaWR0aCA6IGxfUmF0aW9IZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQ2FudmFzTGlzdC5mb3JFYWNoKF9DYW52YXMgPT4ge1xyXG4gICAgICAgICAgICBfQ2FudmFzLnN0eWxlLndpZHRoID0gfn4odGhpcy5XaWR0aCAqIGxfUmF0aW8pICsgXCJweFwiO1xyXG4gICAgICAgICAgICBfQ2FudmFzLnN0eWxlLmhlaWdodCA9IH5+KHRoaXMuSGVpZ2h0ICogbF9SYXRpbykgKyBcInB4XCI7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBHZXRMb2FkZXIoKSB7XHJcbiAgICAgICAgcmV0dXJuIFBJWEkuTG9hZGVyLnNoYXJlZDtcclxuICAgIH1cclxuICAgIEFkZENhbnZhcyhhX0NhbnZhcywgYV9Jc01hc3RlciA9IGZhbHNlKSB7XHJcbiAgICAgICAgYV9DYW52YXMuc3R5bGUucG9zaXRpb24gPSBcImFic29sdXRlXCI7XHJcbiAgICAgICAgYV9DYW52YXMuc3R5bGUubGVmdCA9IFwiNTAlXCI7XHJcbiAgICAgICAgYV9DYW52YXMuc3R5bGUudG9wID0gXCI1MCVcIjtcclxuICAgICAgICBhX0NhbnZhcy5zdHlsZS50cmFuc2Zvcm0gPSBcInRyYW5zbGF0ZTNkKCAtNTAlLCAtNTAlLCAwIClcIjtcclxuICAgICAgICB0aGlzLl9DYW52YXNMaXN0LnB1c2goYV9DYW52YXMpO1xyXG4gICAgICAgIGlmICghYV9Jc01hc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZpZXcuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KFwiYmVmb3JlYmVnaW5cIiwgYV9DYW52YXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLk9uUmVzaXplKG51bGwpO1xyXG4gICAgfVxyXG4gICAgR29Ub0NlbnRlcihhX0NvbnRhaW5lcikge1xyXG4gICAgICAgIGFfQ29udGFpbmVyLnBvc2l0aW9uLnNldCh0aGlzLldpZHRoIC8gMiwgdGhpcy5IZWlnaHQgLyAyKTtcclxuICAgIH1cclxuICAgIEFkZEZQU0luZm8oKSB7XHJcbiAgICAgICAgbGV0IGxfdGV4dFN0eWxlID0gbmV3IFBJWEkuVGV4dFN0eWxlKHtcclxuICAgICAgICAgICAgZm9udEZhbWlseTogXCJBcmlhbFwiLFxyXG4gICAgICAgICAgICBmb250U2l6ZTogMzYsXHJcbiAgICAgICAgICAgIGZvbnRTdHlsZTogXCJpdGFsaWNcIixcclxuICAgICAgICAgICAgZm9udFdlaWdodDogXCJib2xkXCIsXHJcbiAgICAgICAgICAgIGZpbGw6IDB4ZmZmZmYsXHJcbiAgICAgICAgICAgIHN0cm9rZTogMHhmZmZmZmZcclxuICAgICAgICB9KTtcclxuICAgICAgICBsZXQgbF9mcHMgPSBuZXcgUElYSS5UZXh0KFwiRlBTOlwiLCBsX3RleHRTdHlsZSk7XHJcbiAgICAgICAgbF9mcHMuYW5jaG9yLnNldCgxLCAwKTtcclxuICAgICAgICBsX2Zwcy54ID0gdGhpcy5XaWR0aDtcclxuICAgICAgICBsX2Zwcy55ID0gMDtcclxuICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGxfZnBzKTtcclxuICAgICAgICBsZXQgbF9GUFMgPSAwO1xyXG4gICAgICAgIHRoaXMudGlja2VyLmFkZCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChNYXRoLmFicyh0aGlzLnRpY2tlci5GUFMgLSBsX0ZQUykgPCAwLjMpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBsX0ZQUyA9IHRoaXMudGlja2VyLkZQUztcclxuICAgICAgICAgICAgbF9mcHMudGV4dCA9IFwiRlBTOiBcIiArIHRoaXMudGlja2VyLkZQUy50b0ZpeGVkKDIpICsgXCJcXG5cIiArIHRoaXMudGlja2VyLmVsYXBzZWRNUy50b0ZpeGVkKDIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgTG9hZCgpIHtcclxuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgICAgICBSZXNvdXJjZVRvb2xfMS5SZXNvdXJjZVRvb2wuQWRkU2NlbmVzKFtTY2VuZUxvYWRpbmdfMS5TY2VuZUxvYWRpbmddKTtcclxuICAgICAgICAgICAgUmVzb3VyY2VUb29sXzEuUmVzb3VyY2VUb29sLlByZXBhcmVSZXNvdXJjZSgpO1xyXG4gICAgICAgICAgICBQSVhJLkxvYWRlci5zaGFyZWQubG9hZCgobG9hZGVyLCByZXNvdXJjZXMpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiI09uQmFzZUxvYWRlZFwiKTtcclxuICAgICAgICAgICAgICAgIGxldCBsX1NjZW5lTG9hZGluZyA9IG5ldyBTY2VuZUxvYWRpbmdfMS5TY2VuZUxvYWRpbmcodGhpcyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN0YWdlLmFkZENoaWxkKGxfU2NlbmVMb2FkaW5nKTtcclxuICAgICAgICAgICAgICAgIFJlc291cmNlVG9vbF8xLlJlc291cmNlVG9vbC5BZGRTY2VuZXModGhpcy5Vc2VTY2VuZXMpO1xyXG4gICAgICAgICAgICAgICAgbF9TY2VuZUxvYWRpbmcub24oU2NlbmVMb2FkaW5nXzEuU2NlbmVMb2FkaW5nLkV2ZW50TmFtZXMuT25Mb2FkZWQsIChsb2FkZXIsIHJlc291cmNlcykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiI09uUmVzb3VyY2VMb2FkZWRcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbF9TY2VuZUxvYWRpbmcuRGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhZ2UucmVtb3ZlQ2hpbGQobF9TY2VuZUxvYWRpbmcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgbF9TY2VuZUxvYWRpbmcuTG9hZCgpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkdhbWVBcHAgPSBHYW1lQXBwO1xyXG5HYW1lQXBwLkV2ZW50TmFtZXMgPSB7XHJcbiAgICBPbkxvYWRlZDogXCJPbkxvYWRlZFwiXHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUmVzb3VyY2VUb29sID0gdm9pZCAwO1xyXG5jb25zdCBQSVhJID0gcmVxdWlyZShcInBpeGkuanNcIik7XHJcbmNvbnN0IFNjZW5lUmVzb3VyY2VfMSA9IHJlcXVpcmUoXCIuL1NjZW5lUmVzb3VyY2VcIik7XHJcbmxldCBBbGxTY2VuZVJlc291cmNlID0gW107XHJcbmNsYXNzIFJlc291cmNlVG9vbCB7XHJcbiAgICBzdGF0aWMgQWRkU2NlbmVzKGFfU2NlbmVzKSB7XHJcbiAgICAgICAgYV9TY2VuZXMuZm9yRWFjaChfU2NlbmUgPT4ge1xyXG4gICAgICAgICAgICBpZiAoX1NjZW5lW1wiSW5pdFJlc291cmNlXCJdKSB7XHJcbiAgICAgICAgICAgICAgICBfU2NlbmVbXCJJbml0UmVzb3VyY2VcIl0oKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgO1xyXG4gICAgc3RhdGljIEFkZFNjZW5lUmVzb3VyY2UoYV9OYW1lc3BhY2UsIGFfUmVzb3VyY2VMaXN0KSB7XHJcbiAgICAgICAgbGV0IGxfU2NlbmVSZXNvdWVjZSA9IG5ldyBTY2VuZVJlc291cmNlXzEuU2NlbmVSZXNvdXJjZShhX05hbWVzcGFjZSk7XHJcbiAgICAgICAgQWxsU2NlbmVSZXNvdXJjZS5wdXNoKGxfU2NlbmVSZXNvdWVjZSk7XHJcbiAgICAgICAgZm9yIChsZXQgX0tleSBpbiBhX1Jlc291cmNlTGlzdCkge1xyXG4gICAgICAgICAgICBzd2l0Y2ggKHR5cGVvZiBhX1Jlc291cmNlTGlzdFtfS2V5XSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcIm9iamVjdFwiOlxyXG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IF9fS2V5IGluIGFfUmVzb3VyY2VMaXN0W19LZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhX1Jlc291cmNlTGlzdFtfS2V5XVtfX0tleV0gPT09IFwiXCIpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxfU2NlbmVSZXNvdWVjZS5BZGRSZXNvdXJjZShhX1Jlc291cmNlTGlzdFtfS2V5XVtfX0tleV0sIGFfUmVzb3VyY2VMaXN0W19LZXldW19fS2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcInN0cmluZ1wiOlxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChhX1Jlc291cmNlTGlzdFtfS2V5XSA9PT0gXCJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgbF9TY2VuZVJlc291ZWNlLkFkZFJlc291cmNlKGFfUmVzb3VyY2VMaXN0W19LZXldLCBhX1Jlc291cmNlTGlzdFtfS2V5XSk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGxfU2NlbmVSZXNvdWVjZTtcclxuICAgIH1cclxuICAgIHN0YXRpYyBDbGVhclRlbXBSZXNvdXJjZSgpIHtcclxuICAgICAgICBBbGxTY2VuZVJlc291cmNlLmxlbmd0aCA9IDA7XHJcbiAgICB9XHJcbiAgICA7XHJcbiAgICBzdGF0aWMgQWRkUmVzb3VyY2UoYV9SZXNvdXJjZUxpc3QpIHtcclxuICAgICAgICBmb3IgKGxldCBfUmVzb3VyY2VOYW1lIGluIGFfUmVzb3VyY2VMaXN0KSB7XHJcbiAgICAgICAgICAgIFBJWEkuTG9hZGVyLnNoYXJlZC5hZGQoX1Jlc291cmNlTmFtZSwgYV9SZXNvdXJjZUxpc3RbX1Jlc291cmNlTmFtZV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIDtcclxuICAgIHN0YXRpYyBQcmVwYXJlUmVzb3VyY2UoKSB7XHJcbiAgICAgICAgd2hpbGUgKEFsbFNjZW5lUmVzb3VyY2UubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGxldCBsX1Jlc291cmNlID0gQWxsU2NlbmVSZXNvdXJjZS5wb3AoKTtcclxuICAgICAgICAgICAgdGhpcy5BZGRSZXNvdXJjZShsX1Jlc291cmNlLkdldEFsbFJlc291cmNlKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIDtcclxufVxyXG5leHBvcnRzLlJlc291cmNlVG9vbCA9IFJlc291cmNlVG9vbDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5TY2VuZVJlc291cmNlID0gdm9pZCAwO1xyXG5jb25zdCBQSVhJID0gcmVxdWlyZShcInBpeGkuanNcIik7XHJcbmNsYXNzIFNjZW5lUmVzb3VyY2Uge1xyXG4gICAgY29uc3RydWN0b3IoYV9OYW1lU3BhY2UpIHtcclxuICAgICAgICB0aGlzLl9OYW1lc3BhY2UgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuX1Jlc291cmNlTGlzdCA9IHt9O1xyXG4gICAgICAgIHRoaXMuX05hbWVzcGFjZSA9IGFfTmFtZVNwYWNlO1xyXG4gICAgfVxyXG4gICAgZ2V0IE5hbWVzcGFjZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fTmFtZXNwYWNlO1xyXG4gICAgfVxyXG4gICAgR2V0UmVzb3VyY2VLZXkoYV9SZXNvdXJjZU5hbWUpIHtcclxuICAgICAgICByZXR1cm4gYCR7dGhpcy5fTmFtZXNwYWNlfV8ke2FfUmVzb3VyY2VOYW1lfWA7XHJcbiAgICB9XHJcbiAgICBBZGRSZXNvdXJjZShhX1Jlc291cmNlTmFtZSwgYV9SZXNvdXJjZVBhdGgpIHtcclxuICAgICAgICB0aGlzLl9SZXNvdXJjZUxpc3RbdGhpcy5HZXRSZXNvdXJjZUtleShhX1Jlc291cmNlTmFtZSldID0gYV9SZXNvdXJjZVBhdGg7XHJcbiAgICB9XHJcbiAgICBHZXRSZXNvdXJjZShhX1Jlc291cmNlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiBQSVhJLkxvYWRlci5zaGFyZWQucmVzb3VyY2VzW3RoaXMuR2V0UmVzb3VyY2VLZXkoYV9SZXNvdXJjZU5hbWUpXTtcclxuICAgIH1cclxuICAgIEdldFJlc291cmNlUGF0aChhX1Jlc291cmNlTmFtZSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9SZXNvdXJjZUxpc3RbdGhpcy5HZXRSZXNvdXJjZUtleShhX1Jlc291cmNlTmFtZSldO1xyXG4gICAgfVxyXG4gICAgR2V0QWxsUmVzb3VyY2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX1Jlc291cmNlTGlzdDtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLlNjZW5lUmVzb3VyY2UgPSBTY2VuZVJlc291cmNlO1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkxvYWRpbmdCYXIgPSB2b2lkIDA7XHJcbmNvbnN0IFdJRFRIID0gNDAwO1xyXG5jb25zdCBCQVJfSEVJR0hUID0gMTQ7XHJcbmNsYXNzIExvYWRpbmdCYXIgZXh0ZW5kcyBQSVhJLkNvbnRhaW5lciB7XHJcbiAgICBjb25zdHJ1Y3RvcihhX0dhbWVBcHApIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuX1Byb2Nlc3NCRyA9IG5ldyBQSVhJLkdyYXBoaWNzKCk7XHJcbiAgICAgICAgdGhpcy5fUHJvY2Vzc0JHLmJlZ2luRmlsbCgweGZmZmZmZiwgMC41KTtcclxuICAgICAgICBsZXQgbF9BcHBXaWR0aCA9IGFfR2FtZUFwcC5zY3JlZW4ud2lkdGg7XHJcbiAgICAgICAgbGV0IGxfQXBwSGVpZ2h0ID0gYV9HYW1lQXBwLnNjcmVlbi5oZWlnaHQ7XHJcbiAgICAgICAgdGhpcy5fQmFyV2lkdGggPSBsX0FwcFdpZHRoIC0gV0lEVEg7XHJcbiAgICAgICAgdGhpcy5fWCA9IDAgLSB0aGlzLl9CYXJXaWR0aCAvIDI7XHJcbiAgICAgICAgdGhpcy5fWSA9IGxfQXBwSGVpZ2h0IC8gMiAtIDEwMDtcclxuICAgICAgICB0aGlzLl9Qcm9jZXNzQkcuZHJhd1JlY3QodGhpcy5fWCwgdGhpcy5fWSwgdGhpcy5fQmFyV2lkdGgsIEJBUl9IRUlHSFQpO1xyXG4gICAgICAgIHRoaXMuYWRkQ2hpbGQodGhpcy5fUHJvY2Vzc0JHKTtcclxuICAgICAgICB0aGlzLl9Qcm9jZXNzQmFyID0gbmV3IFBJWEkuR3JhcGhpY3MoKTtcclxuICAgICAgICB0aGlzLmFkZENoaWxkKHRoaXMuX1Byb2Nlc3NCYXIpO1xyXG4gICAgfVxyXG4gICAgVXBkYXRlQmFyKGFfUHJvZ3Jlc3MpIHtcclxuICAgICAgICB0aGlzLl9Qcm9jZXNzQmFyLmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5fUHJvY2Vzc0Jhci5iZWdpbkZpbGwoMHhmZmZmZmYsIDEpO1xyXG4gICAgICAgIHRoaXMuX1Byb2Nlc3NCYXIuZHJhd1JlY3QodGhpcy5fWCwgdGhpcy5fWSwgdGhpcy5fQmFyV2lkdGggKiBhX1Byb2dyZXNzIC8gMTAwLCBCQVJfSEVJR0hUKTtcclxuICAgIH1cclxuICAgIERpc3Ryb3koKSB7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Mb2FkaW5nQmFyID0gTG9hZGluZ0JhcjtcclxuIiwibW9kdWxlLmV4cG9ydHMgPSBQSVhJOyJdLCJzb3VyY2VSb290IjoiIn0=