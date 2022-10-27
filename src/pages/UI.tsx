import { Component, createSignal } from "solid-js";

// components
import { StylizedButton } from "~components/ui/Button";
import { Tab } from "~components/ui/Tab";

const tabs = ["Statistics", "Returns", "High Rollers"];

const UI: Component = () => {
  const [currentTab, setCurrentTab] = createSignal(0, { equals: false });

  console.log(currentTab());

  return (
    <div class="flex flex-col gap-5 text-white p-5">
      {/* Buttons */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Buttons</span>

        <div class="flex gap-5">
          <StylizedButton color="green">Green Button</StylizedButton>
          <StylizedButton color="orange">Orange Button</StylizedButton>
          <StylizedButton color="orange" varaint="outline">
            Outline Button
          </StylizedButton>
          <StylizedButton color="green" disabled>
            Disabled Button
          </StylizedButton>
          <StylizedButton color="green" loading>
            Loading Button
          </StylizedButton>
          <StylizedButton color="orange" loading>
            Loading Button
          </StylizedButton>
          <StylizedButton color="orange" varaint="outline" loading>
            Loading Button
          </StylizedButton>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Tab</span>

        <Tab tabs={tabs} currentTab={currentTab} handleClick={setCurrentTab} />
      </div>
    </div>
  );
};

export default UI;
