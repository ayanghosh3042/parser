import Button from "../../../Design/Button";

interface Props {
  onSave: () => void;
  onCancel: () => void;
  disabled?: boolean;
  hasChanged?: boolean;
}

const SettingsFooter: React.FC<Props> = ({ onSave, onCancel, disabled = false, hasChanged }) => {
  return (
    <div className="flex justify-end gap-3 mt-28 mr-8">
      <Button
        variant="outline"
        onClick={onCancel}
        className="flex items-center gap-2 px-6 py-3 text-base rounded-xl cursor-pointer"
      >
        Cancel
      </Button>

      <Button
        onClick={onSave}
        disabled={disabled}
        className="flex items-center gap-2 px-6 py-3 text-base rounded-xl cursor-pointer"
      >
        Save
      </Button>
    </div>
  );
};

export default SettingsFooter;