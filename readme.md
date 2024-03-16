# Eventaverse

Eventaverse is a platform dedicated to event management, interaction, and exploration. Users can utilize Eventaverse for various purposes, including event creation, liking events, and discovering upcoming events. Here's an overview:

## Overview

Eventaverse provides users with a streamlined experience for managing events, expressing interest in events, and discovering new opportunities. Whether you're an event organizer, attendee, or enthusiast, Eventaverse offers features to enhance your event experience.

## Features

### User Authentication
- Users can sign up, log in, and log out.
- Token-based authentication ensures secure access to the platform's features.

### Event Listing
- The platform lists all published events, allowing users to browse through them.
- Each event displays details such as title, description, date, and location.

### Like/Unlike Events
- Users can like or unlike events they find interesting.
- Each event keeps track of the number of likes it receives.

### User-specific Views
- Users can view their own published events and events they have liked.

## Technologies Used

- **Backend**: Django framework with Django REST Framework for API development.
- **Frontend**: React.js for building the user interface.
- **Database**: MySQL for storing data.
- **Authentication**: Token authentication for user login and registration.

## API Endpoints

- **User Authentication**: `/signup`, `/login`, `/logout`
- **Event Management**: `/events`, `/myevents`, `/events/like`
- **Like/Unlike Events**: `/like/<pk>`, `/unlike/<pk>`

## Screenshots
[![screencapture-localhost-3000-2024-03-16-23-50-26.png](https://i.postimg.cc/9MHs1vkQ/screencapture-localhost-3000-2024-03-16-23-50-26.png)](https://postimg.cc/7CXBZQDF)
[![screencapture-localhost-3000-login-2024-03-16-23-51-03.png](https://i.postimg.cc/Y0KYswKj/screencapture-localhost-3000-login-2024-03-16-23-51-03.png)](https://postimg.cc/JDxssvhW)
[![screencapture-localhost-3000-signup-2024-03-16-23-51-26.png](https://i.postimg.cc/vBWcDgkH/screencapture-localhost-3000-signup-2024-03-16-23-51-26.png)](https://postimg.cc/TL3R4wTZ)
[![screencapture-localhost-3000-2024-03-16-23-52-12.png](https://i.postimg.cc/050zsS7V/screencapture-localhost-3000-2024-03-16-23-52-12.png)](https://postimg.cc/WttNmhWZ)
[![screencapture-localhost-3000-likes-2024-03-16-23-52-35.png](https://i.postimg.cc/pL4TZJtL/screencapture-localhost-3000-likes-2024-03-16-23-52-35.png)](https://postimg.cc/G4Pd3Y2W)
[![screencapture-localhost-3000-event-2024-03-16-23-53-26.png](https://i.postimg.cc/HsLk1hYL/screencapture-localhost-3000-event-2024-03-16-23-53-26.png)](https://postimg.cc/DmtTq5bV)

## Getting Started

1. Clone the repository: `git clone https://github.com/your-username/inovatech.git`
2. Navigate to the project directory: `cd eventaverse`
3. Install dependencies: `pip install -r requirements.txt`
4. Run the Django development server: `python manage.py runserver`
5. Navigate to the React app directory: `cd frontend`
6. Install dependencies: `npm install`
7. Run the React development server: `npm start`

## Contributing

Contributions to InovaTech are welcome! Follow these steps to contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Make your changes and commit them: `git commit -am 'Add new feature'`
4. Push to the branch: `git push origin feature-branch`
5. Submit a pull request.

## Contact

For inquiries or feedback, please contact the project maintainer, Sumit Kumar, at rajsumit22032003@gmail.com.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
