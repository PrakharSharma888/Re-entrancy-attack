const { expect } = require("chai")
const { BigNumber } = require("ethers")
const { ethers } = require("hardhat")

describe("Attack Start", () => {
    it("Should empty the balance of the good contract", async ()=>{

        const GoodContract = await ethers.getContractFactory("GoodContract")
        const goodContract = await GoodContract.deploy()
        await goodContract.deployed()

        const BadContract = await ethers.getContractFactory("BadContract")
        const badContract = await BadContract.deploy(goodContract.address)
        await badContract.deployed()

        const [_, innocentAddress, attackerAddress] = await ethers.getSigners()

        let tx = await goodContract.connect(innocentAddress).addBalance({
            value: ethers.utils.parseEther("10")
        })
        await tx.wait()

        let balanceEth = await ethers.provider.getBalance(goodContract.address)
        expect(balanceEth).to.equal(ethers.utils.parseEther("10"))

        tx = await badContract.connect(attackerAddress).attack({
            value: ethers.utils.parseEther("1")
        })
        await tx.wait()

        balanceEth = await ethers.provider.getBalance(goodContract.address)
        expect(balanceEth).to.equal(BigNumber.from("0"))

        balanceEth = await ethers.provider.getBalance(badContract.address)
        expect(balanceEth).to.equal(ethers.utils.parseEther("11"))
    })
})