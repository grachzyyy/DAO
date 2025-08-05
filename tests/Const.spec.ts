import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Const } from '../build/Const/Const_Const';
import '@ton/test-utils';

describe('Const', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let const: SandboxContract<Const>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        const = blockchain.openContract(await Const.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await const.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            null,
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: const.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and const are ready to use
    });
});
