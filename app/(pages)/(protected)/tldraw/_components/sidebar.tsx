import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { items } from "../constants"
import LogoutButton from "./logoutButton"
import SaveButton from "./saveButton"
import ToggleShapesEditableButton from "./ToggleShapesEditableButton"


export function AppSidebar() {

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Tldraw Editor</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {/* {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                <span>{item.title}</span>
                                </a>
                                </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))} */}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SaveButton />
                <ToggleShapesEditableButton />
                <LogoutButton />
            </SidebarFooter>
        </Sidebar>
    )
}