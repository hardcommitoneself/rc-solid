import { createEffect, createSignal, onMount } from "solid-js";

export enum CountdownCircleProgressVariantType {
  green,
  orange,
}
export enum CountdownCircleProgressSizeType {
  md,
  lg,
}

interface CountdownCircleProgressProps {
  duration: number;
  variant: CountdownCircleProgressVariantType;
  size: CountdownCircleProgressSizeType;
}

const variants = {
  [CountdownCircleProgressVariantType.orange]: {
    stroke: {
      100: "#ea580c",
      200: "#dc2626",
    },
    textColor: "text-orange-700",
  },
  [CountdownCircleProgressVariantType.green]: {
    stroke: {
      100: "#3f6212",
      200: "#65a30d",
    },
    textColor: "text-green-700",
  },
};

const sizes = {
  [CountdownCircleProgressSizeType.md]: {
    lineWidth: 4,
    radius: 20,
    width: 60,
    height: 60,
    text: "20px Arial",
  },
  [CountdownCircleProgressSizeType.lg]: {
    lineWidth: 8,
    radius: 50,
    width: 144,
    height: 144,
    text: "30px Arial",
  },
};

const CountdownCircleProgress = (props: CountdownCircleProgressProps) => {
  const { duration, variant, size } = props;
  const [canvasRef, setCanvasRef] = createSignal<HTMLCanvasElement>();
  const [percentRef, setPercentRef] = createSignal<HTMLSpanElement>();

  onMount(() => {
    const canvas = canvasRef();
    const c = canvas?.getContext("2d");
    const p = percentRef();
    let globalId = -1;

    const scale = window?.devicePixelRatio;

    if (canvas) {
      canvas.width = canvas?.width * scale;
      canvas.height = canvas?.height * scale;
    }

    c?.scale(scale, scale);

    console.log(scale, canvas?.width, canvas?.height);

    const width = canvas?.width || 0;
    const height = canvas?.height || 0;

    const posX = width / 2;
    const posY = height / 2;
    const fps = 60;

    if (c) {
      c.lineCap = "round";
    }

    let degree = 360;
    let time = 0;
    let isEnd = false;

    setTimeout(() => (isEnd = true), duration * 1000);

    const arcMove = () => {
      console.log("arc");
      !isEnd && requestAnimationFrame(arcMove);
      if (c) {
        degree -= 360 / (duration * fps);
        c.clearRect(0, 0, width, height);
        const timingCountText = Math.ceil(duration - time / 60).toString();
        c.font = sizes[size].text;
        c.fillStyle = variants[variant].stroke[200];
        c.textAlign = "center";
        c.fillText(timingCountText, posX, posY + 7);
        time++;

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
      }
    };

    arcMove();
  });

  return (
    <div
      class="relative"
      classList={{
        "w-15 h-15": size === CountdownCircleProgressSizeType.md,
        "w-36 h-36": size === CountdownCircleProgressSizeType.lg,
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
