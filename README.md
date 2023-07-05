Download Images from Excel Sheet

This script allows you to download images from a specified Excel sheet using the provided URLs. It uses the Node.js runtime environment and requires the following dependencies: XLSX, fs, path, and axios.
Prerequisites

Before running this script, make sure you have the following:

    Node.js installed on your machine.
    An Excel sheet (.xlsx) containing a list of URLs to the images you want to download.

Setup

    Clone or download the script to your local machine.

    Install the dependencies by running the following command in your terminal:

    lua

    npm install xlsx fs path axios

Usage

    Replace the value of ruta in the leerExcel function call with the path to your Excel sheet.

    Make sure you have a folder named "images" in the same directory as the script. If not, create one.

    Run the script using the following command:

    node script.js

    Replace script.js with the actual filename if you renamed it.

    The script will read the URLs from the Excel sheet and download the corresponding images to the "images" folder.

Code Explanation

javascript

const XLSX = require('xlsx');
const fs = require('fs');
const path = require('path');
const axios = require('axios').default;

const downloadFile = async (fileUrl, downloadFolder, nombre) => {
  const localFilePath = path.resolve(__dirname, downloadFolder, nombre + '.jpg');

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
  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);

  for (const item of dataExcel) {
    downloadFile(item['url'], 'images/', item['cod']);
  }
}

leerExcel('sheet.xlsx');

The script starts by importing the necessary libraries: XLSX for reading Excel files, fs for file system operations, path for resolving file paths, and axios for making HTTP requests.

The downloadFile function is defined to handle the file download process. It takes the file URL, download folder path, and filename as parameters. The function uses axios to send a GET request to the specified URL, downloads the file, and saves it to the local file path.

The leerExcel function reads the specified Excel sheet using XLSX, extracts the sheet data, and converts it to JSON. It then iterates over each item in the JSON data and calls the downloadFile function to download the corresponding image file.

To use the script, replace the value of ruta in the leerExcel function call with the path to your Excel sheet. Make sure you have a folder named "images" in the same directory as the script, and then run the script using the node command. The script will read the URLs from the Excel sheet and download the images to the "images" folder.
