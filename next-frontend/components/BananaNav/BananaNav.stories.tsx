import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";

import BananaNav from "./BananaNav";

export default {
  title: "Components/BananaNav",
  component: BananaNav,
} as ComponentMeta<typeof BananaNav>;

const Template: ComponentStory<typeof BananaNav> = (args) => (
  // <div style={{ maxWidth: 200 }}>
  <BananaNav {...args} />
  // </div>
);

export const Default = Template.bind({});
