'use strict'

//GLOBAL VARIABLES
var gCtx;
var gElCanvas;
var gCurrText;
var gIsDrawing;
const CANVAS = document.querySelector('.canvas-container');

function init() {
    gElCanvas = document.getElementById('drawing');
    gCtx = gElCanvas.getContext('2d');
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'white'
    gCtx.lineWidth = '2';
    gCtx.save();


    resizeCanvas();
    renderMeme()
    renderGallery()

}

function resizeCanvas() {
    var elCanvasContainer = document.querySelector('.canvas-container');
    gElCanvas.width = elCanvasContainer.offsetWidth;
    gElCanvas.height = elCanvasContainer.offsetHeight;
}

// SETTING CHANGES


function onTextChange() {
    let text = document.querySelector('.text-line').value;
    setLine(text)
}

function onStrokeColorChange() {
    gCtx.strokeStyle = document.querySelector('.stroke-color-picker').value;

}

function onFillColorChange() {
    gCtx.fillStyle = document.querySelector('.fill-color-picker').value;
    console.log(gCtx.fillStyle)
}


// EVENT HANDLERS


// RENDERING

function onOpenEditor(imgId){
    let gallery=document.querySelector('.gallery-page');
    gallery.classList.toggle('hidden')
    let editor=document.querySelector('.editor-page');
    editor.classList.toggle('hidden')
    init();
    setImg(imgId);
}
function onOpenGallery(){
    let gallery=document.querySelector('.gallery-page');
    gallery.classList.toggle('hidden')
    let editor=document.querySelector('.editor-page');
    editor.classList.toggle('hidden')
}

function renderMeme() {
    clearCanvas()
    let meme = getGMeme();
    let img = getImgById(meme.selectedImgId);
    // drawImg(img.url)

    let elImg = new Image();
    elImg.src = img.url;
    elImg.onload = function () {
        gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)

        drawText(meme.lines[0].txt, 250, 250)
    }

    // meme.lines.forEach(line => {


    // });

}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function drawImg(src) {
    let elImg = new Image();
    elImg.src = src;
    elImg.onload = function () {
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
    }
}

function drawText(text, x, y) {
    gCtx.lineWidth = '2';
    gCtx.font = '48px impact';
    gCtx.fillStyle = 'white';
    gCtx.strokeStyle = 'black'
    gCtx.textAlign = 'center'

    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y)
}





// GALLERY

function renderGallery() {
    let strHtmls=[]
    gImgs.map(img => {
        let elImg = `<img src="${img.url}" class="gallery-img" onclick="onOpenEditor(${img.id})">`
        strHtmls.push(elImg)
    })
    document.querySelector('.gallery-grid-container').innerHTML=strHtmls.join('');
}