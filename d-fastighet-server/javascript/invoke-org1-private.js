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
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
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
    const id = 'c705d6bdac2cad01a92e191877c13b11cf14dcf6';
    const name = 'SkyCent 59 Floor';
    const address = 'Silom, Bangkok Thailand';
    const about = 'Apartment Acquisition';
    const agentId = 'rHfDz2hI2NopdQJFE2pm';
    const ownerId = 'XsMwwZmwvkl4f70a9nPe';
    const type = 'Residential';
    const price = parseFloat(3500000);
    const orgId = 'D0QqmWMzXvytFtWtILUU';
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
