import { GraphQLClient, gql } from "graphql-request";

export async function checkoutCreateAPI(lineItems) {
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
    mutation checkoutCreate($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
        }
        checkoutUserErrors {
          code
          message
        }
      }
    }
  `;
  const variables = {
    input: lineItems,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.checkoutCreate;
}

export async function checkOut(checkoutID,accessToken) {
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
    mutation associateCustomerWithCheckout(
      $checkoutId: ID!
      $customerAccessToken: String!
    ) {
      checkoutCustomerAssociateV2(
        checkoutId: $checkoutId
        customerAccessToken: $customerAccessToken
      ) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          code
          field
          message
        }
        customer {
          id
        }
      }
    }
  `;
  const variables = {
    checkoutId: checkoutID,
    customerAccessToken: accessToken,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.checkoutCustomerAssociateV2;
}
