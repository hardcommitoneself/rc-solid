import { Component } from "solid-js";

// components
import { StylizedButton } from "~components/ui/Button";

const UI: Component = () => {
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
    </div>
  );
};

export default UI;
