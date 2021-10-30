/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const fs = require('fs');
const path = require('path');

async function main() {
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
    let ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: 'appUser',
      discovery: { enabled: true, asLocalhost: true }
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('channel1');

    // Get the contract from the network.
    const contract = network.getContract('realestate');

    // Submit the specified transaction.
    const id = 'fafcbb02c73d557d778da9f5d26169a5fd8bfc4d';
    const name = 'The Central Villa';
    const address = 'Silom, Bangkok Thailand';
    const about = 'Villa Acquisition';
    const agentId = 'gIbzQqHFyuJBU1p8iO2D';
    const ownerId = '8GcnDeBrwBjDYaohHCSC';
    const type = 'Commercial';
    const price = parseFloat(5000000);
    const orgId = 'WM71GdXaIgi8QXv6UmBZ';
    const createdAt = new Date().toISOString();
    const previousId = '';
    await contract.submitTransaction('createProperty', id, name, address, about, agentId, ownerId, type, price, orgId, createdAt, previousId);
    console.log('Transaction has been submitted');

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    process.exit(1);
  }
}

main();
