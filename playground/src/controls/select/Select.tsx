import { FC, ReactNode } from "react";
import {
  Root,
  Trigger,
  Value,
  Icon,
  Portal,
  Content,
  ScrollDownButton,
  ScrollUpButton,
  Viewport,
  Item,
  ItemText,
  ItemIndicator,
  SelectProps,
} from "@radix-ui/react-select";
import { Root as Label } from "@radix-ui/react-label";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import "./Select.scss";

export const Select: FC<
  SelectProps & {
    options: { value: string; label: string }[];
    placeholder?: ReactNode;
    label?: string;
  }
> = ({ options, label, placeholder, ...rootProps }) => (
  <Label>
    {label}
    <Root {...rootProps}>
      <Trigger className="SelectTrigger" aria-label={label}>
        <Value placeholder={placeholder} />
        <Icon className="SelectIcon">
          <ChevronDownIcon />
        </Icon>
      </Trigger>
      <Portal>
        <Content className="SelectContent">
          <ScrollUpButton className="SelectScrollButton">
            <ChevronUpIcon />
          </ScrollUpButton>
          <Viewport className="SelectViewport">
            {options.map(({ value, label }) => (
              <Item className="SelectItem" value={value} key={value}>
                <ItemText>{label}</ItemText>
                <ItemIndicator className="SelectItemIndicator">
                  <CheckIcon />
                </ItemIndicator>
              </Item>
            ))}
          </Viewport>
          <ScrollDownButton className="SelectScrollButton">
            <ChevronDownIcon />
          </ScrollDownButton>
        </Content>
      </Portal>
    </Root>
  </Label>
);
