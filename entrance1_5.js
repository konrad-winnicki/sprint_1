/*
Crea una funció que, en executar-la, escrigui una frase en un fitxer.
*/

const fs = require("fs");

function appendStringToFile(fileName, string) {
  fs.open(fileName, "w", (err, fd) => {
    if (err) throw err;
    console.log("File opened");

    try {
      fs.appendFile(fd, string, (err) => {
        if (err) throw err;
        console.log("Data written to file");
      });
    } finally {
      fs.close(fd, (err) => {
        if (err) throw err;
        console.log("File closed");
      });
    }
  });
}

/*
Crea una altra funció que mostri per consola el contingut 
del fitxer de l'exercici anterior.
*/

function readFile(directory, fileName) {
  const totalPath = directory + fileName;
  fs.readFile(totalPath, "utf-8", (err, data) => {
    if (err) throw err;
    console.log(data);
    return data;
  });
}

/*
Crea una funció que comprimeixi el fitxer del nivell 1.
*/

const zlib = require("zlib");
const stream = require("stream");

async function zipFile(path, fileName) {
  const sourcePath = path + fileName;
  const source = fs.createReadStream(sourcePath);
  const destination = fs.createWriteStream("myfile.txt.gz");
  const gzip = zlib.createGzip();
  await stream.promises.pipeline(source, gzip, destination);
  console.log("Compression ended");
}

zipFile("C:\\Projects\\especializacion\\sprint_1\\", "myfile.txt").catch(
  (err) => console.log(err)
);

/*
Crea una funció que imprimeixi recursivament un
missatge per la consola amb demores d'un segon.
*/

function messagePrinter(message, maxCallNumber) {
  if (maxCallNumber === 0) {
    return;
  }
  setTimeout(() => {
    console.log(message);
    messagePrinter(message, maxCallNumber - 1);
  }, 1000);
}

function messagePrinter2(message, maxCallNumber) {
  let count = 0;
  let intervalId = setInterval(() => {
    count += 1;
    console.log(message);
    if (count == maxCallNumber) {
      clearInterval(intervalId);
    }
  }, 1000);
}

/*
Crea una funció que llisti per la consola el contingut del directori 
d'usuari/ària de l'ordinador utilizant Node Child Processes.
*/

const child = require("child_process");

function getDir() {
  child.exec("echo %USERPROFILE%", (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return;
    }

    console.log(stdout);
  });
}

function getDir2() {
  const process = child.spawn("cmd.exe", ["/c", "echo", "%USERPROFILE%"]);

  process.stdout.on("data", (data) => {
    console.log(`stdout: ${data}`);
  });

  process.stderr.on("data", (data) => {
    console.error(`stderr: ${data}`);
  });
}

/*
Crea una funció que creï dos fitxers codificats en hexadecimal i en 
base64 respectivament, a partir del fitxer del nivell 1.
encode(input, output, targetEncoding [base64 | hex])

Crea una funció que guardi els fitxers del punt anterior, 
ara encriptats amb l'algoritme aes-192-cbc, i esborri els fitxers inicials.

Crea una altra funció que desencripti i descodifiqui els fitxers de l'apartat 
anterior tornant a generar una còpia de l'inicial.

Inclou un README amb instruccions per a l'execució de cada part.
*/

const buffer = require("buffer").Buffer;
const crypto = require("crypto");

function changeEncoding(inputFile, outputFile, outputEncoding) {
  const inputData = fs.createReadStream(inputFile, "utf-8");
  const outputData = fs.createWriteStream(outputFile);
  const transformingData = new stream.Transform({
    transform(chunk, encoding, callback) {
      const data = chunk.toString(outputEncoding);
      callback(null, data);
    },
  });
  stream.pipeline(inputData, transformingData, outputData, (err) => {
    if (err) throw err;
  });
}
const filePath = "C:\\Projects\\especializacion\\sprint_1\\myfile.txt";
changeEncoding(filePath, "hex.txt", "hex");
changeEncoding(filePath, "base64.txt", "base64");

const algorithm = "aes-192-cbc";
const password = "PaswordUsedScrypot";
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(password, salt, 24);
const iv = crypto.randomBytes(16);

function encrypte(inputFile, outputFile, cipherkey, cipheriv) {
  const cipher = crypto.createCipheriv(algorithm, cipherkey, cipheriv);
  const inputData = fs.createReadStream(inputFile);
  const outputData = fs.createWriteStream(outputFile);
  stream.pipeline(inputData, cipher, outputData, (err) => {
    if (err) throw err;
    try {
      fs.unlink(inputFile, (err) => {
        if (err) throw err;
      });
    } catch (err) {
      throw err;
    }
  });
}

function decrypteAndChangeEncoding(
  inputFile,
  outputFile,
  cipherkey,
  cipheriv,
  inputEncoding,
  outputEncoding = "utf-8"
) {
  const inputData = fs.createReadStream(inputFile);
  const outputData = fs.createWriteStream(outputFile);

  const data = new stream.Transform({
    transform(chunk, encoding, callback) {
      const incomingString = chunk.toString();
      const bytesInBuffer = buffer.from(incomingString, inputEncoding);
      const result = bytesInBuffer.toString(outputEncoding);
      callback(null, result);
    },
  });

  const decipher = crypto.createDecipheriv(algorithm, cipherkey, cipheriv);
  stream.pipeline(inputData, decipher, data, outputData, (err) => {
    if (err) throw err;
  });
}

setTimeout(() => {
  encrypte("hex.txt", "hex.enc", key, iv);
  encrypte("base64.txt", "base64.enc", key, iv);
}, 2000);

setTimeout(() => {
  decrypteAndChangeEncoding("hex.enc", "hex-2.txt", key, iv, "hex");
  decrypteAndChangeEncoding("base64.enc", "base64-2.txt", key, iv, "base64");
}, 3000);
