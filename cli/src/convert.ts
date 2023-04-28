import chalk from 'chalk';
import * as fs from 'fs';
import { Arguments, Argv } from 'yargs';

const errorStyle = chalk.bold.red;
const warningStyle = chalk.keyword('orange').bold;
const successStyle = chalk.bold.green;

interface Args {
  all: boolean | undefined;
  name: string | undefined;
  verbose: boolean | undefined;
}

export const command = 'convert [options]';
export const describe = 'Convert json';

export const builder = (yargs: Argv): Argv<Args> => {
  return yargs
    .option('all', {
      alias: 'a',
      describe: 'Convert all',
      type: 'boolean',
    })
    .option('name', {
      alias: 'n',
      describe: 'Only convert with the query',
      type: 'string',
    })
    .option('verbose', {
      alias: 'v',
      description: 'Run with verbose logging',
      type: 'boolean',
    })
    .example('$0 convert -a', 'Convert all ')
    .example('$0 convert -n "realm"', 'Convert only starting with the word "realm"')
    .example('$0 list --help', 'Show help')
    .check((argv: Arguments<Args>) => {
      if (!argv.all && !argv.name) {
        throw new Error('You must supply either --all or --name');
      } else {
        return true;
      }
    });
};

export const handler = async (argv: Arguments<Args>): Promise<void> => {
  // process arguments using yarg
  let isVerbose = false;
  let doList = false;
  let nameQuery = undefined;

  if (argv.verbose) {
    console.info(warningStyle('Verbose mode on.'));
    isVerbose = true;
  }

  if (argv.all) {
    console.info(successStyle('--all argument found...'));
    doList = true;
  } else if (argv.name) {
    nameQuery = argv.name;
    console.info(successStyle(`--name argument found starting with ${nameQuery} ...`));
    doList = true;
  } else {
    console.info(warningStyle('Neither --name or --all arguments found. Use --help for more information.'));
    doList = false;
  }

  if (doList) {
    try {
      const jsonString = fs.readFileSync('../icon/QCon Pro G2 Json/Icon_QCon Pro G2 Json.json', {
        encoding: 'utf-8',
      });
      const jsonData = JSON.parse(jsonString);
      if (jsonData.api === 'midiremote') {
        console.log(successStyle('Found midiremote script with version: ' + jsonData.version));

        const objects = jsonData.objects.internal;

        // find Surface
        const surface = objects.find((a: any) => a.type === 'Surface');

        // get the surface elements id array
        const surfaceIds = surface?.members?.SurfaceElements;

        if (surfaceIds) {
          // console.log(successStyle(surfaceIds));

          // filter out the surface elements that matches the id array
          const filteredSurfaceElements = objects.filter((a: any) => surfaceIds.indexOf(a.id) >= 0);

          // console.log(
          //   successStyle('filtered: ' + JSON.stringify(filteredSurfaceElements))
          // );

          const outputArray: any[] = [];

          // header
          outputArray.push(`// 1. get the api's entry point`);
          outputArray.push(`var midiremote_api = require('midiremote_api_v1')`);
          outputArray.push(``);
          outputArray.push(`// 2. create the device driver main object`);
          outputArray.push(`var deviceDriver = midiremote_api.makeDeviceDriver('Icon', 'QCon Pro G2 Test', 'Nerseth')`);
          outputArray.push(``);
          outputArray.push(`// 3. create objects representing the hardware's MIDI ports`);
          outputArray.push(`var midiInput = deviceDriver.mPorts.makeMidiInput()`);
          outputArray.push(`var midiOutput = deviceDriver.mPorts.makeMidiOutput()`);
          outputArray.push(``);
          outputArray.push(`// 4. define all possible namings the devices MIDI ports could have`);
          outputArray.push(`deviceDriver`);
          outputArray.push(`    .makeDetectionUnit()`);
          outputArray.push(`    .detectPortPair(midiInput, midiOutput)`);
          outputArray.push(`    .expectInputNameContains('iCON QCON Pro G2')`);
          outputArray.push(`    .expectOutputNameContains('iCON QCON Pro G2')`);
          outputArray.push(``);
          outputArray.push(`var surface = deviceDriver.mSurface`);
          outputArray.push(``);
          outputArray.push(`function makeSurfaceElements() {`);
          outputArray.push(`\tvar surfaceElements = {}`);
          outputArray.push(``);

          filteredSurfaceElements.forEach((surfaceElement: any) => {
            const id = surfaceElement.id;
            const type = surfaceElement.type;

            // X, Y, W and H
            const memberPos = surfaceElement.members?.Rect;

            // All three only for Button
            // Knob has SurfaceValue
            // Fader has SurfaceValue and Type
            // BlindPanel has Shape
            const memberSurfaceValue = surfaceElement.members?.SurfaceValue;
            const memberType = surfaceElement.members?.Type;
            const memberShape = surfaceElement.members?.Shape;

            // Only for PushEncoder
            const memberEncoderValue = surfaceElement.members?.EncoderValue;
            const memberPushValue = surfaceElement.members?.PushValue;

            switch (type) {
              case 'PushEncoder':
                console.log(successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberEncoderValue} ${memberPushValue}`));
                outputArray.push(
                  `\tsurfaceElements.pushEncoder${id} = surface.makePushEncoder(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                );

                // lookup bindings
                const encoderBinding = lookupBinding(objects, memberEncoderValue);
                addBindingToOutput(outputArray, 'pushEncoder', id, 'mEncoderValue', encoderBinding);

                const pushBinding = lookupBinding(objects, memberPushValue);
                addBindingToOutput(outputArray, 'pushEncoder', id, 'mPushValue', pushBinding);
                break;

              case 'Button':
                console.log(
                  successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue} ${memberType} ${memberShape}`)
                );
                outputArray.push(
                  `\tsurfaceElements.button${id} = surface.makeButton(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})${
                    memberShape === 'Circle' ? '.setShapeCircle()' : ''
                  }`
                );

                // lookup binding
                const buttonBinding = lookupBinding(objects, memberSurfaceValue);
                addBindingToOutput(outputArray, 'button', id, 'mSurfaceValue', buttonBinding);
                break;

              case 'Fader':
                console.log(successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue} ${memberType}`));
                outputArray.push(
                  `\tsurfaceElements.fader${id} = surface.makeFader(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})${
                    memberType === 'Vertical' ? '.setTypeVertical()' : ''
                  }`
                );

                // lookup binding
                const faderBinding = lookupBinding(objects, memberSurfaceValue);
                addBindingToOutput(outputArray, 'fader', id, 'mSurfaceValue', faderBinding);
                break;

              case 'BlindPanel':
                console.log(successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberShape}`));
                outputArray.push(
                  `\tsurfaceElements.blindPanel${id} = surface.makeBlindPanel(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                );
                break;

              case 'Knob':
                console.log(successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue}`));
                outputArray.push(
                  `\tsurfaceElements.knob${id} = surface.makeKnob(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                );

                // lookup binding
                const knobBinding = lookupBinding(objects, memberSurfaceValue);
                addBindingToOutput(outputArray, 'knob', id, 'mSurfaceValue', knobBinding);
                break;

              default:
                console.log(successStyle(`Unknown: [${id}] ${type}: ${JSON.stringify(memberPos)} `));
                outputArray.push(
                  `\t// unknown element [${id}] ${type} at (${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                );
                break;
            }
          });

          // write footer
          outputArray.push(``);
          outputArray.push(`\treturn surfaceElements`);
          outputArray.push(`}`);
          outputArray.push(``);
          outputArray.push(`var surfaceElements = makeSurfaceElements()`);

          writeToFile(outputArray, '../icon/qcon_pro_g2/converted.js');
        }
      } else {
        console.log(errorStyle('Json file is not a midiremote script'));
      }
    } catch (err) {
      console.log(errorStyle(err));
    }
  }
};

const writeToFile = (data: any[], fileName: string) => {
  // output object array as json
  // fs.writeFile(fileName, JSON.stringify(data, null, 4), { flag: 'w' }, err => {
  //   console.log(errorStyle(err));
  // });

  // output string array
  fs.writeFile(fileName, data.join('\n'), err => {
    console.log(err ? 'Error :' + err : 'ok');
  });
};

const lookupBinding = (objects: any, id: number) => {
  const surfaceElement = objects.find((a: any) => a.type === 'SurfaceElementValue' && a.id === id);
  const memberMidiBinding = surfaceElement.members?.MidiBinding;
  const surfaceValueMidiBinding = objects.find((a: any) => a.type === 'SurfaceValueMidiBinding' && a.id === memberMidiBinding);
  const midiChannelBinding = surfaceValueMidiBinding.members?.MidiChannelBinding;
  const midiBinding = objects.find((a: any) => a.id === midiChannelBinding);
  return midiBinding;
};

const addBindingToOutput = (outputArray: any[], name: string, id: string, field: string, binding: any) => {
  switch (binding?.type) {
    case 'MidiBindingToNote':
      outputArray.push(
        `\tsurfaceElements.${name}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(${binding?.members?.ChannelNumber}, ${binding?.members?.Pitch})`
      );
      break;

    case 'MidiBindingToControlChange':
      outputArray.push(
        `\tsurfaceElements.${name}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToControlChange(${binding?.members?.ChannelNumber}, ${binding?.members?.ControlChangeNumber})`
      );
      break;

    case 'MidiBindingToPitchBend':
      outputArray.push(
        `\tsurfaceElements.${name}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(${binding?.members?.ChannelNumber})`
      );
      break;

    default:
      outputArray.push(`\t// unknown type: ${binding?.type}`);
      break;
  }
};
