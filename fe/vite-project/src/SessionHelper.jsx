import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";

// workshop_93jda = encrypted user data
// workshop_pk8s2 = user token
// workshop_jsue1 = expire session login timestamp

const invalidateSession = () => localStorage.clear();

const setUserData = (userData, token) => {
    const exp = jwtDecode(token).exp;

    localStorage.setItem("workshop_93jda", btoa(JSON.stringify(userData)));
    localStorage.setItem("workshop_pk8s2", token);
    localStorage.setItem("workshop_jsue1", exp);
};

const getUser = () => {
    if (localStorage.getItem("workshop_pk8s2") == null) {
        return {};
    } else if (Date.now() > localStorage.getItem("workshop_jsue1") * 1000) {
        alert("Your session is expired. Please login again.");
        invalidateSession();
        return {};
    } else {
        try {
            let decoded = atob(localStorage.getItem("workshop_93jda"));
            return JSON.parse(decoded);
        } catch (e) {
            return {};
        }
    }
};
const getUserData = getUser();
const getToken = localStorage.getItem("workshop_pk8s2");

const CheckUser = ({ forLoggedOut = false, red = false, children = null }) => {
    let hasToken =
        localStorage.getItem("workshop_pk8s2") &&
        localStorage.getItem("workshop_93jda") &&
        Date.now() < localStorage.getItem("workshop_jsue1") * 1000;

    // Only show for logged in user
    if (!forLoggedOut && !hasToken) {
        if (red) {
            invalidateSession();
            return <Navigate to="/login" />;
        }
        return null;
    }
    // Only show for logged out user (w/ forLoggedOut=true)
    else if (forLoggedOut && hasToken) {
        if (red) return <Navigate to="/" />;
        return null;
    }
    if (children) return children;
    return null;
};

const getActiveUser = () => {
    let hasToken =
        localStorage.getItem("workshop_pk8s2") &&
        localStorage.getItem("workshop_93jda") &&
        Date.now() < localStorage.getItem("workshop_jsue1") * 1000;

    return hasToken;
};

export {
    setUserData,
    getUserData,
    getToken,
    CheckUser,
    invalidateSession,
    getActiveUser,
};
