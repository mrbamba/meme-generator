'use strict'

//GLOBAL VARIABLES
var gCtx;
var gElCanvas;
var gCurrText;
var gIsDrawing;
const CANVAS = document.querySelector('.canvas-container');

function init(){
    gElCanvas = document.getElementById('drawing');
    gCtx = gElCanvas.getContext('2d');
    gCtx.fillStyle = '#000';
    gCtx.strokeStyle = '#000'
    resizeCanvas();
}

function resizeCanvas() {
    var elCanvasContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elCanvasContainer.offsetWidth;
    gElCanvas.height = elCanvasContainer.offsetHeight;
}

// SETTING CHANGES

function onTextChange(){
    gCtx.
}

function onStrokeColorChange() {
    gCtx.strokeStyle = document.querySelector('.stroke-color-picker').value;

}

function onFillColorChange() {
    gCtx.fillStyle = document.querySelector('.fill-color-picker').value;
    console.log(gCtx.fillStyle)
}