import { FC, ReactNode } from "react";
import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import "./Tabs.scss";

export const Tabs: FC<{
  tabs: { trigger: ReactNode; content: ReactNode }[];
  initialTab?: number;
  label?: string;
}> = ({ tabs, initialTab = 0, label }) => {
  return (
    <Root className="TabsRoot" defaultValue={initialTab.toString()}>
      <List className="TabsList" aria-label={label}>
        {tabs.map((tab, index) => (
          <Trigger
            className="TabsTrigger"
            value={index.toString()}
            key={index}
            children={tab.trigger}
          />
        ))}
      </List>
      {tabs.map((tab, index) => (
        <Content
          className="TabsContent"
          value={index.toString()}
          key={index}
          children={tab.content}
        />
      ))}
    </Root>
  );
};
