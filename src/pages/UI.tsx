import { Component, createSignal } from "solid-js";

// components
import { StylizedButton } from "~components/ui/Button";
import { Tab } from "~components/ui/Tab";
import { Input } from "~components/ui/Input";
import { Coin } from "../components/util/svg";

const tabs = ["Statistics", "Returns", "High Rollers"];

const UI: Component = () => {
  const [currentTab, setCurrentTab] = createSignal(0, { equals: false });

  return (
    <div class="flex flex-col gap-5 text-white p-5">
      {/* Buttons */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Buttons</span>

        <div class="flex gap-5">
          <StylizedButton color="green">Green Button</StylizedButton>
          <StylizedButton color="orange">Orange Button</StylizedButton>
          <StylizedButton color="orange" variant="outline">
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
          <StylizedButton color="orange" variant="outline" loading>
            Loading Button
          </StylizedButton>
        </div>
      </div>

      {/* Tabs */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Tab</span>

        <Tab tabs={tabs} currentTab={currentTab} handleClick={setCurrentTab} />
      </div>

      {/* Input */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Inputs</span>

        <div class="grid grid-cols-3 gap-5">
          <Input leftEle="@" placeholder="Input with character" />

          <Input leftEle={Coin} placeholder="Input with icon" />

          <Input leftEle="@" placeholder="Input with error" isError />

          <Input
            leftEle={Coin}
            label="label"
            placeholder="Input with label"
            isError
          />
        </div>
      </div>
    </div>
  );
};

export default UI;
