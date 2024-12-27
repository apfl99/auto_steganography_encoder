const fs = require('fs');
const { createCanvas, loadImage } = require('canvas');
const sjcl = require('./sjcl.js');
const logic = require('./logic.js');

// 최대 메시지 크기 설정
const maxMessageSize = 1000;

// 이미지를 가져와서 메시지를 숨기고 저장
const encodeImage = async (inputImagePath, outputImagePath, message) => {
    if (message.length > maxMessageSize) {
        console.error('Message is too big.');
        return;
    }

    try {
        const image = await loadImage(inputImagePath);
        const canvas = createCanvas(image.width, image.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(image, 0, 0);
        const imgData = ctx.getImageData(0, 0, ctx.canvas.width, ctx.canvas.height);

        message = JSON.stringify({ text: message });
        logic.encodeMessage(imgData.data, sjcl.hash.sha256.hash(''), message);

        ctx.putImageData(imgData, 0, 0);

        const out = fs.createWriteStream(outputImagePath);
        const stream = canvas.createPNGStream();
        stream.pipe(out);
        await new Promise((resolve, reject) => {
            out.on('finish', resolve);
            out.on('error', reject);
        });

        console.log(`Encoded image saved to ${outputImagePath}`);
    } catch (err) {
        console.error('Error:', err);
    }
};


// Encode

const start = 0;
const end = 728;

async function main() {
    for (let i = start; i <= end; i++) {
        console.log(`Encoding image ${i}`);
        var inputImagePath = `./nft_images/${i}.png`;
        var outputImagePath = `./encoded_nft_images/${i}.png`;
        var message = `Uniwaffle_${i}`;
        await encodeImage(inputImagePath, outputImagePath, message);
    }
}

main();

