# Cipher and encoding converter

Here you may find functions which help to encrypt and decrypt text using aes-192-cbc algorithm or to perform text encoding conversion.
All functions use Node.js modules only.
<br>
<br>

## Function description:
In the `entrance1_5.js` file you will find the following functions:

- [`changeEncoding()`](#changeEncoding)
- [`encrypte()`](#encrypte)
- [`decrypteAndChangeEncoding()`](#decrypte)
<br>
<br>

### **`changeEncoding()` function**
The `changeEncoding` <a id="changeEncoding"></a> function takes three parameters and creates a new file in the current folder, containing text in the custom encoding:
- `inputFile` (`string`): indicates an input file path
- `outputFile` (`string`): indicates a name of the output file
- `outputEncoding` (`string`): indicates a type of the destination encoding
  
This function utilizes the `File system` and `Stream` Node.js modules:
- [fs.createReadStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatereadstreampath-options) method
- [fs.createWriteStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatewritestreampath-options) method
- [stream.Transform](https://nodejs.org/docs/latest-v19.x/api/stream.html#new-streamtransformoptions) class
- [stream.pipeline()](https://nodejs.org/docs/latest-v19.x/api/stream.html#streampipelinesource-transforms-destination-options) method
  
#### Usage:
```javascript
changeEncoding(filePath, "hex.txt", "hex"); // Output: new file
```
<br>

### **`encrypte()` function**
The `encrypte` <a id="encrypte"></a> function creates a new encrypted file in the current folder and **deletes the input file**. This function takes four parameters. :
- `inputFile` (`string`): indicate a path to the input file
- `outputFile` (`string`): indicate a name of the output file
- `cipherkey` (variable `key`): [read note](#important)
- `cipheriv` (variable `iv`): [read note](#important)

The  function utilizes the `Crypto`, `File system` and `Stream` Node.js modules:
- [crypto.createCipheriv()](https://nodejs.org/api/crypto.html#cryptocreatecipherivalgorithm-key-iv-options) method
- [fs.createReadStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatereadstreampath-options) method
- [fs.createWriteStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatewritestreampath-options) method
- [stream.pipeline()](https://nodejs.org/docs/latest-v19.x/api/stream.html#streampipelinesource-transforms-destination-options) method
- [stream.Transform](https://nodejs.org/docs/latest-v19.x/api/stream.html#new-streamtransformoptions) class

#### Usage:
```javascript
encrypte("hex.txt", "hex.enc", key, iv);; // Output: new file
```
<br>

### **`decrypteAndChangeEncoding()` function**
The `decrypteAndChangeEncoding` <a id="decrypte"></a> function decrypte input file, change text to default 'utf-8' encoding and finaly create new file. The function takes 6 parameters (the last one is optional and may be used if other encoding is desired):
- `inputFile` (`string`): indicate a path to the input file
- `outputFile` (`string`): indicate a name of the output file
- `cipherkey` (variable `key`): [read note](#important)
- `cipheriv` (variable `iv`): [read note](#important)
- `inputEncoding` (`string`): indicate the text encoding in the input file
- `inputEncoding` (`string`): indicate the text encoding in the output file

The function utilizes the `Crypto`, `File system`,  `Stream` and `Buffer` Node.js modules:
- [cryoto.createDecipheriv()](https://nodejs.org/api/crypto.html#cryptocreatedecipherivalgorithm-key-iv-options) method
- [fs.createReadStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatereadstreampath-options) method
- [fs.createWriteStream()](https://nodejs.org/docs/latest-v19.x/api/fs.html#fscreatewritestreampath-options) method
- [stream.pipeline()](https://nodejs.org/docs/latest-v19.x/api/stream.html#streampipelinesource-transforms-destination-options) method
- [buffer.from()](https://nodejs.org/docs/latest-v19.x/api/buffer.html#static-method-bufferfrombuffer) method

#### Usage:
```javascript
decrypteAndChangeEncoding("hex.enc", "hex-2.txt", key, iv, 'hex'); // Output: new file
```
<br>

## **Important** <a id="important"></a>
To use `encrypte` and `decrypteAndChangeEncoding` functions it is necessary to prepare folowing constants which will be passed as parameters:
```javascript
const algorithm = "aes-192-cbc";
const password = "PaswordUsedScrypot";
const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(password, salt, 24);
const iv = crypto.randomBytes(16);
```
