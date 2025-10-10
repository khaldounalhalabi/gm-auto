import { NavMain } from "@/Components/nav-main";
import { NavUser } from "@/Components/nav-user";
import {
    Sidebar as ShadcnSidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/Components/ui/shadcn/sidebar";
import { MiddlewareProps } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { type Icon, IconBrand4chan } from "@tabler/icons-react";
import { CalendarArrowDown, CalendarIcon, Car, CarFront, UserIcon } from "lucide-react";
import React from "react";

export function Sidebar({
    ...props
}: React.ComponentProps<typeof ShadcnSidebar>) {
    const sidebarItems: {
        title: string;
        href?: string;
        icon?: Icon;
        children?: {
            title: string;
            href?: string;
            icon?: Icon;
        }[];
    }[] = [
        {
            title: "Clients",
            href: route("v1.web.protected.clients.index"),
            icon: () => <UserIcon />,
        },
        {
            title: "Cars Brands",
            href: route("v1.web.protected.car.brands.index"),
            icon: () => <IconBrand4chan />,
        },
        {
            title: "Cars",
            href: route("v1.web.protected.cars.index"),
            icon: () => <CarFront />,
        },
        {
            title: "Visits",
            href: route("v1.web.protected.visits.index"),
            icon: () => <CalendarIcon />,
        },
        {
            title: "Annual Scans (MOT's)",
            href: route("v1.web.protected.annual.scans.index"),
            icon: () => <CalendarArrowDown />,
        },
    ];

    const { authUser } = usePage<MiddlewareProps>().props;
    return (
        <ShadcnSidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton
                            asChild
                            className="data-[slot=sidebar-menu-button]:!p-1.5"
                        >
                            <Link href={route("v1.web.protected.index")}>
                                <Car className="!size-6" />
                                <span className="text-base font-semibold">
                                    GM Auto
                                </span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={sidebarItems} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={authUser} />
            </SidebarFooter>
        </ShadcnSidebar>
    );
}
