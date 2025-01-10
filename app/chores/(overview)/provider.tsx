"use client";

import { Member } from "@/app/lib/types";
import { createContext, ReactNode, useEffect, useState } from "react";

const LOCAL_STORAGE_NAME_KEY = "member_name";
const LOCAL_STORAGE_ID_KEY = "member_id";

export const MemberContext = createContext<{
  member: string | null;
  setMember: (member: Member) => void;
  member_id: number | null;
}>({ member: null, setMember: () => {}, member_id: null });

function MemberContextProvider({ children }: { children: ReactNode }) {
  const [member, setMember] = useState<string | null>(null);
  const [memberId, setMemberId] = useState<number | null>(null);

  useEffect(() => {
    // check local storage for member
    const member_name = localStorage.getItem(LOCAL_STORAGE_NAME_KEY);
    const member_id = localStorage.getItem(LOCAL_STORAGE_ID_KEY);
    // set state if the name is in storage
    if (member_name && member_id) {
      // If I was being more thorough, I would check if the name is in the list of members in the db
      setMember(member_name);
      setMemberId(parseInt(member_id));
    }
  }, []);

  function handleSetMember(member: Member) {
    // add name to localstorage
    localStorage.setItem(LOCAL_STORAGE_NAME_KEY, member.name);
    localStorage.setItem(LOCAL_STORAGE_ID_KEY, member.id.toString());
    // set state
    setMember(member.name);
    setMemberId(member.id);
  }

  return (
    <MemberContext.Provider
      value={{ member, setMember: handleSetMember, member_id: memberId }}
    >
      {children}
    </MemberContext.Provider>
  );
}

export function Providers({ children }: { children: ReactNode }) {
  return <MemberContextProvider>{children}</MemberContextProvider>;
}
