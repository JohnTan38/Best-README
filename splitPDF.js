const fs = require('fs');
const PDFDocument = require('pdf-lib').PDFDocument;

async function splitPDF(pathToPdf) {
    // Your code to split the PDF goes here
    const fs = require('fs');
    const PDFDocument = require('pdf-lib').PDFDocument;
    const docmentAsBytes = await fs.promises.readFile(pathToPdf);

    // Load your PDFDocument
    const pdfDoc = await PDFDocument.load(docmentAsBytes)

    const numberOfPages = pdfDoc.getPages().length;

    for (let i = 0; i < numberOfPages; i++) {

        // Create a new "sub" document
        const subDocument = await PDFDocument.create();
        // copy the page at current index
        const [copiedPage] = await subDocument.copyPages(pdfDoc, [i])
        subDocument.addPage(copiedPage);
        const pdfBytes = await subDocument.save()
        await writePdfBytesToFile(`C:/Users/john.tan/nodejs-nodemailer-outlook/pdf/order-${i + 1}.pdf`, pdfBytes);

    }
    //return 'PDF is split';
    //return 'Split PDF successful!';
}

function writePdfBytesToFile(fileName, pdfBytes) {
    return fs.promises.writeFile(fileName, pdfBytes);

   
}

module.exports = { splitPDF };

(async () => {
    await splitPDF("C:/Users/john.tan/nodejs-nodemailer-outlook/pdf/upcomingShipmentReport/UpcomingShipmentReport.PDF");
})();
console.log('splitPDF.js executed successfully');
return 'Split PDF successful!';
