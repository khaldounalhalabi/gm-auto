import { type Icon, IconDashboard } from "@tabler/icons-react";

import {
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/Components/ui/shadcn/sidebar";
import { Link } from "@inertiajs/react";

import { ChevronRight } from "lucide-react";
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
} from "./ui/shadcn/collapsible";

export function NavMain({
    items,
}: {
    items: {
        title: string;
        href?: string;
        icon?: Icon;
        children?: {
            title: string;
            href?: string;
            icon?: Icon;
        }[];
    }[];
}) {
    const url = window.location.href;

    function isUrlActive(url: string) {
        const location = window.location.href;
        return location == url || location.startsWith(url);
    }
    return (
        <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
                <SidebarMenu>
                    <Link href={route("v1.web.protected.index")}>
                        <SidebarMenuItem className="flex items-center gap-2">
                            <SidebarMenuButton
                                tooltip="Dashboard"
                                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground active:bg-primary/90 active:text-primary-foreground min-w-8 duration-200 ease-linear"
                                isActive={url == route("v1.web.protected.index")}
                            >
                                <IconDashboard />
                                <span>Dashboard</span>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </Link>
                </SidebarMenu>
                <SidebarMenu>
                    {items.map((item, index) => {
                        if (item.children && item.children.length > 0) {
                            return (
                                <SidebarGroup
                                    className="px-0"
                                    key={item.title + index}
                                >
                                    <SidebarMenu>
                                        <Collapsible
                                            title={item.title}
                                            className="group/collapsible"
                                        >
                                            <SidebarMenuItem>
                                                <CollapsibleTrigger asChild>
                                                    <SidebarMenuButton>
                                                        {item.icon && (
                                                            <item.icon />
                                                        )}
                                                        {item.title}{" "}
                                                        <ChevronRight className="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                                                    </SidebarMenuButton>
                                                </CollapsibleTrigger>
                                            </SidebarMenuItem>
                                            <CollapsibleContent>
                                                <SidebarMenuSub>
                                                    {item.children.map(
                                                        (child, cidx) =>
                                                            child.href ? (
                                                                <SidebarMenuSubItem
                                                                    key={
                                                                        child.title +
                                                                        cidx
                                                                    }
                                                                >
                                                                    <SidebarMenuSubButton
                                                                        isActive={
                                                                            url ==
                                                                                child.href ||
                                                                            url.startsWith(
                                                                                child.href,
                                                                            )
                                                                        }
                                                                        asChild
                                                                    >
                                                                        <Link
                                                                            href={
                                                                                child.href
                                                                            }
                                                                        >
                                                                            {child.icon && (
                                                                                <child.icon />
                                                                            )}
                                                                            <span>
                                                                                {
                                                                                    child.title
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </SidebarMenuSubButton>
                                                                </SidebarMenuSubItem>
                                                            ) : null,
                                                    )}
                                                </SidebarMenuSub>
                                            </CollapsibleContent>
                                        </Collapsible>
                                    </SidebarMenu>
                                </SidebarGroup>
                            );
                        } else {
                            return item.href ? (
                                <Link href={item.href} key={item.title + index}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton
                                            tooltip={item.title}
                                            isActive={isUrlActive(item.href)}
                                        >
                                            {item.icon && <item.icon />}
                                            <span>{item.title}</span>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                </Link>
                            ) : null;
                        }
                    })}
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
    );
}
