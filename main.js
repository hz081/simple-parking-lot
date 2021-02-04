const { exit } = require('process');
const fs = require('fs');

const CREATE_PARKING_LOT = 'create_parking_lot';
const PARK = 'park';
const LEAVE = 'leave';
const STATUS = 'status';

const parseArgument = (args) => {
    let result = args.slice(2);
    if (result.length < 1) throw Error();
    return result[0];
}

const calculateBill = (param) => {
    if (param <= 2) return 10;
    else return (param - 1) * 10;
}

exports.main = (argv) => {
    let args, data, lines;
    let maxSlot = 0, lastIndex = -1;
    let parkingLot = [];
    let output = '';

    try {
        args = parseArgument(argv);
    } catch (e) {
        console.log('cannot parse the arguments', e);
        exit(1);
    }

    try {
        data = fs.readFileSync(args, 'utf8');
        lines = data.split('\n');
    } catch(e) {
        console.log('error while reading the data', e);
        exit(1);
    }

    lines.forEach((line) => {
        const lineParsed = line.split(' ');
        if (lineParsed.length < 1 || lineParsed[0] === '') return;
        const command = lineParsed[0];
        const param1 = lineParsed[1] ? lineParsed[1] : '';
        const param2 = lineParsed[2] ? lineParsed[2] : '';

        switch(command) {
            case CREATE_PARKING_LOT:
                maxSlot += Number(param1);
                output += `Created parking lot with ${param1} slots\n`;
                break;

            case PARK:
                if ((parkingLot[lastIndex + 1] === null || !parkingLot[lastIndex + 1]) && lastIndex + 1 < maxSlot) {
                    parkingLot[lastIndex + 1] = param1;
                    lastIndex++;
                    output += `Allocated slot number: ${lastIndex + 1}\n`;
                } else {
                    let available = false;
                    for(let i=0; i < maxSlot; i++) {
                        if (parkingLot[i] === null || !parkingLot[i]) {
                            parkingLot[i] = param1;
                            output += `Allocated slot number: ${i + 1}`;
                            lastIndex = i;
                            available = true;
                            return;
                        }
                    }
                    if (!available) output += 'Sorry, parking lot is full\n';
                }
                break;

            case LEAVE:
                    let found = false;
                    for(let i=0; i < maxSlot; i++) {
                        if (parkingLot[i] === param1) {
                            parkingLot[i] = null;
                            const bill = calculateBill(param2);
                            output += `Registration number ${param1} with Slot Number ${i + 1} is free with Charge ${bill}\n`;
                            lastIndex = i;
                            found = true;
                            return;
                        }
                    }
                    if (!found) output += `Registration number ${param1} not found\n`;
                    break;

            case STATUS:
                output += 'Slot No.  Registration No.\n';
                for(let i=0; i < maxSlot; i++)
                    if (parkingLot[i] !== null || parkingLot[i]) output += `${i+1} ${parkingLot[i]}\n`;
                break;

            default: break;
        }
    });
    console.log(output);

    return output;
}