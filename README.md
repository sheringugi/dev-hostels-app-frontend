# Dev-Hostels App

## Description

Dev-Hostels is a web application for booking hostels, inspired by platforms like Airbnb. It allows users to browse available hostels, view hostel details, make reservations, and leave reviews. Hostel owners can also list their properties and manage reservations.

## Features

- User Authentication: Users can sign up, log in, and manage their profiles.
- Hostel Listings: Browse through a list of available hostels with images and details.
- Hostel Details: View detailed information about each hostel, including images, address, and amenities.
- Reservation: Users can make reservations for their selected hostels.
- Reviews: Users can leave reviews and ratings for hostels.
- Hostel Owners: Hostel owners can list their properties and manage reservations.
- M-Pesa Payment: Integrated M-Pesa payment system for secure transactions.
- Wishlist: Users can add hostels to their wishlist for future reference.
- Responsive Design: Ensured compatibility with different devices and screen sizes.

## Technologies Used

- **Frontend:** React, React Router, Axios, Slick Carousel, Date Range Picker
- **Backend:** Ruby on Rails, ActiveRecord
- **Database:** PostgreSQL
- **Styling:** CSS

## Setup Instructions

1. Clone the repository:

```sh
git clone <https://github.com/sheringugi/dev-hostels-app-frontendl>
cd <dev-hostels-app-frontend>
```

2. Install dependencies for the frontend and backend:

```sh
# Install frontend dependencies
cd frontend
npm install

# Install backend dependencies
cd ../backend
bundle install
```

3. Set up the database:

```sh
# Navigate to the backend directory
cd ../backend

# Run database migrations
rails db:migrate
```

4. Start the development servers:

```sh
# Navigate to the frontend directory
cd ../frontend

# Start the React development server
npm start

# Navigate to the backend directory
cd ../backend

# Start the Rails server
rails server
```

5. Access the application in your browser:

Open your browser and navigate to `http://localhost:3000`.

## Future Enhancements

- User Messaging: Implement a messaging system between users and hostel owners.
- Advanced Filtering: Add more advanced filtering options such as price range and amenities.
- Admin Panel: Create an admin panel for managing hostels and user reservations.
- User Profiles: Enhance user profiles with additional information and settings.

## Access to Dev-Hostels

This application has been deployed using [Vercel](https://vercel.com/). Click [here](https://dev-hostels-app-frontend-s6i9.vercel.app/) to access Game Review Application.  

## Back-end of Dev-Hostels

The back-end of this application is in another repository. Click [here](https://github.com/sheringugi/dev-hostels-app-backend) to access it. 

The backend has also been deployed using Render on this [link](https://dev-hostels-app.onrender.com/)



## License

This project is licensed under the [MIT License](LICENSE).
```

