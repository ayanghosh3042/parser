export default function ValidatePassword(password) {
    if (password.length < 6) {
        return "Should contain 6 characters.";
    }

    let count = 0;
    for (let i = 0; i < password.length; i++) {
        if (password[i] >= "0" && password[i] <= "9") count += 1;
    }

    return count >= 1 ? "" : "Should contain atleast 1 number";
}

export function Confirm(password, ConfirmPassword) {
    return password === ConfirmPassword ? true : false;
}
