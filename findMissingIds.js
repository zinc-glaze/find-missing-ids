const fs = require('fs');

//create file to receive missing ID data
try {
    fs.writeFileSync('ids_missing.txt', '');
} catch (e) {
    console.log("Cannot write file ", e);
}

//load root ids into array
let rootIds = fs.readFileSync(`${__dirname}/root_ids.txt`, 'utf8').trim().split(',');
//load file ids into array
let fileIds = fs.readFileSync(`${__dirname}/file_ids.txt`, 'utf8').trim().split(',');

console.log('Total root IDs:', rootIds.length);
console.log('Total file IDs:', fileIds.length);

//iterate through file ids 
for (let i in fileIds) {
    //truncate to root id
    //let currentRootId = fileIds[i].substring(0,5);
    let currentRootId = fileIds[i].split('-')[0];
    //if current root is not present in rootIds array, push missing file ID to text file
    if (!rootIds.includes(currentRootId)) {
        try {
            fs.appendFileSync('ids_missing.txt', `${currentRootId}\r\n`);
        } catch (e) {
            console.log("Cannot write file ", e);
        }
    }
}
console.log('Finished! Check generated file \'ids_missing.txt\'.');
