import { passwordChecks } from "../Logic/passwordChecks";

interface Props {
  password: string;
  setPassword: (val: string) => void;
  showPassword: boolean;
  setShowPassword: (val: boolean) => void;
  onChange: (e: any) => void;
  allValid: boolean;
}

const PasswordField = ({
  password,
  setPassword,
  showPassword,
  setShowPassword,
  onChange,
  allValid
}: Props) => {
  return (
    <div className="space-y-1">
      <label className="text-slate-700 text-sm font-medium">
        Password*
      </label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter Password"
          className="w-full h-10 rounded-md px-3 border border-gray-300"
          onChange={(e) => {
            setPassword(e.target.value);
            onChange(e);
          }}
        />

        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500"
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      {!allValid && (
        <div className="border border-[0.5px] mt-2 p-4 border-red-300 bg-red-50 rounded-md text-sm shadow-inner space-y-1">
          <p>Your password must meet the following requirement(s):</p>

          <ul className="space-y-1">
            {passwordChecks.map((rule, index) => (
              <li key={index} className="flex gap-2">
                {rule.test(password) ? (
                  <span className="text-green-600">✅</span>
                ) : (
                  <span className="text-red-500">❌</span>
                )}
                <span>{rule.label}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PasswordField;