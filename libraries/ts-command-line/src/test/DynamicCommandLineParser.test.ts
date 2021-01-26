// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import { DynamicCommandLineParser, DynamicCommandLineAction, CommandLineFlagParameter } from '..';

describe('DynamicCommandLineParser', () => {
  it('parses an action', async () => {
    const commandLineParser: DynamicCommandLineParser = new DynamicCommandLineParser({
      toolFilename: 'example',
      toolDescription: 'An example project'
    });

    const action: DynamicCommandLineAction = new DynamicCommandLineAction({
      actionName: 'do:the-job',
      summary: 'does the job',
      documentation: 'a longer description'
    });
    commandLineParser.addAction(action);
    action.defineFlagParameter({
      parameterLongName: '--flag',
      description: 'The flag'
    });

    await commandLineParser.execute(['do:the-job', '--flag']);

    expect(commandLineParser.selectedAction).toEqual(action);

    const retrievedParameter: CommandLineFlagParameter = action.getFlagParameter('--flag');
    expect(retrievedParameter.value).toBe(true);
  });
});
