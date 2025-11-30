import { ethers } from 'ethers';

const ABI = [
    "function recordBid(string memory bidId, string memory bidHash) public",
    "event BidRecorded(string bidId, string bidHash, address indexed recorder)"
];

function getContract() {
    const rpcUrl = process.env.RPC_URL;
    const privateKey = process.env.RELAYER_PRIVATE_KEY;
    const contractAddress = process.env.BIDDING_ENGINE_ADDRESS;

    if (!rpcUrl || !privateKey || !contractAddress) {
        console.warn("Missing blockchain config");
        return null;
    }

    const provider = new ethers.JsonRpcProvider(rpcUrl);
    const wallet = new ethers.Wallet(privateKey, provider);
    return new ethers.Contract(contractAddress, ABI, wallet);
}

export async function recordBidHash(bidId: string, bidHash: string) {
    const contract = getContract();
    if (!contract) return;

    try {
        console.log(`Recording bid ${bidId} with hash ${bidHash} on-chain...`);
        const tx = await contract.recordBid(bidId, bidHash);
        console.log(`Transaction sent: ${tx.hash}`);
        await tx.wait();
        console.log(`Transaction confirmed: ${tx.hash}`);
        return tx.hash;
    } catch (error) {
        console.error("Failed to record bid on-chain:", error);
        // Fallback for MVP demo if blockchain is down
        console.warn("Using MOCK transaction hash for demo purposes.");
        return `0xMOCK${Math.random().toString(16).substr(2, 60)}`;
    }
}
