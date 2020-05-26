export { definitionsFetch } from './definitionActions'
export { parseReferences } from './referencesActions'
export { submitSearch, resetSearch, changeSearchText } from './searchActions'

// export const firebaseDefinitionsFetch = () => {

//     return async (dispatch) => {
//         dispatch({ type: FIREBASE_DEFINITIONS_REQUEST });

//         try {
//             const snapshot = await db.collection("definitions").get()

//             let payload = []

//             snapshot.forEach(doc => {
//                 console.log(doc.id)
//                 payload.push({
//                     id: doc.id,
//                     ...doc.data()
//                 })
//             })

//             const sortedPayload = payload.sort((a, b) => {
//                 if (a.featured && !b.featured) {
//                     return -1;
//                 }
//                 if (b.featured && !a.featured) {
//                     return 1;
//                 }
//                 if (a.likes && b.likes) {
//                     return a.likes >= b.likes ? -1 : 1;
//                 }
//                 return 1;
//             })

//             dispatch({
//               type: FIREBASE_DEFINITIONS_SUCCESS,
//               payload: _.keyBy(sortedPayload, o => o.id)
//             });

//         } catch (e) {
//             console.warn(e);

//             dispatch({ type: FIREBASE_DEFINITIONS_ERROR });
//             return null;
//         }
//     };
// }