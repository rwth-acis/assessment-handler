var OidcSettings = {    
    authority: 'https://api.learning-layers.eu/o/oauth2',
    client_id: 'myclientid',
    redirect_uri: 'https://localhost:3000/',    
    response_type: 'id_token token',
    scope: 'openid profile roles',
    post_logout_redirect_uri: 'https://localhost:3000/'      
};