# Local Setup Guide

This guide explains how to set up the local blockchain environment for the E-Bidding MVP.

## Prerequisites

- Node.js & npm
- Hardhat (installed in `smart-contracts/`)

## 1. Start Local Blockchain

Open a new terminal and run:

```bash
cd smart-contracts
npx hardhat node
```

This will start a local JSON-RPC server at `http://127.0.0.1:8545`.
It will also list 20 accounts with private keys.

**Important:** The first account (Account #0) is used as the Relayer.

- Address: `0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266`
- Private Key: `0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80`

## 2. Deploy Smart Contract

In another terminal, run:

```bash
cd smart-contracts
npx hardhat run scripts/deploy.js --network localhost
```

Copy the deployed contract address from the output (e.g., `CommodityBiddingEngine deployed to 0x5FbDB2315678afecb367f032d93F642f64180aa3`).

## 3. Configure Environment Variables

Update your root `.env` file with the following values:

```env
RPC_URL=http://127.0.0.1:8545
RELAYER_PRIVATE_KEY=0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
BIDDING_ENGINE_ADDRESS=<PASTE_DEPLOYED_CONTRACT_ADDRESS_HERE>
```

## 4. Seed Database

To populate the database with test users and products:

```bash
npx prisma db seed
```

This creates:

- Buyer: `buyer@chem.com` / `secure123`
- Seller: `seller@chem.com` / `secure123`
- Product: Methanol (CAS: 67-56-1)

## 5. Run Application

```bash
npm run dev
```

Visit `http://localhost:3000`.
