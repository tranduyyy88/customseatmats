import { GraphQLClient, gql } from "graphql-request";

export async function ProductsAPI() {
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
    query Products {
      products(first: 100) {
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
            priceRange {
              maxVariantPrice {
                amount
              }
            }
            publishedAt
          }
        }
      }
    }
  `;
  const queryData = await graphQLClient.request(query);
  return queryData.products.edges;
}

export async function SingleProductAPI(handle) {
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
    fragment MediaFields on Media {
      mediaContentType
      alt
      previewImage {
        url
      }
      ... on MediaImage {
        id
        image {
          url
          width
          height
        }
      }
      ... on Video {
        id
        sources {
          mimeType
          url
        }
      }
      ... on Model3d {
        id
        sources {
          mimeType
          url
        }
      }
      ... on ExternalVideo {
        id
        embedUrl
        host
      }
    }
    query ProductByHandle($handle: String = "") {
      productByHandle(handle: $handle) {
        id
        title
        descriptionHtml
        vendor
        tags
        media(first: 7) {
          nodes {
            ...MediaFields
          }
        }
        options(first: 100) {
          id
          name
          values
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
  `;
  const variables = {
    handle: handle,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.productByHandle;
}

export async function AddToCartAPI(cartId, variantId) {
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
    mutation AddToCart($cartId: ID!, $variantId: ID!) {
      cartLinesAdd(
        cartId: $cartId
        lines: [{merchandiseId: $variantId , quantity: 1 }]
      ) {
        cart {
          lines(first: 100) {
            edges {
              node {
                id
                quantity
                merchandise {
                  ... on ProductVariant {
                    product {
                      title
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
    variantId: variantId
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData;
}

export async function ProductRecommendations(productId) {
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
    query productRecommendations(
      $productId: ID!
      $variantsFirst: Int = 100
      $imagesFirst: Int = 2
    ) {
      productRecommendations(productId: $productId) {
        title
        handle
        id
        images(first: $imagesFirst) {
          nodes {
            url
          }
        }
        variants(first: $variantsFirst) {
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
  `;
  const variables = {
    productId: productId,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.productRecommendations;
}
