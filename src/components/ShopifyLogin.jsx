
const ShopifyLogin = () => {
  const handleLogin = () => {
    const apiKey = '041a68879b77a7ee89305b08d4d92e4c';
    const redirectUri = `${window.location.origin}/auth/callback`; // Callback URL after authentication
    const scopes = 'read_products,write_products'; // Define the scopes your app requires

    const authUrl = `https://${import.meta.env.VITE_APP_STORE_DOMAIN}/admin/oauth/authorize?client_id=${apiKey}&scope=${scopes}&redirect_uri=${redirectUri}`;

    console.log(authUrl);
  };

  return (
    <div>
      <button onClick={handleLogin}>Login with Shopify</button>
    </div>
  );
};

export default ShopifyLogin;
