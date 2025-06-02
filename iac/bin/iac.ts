#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { IacStack } from '../lib/iac-stack';

const app = new cdk.App();
new IacStack(app, 'IacStack', {
  env: { account: '445759955414', region: 'us-east-1' },
  environment: 'hml',
  databaseUsername: 'dmuser',
  databasePassword: cdk.SecretValue.unsafePlainText('dmpasswd'),
});
