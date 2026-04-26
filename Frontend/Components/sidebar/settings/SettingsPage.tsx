import React, { JSX, useState } from "react";
import { AISettings} from "./AISettings"; 
import { AppearanceSettings } from "./AppearanceSettings";
import { FileSettings } from "./FileSettings";
import { OutputSettings } from "./OutputSettings";
import { ParsingSettings } from "./ParsingSettings";
import { PrivacySettings } from "./PrivacySettings";
import {
  Settings as SettingsIcon,
  Database,
  Brain,
  Bell,
  Palette,
  HardDrive,
} from "lucide-react";

interface Option {
  title: string;
  icon: any;
  component: JSX.Element;
}

const options: Option[] = [
  { title: "File Handling", icon: Database, component: <FileSettings /> },
  { title: "Parsing Options", icon: SettingsIcon, component: <ParsingSettings /> },
  { title: "AI Configuration", icon: Brain, component: <AISettings /> },
  { title: "Output Settings", icon: HardDrive, component: <OutputSettings /> },
  { title: "Theme & Appearance", icon: Palette, component: <AppearanceSettings /> },
  { title: "Privacy & Security", icon: Bell, component: <PrivacySettings /> },
];

const Settings = () => {
  const [selected, setSelected] = useState(options[0]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 transition-colors duration-300">

      {/* 🔹 SIDEBAR */}
      <div className="w-72 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg shadow-xl p-4 rounded-r-3xl border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-100 mt-16 flex items-center gap-2">
          ⚙️ Settings
        </h2>

        <div className="space-y-2">
          {options.map((opt) => {
            const Icon = opt.icon;
            const isActive = selected.title === opt.title;

            return (
              <div
                key={opt.title}
                onClick={() => setSelected(opt)}
                className={`relative flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 group
                ${
                  isActive
                    ? "bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg scale-[1.02]"
                    : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:scale-[1.02]"
                }`}
              >
                {/* Active left indicator */}
                {isActive && (
                  <div className="absolute left-0 top-0 h-full w-1 bg-white dark:bg-gray-900 rounded-r"></div>
                )}

                <Icon size={20} className={`${isActive ? "text-white" : "group-hover:text-indigo-500"}`} />
                <span className="font-medium">{opt.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🔹 CONTENT */}
      <div className="flex-1 p-8">
        <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-6 min-h-[500px] border border-gray-200 dark:border-gray-700 transition-all duration-300">

          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-xl shadow-md">
              <SettingsIcon className="text-white" />
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
              {selected.title}
            </h2>
          </div>

          {/* Divider */}
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-300 to-transparent mb-6"></div>

          {/* Content with fade animation */}
          <div className="text-gray-600 dark:text-gray-300 animate-fadeIn">
            {selected.component}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;