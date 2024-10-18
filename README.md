### AgriConnect API
AgriConnect is a farm-to-customer platform API designed to connect farmers directly with consumers, enabling the sale of farm products.
The backend is built using Node.js, Express, and TypeScript, with deployment on Vercel.

### Features
- User Management:
  - Users can register as either a Customer or a Farmer.
  - Authentication and authorization with JWT.
- Farm Management:
  - Farmers can create and manage their farms.
- Product Management:
  - Farmers can Add, update, and delete farm products.
- Order Management:
  - Customers can place orders, view order details, and check the status.

### Prerequisites
- Node.js v18+
- TypeScript
- MongoDB

### Deployment
The API is deployed and accessible at:
    `https://agri-connect-api-nu.vercel.app`


### API Documentation
Access Swagger API documentation at `https://agri-connect-api-nu.vercel.app/api-docs`.

### Installation
1. Clone the repository:
     - `https://github.com/Aladaabdul/AgriConnect_API.git`

2. Navigate to the project director:
    - `cd AgriConnect_API`

3. Install dependencies:
     - `npm install`

### Running Locally
1. Start the development server:
     - `npm run dev`
2. Access the API at `http://localhost:8000`
3. View Swagger documentation at: `http://localhost:8000/api-docs`

### Authentication
All endpoints are secured with JWT authentication. You must include a valid JWT token in the Authorization header of your requests.

`Authorization: Bearer <your_jwt_token>`

To obtain a JWT token, register or log in using the respective endpoints. The token will be returned in the response and must be used in subsequent requests.

### Contact
For questions, please get in touch with me at `aladarahman18@gmail.com`.


