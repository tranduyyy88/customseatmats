import { GraphQLClient, gql } from "graphql-request";

export async function createcustomerAPI(email) {
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
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          id
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: {
      email: email,
      password: "123123",
      acceptsMarketing: true,
    },
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.customerCreate;
}

export async function createCustomer(information) {
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
    mutation customerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer {
          firstName
          lastName
          email
        }
        customerUserErrors {
          field
          message
        }
      }
    }
  `;
  const variables = {
    input: information,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData.customerCreate;
}

export async function loginAPI(information) {
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
    mutation SignInWithEmailAndPassword($email: String!, $password: String!) {
      customerAccessTokenCreate(input: { email: $email, password: $password }) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors {
          code
          field
          message
        }
      }
    }
  `;
  const variables = information;
  const queryData = await graphQLClient.request(query, variables);
  return queryData.customerAccessTokenCreate;
}

export async function customerInfo(customerAccessToken) {
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
    query FetchCustomerInfo($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        email
        firstName
        id
        lastName
        defaultAddress {
          id
        }
        addresses(first: 100) {
          edges {
            node {
              address1
              city
              country
              id
              province
              zip
            }
          }
        }
      }
    }
  `;
  const variables = {
    customerAccessToken: customerAccessToken,
  };
  const queryData = await graphQLClient.request(query, variables);
  return queryData;
}
