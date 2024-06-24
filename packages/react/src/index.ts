import React, { useState, useEffect } from "react";
import { stateManager } from "@chrome-sync/core";

export { stateManager };

export const useChromeSync = (key: string): [any, (value: any) => void] => {
  const [state, setState] = useState<unknown>("");

  useEffect(() => {
    (async () => {
      await stateManager.initializeState();
      setState(stateManager.getState(key));

      stateManager.subscribe((newState: any) => {
        // Log user actions if a user is set
        if (newState[key]) {
          setState(newState[key]);
        }
      });
    })();
  }, [key]);

  const setValue = (v: unknown) => {
    setState(v);
    stateManager.setState(key, v);
  };

  return [state, setValue];
};
