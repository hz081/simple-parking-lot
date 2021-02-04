
const parseArgument = (args) => {
    let result = args.slice(2);
    if (result.length < 1) throw Error();
    return result[0];
}

main = () => {
    let args, data, lines;

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
}

main();