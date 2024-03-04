const config = {
  env: process.env.NODE_ENV || "development",
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri: process.env.MONGODB_URI || process.env.MONGO_HOST || "mongodb://" +(process.env.IP || "localhost") + ":" + (process.env.MONGO_PORT || "27017") +"/mernproject",
  stripe_connect_test_client_id: "YOUR_stripe_connect_test_client",
  stripe_test_secret_key: "sk_test_51Oe7fUFLK5RCWl7z8DNH0XHCQCa60KxItO7l34WwmSRLnDcIJr6s81tOhnKBKCQ6qncgOfY9Lv3T6FMVhoJZuUr600QUYhrf1J",
  stripe_test_api_key: "pk_test_51Oe7fUFLK5RCWl7z8k4Jx2JohzMc1ZE12v5yyAswaoBmdselsVZp3JBHts2V84OOMXOJsxSTnFD9aVQqLwKAZGA200BUYL04VR",
};

export default config
