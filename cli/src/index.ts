#!/usr/bin/env node

// To run
// yarn build && node ./bin/index.js convert -i '../icon/QCon Pro G2 Json/Icon_QCon Pro G2 Json.json' -o '../icon/qcon_pro_g2/converted.js'
// or
// yarn build && node ./bin/index.js convert -i './test/Akai_LPD8.json' -o '../icon/qcon_pro_g2/converted.js'

import yargs from 'yargs';

// yargs example from https://github.com/elementary/houston/blob/2853c86f48694e6a1bba35b37830480877595fbc/src/cli/houston.ts
import * as convert from './convert';

// usage and help flag
yargs.scriptName('cli');

// help text
yargs.alias('h', 'help');
yargs.help('help');
yargs.usage('Usage: $0 <cmd> [options]');
yargs.showHelpOnFail(true, 'Specify --help || -h for available options');

yargs.command(convert.command, convert.describe, convert.builder, convert.handler);

// parse and process CLI args
yargs.demandCommand(1, 'No command given, see usage.');
yargs.strict();
yargs.parse();
