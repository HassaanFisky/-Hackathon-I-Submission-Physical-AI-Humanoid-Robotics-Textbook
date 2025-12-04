// Comparing capabilities of different humanoid robots
class HumanoidRobot {
  constructor(name, specs) {
    this.name = name;
    this.height = specs.height; // meters
    this.weight = specs.weight; // kg
    this.dof = specs.dof; // degrees of freedom
    this.maxSpeed = specs.maxSpeed; // m/s
    this.batteryLife = specs.batteryLife; // hours
    this.payload = specs.payload; // kg
  }

  calculatePowerToWeight() {
    return (this.payload / this.weight).toFixed(2);
  }

  displaySpecs() {
    console.log(`\n${this.name}`);
    console.log("=".repeat(this.name.length));
    console.log(`Height: ${this.height}m | Weight: ${this.weight}kg`);
    console.log(`DOF: ${this.dof} | Max Speed: ${this.maxSpeed}m/s`);
    console.log(
      `Battery Life: ${this.batteryLife}h | Payload: ${this.payload}kg`
    );
    console.log(`Power-to-Weight Ratio: ${this.calculatePowerToWeight()}`);
  }
}

// Create robot instances with approximate specifications
const robots = [
  new HumanoidRobot("Tesla Optimus", {
    height: 1.73,
    weight: 57,
    dof: 28,
    maxSpeed: 0.8,
    batteryLife: 8,
    payload: 20,
  }),
  new HumanoidRobot("Boston Dynamics Atlas", {
    height: 1.5,
    weight: 89,
    dof: 28,
    maxSpeed: 1.5,
    batteryLife: 1,
    payload: 11,
  }),
  new HumanoidRobot("Figure 01", {
    height: 1.7,
    weight: 60,
    dof: 30,
    maxSpeed: 1.2,
    batteryLife: 5,
    payload: 20,
  }),
  new HumanoidRobot("Unitree H1", {
    height: 1.8,
    weight: 47,
    dof: 25,
    maxSpeed: 1.5,
    batteryLife: 2,
    payload: 15,
  }),
];

console.log("Humanoid Robot Comparison");
console.log("==========================");

robots.forEach((robot) => robot.displaySpecs());

// Find best in class
console.log("\n\nBest in Class:");
console.log("==============");

const fastest = robots.reduce((prev, curr) =>
  curr.maxSpeed > prev.maxSpeed ? curr : prev
);
console.log(`Fastest: ${fastest.name} (${fastest.maxSpeed}m/s)`);

const longestBattery = robots.reduce((prev, curr) =>
  curr.batteryLife > prev.batteryLife ? curr : prev
);
console.log(
  `Longest Battery: ${longestBattery.name} (${longestBattery.batteryLife}h)`
);

const mostDOF = robots.reduce((prev, curr) =>
  curr.dof > prev.dof ? curr : prev
);
console.log(`Most Articulated: ${mostDOF.name} (${mostDOF.dof} DOF)`);
