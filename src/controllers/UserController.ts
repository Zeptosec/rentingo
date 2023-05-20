import { User } from "@/context/user";
import { Profile, getRole } from "@/pages/profile";

export async function getAllUsers() {
    const rs = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users`);
    let users: Profile[] = await rs.json()
    return users;
}

export function getRoleName(profile: Profile) {
    const usr: User = { profile, token: "" };
    switch (getRole(usr)) {
        case "administratorius":
            return "Administratorius";
        case "nuomininkas":
            return "Nuomininkas";
        case "nuomotojas":
            return "Nuomotojas";
        default:
            return "Nezinoma rolė";
    }
}

export async function setUser(user: Profile, token?: string) {
    const tmpUser = { ...user };
    delete tmpUser.id;
    const rs = await fetch(`${process.env.NEXT_PUBLIC_API}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(tmpUser)
    });
    if (rs.ok)
        return true;
    return false;
}