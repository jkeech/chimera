// Copyright (c) Microsoft Corporation. All rights reserved. Licensed under the MIT license.
// See LICENSE in the project root for license information.

import * as path from 'path';
import { EnvironmentConfiguration } from '../EnvironmentConfiguration';

describe('EnvironmentConfiguration', () => {
  let _oldEnv: typeof process.env;

  beforeEach(() => {
    EnvironmentConfiguration.reset();
    _oldEnv = process.env;
    process.env = {};
  });

  afterEach(() => {
    process.env = _oldEnv;
  });

  describe('initialize', () => {
    it('correctly allows no environment variables', () => {
      expect(EnvironmentConfiguration.initialize).not.toThrow();
    });

    it('allows known environment variables', () => {
      process.env['RUSH_TEMP_FOLDER'] = '/var/temp'; // eslint-disable-line dot-notation
      expect(EnvironmentConfiguration.initialize).not.toThrow();
    });

    it('does not allow unknown environment variables', () => {
      process.env['rush_foobar'] = 'asdf'; // eslint-disable-line dot-notation
      expect(EnvironmentConfiguration.initialize).toThrow();
    });

    it('can be re-initialized', () => {
      process.env['RUSH_TEMP_FOLDER'] = '/var/tempA'; // eslint-disable-line dot-notation
      EnvironmentConfiguration.initialize({ doNotNormalizePaths: true });

      expect(EnvironmentConfiguration.rushTempFolderOverride).toEqual('/var/tempA');

      process.env['RUSH_TEMP_FOLDER'] = '/var/tempB'; // eslint-disable-line dot-notation
      EnvironmentConfiguration.initialize({ doNotNormalizePaths: true });

      expect(EnvironmentConfiguration.rushTempFolderOverride).toEqual('/var/tempB');
    });
  });

  describe('rushTempDirOverride', () => {
    it('throws if EnvironmentConfiguration is not initialized', () => {
      expect(() => EnvironmentConfiguration.rushTempFolderOverride).toThrow();
    });

    it('returns undefined for unset environment variables', () => {
      EnvironmentConfiguration.initialize();

      expect(EnvironmentConfiguration.rushTempFolderOverride).not.toBeDefined();
    });

    it('returns the value for a set environment variable', () => {
      const expectedValue: string = '/var/temp';
      process.env['RUSH_TEMP_FOLDER'] = expectedValue; // eslint-disable-line dot-notation
      EnvironmentConfiguration.initialize({ doNotNormalizePaths: true });

      expect(EnvironmentConfiguration.rushTempFolderOverride).toEqual(expectedValue);
    });
  });

  describe('pnpmStorePathOverride', () => {
    const ENV_VAR: string = 'RUSH_PNPM_STORE_PATH';
    it('throws if EnvironmentConfiguration is not initialized', () => {
      expect(() => EnvironmentConfiguration.pnpmStorePathOverride).toThrow();
    });

    it('returns undefined for unset environment variable', () => {
      EnvironmentConfiguration.initialize();

      expect(EnvironmentConfiguration.pnpmStorePathOverride).not.toBeDefined();
    });

    it('returns the expected path from environment variable without normalization', () => {
      const expectedValue: string = '/var/temp';
      process.env[ENV_VAR] = expectedValue;
      EnvironmentConfiguration.initialize({ doNotNormalizePaths: true });

      expect(EnvironmentConfiguration.pnpmStorePathOverride).toEqual(expectedValue);
    });

    it('returns expected path from environment variable with normalization', () => {
      const expectedValue: string = path.resolve(path.join(process.cwd(), 'temp'));
      const envVar: string = './temp';
      process.env[ENV_VAR] = envVar;

      EnvironmentConfiguration.initialize();

      expect(EnvironmentConfiguration.pnpmStorePathOverride).toEqual(expectedValue);
    });
  });
});
