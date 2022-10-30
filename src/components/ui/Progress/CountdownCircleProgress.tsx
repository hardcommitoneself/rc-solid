import { createEffect, createSignal } from "solid-js";

type CountdownCircleProgressVariantType = "green" | "orange";
type CountdownCircleProgressSizeType = "md" | "lg";

interface CountdownCircleProgressProps {
  duration: number;
  variant: CountdownCircleProgressVariantType;
  size: CountdownCircleProgressSizeType;
}

const variants = {
  orange: {
    stroke: {
      100: "#ea580c",
      200: "#dc2626",
    },
    textColor: "text-orange-700",
  },
  green: {
    stroke: {
      100: "#3f6212",
      200: "#65a30d",
    },
    textColor: "text-green-700",
  },
};

const sizes = {
  md: {
    lineWidth: 4,
    radius: 20,
    width: 60,
    height: 60,
    text: "text-sm",
    wrapper: "w-[60px] h-[60px]",
  },
  lg: {
    lineWidth: 8,
    radius: 50,
    width: 140,
    height: 140,
    text: "!text-2xl !text-white font-bold",
    wrapper: "w-[140px] h-[140px]",
  },
};

const CountdownCircleProgress = (props: CountdownCircleProgressProps) => {
  const { duration, variant, size } = props;
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const [percentRef, setPercentRef] = createSignal<HTMLSpanElement>();

  createEffect(() => {
    const c = canvasRef()?.getContext("2d");
    const p = percentRef();

    const width = canvasRef()?.width || 0;
    const height = canvasRef()?.height || 0;

    const posX = width / 2;
    const posY = height / 2;
    const fps = 5;

    if (c) {
      c.lineCap = "round";
    }

    const arcMove = () => {
      let degree = 360;
      let arcInterval = -1;
      let time = (duration * 1000) / fps;
      arcInterval = setInterval(() => {
        degree -= 360 / ((duration * 1000) / fps);
        c?.clearRect(0, 0, width, height);
        if (p) {
          p.innerHTML = Math.ceil(time / 200).toString();
        }
        time--;

        if (c) {
          c.beginPath();
          c.arc(
            posX,
            posY,
            sizes[size].radius,
            (Math.PI / 180) * 270,
            (Math.PI / 180) * (270 + 360),
            false
          );
          c.strokeStyle = variants[variant].stroke[100];
          c.lineWidth = sizes[size].lineWidth;
          c.stroke();

          c.beginPath();
          c.strokeStyle = variants[variant].stroke[200];
          c.lineWidth = sizes[size].lineWidth;
          c.arc(
            posX,
            posY,
            sizes[size].radius,
            (Math.PI / 180) * 270,
            (Math.PI / 180) * (270 + degree),
            false
          );
          c.stroke();
          if (time == 0) {
            clearInterval(arcInterval);
            if (p) p.innerHTML = "";
          }
        }
      }, fps);
    };

    arcMove();
  });

  return (
    <div class="relative" classList={{ [sizes[size].wrapper]: true }}>
      <canvas
        ref={(ele) => setCanvasRef(ele)}
        id="canvas"
        width={sizes[size].width}
        height={sizes[size].height}
      ></canvas>
      <span
        ref={(ele) => setPercentRef(ele)}
        id="percent"
        class="block absolute left-1/2 top-1/2 leading-3 -translate-x-1/2 -translate-y-1/2"
        classList={{
          [variants[variant].textColor]: true,
          [sizes[size].text]: true,
        }}
      ></span>
    </div>
  );
};

export default CountdownCircleProgress;
