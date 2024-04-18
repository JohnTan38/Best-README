async function Email() {
    // Your code to send email goes here
    var nodeoutlook = require('./nodejs-nodemailer-outlook.js');

    const fs = require('fs');
    const path = require('path');
    const XLSX = require('xlsx');

    const truckerEmailDictionary = {
    'BL': 'vieming@hotmail.com',
    'SDL': 'vieming@yahoo.com',
    'SLP': 'vieming@gmail.com'
    };

    function getPdfFilesInDirectory(directory) {
        const listOfFiles = fs.readdirSync(directory);
        const txtFiles = listOfFiles.filter(file => path.extname(file).toLowerCase() === '.pdf');
        const list_file_paths = txtFiles.map(file => path.join(directory, file));
        return list_file_paths;
    }

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
  
        return `<span class="math-inline">\{day\}\-</span>{month}-${year}`;
    }

    let email_receiver;
    let trucker;

    function createHtmlTable(selected_row) {
        let table = '<table>';
        // add table headers
        table += '<tr>';
        for (let key in selected_row[0]) {
            table += '<th>' + key + '</th>';
        }
        table += '</tr>';
        // add table data
        for (let row of selected_row) {
            table += '<tr>';
            for (let key in row) {
                if (key === 'RequestedETA') {
                    const cellValue = row[key];
                    if (cellValue instanceof Date) {
                        table += '<td>'+formatDate(cellValue)+'</td>'; //use existing
                    } else {
                        table += '<td>'+formatDate(new Date(row[key]))+'</td>'; //parse format as new Date
                    }
                }   else if (key === 'Trucker') {
                    const trucker = row[key];
                    //trucker = row[key];
                    email_receiver = truckerEmailDictionary[trucker];
                    table += '<td>'+trucker+'</td>';

                } else {
                    table += '<td>' + row[key] + '</td>';
                }
            }
            table += '</tr>';
        }
        table += '</table>';
        return table;
    }

    const dir_pdf = 'C:/Users/john.tan/nodejs-nodemailer-outlook/pdf/';
    const list_file_paths = getPdfFilesInDirectory(dir_pdf);

    //console.log(list_file_paths);
    //Read the excel file
    const xlsx_dir = "C:/Users/john.tan/Downloads/orders.xlsx";
    const workbook = XLSX.readFile(xlsx_dir);
    const sheet_name_list = workbook.SheetNames;
    const sheet_name = sheet_name_list[0];
    const sheet = workbook.Sheets[sheet_name];
    const df = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name]);
    console.log(df);

    function getValueByKey(dictionary, key) {
        return dictionary[key];
    }   
    //Create a list of order_numbers from df column 'OrderNumber'
    const list_order_numbers = df.map(row => row['OrderNumber']);

    //For each order_number in list_order_numbers
    for (const order_number of list_order_numbers) {
        // Select row where column 'OrderNumber' == order_number and format as table
        const selected_row = df.filter(row => row['OrderNumber'] === order_number);
        const table = createHtmlTable(selected_row);
        //const table = JSON.stringify(selected_row, null, 2);

        const pdf_to_attach = order_number;
        //const pdf_to_attach_path = list_file_paths.filter(file_path => file_path.includes(pdf_to_attach))[0];
        const pdf_to_attach_path = 'https:/raw.githubusercontent.com/JohnTan38/emmyPDF/main/'+pdf_to_attach+'.pdf';
        console.log(pdf_to_attach_path);     
        
        //const email_receiver = getValueByKey(truckerEmailDictionary, trucker);
        

        if (pdf_to_attach_path)  {
            nodeoutlook.sendEmail({
                auth: {
                    user: "john.tan@sh-cogent.com.sg",
                    pass: "Realmadrid8983@"
                },
                from: 'john.tan@sh-cogent.com.sg',
                to: email_receiver,
                subject: 'OnshoreCustomer Order Confirmation '+pdf_to_attach,
                html: '<b>Details confirmation.\n</b>'+ table,
                text: 'Attached.\n'+ table,
                attachments: [
                    //{
                        //filename: pdf_to_attach_path,//.split("\\").pop(),
                        //path: pdf_to_attach_path
                    //},
                    {   // use URL as an attachment
                        filename: pdf_to_attach+'.pdf',
                        path: 'https://raw.githubusercontent.com/JohnTan38/emmyPDF/main/'+ pdf_to_attach+'.pdf'
                    },
    
                ],
                onError: e => console.log(e),
                       
                onSuccess: i => console.log(i)
            });
        } else {
            console.log('PDF not found ${pdf_to_attach}');
        }
    }    
            return 'Email sent successfully!';
        }

    module.exports = { Email };