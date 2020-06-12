'use strict'
// GLOBAL VARIABLES
var gKeywords = { 'happy': 12, 'success': 5 };

var gImgs = [
    { id: 1, url: 'meme-imgs/1.jpg', keywords: ['trump', 'upset', 'fuck off'] },
    { id: 2, url: 'meme-imgs/2.jpg', keywords: ['pupies', 'love'] },
    { id: 3, url: 'meme-imgs/3.jpg', keywords: [''] },
    { id: 4, url: 'meme-imgs/4.jpg', keywords: [''] },
    { id: 5, url: 'meme-imgs/5.jpg', keywords: [''] },
    { id: 6, url: 'meme-imgs/6.jpg', keywords: [''] },
    { id: 7, url: 'meme-imgs/7.jpg', keywords: [''] },
    { id: 8, url: 'meme-imgs/8.jpg', keywords: [''] },
    { id: 9, url: 'meme-imgs/9.jpg', keywords: [''] },
    { id: 10, url: 'meme-imgs/10.jpg', keywords: [''] },
    { id: 11, url: 'meme-imgs/11.jpg', keywords: [''] },
    { id: 12, url: 'meme-imgs/12.jpg', keywords: [''] },
    { id: 13, url: 'meme-imgs/13.jpg', keywords: [''] },
    { id: 14, url: 'meme-imgs/14.jpg', keywords: [''] },
    { id: 15, url: 'meme-imgs/15.jpg', keywords: [''] },
    { id: 16, url: 'meme-imgs/16.jpg', keywords: [''] },
    { id: 17, url: 'meme-imgs/17.jpg', keywords: [''] },
    { id: 18, url: 'meme-imgs/18.jpg', keywords: [''] },
    { id: 19, url: 'meme-imgs/19.jpg', keywords: [''] },
    { id: 20, url: 'meme-imgs/20.jpg', keywords: [''] },
    { id: 21, url: 'meme-imgs/21.jpg', keywords: [''] },
    { id: 22, url: 'meme-imgs/22.jpg', keywords: [''] },
    { id: 23, url: 'meme-imgs/23.jpg', keywords: [''] },
    { id: 24, url: 'meme-imgs/24.jpg', keywords: [''] },
    { id: 25, url: 'meme-imgs/25.jpg', keywords: [''] },
];


var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,

    lines: [
        {
            txt: '',
            fontSize: 40,
            align: 'center',
            fontFamily: 'impact',
            strokeColor: 'black',
            fillColor: '#fff',
            x: 250,
            y: 50
        }
    ]
}

// GETTERS

function setInitialX() {
    let elImg = document.getElementById(`${gMeme.selectedImgId}`);
    let center = elImg.width / 2;
    gMeme.lines[0].x = center;
    renderMeme()

}
function getGMeme() {
    return gMeme;
}

function getImgById(id) {
    var img = gImgs.find(img => img.id === id);
    return img;
}

function getGSettings() {
    return gSettings;
}
// SETTERS

function setLine() {
    (gMeme.selectedLineIdx === gMeme.lines.length - 1) ? gMeme.selectedLineIdx = 0 : gMeme.selectedLineIdx++;
    renderMeme()
}

function addLine() {
    let elImg = document.getElementById(`${gMeme.selectedImgId}`);
    let width = elImg.width;
    let height = elImg.height;



    if (gMeme.lines.length === 1) {
        gMeme.lines.push({
            txt: '',
            fontSize: 40,
            align: 'center',
            fontFamily: 'impact',
            strokeColor: 'black',
            fillColor: '#fff',
            x: (width / 2),
            y: (height - 50)
        })
    } else {
        gMeme.lines.push({
            txt: '',
            fontSize: 40,
            align: 'center',
            fontFamily: 'impact',
            strokeColor: '#000',
            fillColor: '#fff',
            x: (width / 2),
            y: (height / 2)
        })
    }

    gMeme.selectedLineIdx = gMeme.lines.length - 1;
    renderMeme()
}

function DeleteLine() {
    gMeme.lines.splice(gMeme.selectedLineIdx, 1)
    gMeme.selectedLineIdx = 0
    if (gMeme.lines.length === 0) {
        gMeme.lines.push({
            txt: '',
            fontSize: 40,
            align: 'center',
            fontFamily: 'impact',
            strokeColor: '#000',
            fillColor: '#fff',
            x: 250,
            y: 50
        });
    }
    renderMeme();
}

function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineIdx].fontSize += diff
    renderMeme()
}

function setAlignment(alignment) {
    gMeme.lines[gMeme.selectedLineIdx].align = alignment
    renderMeme()
}


function setText(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text;
    renderMeme();
}

function setImg(imgId) {
    gMeme.selectedImgId = imgId;
    init();
}

function moveX(diff) {
    gMeme.lines[gMeme.selectedLineIdx].x += diff;
    renderMeme();
}

function moveY(diff) {
    gMeme.lines[gMeme.selectedLineIdx].y += diff;
    renderMeme();
}




function setFontFamily(fontFamily) {
    gMeme.lines[gMeme.selectedLineIdx].fontFamily = fontFamily
    renderMeme();
}

function setStrokeColor(strokeColor) {
    gMeme.lines[gMeme.selectedLineIdx].strokeColor = strokeColor
    renderMeme();
}

function setFillColor(fillColor) {
    gMeme.lines[gMeme.selectedLineIdx].fillColor = fillColor;
    renderMeme();
}

