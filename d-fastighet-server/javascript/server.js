const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const cors = require('cors');

const port = 8080;
const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Setting for Hyperledger Fabric
const Fabric_Client = require('fabric-client');
const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const util = require('util');
const fs = require('fs');

// middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors({ origin: true }));

const organizations = ['org1.example.com', 'org2.example.com', 'org3.example.com'];
const connections = ['connection-org1.json', 'connection-org2.json', 'connection-org3.json'];
const channels = ['mychannel', 'channel1'];

app.get('/api/properties/:orgId', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    console.log(`Checking Params`, req.params.orgId);
    console.log(`Checking Query`, req.query);
    const organization = organizations[req.params.orgId];
    console.log(`Checking Org`, organization);
    const connection = connections[req.params.orgId];
    console.log(`Checking Connection`, connection);
    console.log(`Checking Query`, req.query.channel);
    const channel = parseFloat(req.query.channel) === 0 ? channels[0] : channels[1];
    console.log(`Checking Channel`, channel);
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', organization, connection);
    // const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      res.status(500).json({ code: 500, error: 'An identity for the user does not exist in the wallet' });
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    // const network = await gateway.getNetwork('mychannel');
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract('realestate');

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('queryAllProperties');
    const records = JSON.parse(result.toString());
    console.log(`Transactions have been evaluated, result is:`, records);
    res.status(200).json({ code: 200, data: records });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transactions: ${error}`);
    res.status(500).json({ code: 500, error: error });
    process.exit(1);
  }
});

app.get('/api/property/:propertyId', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      res.status(500).json({ code: 500, error: 'An identity for the user does not exist in the wallet' });
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork('mychannel');

    // Get the contract from the network.
    const contract = network.getContract('realestate');

    // Evaluate the specified transaction.
    const result = await contract.evaluateTransaction('queryProperty', req.params.propertyId);
    const record = JSON.parse(result.toString());
    console.log(`Transaction has been evaluated, result is:`, record);
    res.status(200).json({ code: 200, data: record });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to evaluate transaction: ${error}`);
    res.status(500).json({ code: 500, error: error });
    process.exit(1);
  }
});

app.post('/api/add_property/:orgId', async function (req, res) {
  res.setHeader('Content-Type', 'application/json');
  try {
    console.log(`Checking Body`, req.body);
    console.log(`Checking Params`, req.params.orgId);
    console.log(`Checking Query`, req.query);
    const organization = organizations[req.params.orgId];
    console.log(`Checking Org`, organization);
    const connection = connections[req.params.orgId];
    console.log(`Checking Connection`, connection);
    console.log(`Checking Query`, req.query.channel);
    const channel = parseFloat(req.query.channel) === 0 ? channels[0] : channels[1];
    console.log(`Checking Channel`, channel);
    // load the network configuration
    const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', organization, connection);
    // const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
    const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(process.cwd(), 'wallet');
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get('appUser');
    if (!identity) {
      console.log('An identity for the user "appUser" does not exist in the wallet');
      console.log('Run the registerUser.js application before retrying');
      res.status(500).json({ code: 500, error: 'An identity for the user does not exist in the wallet' });
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork(channel);

    // Get the contract from the network.
    const contract = network.getContract('realestate');

    // Submit the specified transaction.
    await contract.submitTransaction(
      'createProperty',
      req.body.id,
      req.body.name,
      req.body.address,
      req.body.about,
      req.body.agentId,
      req.body.ownerId,
      req.body.type,
      parseFloat(req.body.price),
      req.body.orgId,
      req.body.createdAt,
      req.body.previousId
    );

    console.log('Transaction has been submitted');
    res.status(200).json({ code: 200, data: `Property ${req.body.id} has been submitted into block` });

    // Disconnect from the gateway.
    await gateway.disconnect();
  } catch (error) {
    console.error(`Failed to submit transaction: ${error}`);
    res.status(500).json({ code: 500, error: error });
    process.exit(1);
  }
});

// app.post('/api/transfer_property/', async function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   try {
//     console.log(`Checking Body`, req.body);
//     // load the network configuration
//     const ccpPath = path.resolve(__dirname, '..', '..', 'test-network', 'organizations', 'peerOrganizations', 'org2.example.com', 'connection-org2.json');
//     const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

//     // Create a new file system based wallet for managing identities.
//     const walletPath = path.join(process.cwd(), 'wallet');
//     const wallet = await Wallets.newFileSystemWallet(walletPath);
//     console.log(`Wallet path: ${walletPath}`);

//     // Check to see if we've already enrolled the user.
//     const identity = await wallet.get('appUser');
//     if (!identity) {
//       console.log('An identity for the user "appUser" does not exist in the wallet');
//       console.log('Run the registerUser.js application before retrying');
//       res.status(500).json({ code: 500, error: 'An identity for the user does not exist in the wallet' });
//       return;
//     }

//     // Create a new gateway for connecting to our peer node.
//     const gateway = new Gateway();
//     await gateway.connect(ccp, { wallet, identity: 'appUser', discovery: { enabled: true, asLocalhost: true } });

//     // Get the network (channel) our contract is deployed to.
//     const network = await gateway.getNetwork('mychannel');

//     // Get the contract from the network.
//     const contract = network.getContract('realestate');

//     // setTimeout(async () => {
//     //   // Submit the specified transaction.
//     //   await contract.submitTransaction('transferPropOwner', req.body.id);
//     //   console.log('Transaction has been submitted');
//     //   res.status(200).json({ code: 200, data: `Property ${req.body.id} has been transferred its owner` });
//     // }, 1000);

//     await contract.submitTransaction('transferPropOwner', req.body.id);
//     console.log('Transaction has been submitted');
//     res.status(200).json({ code: 200, data: `Property ${req.body.id} has been transferred its owner` });

//     // Disconnect from the gateway.
//     await gateway.disconnect();
//   } catch (error) {
//     console.error(`Failed to submit transaction: ${error}`);
//     res.status(500).json({ code: 500, error: error });
//     process.exit(1);
//   }
// });

server.listen(port, () => console.log(`Listening on port ${port}`));
