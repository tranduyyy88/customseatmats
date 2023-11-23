import { GraphQLClient, gql } from "graphql-request";

export async function menuAPI(handleMenu) {
  const graphQLClient = new GraphQLClient(
    `https://${import.meta.env.VITE_APP_STORE_DOMAIN}/api/${
      import.meta.env.VITE_APP_VERSION
    }/graphql.json`,
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": `${
          import.meta.env.VITE_ACCESS_TOKEN
        }`,
      },
    }
  );
  const query = gql`
    query MyQuery($handle: String = "") {
        menu(handle: $handle) {
        title
        items {
            title
            url
            id
        }
        }
    }
  `;
  const variables = {
    "handle": handleMenu
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.menu;
}
