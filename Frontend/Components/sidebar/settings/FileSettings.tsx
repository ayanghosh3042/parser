import { useEffect, useState } from "react";
import SettingsFooter from "./SettingsFooter";
import toast from "react-hot-toast";

export const FileSettings = () => {
    const [maxSize, setMaxSize] = useState(10);
    const [allowMultiple, setAllowMultiple] = useState(false);

    // 🔹 store original values
  const [initialState, setInitialState] = useState({
    maxSize: 10,
    allowMultiple: false,
  });

  // 🔹 Load from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("fileSettings") || "{}");

    const initial = {
      maxSize: saved.maxSize || 10,
      allowMultiple: saved.allowMultiple || false,
    };

    setMaxSize(initial.maxSize);
    setAllowMultiple(initial.allowMultiple);
    setInitialState(initial);
  }, []);

  // 🔹 Check if changed
  const isChanged =
    maxSize !== initialState.maxSize ||
    allowMultiple !== initialState.allowMultiple;

  const handleSave = () => {
    const newData = { maxSize, allowMultiple };

    localStorage.setItem("fileSettings", JSON.stringify(newData));
    setInitialState(newData); // update baseline

    toast.success("File Handling Settings saved!");
  };

  const handleCancel = () => {
    setMaxSize(initialState.maxSize);
    setAllowMultiple(initialState.allowMultiple);
  };


    return (
        <>
        <div>
            <h3 className="text-xl font-semibold mb-4">File Handling</h3>

            {/* Max File Size */}
            <label className="block mb-4">
                <span className="text-gray-600 dark:text-gray-300">
                    Max File Size (MB)
                </span>
                <input
                    type="number"
                    value={maxSize}
                    onChange={(e) => setMaxSize(Number(e.target.value))}
                    className="mt-1 w-full border rounded-lg p-2 bg-white dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                />
            </label>

            {/* Multiple Upload */}
            <label className="flex items-center gap-2 mt-4 text-gray-700 dark:text-gray-300">
                <input
                    type="checkbox"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                />
                Allow multiple file uploads
            </label>
        </div>
        <SettingsFooter onCancel={handleCancel} onSave={handleSave} disabled={!isChanged} />
    </>
    );
};