// In background.ts, content.ts, or popup.ts
import { stateManager } from "@chrome-sync/react";

// Initialize the state (do this in each context where you need the state)
stateManager.initializeState().then(() => {
  console.log("State initialized:", stateManager.getState());
});

// Set state
stateManager.setState("counter", 100);

setTimeout(() => {
  stateManager.setState("counter", 10000);
}, 10000);
// Get state
const counter = stateManager.getState("counter");

// Subscribe to state changes
const unsubscribe = stateManager.subscribe((newState) => {
  console.log("State updated:", newState);
});

// Unsubscribe when no longer needed
// unsubscribe();
