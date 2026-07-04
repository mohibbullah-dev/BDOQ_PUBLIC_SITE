"use client";

import { createContext, useContext } from "react";
import type { IFormSelectOption } from "@/lib/formOptions";

const FreeClassSubjectsContext = createContext<IFormSelectOption[]>([]);

export function FreeClassSubjectsProvider({
  subjects,
  children,
}: {
  subjects: IFormSelectOption[];
  children: React.ReactNode;
}) {
  return (
    <FreeClassSubjectsContext.Provider value={subjects}>
      {children}
    </FreeClassSubjectsContext.Provider>
  );
}

export function useFreeClassSubjects(): IFormSelectOption[] {
  return useContext(FreeClassSubjectsContext);
}
