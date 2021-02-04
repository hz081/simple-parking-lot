
const parseArgument = (args) => {
    let result = args.slice(2);
    if (result.length < 1) throw Error();
    return result[0];
}

main = () => {
    let args, data, lines;
    let maxSlot = 0, lastIndex = -1;
    let parkingLot = [];

    try {
        args = parseArgument(process.argv);
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
    });
}

main();