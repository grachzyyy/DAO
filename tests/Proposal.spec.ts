import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Proposal } from '../build/Proposal/Proposal_Proposal';
import '@ton/test-utils';

describe('Proposal', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let proposal: SandboxContract<Proposal>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        proposal = blockchain.openContract(await Proposal.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await proposal.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: proposal.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and proposal are ready to use
    });
});
