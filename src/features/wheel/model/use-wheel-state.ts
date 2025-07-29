import { useWheelStore } from "@/shared/store/wheelStore";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export const useWheelState = () => {
  const data = useWheelStore((store) => store.items);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const size = 800;
  const [angle, setAngle] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const angleRef = useRef(angle);
  const spinningRef = useRef(spinning);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let animationFrame;

  useEffect(() => {
    angleRef.current = angle;
    draw();
  }, [angle]);

  useEffect(() => {
    spinningRef.current = spinning;
  }, [spinning]);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (!data) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = size;
    canvas.height = size;

    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2 - 10;
    ctx.clearRect(0, 0, size, size);

    const total = data.reduce((sum, item) => sum + item.price, 0);
    let startAngle = angleRef.current;
    console.log(data);

    // Draw sectors
    data.forEach((item) => {
      const sliceAngle = (item.price / total) * Math.PI * 2;
      const endAngle = startAngle + sliceAngle;

      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = item.color;
      ctx.fill();

      // Border between sectors
      ctx.strokeStyle = "#000";
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      const midAngle = (startAngle + endAngle) / 2;
      const textX = centerX + Math.cos(midAngle) * (radius * 0.75);
      const textY = centerY + Math.sin(midAngle) * (radius * 0.75);
      ctx.fillStyle = "#fff";
      ctx.font = "14px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(midAngle);
      ctx.fillText(item.title, 0, 0);
      ctx.restore();

      startAngle = endAngle;
    });
    const arrowWidth = 40;
    const arrowHeight = 50;
    const offsetY = centerY - radius - 20;
    ctx.beginPath();
    ctx.moveTo(centerX, offsetY + arrowHeight);
    ctx.lineTo(centerX - arrowWidth / 2, offsetY);
    ctx.lineTo(centerX + arrowWidth / 2, offsetY);
    ctx.closePath();
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 3;
    ctx.stroke();
  };
  const findWinnerIndex = (angle: number) => {
    if (!data) return -1;
    const total = data.reduce((sum, item) => sum + item.price, 0);
    let startAngle = 0;

    // Смещаем угол, чтобы учитывать стрелку сверху (на -π/2)
    const adjustedAngle = (angle + Math.PI / 2) % (2 * Math.PI);
    const normalizedAngle =
      (2 * Math.PI - adjustedAngle + 2 * Math.PI) % (2 * Math.PI);
    // Убедились, что результат всегда положительный

    for (let i = 0; i < data.length; i++) {
      const sliceAngle = (data[i].price / total) * 2 * Math.PI;
      if (
        normalizedAngle >= startAngle &&
        normalizedAngle < startAngle + sliceAngle
      ) {
        return i;
      }
      startAngle += sliceAngle;
    }

    return -1;
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const animate = () => {
    if (spinningRef.current) {
      setAngle((prev) => {
        const newAngle = prev + 0.05;
        angleRef.current = newAngle;
        return newAngle;
      });
      draw();

      animationFrame = requestAnimationFrame(animate);
    }
  };
  const handleRotate = (duration: number = 4000) => {
    if (spinningRef.current) return;
    console.log("123");
    setSpinning(true);

    const finalRotation = Math.random() * 2 * Math.PI + 10 * 2 * Math.PI;
    // 10 полных оборотов + случайный угол

    const startAngle = angleRef.current;

    const startTime = performance.now();

    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    const animateSpin = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      if (elapsed >= duration) {
        setAngle(finalRotation % (2 * Math.PI));
        angleRef.current = finalRotation % (2 * Math.PI);
        setSpinning(false);

        const winnerIndex = findWinnerIndex(finalRotation);
        console.log("Winner Index:", data?.[winnerIndex]);
        toast.success("Победитель: " + data?.[winnerIndex]?.title, {
          duration: 3000,
        });
        return;
      }

      const progress = elapsed / duration;
      const easedProgress = easeOutCubic(progress);
      const currentAngle =
        startAngle + (finalRotation - startAngle) * easedProgress;

      setAngle(currentAngle);
      angleRef.current = currentAngle;

      requestAnimationFrame(animateSpin);
    };

    requestAnimationFrame(animateSpin);
  };

  return {
    canvasRef,
    handleRotate,
  };
};
