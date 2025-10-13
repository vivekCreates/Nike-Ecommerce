"use client";

type SpinnerProps = {
  size?: number;
  color?: string;
};

export default function Spinner({ size = 8, color = "white" }: SpinnerProps) {
  const sizeClass = `w-${size} h-${size}`;
  return (
    <div className="flex items-center justify-center">
      <div
        className={`border-4 border-${color}-500 border-t-transparent border-b-transparent border-l-transparent rounded-full animate-spin ${sizeClass}`}
      ></div>
    </div>
  );
}
