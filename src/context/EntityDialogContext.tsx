import { ReactNode, createContext, useContext, useMemo, useState } from "react";

type Payload =
  | { type: "person"; url: string; name?: string }
  | { type: "starship"; url: string; name?: string }
  | { type: "planet"; url: string; name?: string }
  | null;

type Ctx = {
  open: boolean;
  payload: Payload;
  openEntity: (payload: NonNullable<Payload>) => void;
  closeEntity: () => void;
};

const EntityDialogCtx = createContext<Ctx | null>(null);

export function EntityDialogProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [payload, setPayload] = useState<Payload>(null);

  const openEntity = (payload: NonNullable<Payload>) => {
    setPayload(payload);
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
  const context = useContext(EntityDialogCtx);
  if (!context)
    throw new Error("useEntityDialog must be used within EntityDialogProvider");
  return context;
}
