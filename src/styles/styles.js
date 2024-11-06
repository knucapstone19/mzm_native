const styleObj = {
  "40-title":
    "font-korean font-bold text-[40px] tracking-[-0.8px] leading-[48px]",
  "24-title":
    "font-korean font-bold text-2xl tracking-[-0.48px] leading-[28.8px]",
  "bold-20-title":
    "font-korean font-bold text-xl tracking-[-0.4px] leading-[24px]",
  "18-title":
    "font-korean font-bold text-lg tracking-[0.36px] leading-[21.6px]",
  "16-title":
    "font-korean font-bold text-base tracking-normal leading-[22.4px]",
  "14-title":
    "font-korean font-bold text-sm tracking-[-0.28px] leading-[19.6px]",
  "16-text":
    "font-korean font-normal text-base tracking-normal leading-[22.4px]",
  "14-text":
    "font-korean font-normal text-sm tracking-[0.28px] leading-[19.6px]",
  "12-text":
    "font-korean font-normal text-xs tracking-[0.24px] leading-[16.8px]",
  main: "font-main font-normal text-lg tracking-[-0.36px] leading-[21.6px]",
  number: "font-number font-normal text-sm tracking-[0.28px] leading-[19.6px]",
};

const styles = (style) => {
  return styleObj[style] ?? null;
};

export default styles;
