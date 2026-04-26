import { useEffect, useState } from "react";
import SettingsFooter from "./SettingsFooter";
import toast from "react-hot-toast";

export const AISettings = () => {
    const [model, setModel] = useState("Custom Model");
  const [threshold, setThreshold] = useState(70);

  // 🔹 initial state (for change detection)
  const [initialState, setInitialState] = useState({
    model: "Custom Model",
  });

  // 🔹 Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("aiSettings") || "{}");

    const initial = {
      model: saved.model || "Custom Model",
    };

    setModel(initial.model);
    setInitialState(initial);
  }, []);

  // 🔹 detect changes
  const isChanged =
    model !== initialState.model ;

  // 🔹 Save
  const handleSave = () => {
    const newData = { model, threshold };

    localStorage.setItem("aiSettings", JSON.stringify(newData));
    setInitialState(newData);

    toast.success("AI settings saved!");
  };

  // 🔹 Cancel
  const handleCancel = () => {
    setModel(initialState.model);
  };

    return (
        <>
        <div className="flex flex-col h-full justify-between">
            
        <div>
            <h3 className="text-xl font-semibold mb-4">AI Configuration</h3>

            <label className="block mb-3">
                <span className="text-gray-600 dark:text-gray-300">Model</span>
                <select 
                value={model}
            onChange={(e) => setModel(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2">
                    <option>GPT-based</option>
                    <option>Custom Model</option>
                </select>
            </label>
        {/* FOOTER */}
      <SettingsFooter
        onSave={handleSave}
        onCancel={handleCancel}
        disabled={!isChanged}
      /> 
        </div>
        </div></>
    );
};