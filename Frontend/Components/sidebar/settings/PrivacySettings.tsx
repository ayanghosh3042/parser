import { useState } from "react";
import SettingsFooter from "./SettingsFooter";
import toast from "react-hot-toast";

export const PrivacySettings = () => {
    // 🔹 Default values
    const defaultValues = {
        autoDelete: false,
        encryption: true,
    };

    const [settings, setSettings] = useState(defaultValues);

    // 🔹 Check if changed
    const hasChanged =
        settings.autoDelete !== defaultValues.autoDelete ||
        settings.encryption !== defaultValues.encryption;

    // 🔹 Handlers
    const handleSave = () => {
        localStorage.setItem("privacySettings", JSON.stringify(settings));
        toast.success("Privacy Settings saved!");
    };

    const handleCancel = () => {
        setSettings(defaultValues);
        toast("Changes discarded");
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Privacy & Security</h3>

            <label className="flex items-center gap-2 mb-3">
                <input type="checkbox"
                checked={settings.autoDelete}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            autoDelete: e.target.checked,
                        })
                    }
                    className="w-4 h-4 accent-indigo-600" />
                Auto-delete uploaded files after parsing
            </label>

            <label className="flex items-center gap-3">
                <input type="checkbox"
                checked={settings.encryption}
                    onChange={(e) =>
                        setSettings({
                            ...settings,
                            encryption: e.target.checked,
                        })
                    }
                    className="w-4 h-4 accent-indigo-600" />
                Enable data encryption
            </label>

            {/* 🔹 Footer */}
            <SettingsFooter
                onSave={handleSave}
                onCancel={handleCancel}
                hasChanged={hasChanged}
            />
            
        </div>
    );
};