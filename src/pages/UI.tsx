import { Component, createSignal } from "solid-js";

// components
import { StylizedButton } from "~components/ui/Button";
import { Tab } from "~components/ui/Tab";
import { Input } from "~components/ui/Input";
import { Coin } from "../components/util/svg";
import { CountdownCircleProgress } from "~components/ui/Progress";

const tabs = ["Statistics", "Returns", "High Rollers"];

const UI: Component = () => {
  const [currentTab, setCurrentTab] = createSignal(0, { equals: false });

  return (
    <div class="flex flex-col gap-5 text-white p-5">
      {/* Buttons */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Buttons</span>

        <div class="flex gap-5">
          <StylizedButton colorScheme="green">Green Button</StylizedButton>
          <StylizedButton colorScheme="orange">Orange Button</StylizedButton>
          <StylizedButton colorScheme="orange" variant="outline">
            Outline Button
          </StylizedButton>
          <StylizedButton colorScheme="green" disabled>
            Disabled Button
          </StylizedButton>
          <StylizedButton colorScheme="green" loading>
            Loading Button
          </StylizedButton>
          <StylizedButton colorScheme="orange" loading>
            Loading Button
          </StylizedButton>
          <StylizedButton colorScheme="orange" variant="outline" loading>
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

      {/* Circle Progress */}
      <div class="flex flex-col gap-5">
        <span class="text-xl font-medium">Circle Count down progress bar</span>
        <div class="flex items-center gap-5">
          <CountdownCircleProgress size="md" duration={10} variant="orange" />
          <CountdownCircleProgress size="lg" duration={20} variant="orange" />
          <CountdownCircleProgress size="md" duration={10} variant="green" />
          <CountdownCircleProgress size="lg" duration={40} variant="green" />
        </div>
      </div>
    </div>
  );
};

export default UI;
