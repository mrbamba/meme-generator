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

    renderGallery()

}

function resizeCanvas(imgId) {



    let elCanvasContainer = document.querySelector('.canvas-container');
    let maxWidth = elCanvasContainer.offsetWidth;

    let maxHeight = elCanvasContainer.offsetHeight;


    let elImg = document.getElementById(`${imgId}`);
    let width = elImg.naturalWidth;
    let height = elImg.naturalHeight;

    let ratio = maxWidth / width;
    if (height * ratio > maxHeight) {
        ratio = maxHeight / height;
    }
    elImg.width = (width * ratio);
    elImg.height = (height * ratio);

    gElCanvas.width = elImg.width;
    gElCanvas.height = elImg.height;
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

function onDeleteLine() {
    DeleteLine();
}

function onMoveX(diff) {
    moveX(diff);
}

function onMoveY(diff) {
    moveY(diff);
}

function onSetFontSize(diff) {
    setFontSize(diff);
}

function onSetAlignment(alignment) {
    setAlignment(alignment);
}

function onSetFontFamily() {
    let fontFamily = document.querySelector('.font-selector').value;
    setFontFamily(fontFamily);
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





// RENDERING

function onOpenEditor(imgId) {
    let gallery = document.querySelector('.gallery-page');
    gallery.classList.add('hidden');
    let editor = document.querySelector('.editor-page');
    editor.classList.remove('hidden');
    setImg(imgId);
    resizeCanvas(imgId);
    setInitialX()

}


function onOpenGallery() {
    let gallery = document.querySelector('.gallery-page');
    gallery.classList.remove('hidden')
    let editor = document.querySelector('.editor-page');
    editor.classList.add('hidden')
    let about = document.querySelector('.about');
    about.classList.add('hidden')
}

function renderMeme() {
    // clearCanvas()
    let meme = getGMeme();
    resizeCanvas(meme.selectedImgId)
    let img = getImgById(meme.selectedImgId);


    let elImg = document.getElementById(`${meme.selectedImgId}`);

    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
    drawTexts();
    document.querySelector('.text-line').value = meme.lines[meme.selectedLineIdx].txt;
}

function clearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}


function drawTexts() {
    let meme = getGMeme();
    for (let i = 0; i < meme.lines.length; i++)drawText(i)
}

function drawText(lineIdx) {
    let meme = getGMeme();
    let line = meme.lines[lineIdx];

    gCtx.lineWidth = '2';
    gCtx.font = '' + line.fontSize + 'px ' + line.fontFamily;
    gCtx.fillStyle = line.fillColor;
    gCtx.strokeStyle = line.strokeColor;
    gCtx.textAlign = line.align

    gCtx.fillText(line.txt, line.x, line.y)
    gCtx.strokeText(line.txt, line.x, line.y)

    // MARK CURRENTLY EDITED LINE
    if (meme.selectedLineIdx === lineIdx) {
        let textWidth = gCtx.measureText(line.txt).width;
        console.log(textWidth)
        let startX = line.x
        let startY = line.y + 3
        if (line.align === 'center') {
            startX -= textWidth / 2
        } else if (line.align === 'right') {
            startX -= textWidth
        }
        markSelectedLine(startX, startY, textWidth);
    }
}

function markSelectedLine(x, y, length, height = 2) {
    gCtx.beginPath();
    gCtx.rect(x, y, length, height);
    gCtx.strokeStyle = 'gold';
    gCtx.stroke();
}



// GALLERY

function renderGallery() {
    let strHtmls = []
    gImgs.map(img => {
        let elImg = `<img src="${img.url}" class="gallery-img" id="${img.id}" onclick="onOpenEditor(${img.id})" >\n`
        strHtmls.push(elImg)
    })
    document.querySelector('.gallery-grid-container').innerHTML = strHtmls.join('');
}

// ABOUT

function onOpenAbout() {
    let gallery = document.querySelector('.gallery-page');
    gallery.classList.add('hidden')
    let editor = document.querySelector('.editor-page');
    editor.classList.add('hidden')
    let about = document.querySelector('.about');
    about.classList.remove('hidden')

}



// DOWNLOAD
function onDownloadCanvas(elLink) {
    const imgData = gElCanvas.toDataURL();
    elLink.href = imgData;
    elLink.download = 'my-meme'
    console.log('runs');
}

// SHARING - NOT ACTIVE YET


// on submit call to this function
function uploadImg(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");

    // A function to be called if request succeeds
    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
           Share   
        </a>`
    }

    doUploadImg(elForm, onSuccess);
}

function doUploadImg(elForm, onSuccess) {
    var formData = new FormData(elForm);
    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (res) {
            return res.text()
        })
        .then(onSuccess)
        .catch(function (err) {
            console.error(err)
        })
}

// The next 2 functions handle IMAGE UPLOADING to img tag from file system: 
function onImgInput(ev) {
    loadImageFromInput(ev, renderCanvas)
}
function loadImageFromInput(ev, onImageReady) {
    document.querySelector('.share-container').innerHTML = ''
    var reader = new FileReader();

    reader.onload = function (event) {
        var img = new Image();
        img.onload = onImageReady.bind(null, img)
        img.src = event.target.result;
    }
    reader.readAsDataURL(ev.target.files[0]);
}