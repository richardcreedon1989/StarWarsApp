import React, { createContext, useContext, useMemo, useState } from "react";

type Payload =
  | { type: "person"; url: string; name?: string }
  | { type: "starship"; url: string; name?: string }
  | { type: "planet"; url: string; name?: string }
  | null;

type Ctx = {
  open: boolean;
  payload: Payload;
  openEntity: (p: NonNullable<Payload>) => void;
  closeEntity: () => void;
};

const EntityDialogCtx = createContext<Ctx | null>(null);

export function EntityDialogProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<Payload>(null);

  const openEntity = (p: NonNullable<Payload>) => {
    setPayload(p);
    setOpen(true);
  };
  const closeEntity = () => setOpen(false);

  const value = useMemo(
    () => ({ open, payload, openEntity, closeEntity }),
    [open, payload]
  );
  return (
    <EntityDialogCtx.Provider value={value}>
      {children}
    </EntityDialogCtx.Provider>
  );
}

export function useEntityDialog() {
  const v = useContext(EntityDialogCtx);
  if (!v)
    throw new Error("useEntityDialog must be used within EntityDialogProvider");
  return v;
}
