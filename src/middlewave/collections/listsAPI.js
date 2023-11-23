import { GraphQLClient, gql } from "graphql-request";

// export function collectionsAPI() {
//     return axios.get(`${import.meta.env.VITE_ENDPOINT}/collections`)
// }

// export function productsAPI() {
//     return axios.get(`${import.meta.env.VITE_ENDPOINT}/product`)
// }

export async function collectionsAPI() {
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
    query collections {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
            image {
              src
            }
          }
        }
      }
    }
  `;
  const queryData = await graphQLClient.request(query);
  return queryData.collections.edges;
}

export async function collectionsbyhandleAPI(handle) {
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
    query CollectionByHandle($handle: String = "") {
      collectionByHandle(handle: $handle) {
        title
        products(first: 3, sortKey: MANUAL) {
          edges {
            node {
              id
              title
              handle
              images(first: 2) {
                nodes {
                  url
                }
              }
              variants(first: 100) {
                nodes {
                  id
                  title
                  image {
                    url
                    altText
                    width
                    height
                  }
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
    }
  `;
  const variables = {
    handle: handle,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.collectionByHandle;
}
