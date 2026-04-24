import React from "react";
import toast from "react-hot-toast";
import { Copy, Download } from "lucide-react";
import Button from "../../Design/Button";

const ActionButtons = ({ data, id }: { data: any; id: string }) => {
    const downloadJSON = () => {
        const blob = new Blob([JSON.stringify(data, null, 2)], {
            type: "application/json",
        });
        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = `parsed-${id}.json`;
        a.click();
        toast.success("Downloaded successfully!")
    };

    const copyJSON = async () => {
    const text = JSON.stringify(data, null, 2);

    try {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard!");
    } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement("textarea");
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);

        toast.success("✅ Copied (fallback)!");
    }
};

    return (
        <div className="flex gap-3 mb-4">
            <Button
                variant="outline"
                onClick={copyJSON}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Copy size={16} className="opacity-80 shrink-0" />
                Copy
            </Button>

            <Button
                onClick={downloadJSON}
                className="flex items-center gap-2 cursor-pointer"
            >
                <Download size={16} />
                Download
            </Button>
        </div>
    );
};

export default ActionButtons;