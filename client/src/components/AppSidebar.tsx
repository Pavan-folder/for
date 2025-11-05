import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Home, Beaker, Users, FileText, MessageSquare, Heart, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";

interface AppSidebarProps {
  userRole: 'patient' | 'researcher';
}

export default function AppSidebar({ userRole }: AppSidebarProps) {
  const [location] = useLocation();

  const patientItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Clinical Trials", url: "/trials", icon: Beaker },
    { title: "Health Experts", url: "/experts", icon: Users },
    { title: "Publications", url: "/publications", icon: FileText },
    { title: "Forums", url: "/forums", icon: MessageSquare },
    { title: "Favorites", url: "/favorites", icon: Heart },
  ];

  const researcherItems = [
    { title: "Dashboard", url: "/dashboard", icon: Home },
    { title: "Clinical Trials", url: "/trials", icon: Beaker },
    { title: "Collaborators", url: "/collaborators", icon: Users },
    { title: "Publications", url: "/publications", icon: FileText },
    { title: "Forums", url: "/forums", icon: MessageSquare },
    { title: "Favorites", url: "/favorites", icon: Heart },
  ];

  const items = userRole === 'patient' ? patientItems : researcherItems;

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <h2 className="text-xl font-bold text-primary">CuraLink</h2>
        <p className="text-sm text-muted-foreground capitalize">{userRole} Portal</p>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={location === item.url}>
                    <Link href={item.url} data-testid={`link-${item.url.slice(1)}`}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings className="h-4 w-4" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
