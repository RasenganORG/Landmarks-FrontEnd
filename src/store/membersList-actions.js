import { membersListActions } from './membersList-slice';

export const fetchMembers = () => {
  return async (dispatch) => {
    const count = 3;
    const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;
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
