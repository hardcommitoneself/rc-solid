import { createSignal } from "solid-js";

type StatsDataType = {
  totalValue: number;
  joinableGames: number;
  myValue: number;
};

interface StatusCardProps {
  label: string;
  value: number;
  unit: string;
}

const Status = () => {
  const [stats, setStats] = createSignal<StatsDataType>({
    totalValue: 1094.2,
    joinableGames: 3,
    myValue: 0,
  });

  return (
    <div class="flex gap-3 md:gap-10">
      <StatusCard label="Total Value" value={stats().totalValue} unit="$" />
      <StatusCard
        label="Joinable Games"
        value={stats().joinableGames}
        unit=""
      />
      <StatusCard label="Your Value" value={stats().myValue} unit="$" />
    </div>
  );
};

const StatusCard = (props: StatusCardProps) => {
  const { label, value, unit } = props;

  return (
    <div class="flex items-center justify-center flex-col">
      <span class="text-site-390 uppercase text-xs">{label}</span>
      <span class="text-lg leading-loose font-medium">{unit + "" + value}</span>
    </div>
  );
};

export default Status;
