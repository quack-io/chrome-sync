import { stateManager } from "..";

describe("StateManager", () => {
  beforeEach(() => {
    // Reset stateManager state before each test
    stateManager.setState("test", {});
  });

  test("should update state when setState is called", () => {
    const testValue = { key: "value" };
    stateManager.setState("test", testValue);
    expect(stateManager.getState("test")).toEqual(testValue);
  });

  test("should return entire state when getState is called without key", () => {
    const testValue = { key: "value" };
    stateManager.setState("test", testValue);
    expect(stateManager.getState()).toEqual({ test: testValue });
  });

  test("should notify subscribers when state changes", () => {
    const mockCallback = jest.fn();
    stateManager.subscribe(mockCallback);
    const testValue = { key: "value" };
    stateManager.setState("test", testValue);
    expect(mockCallback).toHaveBeenCalledWith({ test: testValue });
  });

  test("should stop notifying unsubscribed listeners", () => {
    const mockCallback = jest.fn();
    const unsubscribe = stateManager.subscribe(mockCallback);
    unsubscribe();
    const testValue = { key: "value" };
    stateManager.setState("test", testValue);
    expect(mockCallback).not.toHaveBeenCalled();
  });
});
