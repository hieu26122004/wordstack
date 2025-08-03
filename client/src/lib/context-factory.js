import React from "react";

const contextFactory = () => {
  const Ctx = React.createContext(undefined);

  const useCtx = () => {
    const ctx = React.useContext(Ctx);
    if (!ctx) {
      throw new Error("useCtx must be used within a Provider with a value");
    }
    return ctx;
  };

  return [Ctx, useCtx];
};

export default contextFactory;
