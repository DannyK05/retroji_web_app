import { useRef, useEffect } from "react";
import BlazeSlider, { BlazeConfig } from "blaze-slider";
import "blaze-slider/dist/blaze.css";

export function useBlazeSlider(config: BlazeConfig, deps?: React.ReactNode) {
  const sliderRef = useRef(null);
  const elRef = useRef(null);

  useEffect(() => {
    if (!elRef.current) return;

    const slider = new BlazeSlider(elRef.current, config);
    sliderRef.current = slider;

    return () => {
      slider.destroy();
      sliderRef.current = null;
    };
  }, [config, deps]);

  return elRef;
}
