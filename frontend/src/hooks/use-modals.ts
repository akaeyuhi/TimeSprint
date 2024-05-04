import React from 'react';

export interface ModalHandler {
  isOpen: boolean,
  open: () => void,
  close: () => void;
}

export const useModals = <T extends object>(
  modals: T,
  set:  React.Dispatch<React.SetStateAction<T>>
) => {
  type ModalArray = [ keyof T,  boolean ];
  const entries = Object.entries(modals) as ModalArray[];
  const modalHandlers: Record<keyof T, ModalHandler> = {} as Record<keyof T, ModalHandler>;
  entries.forEach(([name, fieldValue]) => {
    modalHandlers[name] = {
      isOpen: fieldValue,
      open: () => set((state) => ({ ...state, [name]: true })),
      close: () => set((state) => ({ ...state, [name]: false })),
    };
  });
  return modalHandlers;
};
