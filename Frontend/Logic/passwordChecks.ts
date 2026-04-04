export const passwordChecks = [
    { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
    { label: 'One uppercase letter (A-Z)', test: (p: string) => /[A-Z]/.test(p) },
    { label: 'One lowercase letter (a-z)', test: (p: string) => /[a-z]/.test(p) },
    { label: 'One number (0-9)', test: (p: string) => /\d/.test(p) },
    {
        label: 'One special character (@#$!%*?&)',
        test: (p: string) => /[@#$!%*?&]/.test(p),
    },
];