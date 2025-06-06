// import { Auth } from "@aws-amplify/auth";

// import { renderHook } from "@testing-library/react-hooks";

// import { ApolloClient } from "@apollo/client";

// import useApolloClient from "./useApolloClient";

// describe("useApolloClient()", () => {
//   Auth.currentSession = jest.fn().mockImplementation(() => ({
//     getAccessToken: () => ({
//       getJwtToken: () => "token",
//     }),
//   }));

//   it("should return valid ApolloClient", () => {
//     const { result } = renderHook(() => useApolloClient());

//     expect(result.current).toBeInstanceOf(ApolloClient);
//   });
// });
