**SmartBite – AI-Powered Food Delivery Platform**

SmartBite is a full-stack AI-powered food delivery platform built using the MERN stack. It combines traditional food ordering with AI-driven personalized recommendations, allowing users to discover food based on their cravings, budget, dietary preferences, location, and previous order history.

**FEATURES**

* AI-powered food recommendations using Groq Llama API
* Personalized recommendations based on user preferences and order history
* Natural language food search
* Budget-based food recommendations
* Dietary preference support
* Health goal-based recommendations
* Restaurant and food browsing
* Shopping cart functionality
* Order placement and management
* User authentication using JWT
* User profile and preference management
* Responsive UI using Tailwind CSS
* RESTful backend APIs
* MongoDB database integration

**AI RECOMMENDATION**

SmartBite allows users to describe what they want using natural language.

Example:

"I want spicy chicken under ₹300"

The AI analyzes the request along with:

* Food name
* Cuisine
* Category
* Tags
* Price
* Rating
* Vegetarian/non-vegetarian status
* Restaurant information
* User preferences
* Previous order history
* Health goals

The Groq Llama model then generates ranked recommendations using only food items available in the database.

**TECH STACK**

Frontend:
React.js
JavaScript
Tailwind CSS
React Router
Lucide React
Vite

**Backend:**
Node.js
Express.js
REST APIs
JWT Authentication
MVC Architecture

**Database:**
MongoDB
Mongoose

**AI:**
Groq API
Llama 3.3 70B

**Tools:**
Git
GitHub
VS Code

**PROJECT ARCHITECTURE**

User Query
→ React Frontend
→ Express REST API
→ User Profile + Order History + Food Database
→ Groq Llama AI
→ Personalized Recommendations
→ SmartBite UI

**PROJECT STRUCTURE**

smartbite/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── ...
│   └── package.json
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md

**INSTALLATION**

1. Clone the repository

git clone [https://github.com/andojusidhu/smart-bite.git](https://github.com/andojusidhu/smart-bite.git)

cd smart-bite

2. Install backend dependencies

cd backend

npm install

3. Create a .env file inside the backend directory

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GROQ_API_KEY=your_groq_api_key

Never commit the .env file to GitHub.

4. Start the backend

npm start

For development:

npm run dev

5. Install frontend dependencies

cd frontend

npm install

6. Start the frontend

npm run dev

The frontend will run on:

[http://localhost:5173](http://localhost:5173)

**API ROUTES**

/api/auth
/api/restaurants
/api/foods
/api/orders
/api/recommendations
/api/ai

**SECURITY**

* JWT-based authentication
* Protected API routes
* Environment-based API key management
* Secure MongoDB connection
* Authentication middleware
* Input validation

**FUTURE ENHANCEMENTS**

* Collaborative filtering
* Advanced recommendation ranking
* Location-based recommendations
* Real-time order tracking
* Payment gateway integration
* Redis caching
* Docker deployment
* Cloud deployment
* Advanced analytics
* Improved AI personalization

**LEARNING OUTCOMES**

Through SmartBite, I strengthened my practical knowledge of:

* MERN stack development
* REST API development
* JWT authentication
* MongoDB and Mongoose
* AI and LLM integration
* Personalized recommendation systems
* Backend architecture
* API integration
* Error handling
* Responsive frontend development
* Full-stack application deployment

**AUTHOR**

Andoju Sidhu Ganesh Chary

Full-Stack Developer | AI Enthusiast

**GitHub:**
https://github.com/andojusidhu

**Live Demo**
https://smart-bite-pi.vercel.app/

SmartBite demonstrates how AI can be integrated into a real-world food delivery application to provide intelligent, personalized, and user-centric recommendations.
