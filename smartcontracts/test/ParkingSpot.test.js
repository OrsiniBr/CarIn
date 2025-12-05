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

  describe("Spot Listing", function () {
    it("Should allow listing a new parking spot", async function () {
      const location = "123 Main St, City";
      const pricePerHour = ethers.parseEther("1");
      
      await expect(parkingSpot.connect(spotOwner).listSpot(location, pricePerHour))
        .to.emit(parkingSpot, "SpotListed")
        .withArgs(1, spotOwner.address, location, pricePerHour, anyValue);
      
      const spot = await parkingSpot.getSpot(1);
      expect(spot.id).to.equal(1);
      expect(spot.owner).to.equal(spotOwner.address);
      expect(spot.location).to.equal(location);
      expect(spot.pricePerHour).to.equal(pricePerHour);
      expect(spot.isAvailable).to.be.true;
    });

    it("Should revert when listing with zero price", async function () {
      await expect(
        parkingSpot.connect(spotOwner).listSpot("Location", 0)
      ).to.be.revertedWithCustomError(parkingSpot, "InvalidPrice");
    });

    it("Should increment spot counter", async function () {
      await parkingSpot.connect(spotOwner).listSpot("Location 1", ethers.parseEther("1"));
      await parkingSpot.connect(spotOwner).listSpot("Location 2", ethers.parseEther("2"));
      
      expect(await parkingSpot.spotCounter()).to.equal(2);
    });

    it("Should track owner spots", async function () {
      await parkingSpot.connect(spotOwner).listSpot("Location 1", ethers.parseEther("1"));
      await parkingSpot.connect(spotOwner).listSpot("Location 2", ethers.parseEther("2"));
      
      const ownerSpots = await parkingSpot.getOwnerSpots(spotOwner.address);
      expect(ownerSpots.length).to.equal(2);
      expect(ownerSpots[0]).to.equal(1);
      expect(ownerSpots[1]).to.equal(2);
    });
  });

  // More tests will be added in subsequent commits
});

