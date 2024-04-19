export type SidebarNestedItem = {
  title: string;
  icon: any;
  route: string;
};

export type SidebarItem = {
  title: string;
  items?: SidebarNestedItem[];
};
