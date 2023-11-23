import { GraphQLClient, gql } from "graphql-request";

export async function createCartAPI() {
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
    mutation CreateCart {
      cartCreate {
        cart {
          checkoutUrl
          id
        }
      }
    }
  `;
  const queryData = await graphQLClient.request(query);
  return queryData.cartCreate.cart;
}

export async function loadCartAPI(cartId) {
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
    query GetCart($cartId: ID!) {
      cart(id: $cartId) {
        checkoutUrl
        estimatedCost {
          subtotalAmount {
            amount
            currencyCode
          }
        }
        lines(first: 100) {
          edges {
            node {
              id
              quantity
              estimatedCost {
                subtotalAmount {
                  amount
                  currencyCode
                }
                totalAmount {
                  amount
                  currencyCode
                }
              }
              merchandise {
                ... on ProductVariant {
                  id
                  title
                  product {
                    title
                  }
                  image {
                    url
                    altText
                    width
                    height
                  }
                  priceV2 {
                    amount
                    currencyCode
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
    cartId: cartId,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.cart;
}

export async function updateCartLines(cartId, id, quantity) {
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
    mutation UpdateCartLines($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
      cartLinesUpdate(cartId: $cartId, lines: $lines) {
        cart {
          checkoutUrl
          estimatedCost {
            subtotalAmount {
              amount
              currencyCode
            }
          }
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                estimatedCost {
                  subtotalAmount {
                    amount
                    currencyCode
                  }
                  totalAmount {
                    amount
                    currencyCode
                  }
                }
                merchandise {
                  ... on ProductVariant {
                    id
                    title
                    product {
                      title
                    }
                    image {
                      url
                      altText
                      width
                      height
                    }
                    priceV2 {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
        userErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    cartId: cartId,
    lines: {
      id: id,
      quantity: quantity,
    },
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.cartLinesUpdate;
}
