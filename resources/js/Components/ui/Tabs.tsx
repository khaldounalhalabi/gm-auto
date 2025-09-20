"use client";
import {
    Tabs as ShadcnTabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/Components/ui/shadcn/tabs";
import React from "react";

const Tabs = ({
    tabs,
}: {
    tabs: {
        title: string;
        render: React.ReactNode | (() => React.ReactNode);
    }[];
}) => {
    return (
        <ShadcnTabs defaultValue={`tab_value_0_index`}>
            <TabsList className={`grid w-full grid-cols-${tabs.length}`}>
                {tabs.map((tab, index) => (
                    <TabsTrigger
                        key={index}
                        value={`tab_value_${index}_index`}
                        className={"cursor-pointer"}
                    >
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabs.map((tab, index) => (
                <TabsContent value={`tab_value_${index}_index`} key={index}>
                    {typeof tab.render == "function"
                        ? tab.render()
                        : tab.render}
                </TabsContent>
            ))}
        </ShadcnTabs>
    );
};

export default Tabs;
