export type SidebarNestedItem = {
  title: string;
  icon: any;
  route: string;
  routeParams?: Record<string, any>;
  noHighlight?: boolean;
};

export type SidebarItem = {
  title: string;
  items?: SidebarNestedItem[];
};
