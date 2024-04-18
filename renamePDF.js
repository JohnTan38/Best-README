async function renamePDF() {
    // Your code to rename the PDF goes here
    const XLSX = require('xlsx');
    const fs = require('fs');
    const path = require('path');

    //Read the excel file
    const xlsx_dir = "C:/Users/john.tan/Downloads/orders.xlsx";
    const workbook = XLSX.readFile(xlsx_dir);
    const sheet_name_list = workbook.SheetNames;
    const sheet_name = sheet_name_list[0];
    const sheet = workbook.Sheets[sheet_name];
    const df = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);
    console.log(df);

    //Create a list of order_numbers from df column 'OrderNumber'
    const list_order_numbers = df.map(row => row['OrderNumber']);
    list_order_numbers.push(99999999);
    console.log(list_order_numbers)

    const dir_pdf_split = 'C:/Users/john.tan/nodejs-nodemailer-outlook/pdf/';

    function renameFilesInDirectory(directory, list_order_numbers) {
        const listOfFiles = fs.readdirSync(directory);
        const pdfFiles = listOfFiles.filter(file => path.extname(file).toLowerCase() === '.pdf');
        for (let i = 0; i < pdfFiles.length; i++) {
            if (i < list_order_numbers.length) {
                const oldPath = path.join(directory, pdfFiles[i]);
                const newPath = path.join(directory, list_order_numbers[i] + '.pdf');
                fs.renameSync(oldPath, newPath);
            } else {
                console.log('Not enough order numbers to rename all PDF files.');
                break;
            }
        }
    }
    renameFilesInDirectory(dir_pdf_split, list_order_numbers)
        return 'PDF renamed';
    }

module.exports = { renamePDF };
