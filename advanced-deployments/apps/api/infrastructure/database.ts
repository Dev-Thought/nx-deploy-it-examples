import * as azure from '@pulumi/azure';

export function createMongoDb(
  projectName: string,
  resourceGroup: azure.core.ResourceGroup
) {
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

  return cosmosdbAccount;
}
