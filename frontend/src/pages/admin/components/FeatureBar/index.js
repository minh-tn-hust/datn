import { useEffect, useState } from "react";

function FeatureButton({ title, onClickHandle, isSelected, ...props }) {
  const commonStyle = "h-10 relative ";
  const disableStyle = commonStyle + "bg-inherit text-[#979FB4] font-semibold";
  const enableStyle =
    commonStyle + "bg-slate-200 text-black font-semibold border";

  const [buttonClass, setButtonClass] = useState(disableStyle);

  useEffect(() => {
    if (isSelected) {
      setButtonClass((curClass) => enableStyle);
    } else {
      setButtonClass((curClass) => disableStyle);
    }
  }, [isSelected]);

  const handleClick = function () {
    if (typeof onClickHandle === "function") {
      onClickHandle();
    } else {
      console.error("FetureButton: onClickHandle is not a function");
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`w-full h-12 rounded-lg border border-slate-300 font-bold text-lg text-slate-800 drop-shadow hover:border-slate-400
        ${isSelected ? "bg-slate-300 border-slate-400" : "bg-slate-200"}`}
    >
      {title}
      {/* {isSelected ? (
        <div className={"absolute w-full h-2 top-0 left-0 z-50 bg-white"}></div>
      ) : (
        <></>
      )} */}
    </button>
  );
}

export default function FeatureBar({ listFeature, currentFeature, ...props }) {
  return (
    <div
      className={
        "w-2/12 h-full bg-slate-50 flex flex-col gap-2 items-center px-3 py-5 shadow-inner"
      }
    >
      {
        listFeature ? listFeature.map((feature, index) => {
          return (
            <FeatureButton
              key={"feature_key" + index}
              title={feature.title}
              isSelected={feature.enum === currentFeature}
              onClickHandle={feature.onClick}
            />
          );
        }) : <></>
      }
    </div>
  );
}
