var fs = require('fs-extra');

var folders = [
    { 
        'source': './src/assets',
        'destination': './dist/assets'
    }
]

folders.forEach(folder => {
    fs.copy(folder.source, folder.destination, function (err) {
        if (err){
            console.log('An error occured while copying the ' + folder.source);
            return console.error(err)
        }
        console.log('Copied ' + folder.source + ' to ' + folder.destination);
    });
});
