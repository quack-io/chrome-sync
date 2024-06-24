type StateChangeCallback = (newState: any) => void;

class StateManager {
  private state: any = {};
  private listeners: StateChangeCallback[] = [];

  constructor() {
    chrome.runtime?.onMessageExternal?.addListener(
      (request, sender, sendResponse) => {
        console.log("Received message from " + sender + ": ", request);
        sendResponse({ received: true }); //respond however you like
      }
    );
    // Listen for messages from other parts of the extension
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      console.log({ message });
      if (message.type === "STATE_UPDATE") {
        this.state = { ...this.state, ...message.payload };
        this.notifyListeners();
        sendResponse(true);
        // this.updateState(message.payload);
      } else if (message.type === "GET_STATE") {
        sendResponse(this.state);
      }
    });
  }

  // Update the state and notify listeners
  private updateState(newState: any): void {
    this.state = { ...this.state, ...newState };
    this.notifyListeners();
    this.broadcastState();
  }

  // Notify all registered listeners
  private notifyListeners(): void {
    this.listeners.forEach((listener) => listener(this.state));
  }

  //   content doesnt handle message good enough

  // Broadcast state update to all parts of the extension
  private broadcastState(): void {
    chrome?.tabs?.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome?.tabs?.sendMessage(tab.id!, {
          type: "STATE_UPDATE",
          payload: this.state,
        });
      });
    });

    chrome.runtime.sendMessage({ type: "STATE_UPDATE", payload: this.state });
  }

  // Set a value in the state
  setState(key: string, value: any): void {
    this.updateState({ [key]: value });
  }

  // Get a value from the state
  getState(key?: string): any {
    if (key) {
      return this.state[key];
    }
    return this.state;
  }

  // Subscribe to state changes
  subscribe(callback: StateChangeCallback): () => void {
    this.listeners.push(callback);
    return () => {
      this.listeners = this.listeners.filter(
        (listener) => listener !== callback
      );
    };
  }

  // Initialize the state from another part of the extension
  initializeState(): Promise<any> {
    return new Promise((resolve) => {
      chrome.runtime.sendMessage({ type: "GET_STATE" }, (response) => {
        if (response) {
          this.state = response;
          this.notifyListeners();
        }
        resolve(this.state);
      });
    });
  }
}

export const stateManager = new StateManager();
