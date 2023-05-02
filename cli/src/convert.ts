import chalk from 'chalk';
import * as fs from 'fs';
import { Arguments, Argv } from 'yargs';

import { Cubase_Map_CC, Cubase_Map_Midi, Cubase_Map_PitchBend } from './cubase_map';
import { Mackie_Map_CC, Mackie_Map_Midi, Mackie_Map_PitchBend } from './mackie_map';

const errorStyle = chalk.bold.red;
const warningStyle = chalk.keyword('orange').bold;
const successStyle = chalk.bold.green;

interface Args {
  input: string | undefined;
  output: string | undefined;
  verbose: boolean | undefined;
}

interface FilterPortPairs {
  inputFilter: string;
  outputFilter: string;
}

interface ObjectElement {
  id: number;
  type: string;
  members?: any;
}

interface MackieVariable {
  name: string;
  description: string;
}

export const command = 'convert [options]';
export const describe = 'Convert Steinberg Midi Remote JSON Scripts to JavaScript';

export const builder = (yargs: Argv): Argv<Args> => {
  return yargs
    .option('input', {
      alias: 'i',
      describe: 'Path to input file to convert',
      type: 'string',
    })
    .option('output', {
      alias: 'o',
      describe: 'Path to output file to convert',
      type: 'string',
    })
    .option('verbose', {
      alias: 'v',
      description: 'Run with verbose logging',
      type: 'boolean',
    })
    .option('mackie', {
      alias: 'm',
      description: 'Use Mackie Mapping (and not Cubase which is the default)',
      type: 'boolean',
    })
    .example('$0 convert -i in.json -o out.js', 'Convert midi remote json file')
    .example('$0 convert --help', 'Show help')
    .check((argv: Arguments<Args>) => {
      if (!argv.input || !argv.output) {
        throw new Error('You must supply both input and output');
      } else {
        return true;
      }
    });
};

