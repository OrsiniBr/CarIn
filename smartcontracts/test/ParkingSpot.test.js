const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ParkingSpot", function () {
  let ParkingSpot;
  let parkingSpot;
  let owner;
  let spotOwner;
  let renter;

  beforeEach(async function () {
    [owner, spotOwner, renter] = await ethers.getSigners();
    
    ParkingSpot = await ethers.getContractFactory("ParkingSpot");
    parkingSpot = await ParkingSpot.deploy();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await parkingSpot.owner()).to.equal(owner.address);
    });
  });

  // Test structure for spot listing, booking, etc. will be added in subsequent commits
});

