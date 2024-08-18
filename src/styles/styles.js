const styleObj = {
  "bold-20-title":
    "font-korean font-bold text-xl leading-[24px] tracking-[-0.4px]",
  "18-title":
    "font-korean font-bold text-lg leading-[21.6px] tracking-[0.36px]",
  "16-title":
    "font-korean font-bold text-base leading-[22.4px] tracking-normal",
  "14-title":
    "font-korean font-bold text-sm leading-[19.6px] tracking-[-0.28px]",
  "16-text":
    "font-korean font-normal text-base leading-[22.4px] tracking-normal",
  "14-text":
    "font-korean font-normal text-sm leading-[19.6px] tracking-[0.28px]",
  "12-text":
    "font-korean font-normal text-xs leading-[16.8px] tracking-[0.24px]",
  main: "font-main font-normal text-lg leading-[21.6px] tracking-[-0.36px]",
};

const styles = (style) => {
  return styleObj[style] ?? null;
};

export default styles;
