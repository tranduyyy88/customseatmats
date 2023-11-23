import { GraphQLClient, gql } from "graphql-request";

export async function searchAPI(text) {
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
  
    query SearchProducts($query: String!) {
      products(query: $query, first: 100) {
        edges {
          node {
            id
            title
            handle
            images(first: 1) {
              nodes {
                url
              }
            }
            variants(first: 1) {
              nodes {
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
              }
            }
          }
        }
      }
    }
  `;
  const variables = {
    query: text,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.products.edges;
}
