
const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;


// fileUrl: the absolute url of the image or video you want to download
// downloadFolder: the path of the downloaded file on your machine
const downloadFile = async (fileUrl, downloadFolder, nombre) => {
    // Get the file 
    // const extension = (path.basename(fileUrl).split('.'));
    // console.log(extension[1])
  

    // The path of the downloaded file on our machine
    const localFilePath = path.resolve(__dirname, downloadFolder, nombre +'.jpg');

    try {
      const response = await axios({
        method: 'GET',
        url: fileUrl,
        responseType: 'stream',
      });
  
      const w = response.data.pipe(fs.createWriteStream(localFilePath));
      w.on('finish', () => {
        console.log('Archivo descargado correctamente!');
      });
    } catch (err) {
      throw new Error(err);
    }
  }; 

function leerExcel(ruta) {
    const workbook = XLSX.readFile(ruta);
    const workbookSheet = workbook.SheetNames;
    const sheet = workbookSheet[0];
    const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])

    for (const item of dataExcel) {
        downloadFile(item['url'], 'images/', item['cod']);
        
    }

}

leerExcel('sheet.xlsx');