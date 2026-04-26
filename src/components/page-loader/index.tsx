import type { FC } from "react";
import loadingSvg from "@/assets/loading.svg";
import { useTheme } from "@/hooks";

export const PageLoader: FC<{ className?: string }> = ({
  className = "h-screen w-screen",
}) => {
  const { theme } = useTheme();

  return (
    <div
      className={`${className} flex items-center justify-center overflow-hidden`}
    >
      <img
        src={loadingSvg}
        alt="loading"
        className="h-20 w-20"
        style={{ filter: theme === "light" ? "none" : "invert(1)" }}
      />
    </div>
  );
};
