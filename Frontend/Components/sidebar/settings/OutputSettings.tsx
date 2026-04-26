import { useEffect, useState } from "react";
import SettingsFooter from "./SettingsFooter";
import toast from "react-hot-toast";

export const OutputSettings = () => {
    const [format, setFormat] = useState("JSON");
  const [prettyPrint, setPrettyPrint] = useState(false);

  // 🔹 store initial values
  const [initialState, setInitialState] = useState({
    format: "JSON",
    prettyPrint: false,
  });

  // 🔹 Load saved settings
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("outputSettings") || "{}");

    const initial = {
      format: saved.format || "JSON",
      prettyPrint: saved.prettyPrint || false,
    };

    setFormat(initial.format);
    setPrettyPrint(initial.prettyPrint);
    setInitialState(initial);
  }, []);

  // 🔹 detect changes
  const isChanged =
    format !== initialState.format ||
    prettyPrint !== initialState.prettyPrint;

  // 🔹 Save
  const handleSave = () => {
    const newData = { format, prettyPrint };

    localStorage.setItem("outputSettings", JSON.stringify(newData));
    setInitialState(newData);

    toast.success("Output settings saved!");
  };

  // 🔹 Cancel
  const handleCancel = () => {
    setFormat(initialState.format);
    setPrettyPrint(initialState.prettyPrint);
  };

    return (
        <>
         <div className="flex flex-col h-full justify-between">
        <div>
            <h3 className="text-xl font-semibold mb-4">Output Format</h3>

            <label className="block mb-3">
                <span className="text-gray-600 dark:text-gray-300">Default Format</span>
                <select 
                value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="mt-1 w-full border rounded-lg p-2 dark:bg-gray-800 dark:border-gray-600">
                    <option>JSON</option>
                    <option>CSV</option>
                    <option>XML</option>
                </select>
            </label>

            <label className="flex items-center gap-2 mt-4">
                <input 
                    type="checkbox" 
                    className="w-4 h-4"
                    checked={prettyPrint}
                    onChange={(e) => setPrettyPrint(e.target.checked)}
                />
                Pretty print output
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