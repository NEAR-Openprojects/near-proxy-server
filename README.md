NEAR Proxy Server is a helper backend to simplify communication with near-blockchain and provide functionality for applications that can't use near-api-js directly. Based on [Next.js](https://nextjs.org/).

## Overview

**near-proxy-server** (Nextjs backend to provide a simple proxy server between client and near blockchain)
**client-examples** (Basic examples how to connect Unity, Godot and Unreal Engine to the backend)

### Features

- Get Keypair
- Get LoginUrl
- Get SigningWalletUrl as text (ChangeFunction with deposit)
- Get SigningWalletUrl as QrCode (ChangeFunction with deposit)
- Call ViewFunction
- Call ChangeFunction (without deposit)
- GetPublicKeyAllowance / CheckPublicKeyValidity
- Verify Signed Message (TODO)
- Authoritive Server Wallet (TODO)

## Quickstart

- Start the backend via ```npm run dev``` or ```yarn dev```.
- Import postman_collection.json into Postman.
- Get Key-Pair via ```get-ed25519pair``` and use ```get-login-url``` with given public key to create access key.
- Setup global variables for: ```account_id```, ```private_key```, ```public_key``` and try provided endpoints.
- Look into client examples for basic integration or if an example for you engine is not ready yet, just setup your own http client to consume backend endpoints within your projects.
- Set env variable ```NEAR_NETWORK_ID``` to mainnet for production, default network is testnet.

## Development Bounties

This project is completly community driven, supported by bounties that will be rewarded for PRs to add new features or improve existing features. Join Discord to reserve a bounty and discuss details: TBA soon

Open Bounties:
- Improve Unity example (50N)
- Simple Godot example (75N)
- Simple UE example (75N)
- Login via QR-Code (20N)
- FT endpoints for simple FT related usage (25N)
- NFT endpoints for simple NFT related usage (25N)
- Support for other wallets/wallet selection: MNW, Sender Wallet and HERE Wallet (125N)
- Forward wallet id returned from login to client (80N)
- Endpoint to verify a signed message (20N)
- Authoritive server wallet example (20N)
- Rework readme (20N)

To claim a bounty, four steps are required:
1. Join Discord and request to reserve a free bounty you want to work on
2. Accept the given requirements for the bounty
3. Deliver solution within agreed deadline (reservation is lost if deadline is not met)
4. Pass review -> Payout
  
## Support Openprojects
You want to support the Openprojects initiative?

Stake your NEAR with our validator (10% Fee) **openprojects_staking-platform.pool.near**