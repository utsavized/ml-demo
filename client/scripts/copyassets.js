var fs = require('fs-extra');

var folders = [
    { 
        'source': './public',
        'destination': './dist/public'
    },
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
