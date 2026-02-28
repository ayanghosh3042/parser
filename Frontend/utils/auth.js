// Authentication utility functions

export const checkAuthStatus = async () => {
    try {
        const response = await fetch("http://localhost:3000/auth/profile", {
            method: "GET",
            credentials: "include", // Include cookies
        });

        if (response.ok) {
            const data = await response.json();
            return {
                isAuthenticated: true,
                user: data.user,
            };
        } else {
            return {
                isAuthenticated: false,
                user: null,
            };
        }
    } catch (error) {
        console.error("Error checking auth status:", error);
        return {
            isAuthenticated: false,
            user: null,
        };
    }
};

export const logout = async () => {
    try {
        await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
        });

        // Clear local storage
        localStorage.removeItem("userLoggedIn");
        localStorage.removeItem("userEmail");

        return { success: true };
    } catch (error) {
        console.error("Logout error:", error);
        return { success: false, error: error.message };
    }
};

export const registerUser = async (userData) => {
    try {
        const response = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(userData),
        });

        const data = await response.json();

        return {
            success: response.ok,
            data: data,
            status: response.status,
        };
    } catch (error) {
        console.error("Registration error:", error);
        return {
            success: false,
            error: error.message,
            status: 500,
        };
    }
};

export const loginUser = async (credentials) => {
    try {
        const response = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (response.ok) {
            // Store user info in localStorage
            localStorage.setItem("userLoggedIn", "true");
            localStorage.setItem("userEmail", credentials.email);
        }

        return {
            success: response.ok,
            data: data,
            status: response.status,
        };
    } catch (error) {
        console.error("Login error:", error);
        return {
            success: false,
            error: error.message,
            status: 500,
        };
    }
};
