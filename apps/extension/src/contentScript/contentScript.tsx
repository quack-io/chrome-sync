import { stateManager } from "@chrome-sync/react";

(async function () {
  // Initialize the state
  await stateManager.initializeState();

  // Apply initial theme
  // Subscribe to state changes
  stateManager.subscribe((newState) => {
    // Log user actions if a user is set
    if (newState.counter) {
      console.log(`counter is: ${newState.counter}`);
    }
  });

  // Example: Count page visits
  let visitCount = stateManager.getState("visitCount") || 0;
  visitCount++;
  stateManager.setState("visitCount", visitCount);
  console.log(`This page has been visited ${visitCount} times`);
})();
