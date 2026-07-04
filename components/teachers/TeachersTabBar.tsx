"use client";

import { UserRound, UsersRound } from "lucide-react";
import type {
  ITeacherGenderTab,
  TeacherGenderTabType,
  TeacherTabIconId,
} from "@/lib/teachersPage";
import { SegmentedTabBar } from "@/components/shared/SegmentedTabBar";

const TAB_ICONS: Record<
  TeacherTabIconId,
  typeof UserRound | typeof UsersRound
> = {
  "user-round": UserRound,
  "users-round": UsersRound,
};

interface ITeachersTabBarProps {
  tabs: ITeacherGenderTab[];
  activeTab: TeacherGenderTabType;
  onChange: (tab: TeacherGenderTabType) => void;
}

export function TeachersTabBar({
  tabs,
  activeTab,
  onChange,
}: ITeachersTabBarProps) {
  return (
    <SegmentedTabBar
      tabs={tabs.map((tab) => ({
        id: tab.id,
        label: tab.label,
        shortLabel: tab.id === "male" ? "Male" : "Female",
        icon: TAB_ICONS[tab.iconId],
        count: tab.teachers.length,
      }))}
      activeTab={activeTab}
      onChange={onChange}
      ariaLabel="Teacher categories"
      layoutId="teachers-tab-indicator"
      panelIdPrefix="teachers-panel"
      maxWidthClass="max-w-2xl"
      columns={2}
    />
  );
}
