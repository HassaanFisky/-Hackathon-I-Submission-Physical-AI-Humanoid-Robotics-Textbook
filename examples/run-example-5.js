// Tool to categorize and search robotics resources
class RoboticsResourceLibrary {
  constructor() {
    this.resources = [];
  }

  addResource(name, category, url, difficulty, cost) {
    this.resources.push({
      name,
      category, // 'framework', 'simulator', 'hardware', 'course', 'publication'
      url,
      difficulty, // 'beginner', 'intermediate', 'advanced'
      cost, // 'free', 'paid', 'expensive'
    });
  }

  search(filters = {}) {
    let results = this.resources;

    if (filters.category) {
      results = results.filter((r) => r.category === filters.category);
    }
    if (filters.difficulty) {
      results = results.filter((r) => r.difficulty === filters.difficulty);
    }
    if (filters.cost) {
      results = results.filter((r) => r.cost === filters.cost);
    }

    return results;
  }

  displayResults(results) {
    if (results.length === 0) {
      console.log("No resources found matching criteria.");
      return;
    }

    console.log(`\nFound ${results.length} resource(s):\n`);
    results.forEach((r, i) => {
      console.log(`${i + 1}. ${r.name}`);
      console.log(
        `   Category: ${r.category} | Difficulty: ${r.difficulty} | Cost: ${r.cost}`
      );
      console.log(`   URL: ${r.url}\n`);
    });
  }
}

// Populate library
const library = new RoboticsResourceLibrary();

library.addResource(
  "ROS 2",
  "framework",
  "https://ros.org",
  "intermediate",
  "free"
);
library.addResource(
  "Gazebo",
  "simulator",
  "https://gazebosim.org",
  "intermediate",
  "free"
);
library.addResource(
  "NVIDIA Isaac Sim",
  "simulator",
  "https://developer.nvidia.com/isaac-sim",
  "advanced",
  "free"
);
library.addResource(
  "TurtleBot 4",
  "hardware",
  "https://clearpathrobotics.com/turtlebot-4",
  "beginner",
  "expensive"
);
library.addResource(
  "Modern Robotics (book)",
  "course",
  "http://modernrobotics.org",
  "intermediate",
  "free"
);
library.addResource(
  "PyBullet",
  "simulator",
  "https://pybullet.org",
  "beginner",
  "free"
);

// Example searches
console.log("=== Robotics Resource Discovery Tool ===\n");

console.log("Search 1: Free beginner resources");
const beginnerFree = library.search({ difficulty: "beginner", cost: "free" });
library.displayResults(beginnerFree);

console.log("\nSearch 2: All simulators");
const simulators = library.search({ category: "simulator" });
library.displayResults(simulators);

console.log("\nSearch 3: Intermediate-level resources");
const intermediate = library.search({ difficulty: "intermediate" });
library.displayResults(intermediate);
