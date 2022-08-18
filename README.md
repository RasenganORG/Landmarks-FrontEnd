#To Do

Add toasts for Authentication (antd message)
Landing Page
Profile Page

Create Room; room functionality:

- Add members
- Add chat
- Socket IO for chat
- Chat Backgorund: negru

Backgorund harta: negru

Add Landmarks Modal
Add Event Modal

Create Join Room actions

Handle error when rooms/:roomID does not exist

Change Room Menu to List in [MenuUI](./src/components/LayoutPage/MenuUI.js)
Add Edit, Remove icons to each Room Menu Item

Tabela intermediara: userID: roomID

Chat: - fetch ultimele 20 de mesaje (si la refresh)

Toate datele stocate in Redux: // rooms: { // ymFasT1UQndK6qNSk4hD: { // members: [{ // id: 'sdasd', // }, {}], // chat: [], // }, // },

Redux stie cand am creat camera, cand am dat join, nu-i nevoie de fetch dupa ce am creat camera, am adaugat membrii sau am dat join deoarece actiunile astea au loc mai intai in Redux si apoi in DB; In DB facem doar update;

Fa fetch doar daca nu am date in store;
