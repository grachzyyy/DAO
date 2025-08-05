import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Lock } from '../build/Lock/Lock_Lock';
import '@ton/test-utils';

describe('Lock', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let lock: SandboxContract<Lock>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        lock = blockchain.openContract(await Lock.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await lock.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: lock.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and lock are ready to use
    });
});
