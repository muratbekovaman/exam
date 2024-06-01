async function main() {
    const Voter = await ethers.getContractFactory("Voter");
    const voter = await Voter.deploy();
    console.log("Contract deployed to:", voter.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });