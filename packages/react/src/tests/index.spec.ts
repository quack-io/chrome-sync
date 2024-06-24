import { useChromeSync, stateManager } from "../src/index";
import { renderHook, act } from "@testing-library/react-hooks";
import { describe, it, expect } from "@jest/globals";

describe("useChromeSync", () => {
  it("should return initial state and a setter function", () => {
    const { result } = renderHook(() => useChromeSync("testKey"));

    expect(result.current[0]).toBe("");
    expect(typeof result.current[1]).toBe("function");
  });

  it("should set state and update stateManager", async () => {
    const { result } = renderHook(() => useChromeSync("testKey"));

    act(() => {
      result.current[1]("testValue");
    });

    expect(result.current[0]).toBe("testValue");
    expect(stateManager.getState("testKey")).toBe("testValue");
  });

  it("should update state when stateManager updates", async () => {
    const { result } = renderHook(() => useChromeSync("testKey"));

    act(() => {
      stateManager.setState("testKey", "newValue");
    });

    expect(result.current[0]).toBe("newValue");
  });
});
