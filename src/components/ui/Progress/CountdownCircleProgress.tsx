import { createEffect, createSignal, onCleanup, onMount } from "solid-js";

type CountdownCircleProgressVariantType = "orange" | "green";
type CountdownCircleProgressSizeType = "md" | "lg";

interface CountdownCircleProgressProps {
  timer: number;
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
    text: "20px Arial",
  },
  lg: {
    lineWidth: 8,
    radius: 50,
    width: 160,
    height: 160,
    text: "30px Arial",
  },
};

const CountdownCircleProgress = (props: CountdownCircleProgressProps) => {
  const { timer, variant, size } = props;
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();

  onMount(() => {
    const canvas = canvasRef();
    const ctx = canvas?.getContext("2d");

    const scale = window?.devicePixelRatio;

    if (canvas) {
      canvas.width = canvas?.width * scale;
      canvas.height = canvas?.height * scale;
    }

    ctx?.scale(scale, scale);

    const width = canvas?.width || 0;
    const height = canvas?.height || 0;

    const posX = width / 2;
    const posY = height / 2;

    if (ctx) {
      ctx.lineCap = "round";
    }

    let degree = 360;

    const date = new Date();
    let startTimestamp = date.getTime();
    let endTimestamp = timer * 1000;
    let diff = endTimestamp - startTimestamp;

    let current_timestamp;

    let frame: number;

    const arcMove = () => {
      current_timestamp = new Date().getTime();

      if (ctx) {
        degree =
          ((360 * (endTimestamp - startTimestamp)) /
            (1000 * (variant === "orange" ? 90 : 10))) *
          ((endTimestamp - current_timestamp) / diff);
        ctx.clearRect(0, 0, width, height);
        const timingCountText = Math.ceil(
          (endTimestamp - current_timestamp) / 1000
        ).toString();
        ctx.font = sizes[size].text;
        ctx.fillStyle = variants[variant].stroke[200];
        ctx.textAlign = "center";
        ctx.fillText(timingCountText, posX, posY + 7);

        ctx.beginPath();
        ctx.arc(
          posX,
          posY,
          sizes[size].radius,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + 360),
          false
        );
        ctx.strokeStyle = variants[variant].stroke[100];
        ctx.lineWidth = sizes[size].lineWidth;
        ctx.stroke();

        ctx.beginPath();
        ctx.strokeStyle = variants[variant].stroke[200];
        ctx.lineWidth = sizes[size].lineWidth;
        ctx.arc(
          posX,
          posY,
          sizes[size].radius,
          (Math.PI / 180) * 270,
          (Math.PI / 180) * (270 + degree),
          false
        );
        ctx.stroke();
      }

      frame = requestAnimationFrame(arcMove);

      if (current_timestamp > endTimestamp) {
        cancelAnimationFrame(frame);
      }
    };

    frame = requestAnimationFrame(arcMove);

    onCleanup(() => cancelAnimationFrame(frame));
  });

  return (
    <div
      class="relative"
      classList={{
        "w-15 h-15": size === "md",
        "w-40 h-40": size === "lg",
      }}
    >
      <canvas
        ref={(ele) => setCanvasRef(ele)}
        id="canvas"
        width={sizes[size].width}
        height={sizes[size].height}
      ></canvas>
    </div>
  );
};

export default CountdownCircleProgress;
