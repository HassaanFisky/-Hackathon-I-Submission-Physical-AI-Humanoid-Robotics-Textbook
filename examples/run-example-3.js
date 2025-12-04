// Simple obstacle avoidance behavior for a mobile robot
class ObstacleAvoidanceController {
  constructor(safeDistance = 0.5, maxSpeed = 1.0) {
    this.safeDistance = safeDistance; // meters
    this.maxSpeed = maxSpeed; // m/s
    this.sensors = {
      front: Infinity,
      left: Infinity,
      right: Infinity,
    };
  }

  updateSensors(frontDist, leftDist, rightDist) {
    this.sensors.front = frontDist;
    this.sensors.left = leftDist;
    this.sensors.right = rightDist;
  }

  computeVelocity() {
    const { front, left, right } = this.sensors;
    let linearVel = 0;
    let angularVel = 0;

    if (front > this.safeDistance) {
      // Path is clear - move forward
      linearVel = this.maxSpeed;
      angularVel = 0;
    } else if (left > right) {
      // Obstacle ahead - turn left
      linearVel = this.maxSpeed * 0.3;
      angularVel = 0.5; // radians/sec (left)
    } else {
      // Obstacle ahead - turn right
      linearVel = this.maxSpeed * 0.3;
      angularVel = -0.5; // radians/sec (right)
    }

    return { linear: linearVel, angular: angularVel };
  }

  simulate() {
    console.log("Obstacle Avoidance Simulation");
    console.log("==============================\n");

    // Simulate different scenarios
    const scenarios = [
      { name: "Clear path", front: 5.0, left: 3.0, right: 3.0 },
      { name: "Obstacle ahead, left clear", front: 0.3, left: 2.0, right: 0.8 },
      {
        name: "Obstacle ahead, right clear",
        front: 0.2,
        left: 0.5,
        right: 2.5,
      },
      { name: "Very close obstacle", front: 0.1, left: 0.4, right: 0.4 },
    ];

    scenarios.forEach((scenario, i) => {
      this.updateSensors(scenario.front, scenario.left, scenario.right);
      const cmd = this.computeVelocity();

      console.log(`Scenario ${i + 1}: ${scenario.name}`);
      console.log(
        `  Sensors: F=${scenario.front}m L=${scenario.left}m R=${scenario.right}m`
      );
      console.log(
        `  Command: Linear=${cmd.linear.toFixed(
          2
        )}m/s Angular=${cmd.angular.toFixed(2)}rad/s`
      );
      console.log(`  Action: ${this.describeAction(cmd)}\n`);
    });
  }

  describeAction(cmd) {
    if (cmd.linear === this.maxSpeed && cmd.angular === 0) {
      return "Moving forward at full speed";
    } else if (cmd.angular > 0) {
      return "Turning left to avoid obstacle";
    } else if (cmd.angular < 0) {
      return "Turning right to avoid obstacle";
    } else {
      return "Stopped";
    }
  }
}

// Run simulation
const controller = new ObstacleAvoidanceController(0.5, 1.0);
controller.simulate();
