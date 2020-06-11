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
    setText(text)
}

function onSwitchLine() {
    setLine();
}

function onAddLine() {
    addLine();
    document.querySelector('.text-line').value = '';
}

function onStrokeColorChange() {
    let strokeColor = document.querySelector('.stroke-color-picker').value;
    console.log(strokeColor);

    setStrokeColor(strokeColor);
}

function onFillColorChange() {
    let fillColor = document.querySelector('.fill-color-picker').value;
    setFillColor(fillColor);
}



// EVENT HANDLERS


// RENDERING

function onOpenEditor(imgId) {
    let gallery = document.querySelector('.gallery-page');
    gallery.classList.toggle('hidden')
    let editor = document.querySelector('.editor-page');
    editor.classList.toggle('hidden')
    setImg(imgId);
    init();
}


function onOpenGallery() {
    let gallery = document.querySelector('.gallery-page');
    gallery.classList.toggle('hidden')
    let editor = document.querySelector('.editor-page');
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
        drawTexts();
    }
    document.querySelector('.text-line').value=meme.lines[meme.selectedLineIdx].txt;
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
function drawTexts() {
    let meme = getGMeme();
    for (let i = 0; i < meme.lines.length; i++)drawText(i)
}

function drawText(lineIdx) {
    let meme = getGMeme();
    let line = meme.lines[lineIdx];

    gCtx.lineWidth = '2';
    gCtx.font = '' + line.fontSize + ' ' + line.fontFamily;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.textAlign = line.align
    // if(lineIdx===meme.selectedLineIdx)
    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)
}

// GALLERY

function renderGallery() {
    let strHtmls = []
    gImgs.map(img => {
        let elImg = `<img src="${img.url}" class="gallery-img" onclick="onOpenEditor(${img.id})">`
        strHtmls.push(elImg)
    })
    document.querySelector('.gallery-grid-container').innerHTML = strHtmls.join('');
}