export const handler = async (argv: Arguments<Args>): Promise<void> => {
  // process arguments using yarg
  let isVerbose = false;
  let isMackie = false; // use mackie default mapping and not Cubase
  const doConvert = true;

  if (argv.verbose) {
    console.info(warningStyle('Verbose mode on.'));
    isVerbose = true;
  }

  if (argv.mackie) {
    console.info(warningStyle('Using Mackie Mapping and not Cubase (default).'));
    isMackie = true;
  }

  if (doConvert) {
    const inputPath = argv.input as string;
    const outputPath = argv.output as string;
    // const inputPath = '../icon/QCon Pro G2 Json/Icon_QCon Pro G2 Json.json';
    // const outputPath = '../icon/qcon_pro_g2/converted.js';
    console.info(successStyle(`Using input path: '${inputPath}`));
    console.info(successStyle(`Using output path: '${outputPath}`));

    try {
      const jsonString = fs.readFileSync(inputPath, {
        encoding: 'utf-8',
      });
      const jsonData = JSON.parse(jsonString);
      if (jsonData.api === 'midiremote') {
        console.log(successStyle('Found midiremote script with version: ' + jsonData.version));

        const objects = jsonData.objects.internal as ObjectElement[];

        // find Device Driver information like:
        // "VendorName": "Icon",
        // "DeviceName": "QCon Pro G2 Json",
        // "CreatedBy": "Nerseth",
        const deviceDriver = objects.find((a: ObjectElement) => a.type === 'DeviceDriver');

        if (deviceDriver) {
          const vendorName = deviceDriver?.members?.VendorName;
          const deviceName = deviceDriver?.members?.DeviceName;
          const createdBy = deviceDriver?.members?.CreatedBy;
          const detectionUnits = deviceDriver?.members?.DetectionUnits;
          // const ports = deviceDriver?.members?.Ports;
          // const surface = deviceDriver?.members?.Surface;
          // const mapping = deviceDriver?.members?.Mapping;

          if (isVerbose) {
            console.log(successStyle(`Using vendor: ${vendorName}, device: ${deviceName}, created by: ${createdBy}`));
          }

          // lookup detection units
          const detectionPortPairs = lookupDetectionPortPair(objects, detectionUnits);

          if (isVerbose) {
            detectionPortPairs.forEach((portPairs: FilterPortPairs) => {
              console.log(successStyle(`Found detection port pair. Input: ${portPairs.inputFilter}, Output: ${portPairs.outputFilter}`));
            });
          }

          // find Surface
          const surface = objects.find((a: ObjectElement) => a.type === 'Surface');

          // get the surface elements id array
          const surfaceIds = surface?.members?.SurfaceElements;

          if (surfaceIds) {
            // console.log(successStyle(surfaceIds));

            // filter out the surface elements that matches the id array
            const filteredSurfaceElements = objects.filter((a: ObjectElement) => surfaceIds.indexOf(a.id) >= 0);

            if (isVerbose) {
              console.log(successStyle('Found surface elements: ' + JSON.stringify(filteredSurfaceElements)));
            }

            const outputArray: any[] = [];

            // header
            outputArray.push(`// 1. get the api's entry point`);
            outputArray.push(`var midiremote_api = require('midiremote_api_v1')`);
            outputArray.push(``);
            outputArray.push(`// 2. create the device driver main object`);
            outputArray.push(`var deviceDriver = midiremote_api.makeDeviceDriver('${vendorName}', '${deviceName}', '${createdBy}')`);
            outputArray.push(``);
            outputArray.push(`// 3. create objects representing the hardware's MIDI ports`);
            outputArray.push(`var midiInput = deviceDriver.mPorts.makeMidiInput()`);
            outputArray.push(`var midiOutput = deviceDriver.mPorts.makeMidiOutput()`);
            outputArray.push(``);
            outputArray.push(`// 4. define all possible namings the devices MIDI ports could have`);
            detectionPortPairs.forEach((portPairs: FilterPortPairs) => {
              outputArray.push(`deviceDriver`);
              outputArray.push(`    .makeDetectionUnit()`);
              outputArray.push(`    .detectPortPair(midiInput, midiOutput)`);
              outputArray.push(`    .expectInputNameContains('${portPairs.inputFilter}')`);
              outputArray.push(`    .expectOutputNameContains('${portPairs.outputFilter}')`);
              outputArray.push(``);
            });
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

              // prefix to use for the element name
              let elementName: string | undefined = undefined;
              switch (type) {
                case 'PushEncoder':
                  elementName = 'enc';

                  // lookup bindings
                  const encoderBinding = lookupBinding(objects, memberEncoderValue);
                  // Note! a push encoder has two bindings and therefore two mackie variable names
                  // Here we choose to use the encoder name as the root variable name
                  const mackieEncoderVar = getMackieVariableFromBinding(isMackie, encoderBinding);

                  // if there is a mackie binding for the encoder, use this as the variable name
                  const encoderNameId = mackieEncoderVar?.name ? mackieEncoderVar.name : id;

                  console.log(
                    successStyle(`[${encoderNameId}] ${type}: ${JSON.stringify(memberPos)} ${memberEncoderValue} ${memberPushValue}`)
                  );

                  // add description if it exists
                  if (mackieEncoderVar?.description) {
                    outputArray.push(`\t// ${mackieEncoderVar.description}`);
                  }

                  // create the push encoder
                  outputArray.push(
                    `\tsurfaceElements.${elementName}${encoderNameId} = surface.makePushEncoder(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                  );

                  // add encoder binding
                  addBindingToOutput(outputArray, elementName, encoderNameId, 'mEncoderValue', encoderBinding);

                  // add push binding
                  const pushBinding = lookupBinding(objects, memberPushValue);
                  addBindingToOutput(outputArray, elementName, encoderNameId, 'mPushValue', pushBinding);
                  break;

                case 'Button':
                  elementName = 'btn';

                  // lookup bindings
                  const buttonBinding = lookupBinding(objects, memberSurfaceValue);
                  const mackieButtonVar = getMackieVariableFromBinding(isMackie, buttonBinding);

                  // if there is a mackie binding for the button, use this as the variable name
                  const buttonNameId = mackieButtonVar?.name ? mackieButtonVar.name : id;

                  console.log(
                    successStyle(
                      `[${buttonNameId}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue} ${memberType} ${memberShape}`
                    )
                  );

                  // add description if it exists
                  if (mackieButtonVar?.description) {
                    outputArray.push(`\t// ${mackieButtonVar.description}`);
                  }

                  // create the button
                  outputArray.push(
                    `\tsurfaceElements.${elementName}${buttonNameId} = surface.makeButton(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${
                      memberPos.H
                    })${memberShape === 'Circle' ? '.setShapeCircle()' : ''}`
                  );

                  addBindingToOutput(outputArray, elementName, buttonNameId, 'mSurfaceValue', buttonBinding);
                  break;

                case 'Fader':
                  elementName = 'fdr';

                  // lookup binding
                  const faderBinding = lookupBinding(objects, memberSurfaceValue);
                  const mackieFaderVar = getMackieVariableFromBinding(isMackie, faderBinding);

                  // if there is a mackie binding for the fader, use this as the variable name
                  const faderNameId = mackieFaderVar?.name ? mackieFaderVar.name : id;

                  console.log(successStyle(`[${faderNameId}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue} ${memberType}`));

                  // add description if it exists
                  if (mackieFaderVar?.description) {
                    outputArray.push(`\t// ${mackieFaderVar.description}`);
                  }

                  // create the fader
                  outputArray.push(
                    `\tsurfaceElements.${elementName}${faderNameId} = surface.makeFader(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${
                      memberPos.H
                    })${memberType === 'Vertical' ? '.setTypeVertical()' : ''}`
                  );

                  addBindingToOutput(outputArray, elementName, faderNameId, 'mSurfaceValue', faderBinding);
                  break;

                case 'Knob':
                  elementName = 'knob';

                  // lookup binding
                  const knobBinding = lookupBinding(objects, memberSurfaceValue);
                  const mackieKnobVar = getMackieVariableFromBinding(isMackie, knobBinding);

                  // if there is a mackie binding for the knob, use this as the variable name
                  const knobNameId = mackieKnobVar?.name ? mackieKnobVar.name : id;

                  console.log(successStyle(`[${knobNameId}] ${type}: ${JSON.stringify(memberPos)} ${memberSurfaceValue}`));

                  // add description if it exists
                  if (mackieKnobVar?.description) {
                    outputArray.push(`\t// ${mackieKnobVar.description}`);
                  }

                  // create the knob
                  outputArray.push(
                    `\tsurfaceElements.${elementName}${knobNameId} = surface.makeKnob(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                  );

                  addBindingToOutput(outputArray, elementName, knobNameId, 'mSurfaceValue', knobBinding);
                  break;

                case 'BlindPanel':
                  console.log(successStyle(`[${id}] ${type}: ${JSON.stringify(memberPos)} ${memberShape}`));
                  outputArray.push(
                    `\tsurfaceElements.blindPanel${id} = surface.makeBlindPanel(${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                  );
                  break;

                default:
                  console.log(successStyle(`Unknown: [${id}] ${type}: ${JSON.stringify(memberPos)} `));
                  outputArray.push(
                    `\t// unknown element [${id}] ${type} at (${memberPos.X}, ${memberPos.Y}, ${memberPos.W}, ${memberPos.H})`
                  );
                  break;
              }

              // add spacer
              outputArray.push(``);
            });

            // write footer
            outputArray.push(`\treturn surfaceElements`);
            outputArray.push(`}`);
            outputArray.push(``);
            outputArray.push(`var surfaceElements = makeSurfaceElements()`);

            writeToFile(outputArray, outputPath);
          }
        } else {
          throw new Error('Cannot find device driver information');
        }
      } else {
        throw new Error('File does not seem to be a midiremote script');
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

const lookupBinding = (objects: ObjectElement[], id: number) => {
  const surfaceElement = objects.find((a: ObjectElement) => a.type === 'SurfaceElementValue' && a.id === id);
  const memberMidiBinding = surfaceElement?.members?.MidiBinding;
  const surfaceValueMidiBinding = objects.find((a: ObjectElement) => a.type === 'SurfaceValueMidiBinding' && a.id === memberMidiBinding);
  const midiChannelBinding = surfaceValueMidiBinding?.members?.MidiChannelBinding;
  const midiBinding = objects.find((a: ObjectElement) => a.id === midiChannelBinding);
  return midiBinding;
};

const addBindingToOutput = (outputArray: any[], elementName: string, id: string, field: string, binding?: ObjectElement) => {
  switch (binding?.type) {
    case 'MidiBindingToNote':
      outputArray.push(
        `\tsurfaceElements.${elementName}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToNote(${binding?.members?.ChannelNumber}, ${binding?.members?.Pitch})`
      );
      break;

    case 'MidiBindingToControlChange':
      outputArray.push(
        `\tsurfaceElements.${elementName}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToControlChange(${
          binding?.members?.ChannelNumber
        }, ${binding?.members?.ControlChangeNumber})${binding?.members?.Type ? '.setType' + binding.members.Type + '()' : ''}`
      );
      break;

    case 'MidiBindingToPitchBend':
      outputArray.push(
        `\tsurfaceElements.${elementName}${id}.${field}.mMidiBinding.setInputPort(midiInput).setOutputPort(midiOutput).bindToPitchBend(${binding?.members?.ChannelNumber})`
      );
      break;

    default:
      outputArray.push(`\t// unknown type: ${binding?.type}`);
      break;
  }
};

const getMackieVariableFromBinding = (isMackie: boolean, binding?: ObjectElement): MackieVariable | undefined => {
  switch (binding?.type) {
    case 'MidiBindingToNote':
      if (isMackie) {
        return Mackie_Map_Midi.get(binding?.members?.Pitch);
      } else {
        return Cubase_Map_Midi.get(binding?.members?.Pitch);
      }

    case 'MidiBindingToControlChange':
      if (isMackie) {
        return Mackie_Map_CC.get(binding?.members?.ControlChangeNumber);
      } else {
        return Cubase_Map_CC.get(binding?.members?.ControlChangeNumber);
      }

    case 'MidiBindingToPitchBend':
      if (isMackie) {
        return Mackie_Map_PitchBend.get(binding?.members?.ChannelNumber);
      } else {
        return Cubase_Map_PitchBend.get(binding?.members?.ChannelNumber);
      }

    default:
      return undefined;
  }
};

const lookupDetectionPortPair = (objects: ObjectElement[], detectionUnits: number[]): FilterPortPairs[] => {
  const filterPortPairs: FilterPortPairs[] = [];

  detectionUnits.forEach((detectionUnit: number) => {
    const lookupPortPair = lookupDetectionUnit(objects, detectionUnit);
    if (lookupPortPair) {
      filterPortPairs.push(lookupPortPair);
    }
  });

  return filterPortPairs;
};

const lookupDetectionUnit = (objects: ObjectElement[], detectionUnit: number): FilterPortPairs => {
  const deviceDetectionUnit = objects.find((a: ObjectElement) => a.type === 'DeviceDetectionUnit' && a.id === detectionUnit);
  const memberEntries = deviceDetectionUnit?.members?.Entries;

  // only use first of the Entries
  const detectionPortPair = objects.find((a: ObjectElement) => a.type === 'DetectionPortPair' && a.id === memberEntries[0]);

  const memberInputNameFilters = detectionPortPair?.members?.InputNameFilters;
  const memberOutputNameFilters = detectionPortPair?.members?.OutputNameFilters;

  // only use first of the NameFilters
  const detectionInputNameFilter = objects.find(
    (a: ObjectElement) => a.type === 'DetectionInputNameFilterEquals' && a.id === memberInputNameFilters[0]
  );
  const detectionOutputNameFilter = objects.find(
    (a: ObjectElement) => a.type === 'DetectionOutputNameFilterEquals' && a.id === memberOutputNameFilters[0]
  );

  const memberInputFilterValue = detectionInputNameFilter?.members?.FilterValue;
  const memberOutputFilterValue = detectionOutputNameFilter?.members?.FilterValue;

  return { inputFilter: memberInputFilterValue, outputFilter: memberOutputFilterValue };
};
