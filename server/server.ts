import express = require('express');
import cors = require('cors');
import initializeData from './src/dataloader';

// Create a new express application instance
const app: express.Application = express();

const data = initializeData();
const sortOrder = new Map<string, string>([
  ["rmse", "asc"],
  ["psnr", "asc"],
  ["fsim", "asc"],
  ["ssim", "dsc"],
  ["uiq", "asc"],
  ["sam", "asc"],
  ["sre", "asc"]
]);

function getData(image: string, model: string): any {
  
  if(image === "invalid") {
    for(let entry of Array.from(data.entries())) {
      image = entry[0];
      break;
    }

    const measures = data.get(image) ?? new Map<any, any>();

    for(let entry of Array.from(measures.entries())) {
      model = entry[0];
      break;
    }
  }

  const values = data.get(image)?.get(model);
  let measureArray = [] as any;  
  
  values?.forEach((value, key) => {  
    measureArray.push({key, value});
  });  

  var sorted = Object.keys(measureArray).map(key => measureArray[key]);

  if(sortOrder.get(model) === "asc") {
    sorted.sort((a, b) => a - b);
  }
  else {
    sorted.sort((a, b) => b - a);
  }

  return sorted;
}

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

app.get('/', function (req, res) {
  res.send();
});

app.get('/api/fetchimages', function(req, res){ 
  var sorted = getData("invalid", "invalid");
  res.send(sorted);
});

app.get('/api/reorder', function(req, res) { 
  const image = req.query.image as string;
  const model = req.query.model as string;

  var sorted = getData(image, model);
  res.send(sorted);
});

app.listen(4000, function () {
  console.log('Server running at port 4000!');
});