import { membersListActions } from './membersList-slice';

export const fetchMembers = (ceva) => {
  return async (dispatch) => {
    const fakeDataUrl = `https://randomuser.me/api/?results=3&inc=name,gender,email,nat,picture&noinfo`;
    // const fakeDataUrl = `http://localhost:8080/api/users`;

    try {
      const response = await fetch(fakeDataUrl);

      if (!response.ok) {
        throw new Error('Could not get cart data !');
      }
      const data = await response.json();
      console.log(data);
      dispatch(membersListActions.addMember(data));

      dispatch(membersListActions.changeInitialLoading(false));
    } catch (error) {
      console.log(error);
    }
  };
};
