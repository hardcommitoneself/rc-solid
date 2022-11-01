import {
  StylizedButton,
  ColorSchemeType,
  VariantType,
} from "~components/ui/Button";
import { Setting } from "~components/util/svg";

const Actions = () => {
  return (
    <div class="flex items-center gap-2.5">
      <StylizedButton
        colorScheme={ColorSchemeType.orange}
        variant={VariantType.outline}
      >
        History
      </StylizedButton>
      <StylizedButton colorScheme={ColorSchemeType.green}>
        CREATE A COINFLIP
      </StylizedButton>

      {/* setting icon button */}
      <div class="w-6 h-6 cursor-pointer transition text-site-300 hover:text-site-340">
        <Setting />
      </div>
    </div>
  );
};

export default Actions;
