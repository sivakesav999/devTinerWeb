# DevTinder - Frontend
- Create a vite + React application
- Remove Unnecessary code and create a simple Get Started!
- Install Tailwind CSS
- Install DaisyUI
- Add NavBar Componect to App.jsx and test it
- Create a NavBar in separate component
- Install react-router-dom
- Routing - Create a BrowserRouter > Routes > Route > childrenRoutes (<Outlet />)
- Created the footer
- Create a login page
- Install cors(origin : {}, credentials: true)
- Install Axios
- Whenever making the API call with axios, use {withCredential: true}
- Install react-redux + @reduxjs/toolkit => configureStore => Provider => createSlice => add reducer to store
- Install redux toolkit chrome extension
- Make photo to be shown, once the user loggedin successfully
- Make page to navigate to user feed once loggedin successfully
- Create the new folder for the components
- Shouldn't able to access other routes without login
- If token is not present, redirect to login page
- Logout feature
- Get the feed and add the feed to store
- Built user card on feed
- Edit profile feature
- Show toast on updating the profile
- Implemented connections page
- Created new page to see all my connection requests, added buttons to accept or ignore.
- Built feature - accept/reject connection requests
- Send/ Ignore the connections on the feed


# Deployment
- Signup on AWS
- Launch Instance
- chmod 400 <secret>.pem
- ssh -i "DevTinder.pem" ubuntu@ec2-13-49-44-222.eu-north-1.compute.amazonaws.com
- Git Clone

- Frontend 
    - npm install - install dependencies
    - npm run dev
    - sudo apt update
    - sudo apt install nginx
    - sudo systemctl start nginx
    - sudo systemctl enable nginx
    - copy code from dist(build files) to /var/www/html
    - sudo scp -r dist/* /var/www/html
    - Enable port 80


    - Backend
        - Allow EC2 Instance public Ip on mongodb server
        - npm install
        - Installed pm2 (npm install pm2 -g)
        - pm2 start npm -- start // pm2 start npm --name "DevTinderBackend" -- start
        - pm2 logs
        - pm2 list
        - pm2 flush npm
        - pm2 stop npm
        - pm2 delete npm
        - pm2 start npm --name "devTinderBackend" -- start
        - Modify the baseUrl in frontend project to /api/



# Nginx config

    Frontend : http://13.49.44.222/
    Backend  : http://13.49.44.222/3000/

    config Nginx - /etc/nginx/sites-available/default
    server_name 13.49.44.222;

    location /api/ {
        proxy_pass http://localhost:3000/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    sudo systemctl restart nginx
    Now, try access http://13.49.44.222/api/ - you could see the backend message now.