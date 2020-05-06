import * as azure from '@pulumi/azure';
import * as pulumi from '@pulumi/pulumi';

export function createMongoDb(
  projectName: string,
  resourceGroup: azure.core.ResourceGroup
) {
  // Cosmos DB Account
  const cosmosdbAccount = new azure.cosmosdb.Account(`${projectName}-cdb`, {
    resourceGroupName: resourceGroup.name,
    location: resourceGroup.location,
    offerType: 'Standard',
    geoLocations: [{ location: resourceGroup.location, failoverPriority: 0 }],
    consistencyPolicy: {
      consistencyLevel: 'Session'
    },
    kind: 'MongoDB'
  });

  // Cosmos DB Database
  // const db = new azure.cosmosdb.MongoDatabase(`db-${projectName}`, {
  //   resourceGroupName: resourceGroup.name,
  //   accountName: cosmosdbAccount.name
  // });

  return cosmosdbAccount;
}
