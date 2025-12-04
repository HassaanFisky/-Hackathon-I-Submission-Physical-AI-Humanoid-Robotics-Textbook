// Simple 2D forward kinematics for a 2-link arm
class TwoLinkArm {
  constructor(length1, length2) {
    this.l1 = length1; // Length of first link
    this.l2 = length2; // Length of second link
  }

  forwardKinematics(theta1, theta2) {
    // Calculate end effector position
    // theta1: angle of first joint (radians)
    // theta2: angle of second joint (radians)

    const x = this.l1 * Math.cos(theta1) + this.l2 * Math.cos(theta1 + theta2);
    const y = this.l1 * Math.sin(theta1) + this.l2 * Math.sin(theta1 + theta2);

    return { x, y };
  }

  demonstrateMovement() {
    console.log("Two-Link Arm Forward Kinematics Demo");
    console.log("=====================================");

    // Test various configurations
    const angles = [
      { theta1: 0, theta2: 0 },
      { theta1: Math.PI / 4, theta2: Math.PI / 4 },
      { theta1: Math.PI / 2, theta2: -Math.PI / 4 },
    ];

    angles.forEach((config, i) => {
      const pos = this.forwardKinematics(config.theta1, config.theta2);
      console.log(`\nConfiguration ${i + 1}:`);
      console.log(
        `  Joint 1: ${((config.theta1 * 180) / Math.PI).toFixed(1)}°`
      );
      console.log(
        `  Joint 2: ${((config.theta2 * 180) / Math.PI).toFixed(1)}°`
      );
      console.log(`  End Effector: (${pos.x.toFixed(2)}, ${pos.y.toFixed(2)})`);
    });
  }
}

// Example usage
const arm = new TwoLinkArm(1.0, 0.8); // Links of 1m and 0.8m
arm.demonstrateMovement();
