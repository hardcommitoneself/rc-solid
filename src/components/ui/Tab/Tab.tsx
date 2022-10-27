import { Accessor, createEffect, Setter } from "solid-js";
import { createSignal } from "solid-js";

interface TabProps {
  tabs: string[];
  currentTab: Accessor<number>;
  handleClick: (index: number) => Setter<number>;
}

const Tab = (props: TabProps) => {
  const { tabs, currentTab, handleClick } = props;
  const [refs, setRefs] = createSignal<HTMLAnchorElement[]>([]);
  const [underlineWidth, setUnderlineWidth] = createSignal(0);
  const [underlineLeft, setUnderlineLeft] = createSignal(0);

  createEffect(() => {
    const setTabPosition = () => {
      const currentTab = refs()[props.currentTab()];
      setUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
    window.addEventListener("resize", setTabPosition);

    return () => window.removeEventListener("resize", setTabPosition);
  }, [props.currentTab()]);

  return (
    <div class="relative">
      {/* tab list */}
      <div class="flex items-center gap-3">
        {tabs.map((tab, index) => (
          <a
            ref={(el) => setRefs((refs) => [...refs, el])}
            class={`p-3 cursor-pointer transition font-medium select-none duration-100 ${
              currentTab() === index
                ? "text-secondary"
                : "text-white hover:text-white/50"
            }`}
            onClick={() => handleClick(index)}
          >
            {tab}
          </a>
        ))}
      </div>

      {/* tab slider */}
      <span
        class="absolute bottom-0 block h-[2px] bg-secondary transition-all duration-500"
        style={{ left: underlineLeft() + "px", width: underlineWidth() + "px" }}
      />
    </div>
  );
};

export default Tab;
