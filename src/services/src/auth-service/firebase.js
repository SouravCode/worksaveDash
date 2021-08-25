import firebase from "firebase";

import { firebaseConfig } from "../../../app-config";

export const fire = firebase.initializeApp(firebaseConfig);

export const isAuthorized = () => {
    return fire.auth().currentUser ? 'Y' : 'N';
};

export async function useFirebaseAuth() {
    if (isAuthorized) {
        const token = await fire.auth().currentUser.getIdToken();
        return { 'accessToken': token };
    }
    return null
};


export async function getAccessToken() {
    if (isAuthorized) {
        return fire.auth().currentUser.getIdToken();
    }
    return Promise.resolve(null);
};

