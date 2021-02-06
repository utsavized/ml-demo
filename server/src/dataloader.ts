import { parse } from 'papaparse';
import { readFileSync } from 'fs';

function initializeData(): Map<string, Map<string, Map<string, number>>> {
    const file = readFileSync(__dirname + '/../assets/data.csv', 'utf8');
    let measurements = new Map<string, Map<string, Map<string, number>>>();
    
    parse(file, { complete: (result) => {
        let counter = 0;
        var headers = result.data[0] as Array<string>;
        result.data.forEach(element => {
            const row = element as Array<string>;
            if(counter !== 0) {
                if(!measurements.has(row[0])) {
                    measurements.set(row[0], new Map<string, Map<string, number>>());
                    
                    let headerCount = 0;
                    headers.forEach(element => {
                        if(headerCount > 1) {
                            measurements.get(row[0])?.set(element, new Map<string, number>());
                        }

                        headerCount += 1;
                    });
                }
            }
            
            counter += 1;
        });

        counter = 0;
        result.data.forEach(element => {
            const row = element as Array<string>;
            if(counter !== 0) {
                let headerCount = 0;
                headers.forEach(element => {
                    if(headerCount > 1) {
                        const image = row[1] as string;
                        const value = Number(row[headerCount]);
                        measurements.get(row[0])?.get(element)?.set(image, value);
                    }

                    headerCount += 1;
                });
            }
            
            counter += 1;
        });
    }});

    return measurements;
}

export default initializeData;