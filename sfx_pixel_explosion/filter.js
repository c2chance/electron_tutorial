const Jimp = require('jimp');
const { createCanvas, loadImage } = require('canvas')
const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

async function applyFilter(imageFilename) {
    const image = await Jimp.read(imageFilename);

    const filters = {
        1: ["blur", (img) => img.blur(5)],
        2: ["Contour", (img) => img.convolute([
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ])],
        3: ["detail", (img) => convolute([
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ])],
        4: ["Embossment", (img) => img.convolute([
            [-2, -1, 0],
            [-1, 1, 1],
            [0, 1, 2]
        ])],
        5: ["FindingEdge", (img) => img.convolute([
            [-1, -1, -1],
            [-1, 8, -1],
            [-1, -1, -1]
        ])],
        6: ["sharp", (img) => img.convolute([
            [0, -1, 0],
            [-1, 5, -1],
            [0, -1, 0]
        ])],
        7: ["smooth", (img) => img.convolute([
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9],
            [1 / 9, 1 / 9, 1 / 9]
        ])],
        8: ["invertcolor", (img) => img.invert()],
        9: ["grayscale", (img) => img.grayscale()],
        10: ["colortransform", (img) => img.color([{ apply: 'red', params: [100] }])],
        11: ["pixel", (img) => img.pixelate(10)]
    };

    console.log('Please choose a filter: ');
    for (let key in filters) {
        console.log(`${key}. ${filters[key][0]}`)
    }

    rl.question('please input the number:', async (choice) => {
        choice = parseInt(choice);


        if (filters[choice]) {
            const filterFucntion = filters[choice][1];
            const newImage = image.clone();
            filterFucntion(newImage);
            const canvas = createCanvas(image.bitmap.width * 2, image.bitmap.height);
            const ctx = canvas.getContext('2d');
            const imgBuffer = await image.getBufferAsync(Jimp.MIME_PNG);
            const newImgBuffer = await newImage.getBufferAsync(Jimp.MIME_PNG);
            const originalImg = await loadImage(imgBuffer);
            const filteredImg = await loadImage(newImgBuffer);

            ctx.drawImage(originalImg, 0, 0);
            ctx.drawImage(filteredImg, image.bitmap.width, 0)

            const out = fs.createWriteStream(imageFilename.split(".")[0] + "_filter.png");
            const stream = canvas.createPNGStream();
            stream.pipe(out);
            out.on('finish', () => {
                console.log(`Special Effect - ${filters[choice][0]} already apply and save to ${imageFilename.split(".")[0]}_filter.png`);
            })
        } else {
            console.log('Invalid choice, input valid choice')
        }
        rl.close();
    })
}

const imageFilename = process.argv[2] || 'girl.png';
applyFilter(imageFilename).catch(console.error);