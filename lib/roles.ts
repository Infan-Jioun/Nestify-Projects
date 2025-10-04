export type Role = "user" | "admin" | "real_estate_developer";

export const roles: Role[] = ["user", "admin", "real_estate_developer"];

export const getRoleBadgeColor = (role: Role) => {
    switch (role) {
        case "admin":
            return "bg-gradient-to-r from-green-500 to-pink-600 text-white shadow-lg shadow-red-500/30";
        case "real_estate_developer":
            return "bg-gradient-to-r from-blue-500 to-cyan-600 text-white shadow-lg shadow-blue-500/30";
        default:
            return "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg shadow-gray-500/30";
    }
};
