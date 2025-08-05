import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Error } from '../build/Error/Error_Error';
import '@ton/test-utils';

describe('Error', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let error: SandboxContract<Error>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        error = blockchain.openContract(await Error.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await error.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: error.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and error are ready to use
    });
});
