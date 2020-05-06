import * as azure from '@pulumi/azure';
import * as pulumi from '@pulumi/pulumi';
import { createMongoDb } from './database';

const stackConfig = new pulumi.Config();
const config = {
  // ===== DONT'T TOUCH THIS -> CONFIG REQUIRED BY nx-deploy-it ======
  projectName: stackConfig.get('projectName')
  // ===== END ======
};
const projectName = config.projectName;

const resourceGroup = new azure.core.ResourceGroup(`${projectName}-rg`);

// create database
const dbAccount = createMongoDb(projectName, resourceGroup);

const nodeApp = new azure.appservice.ArchiveFunctionApp(
  `${projectName}-functions`,
  {
    resourceGroup,
    archive: new pulumi.asset.FileArchive('./functions'),
    version: '~3',
    nodeVersion: '~10',
    siteConfig: {
      cors: { allowedOrigins: ['*'] }
    },
    appSettings: {
      MONGO_CONNECTION_STRING: dbAccount.connectionStrings.apply(
        connectionStrings => connectionStrings[0]
      ),
      UTELLY_HOST: stackConfig.require('utellyHost'),
      IMDB_HOST: stackConfig.require('imdbHost'),
      RAPIDAPI_KEY: stackConfig.requireSecret('rapidApiKey'),
      AUTH0_DOMAIN: stackConfig.require('auth0Domain'),
      AUTH0_AUDIENCE: stackConfig.require('auth0Audience')
    }
  }
);

export const nodeEndpoint = nodeApp.endpoint.apply((endpoint: string) =>
  endpoint.replace(/api\/$/, '')
);
