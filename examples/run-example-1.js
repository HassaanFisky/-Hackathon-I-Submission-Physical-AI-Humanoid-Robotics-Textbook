// Simple state machine for a humanoid robot task
class RobotStateMachine {
  constructor() {
    this.state = "idle";
    this.taskQueue = [];
  }

  addTask(task) {
    this.taskQueue.push(task);
    console.log(`Task added: ${task.name}`);
  }

  executeNext() {
    if (this.taskQueue.length === 0) {
      this.state = "idle";
      console.log("No tasks remaining. Robot idle.");
      return;
    }

    const task = this.taskQueue.shift();
    this.state = "executing";
    console.log(`Executing task: ${task.name}`);

    // Simulate task execution
    setTimeout(() => {
      console.log(`Task completed: ${task.name}`);
      this.executeNext();
    }, task.duration || 1000);
  }

  getStatus() {
    return {
      state: this.state,
      queueLength: this.taskQueue.length,
    };
  }
}

// Example usage
const robot = new RobotStateMachine();
robot.addTask({ name: "Navigate to workstation", duration: 2000 });
robot.addTask({ name: "Pick up object", duration: 1500 });
robot.addTask({ name: "Place object in bin", duration: 1500 });
robot.executeNext();
