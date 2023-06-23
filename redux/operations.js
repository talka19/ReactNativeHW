import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
} from "firebase/auth";
  import { authSlice } from "./authSlice";
  import { auth } from "../firebase/config";
  
  const { updateUserProfile, authError, authStateChange, authSingOut } =
    authSlice.actions;
  
  export const authSignInUser =
    ({ email, password }) =>
    async (dispatch, getSatte) => {
      try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        dispatch(
          updateUserProfile({
            displayName: user.displayName,
            userId: user.uid,
            displayImg: user.photoURL,
            email: user.email,
          })
        );
      } catch (error) {
        dispatch(authError(error.message));
        console.log("error.message1", error.message);
      }
    };
  
  export const authSignUpUser =
    ({ name, userEmail, password, avatar }) =>
    async (dispatch, getSatte) => {
      try {
        await createUserWithEmailAndPassword(auth, userEmail, password);
  
        const user = await auth.currentUser;
  
        await updateProfile(user, {
          displayName: name,
          photoURL: avatar,
        });
  
        const { displayName, email, uid, photoURL } = await auth.currentUser;
        dispatch(
          updateUserProfile({
            userId: uid,
            displayName,
            displayImg: photoURL,
            email,
          })
        );
      } catch (error) {
        console.log("error.message2", error.message);
        dispatch(authError(error.message));
      }
    };
  
  export const authSignOutUser = () => async (dispatch, getSatte) => {
    await signOut(auth);
    dispatch(authSingOut());
  };
  
  export const authStateChanged = () => async (dispatch, getSatte) => {
    await onAuthStateChanged(auth, (user) => {
      if (user) {
        const userUpdateProfile = {
          displayName: user.displayName,
          userId: user.uid,
          displayImg: user.photoURL,
          email: user.email,
        };
        dispatch(updateUserProfile(userUpdateProfile));
        dispatch(authStateChange(true));
      }
    });
  };