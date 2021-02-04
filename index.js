const { exit } = require('process');

const parseArgument = (args) => {
    let result = args.slice(2);
    if (result.length < 1) throw Error();
    return result[0];
}

main = () => {
    let args, data;
    try {
        args = parseArgument(process.argv);
    } catch (e) {
        console.log('cannot parse the arguments', e);
        exit(1);
    }
}

main();