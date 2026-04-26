import { useEffect, useState } from "react";
import SettingsFooter from "./SettingsFooter";
import toast from "react-hot-toast";

export const ParsingSettings = () => {
    const [mode, setMode] = useState("Balanced");
  const [autoDetect, setAutoDetect] = useState(true);

  // 🔹 initial state (for change detection)
  const [initialState, setInitialState] = useState({
    mode: "Balanced",
    autoDetect: true,
  });

  // 🔹 Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("parsingSettings") || "{}");

    const initial = {
      mode: saved.mode || "Balanced",
      autoDetect:
        saved.autoDetect !== undefined ? saved.autoDetect : true,
    };

    setMode(initial.mode);
    setAutoDetect(initial.autoDetect);
    setInitialState(initial);
  }, []);

  // 🔹 detect changes
  const isChanged =
    mode !== initialState.mode ||
    autoDetect !== initialState.autoDetect;

  // 🔹 Save
  const handleSave = () => {
    const newData = { mode, autoDetect };

    localStorage.setItem("parsingSettings", JSON.stringify(newData));
    setInitialState(newData);

    toast.success("Parsing settings saved!");
  };

  // 🔹 Cancel
  const handleCancel = () => {
    setMode(initialState.mode);
    setAutoDetect(initialState.autoDetect);
  };

    return (
        <>
        <div className="flex flex-col h-full justify-between">
        <div>
            <h3 className="text-xl font-semibold mb-4">Parsing Settings</h3>

            <label className="block mb-3">
                <span className="text-gray-600 dark:text-gray-300">Parsing Mode</span>
                <select 
                 value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2">
                    <option>Fast</option>
                    <option>Balanced</option>
                    <option>Accurate</option>
                </select>
            </label>

            <label className="flex items-center gap-2 mt-4">
                <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={autoDetect}
                    onChange={(e) => setAutoDetect(e.target.checked)}
                />
                Enable auto-detection of document type
            </label>
        </div>
        {/* FOOTER */}
      <SettingsFooter
        onSave={handleSave}
        onCancel={handleCancel}
        disabled={!isChanged}
      />
        </div>
        </>
    );
};