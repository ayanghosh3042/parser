import React from "react";

interface HeaderSectionProps {
  pageTitle: string;
}

const HeaderSection = ({ pageTitle }: HeaderSectionProps) => {
  return (
    <div className="w-full bg-[#101828] px-6 py-4">
      <h1 className="text-2xl font-semibold text-white">
        {pageTitle}
      </h1>
    </div>
  );
};

export default HeaderSection;