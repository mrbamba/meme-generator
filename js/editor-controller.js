'use strict'

//GLOBAL VARIABLES
var gCtx;
var gElCanvas;
var gCurrText;
var gIsDrawing;
const CANVAS = document.querySelector('.canvas-container');

function init() {
    debugger
    gElCanvas = document.getElementById('drawing');
    gCtx = gElCanvas.getContext('2d');
    gCtx.fillStyle = '#000';
    gCtx.strokeStyle = '#000'

    resizeCanvas();
    renderMeme()

}

function resizeCanvas() {
    var elCanvasContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elCanvasContainer.offsetWidth;
    gElCanvas.height = elCanvasContainer.offsetHeight;
}

// SETTING CHANGES

// function onTextChange(){
//     gCtx.
// }

function onStrokeColorChange() {
    gCtx.strokeStyle = document.querySelector('.stroke-color-picker').value;

}

function onFillColorChange() {
    gCtx.fillStyle = document.querySelector('.fill-color-picker').value;
    console.log(gCtx.fillStyle)
}


function renderMeme() {
    let meme = getGMeme();
    let img = getImgById(meme.selectedImgId);
    console.log(img)
    drawImg(img.url)


    // meme.lines.forEach(line => {


    // });

}

function drawImg(src) {
    var img = new Image();
    img.src = src;
    console.log(img);
    console.log(gElCanvas);

    img.onLoad = () => {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}