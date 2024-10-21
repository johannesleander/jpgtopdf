import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { createReadStream } from 'fs';
import { Jimp } from 'jimp';

const inputDir = './input';
const outputDir = './output';

if (!fs.existsSync(outputDir)){
    fs.mkdirSync(outputDir);
}

async function convertImagesToPDF(folder) {
    const folderPath = path.join(inputDir, folder);
    const pdfPath = path.join(outputDir, `${folder}.pdf`);


    const files = fs.readdirSync(folderPath)
		.filter(file => file.endsWith('.jpg'))
   		.sort((a, b) => {
       			const numA = parseInt(a.match(/(\d+)/)[0], 10);
       			const numB = parseInt(b.match(/(\d+)/)[0], 10);
       			return numA - numB;
    });

    const doc = new PDFDocument();

    // Pipe the PDF into a file
    doc.pipe(fs.createWriteStream(pdfPath));

    for (const file of files) {
        const imagePath = path.join(folderPath, file);
        const image = await Jimp.read(imagePath);

        // Resize if needed (optional)
        // image.resize(Jimp.AUTO, 800); // Example to resize to height of 800px

        // Save as PNG temporarily
        const pngPath = imagePath.replace('.jpg', '.png');
    	console.log(`Processing ${pngPath}...`);
        await image.write(pngPath);

        // Add image to PDF
        doc.addPage().image(pngPath, { fit: [500, 700] }); // Adjust size as needed

        // Clean up the temporary PNG file
        fs.unlinkSync(pngPath);
    }

    // Finalize the PDF and end the stream
    doc.end();
    console.log(`Converted ${files.length} images to ${pdfPath}`);
}

async function main() {
    const folders = fs.readdirSync(inputDir)
    	.filter(file => fs.statSync(path.join(inputDir, file)).isDirectory())
   	.sort((a, b) => {
       		const numA = parseInt(a.match(/(\d+)/)[0], 10);
       		const numB = parseInt(b.match(/(\d+)/)[0], 10);
       		return numA - numB;
    });

    for (const folder of folders) {
        await convertImagesToPDF(folder);
    }
}

main().catch(err => {
    console.error('Error during conversion:', err);
});

