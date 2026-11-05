export function signup(name, email, password, role = "user") {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const existingUser = users.find(
        (user) => user.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
        return {
            success: false,
            message: "Email already registered"
        };
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        password,
        role
    };

    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
}

export function login(email, password, selectedRole) {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        (u) =>
            u.email.toLowerCase() === email.toLowerCase() &&
            u.password === password &&
            u.role === selectedRole
    );

    if (!user) {
        return {
            success: false,
            message: "Invalid email, password or account type"
        };
    }

    localStorage.setItem("currentUser", JSON.stringify(user));

    return {
        success: true,
        user
    };
}

export function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser")) || null;
}

export function logout() {
    localStorage.removeItem("currentUser");
}