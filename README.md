

<div align="center">
    <span id="back-top"></span>
    <img src="API_RESTFULL/frontend/public/preview.png" alt="Logo" width="150" height="150">
    <br>
<h1>School Coffe ApiResftul</h1>
</div>
<details align="left">
    <summary align="left">List of Content</summary>
    <ul align="left" style="list-style: none">
        <li><a href="#about">About the project</a></li>
        <li><a href="#type">Type of app</a>
            <ul>
                <li><a href="#exampleRestful">Restful Api</a></li>
                <li><a href="#exampleServerSide">Side server renderer</a></li>
            </ul>
        </li>
        <li><a href="#features">features</a></li>
        <li><a href="#roles">Rol</a>
            <ul>
                <li><a href="#roleAlpha">Admin</a></li>
                <li><a href="#roleOmega<">Worker</a></li>
                <li><a href="#roleBeta">Student</a></li>
            </ul>
        </li>
        <li><a href="#security">Security</a>
            <ul>
                <li><a href="#securityVerification">Verification</a></li>
                <li><a href="#securityAuthentication">Authentication</a></li>
            </ul>
        </li>
        <li><a href="#tecnologies">Tecnologies</a></li>
        <li><a href="#folder">Folder estructure</a>
            <ul>
                <li><a href="#folder-alternative">Folder alternative</a></li>
            </ul>
        </li>
        <li><a href="#structure-image">Img structure</a>
            <ul>
                <li><a href="#structure-image-folder">Img alternative structure</a></li>
            </ul>
        </li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#usage">Usage</a></li>
        <li><a href="#authors">Authors</a></li>
        <li><a href="#thanks">Thanks</a></li>
    </ul>
</details>
<br>
<span id="about"></span>
This project aims to develop an application that allows multiple schools to create and manage their own cafeteria. The app will enable students to order the food they want, ensuring it is ready by the time their break starts.

<p>

<div align="center">
    <img src="API_RESTFULL/frontend/public/readmeImg/StudentPerfil.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/StudentCategories.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/Products.png" alt="Logo"  height="440">
</div>

<span id="type"></span>


## Type of App :house:

### RESTful API

A modern architectural style for building web applications that emphasizes a clear separation between the **frontend** and **backend**, `which we are using right now`. The frontend communicates with the backend through HTTP requests to a RESTful API, which serves as an intermediary that handles data retrieval and manipulation.

<span id="exampleRestful"></span>

#### *Example*

 ![Spring Boost](https://img.shields.io/badge/Spring_Boot-15dbd9?style=for-the-badge&logo=spring-boot&logoColor=red)
 ![Spring Boost](https://img.shields.io/badge/Django-FF0000?style=for-the-badge&logo=django&logoColor=white)
 ![Spring Boost](https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)

<span id="exampleServerSide"></span>

### Server-side Rendering

The server-side rendering (SSR) approach is a traditional method of building web applications where the server generates the HTML content and sends it to the client. When a user requests a page, the server processes the request, retrieves the necessary data, and renders the complete HTML page before sending it to the browser.

#### *Example*

 ![Laravel](https://img.shields.io/badge/Laravel-800080?style=for-the-badge&logo=laravel&logoColor=black)
 ![Next js](https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
 ![Ruby oin rails](https://img.shields.io/badge/Ruby_on_Rails-CC0000?style=for-the-badge&logo=ruby-on-rails&logoColor=white)


<div align= "right"><a href="#back-top">Back to top</a></div>
<p id="features"></p>

## Features 💫

- **Cafeteria Creation:**  
    Each school can register and set up their personalized cafeteria profile, including menus, operating hours, and payment methods.

- **Student Accounts:**  
    Students will have individual accounts to place orders, track their history, and make payments seamlessly.

- **Customizable Menus:**  
    Cafeterias can update and customize their menu based on daily availability and special offers.

- **Order Scheduling:**  
    Students can schedule their orders to be prepared and ready during break time, minimizing wait times.

- **Multi-School Support:**  
    The application will support multiple institutions, with separate profiles and settings for each school.

- **Admin Dashboard:**  
    Schools will have an admin dashboard to monitor cafeteria performance, manage orders, and analyze trends.

<div align= "right"><a href="#back-top">Back to top</a></div>

<span id="roles"></span>


## Rol :stop_sign:

### Admin

The administrator will mainly see these windows, which will allow them to manage the institutes and cafeterias assigned to them, their courses, their employees, and even if they have more than one cafeteria.

<div align="center">
    <img src="API_RESTFULL/frontend/public/readmeImg/AdminRoleDashboard.png" alt="Logo"  height="440">
</div>



### Worker

The worker will have the ability to create, edit, and delete categories and products. They can also cancel orders and make adjustments to their profile as needed.
<div align="center">
    <img src="API_RESTFULL/frontend/public/readmeImg/WorkerHome.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/WorkerHome.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/WorkerProfile.png" alt="Logo"  height="440">
</div>



### Student

The student will be able to browse available products and categories, place orders, view their order history, and update their profile information as needed
<div align="center">
    <img src="API_RESTFULL/frontend/public/readmeImg/StudentCategories.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/StudentPerfil.png" alt="Logo"  height="440">
    <img src="API_RESTFULL/frontend/public/readmeImg/studentProduct.png" alt="Logo"  height="150">
</div>
<div align= "right"><a href="#back-top">Back to top</a></div>



<span id="folder"></span>
## Folder and Image Structure :file_folder:

#### **Frontend**
Uses a traditional src folder to separate concerns: components, contexts, pages, and services.

- **Advantages**

    1. Clear distinction between reusable components, pages, and application logic (services).

    2. Easy to understand and scalable for small projects.
    
- **Disadvantages**

    1. If the project grows, finding all files related to a feature can become cumbersome.

    2. Stylesheets are managed separately, which may lead to scattered styling logic.

#### **Backend**
Organized by type: Each folder groups similar files (controllers, routes, models, etc.).

- **Advantages**

    1. Simple and easy to understand, especially for small-to-medium-sized projects.

    2. Separation of concerns is clear: controllers handle logic, models handle data, and routes handle endpoints.

    3. Popular and widely adopted for Node.js projects.

- **Disadvantages**

    1. As the project grows, it becomes harder to manage since related files (like routes and controllers) are scattered across different folders.

    2. Developers need to switch between folders to work on a single feature.

<div align= "center">
 <img src="API_RESTFULL/frontend/public/readmeImg/structureFrontend.png" alt="Logo"  height="440">
  <img src="API_RESTFULL/frontend/public/readmeImg/structureBackend.png" alt="Logo"  height="440">
</div>

<span id="folder-alternative"></span>

### **Alternative Folder Structure**

#### **Frontend** 
Files are grouped by feature/module instead of by type.

- **Advantages**

    1. Keeps components, styles, and logic for a single feature together, making the project more modular.

    2. Improves maintainability as the project scales.

    3. Easier onboarding for developers as they can focus on a single feature.

- **Disadvantages**

    1. For smaller projects, the additional folder structure can feel unnecessary.

    2. Shared components or styles might be harder to manage if not organized well.

<div align= "center">
 <img src="API_RESTFULL/frontend/public/readmeImg/structureFrotendExample.png" alt="Logo"  height="440">
</div>

#### **Backend**
Instead of organizing by type, files are grouped by feature, like frotend example.

- **Advantages**

    1. Keeps all files related to a single feature (e.g., auth, student) in the same folder, making it easier to locate and modify code.

    2. More modular and scalable for larger projects.

    3. Reduces the need to switch between folders when working on a feature.

- **Disadvantages**

    1. Adds unnecessary complexity for small projects.

    2. Can lead to code duplication if shared logic is not managed properly.

<div align= "center">
 <img src="API_RESTFULL/frontend/public/readmeImg/structureBackendExample.png" alt="Logo"  height="440">
</div>
<div align= "right"><a href="#back-top">Back to top</a></div>

<span id="structure-image"></span>

### **Image structure**
In the backend, we have used Multer as middleware to handle image uploads. The images are stored in a dedicated folder within the project:

    - **Path**: public/images/

<div align= "center">
 <img src="API_RESTFULL/frontend/public/readmeImg/imageStructure.png" alt="Logo"  height="440">
</div>

- **Advantages**

    1. **Simplicity**: Easy to implement and configure using multer.

    2. **Accessibility**: By storing images in a public folder, they can be accessed directly via a URL.

            http://localhost:3000/public/images/image-123456789.png

    3. **Logical Organization**: All images are centralized in a single folder, making management straightforward.

- **Disadvantages**

    1. **Limited Scalability**: If the number of images increases significantly, the images/ folder can become hard to manage.

    2. **Filename Management**: While filenames are renamed using timestamps, there is no advanced structure (e.g., subfolders by user or categories).

    3. **Risk of Local Storage**: If the server restarts or fails, locally stored images may be lost without proper backups.

<span id="structure-image-folder"></span>

### **Alternative Approach**
Another option would be to store images in a cloud storage service like Amazon S3, Google Cloud Storage, or Firebase Storage.

<div align= "center">
 <img src="API_RESTFULL/frontend/public/readmeImg/imageStructureExample.png" alt="Logo"  height="240">
</div>

- **Advantages**

    1. **Scalability**: Allows for storing a vast number of images without worrying about local storage limitations.

    2. **Security**: Images are backed up and secured in the cloud.

    3. **Organized Structure**:  Images can be grouped into subfolders based on users, categories, or other logical divisions.

    4. **Reliability**: Cloud storage services provide redundancy, ensuring images are not lost due to server failures.

- **Disadvantages**

    1. **Complexity**: Requires additional configuration to integrate cloud storage with the backend.

    2. **Costs**: Cloud storage services may incur additional costs based on usage (storage and bandwidth).

    3. **Access Control**: Requires proper permissions to manage access to uploaded images.
<div align= "right"><a href="#back-top">Back to top</a></div>



<span id="security"></span>
## Security 🔒

### JWT Verification

In this project, we utilize JSON Web Tokens (JWT) to handle authentication and authorization for our users, which include three distinct roles: Admin, Worker, and Student.

### How JWT Works

1. **User  Authentication**:
   - When a user logs in (whether as an Admin, Worker, or Student), they provide their credentials (username and password). The server verifies these credentials against the database.
   - Upon successful authentication, the server generates a JWT that encodes the user's information and their role. This token is then sent back to the client.

2. **Token Structure**:
   - The JWT consists of three parts: the header, the payload, and the signature. The payload contains the user's information, including their role, which is crucial for authorization purposes.

3. **Client Storage**:
   - The client stores the JWT (typically in local storage or a cookie) and includes it in the Authorization header of subsequent requests to the server. This allows the server to identify the user and their permissions without requiring them to log in again.

### Role-Based Access Control Authentication (middleware)

- **Admin**: Admins have full access to manage institutes, cafeterias, courses, and employees. They can create, read, update, and delete resources as needed.

- **Worker**: Workers can create, edit, and delete categories and products, cancel orders, and adjust their profiles. Their access is limited to functionalities relevant to their role in the cafeteria.

- **Student**: Students can browse products, place orders, view their order history, and update their profile information. Their access is focused on ordering and managing their personal information.
<div align= "right"><a href="#back-top">Back to top</a></div>



<span id="tecnologies"></span>
## Technologies we use 👨🏾‍💻

- **Database**: MySQL

![Mysql](https://img.shields.io/badge/MYSQL-C7A20F?style=for-the-badge&logo=mysql&logoColor=yellow&labelColor=black)

- **ORM**: Sequelize

![SEQUELIZE](https://img.shields.io/badge/Sequelize-0000FF?style=for-the-badge&logo=sequelize&logoColor=blue&labelColor=black)

- **Server**: NodeJS, Express

![EXPRESS](https://img.shields.io/badge/Express-D2D2D2?style=for-the-badge&logo=express&logoColor=white&labelColor=black)
![Static Badge](https://img.shields.io/badge/JWT-6DA55F?style=for-the-badge&logo=node.js&logoColor=6DA55F&labelColor=000)


- **Middlewares**: Multer, JWT

![Static Badge](https://img.shields.io/badge/MULTER-ffb362?style=for-the-badge&logo=MULTER&logoColor=e91e63&labelColor=000)
![Static Badge](https://img.shields.io/badge/JWT-d63aff?style=for-the-badge&logo=json&logoColor=d63aff&labelColor=000)

  
- **Frontend**: HTML5, SCSS, JS, React

 ![HTML](https://img.shields.io/badge/HTML5-F80?style=for-the-badge&logo=html5&logoColor=F80&labelColor=black)
![Static Badge](https://img.shields.io/badge/SASS-CC6699?style=for-the-badge&logo=SASS&logoColor=CC6699&labelColor=000)
 ![JS](https://img.shields.io/badge/javascript-f7df1e?style=for-the-badge&logo=javascript&logoColor=dark&labelColor=black)
 ![Static Badge](https://img.shields.io/badge/React-7ddfff?style=for-the-badge&logo=react&labelColor=000)


- **Dependencies**: React icons, MUI React UI

![Static Badge](https://img.shields.io/badge/MUI%20REACT%20UI-0073e6?style=for-the-badge&logo=mui&labelColor=000)
![Static Badge](https://img.shields.io/badge/REACT%20ICONS-e91e63?style=for-the-badge&logo=react&logoColor=e91e63&labelColor=000)



<div align= "right"><a href="#back-top">Back to top</a></div>
<p id="installation"></p>

## Installation ⚙️

1. Clone the repository:

    ```bash
    git clone https://github.com/IsaacRamosDaw/The_Cafeteria.git
    cd TheCafeteria
    ```

2. Install npm dependencies:

    ```bash
    npm install (Frontend)
    npm install (Backend)
    ```

3. Start the engine:

    ```bash
    node index (backend)
    npm run dev (frontend)
    ```

4. Test with database seeds

   ```bash
    npx sequelize-cli db:seed:all 
   ```
<div align= "right"><a href="#back-top">Back to top</a></div>

<span id="usage"></span>



## Usage 🕹️

1. **Welcome**:
   - Where you can create your account as a student or log in directly as a student, worker, or administrator.
2. **Admin dashboard**:
   - Provides administrators with tools to manage cafeteria settings, track daily operations, oversee orders, and analyze performance reports.
3. **Home**:
   - Displays a summary of cafeteria operations, including active orders, announcements, and quick access to user-specific features.
4. **Student menu**:
   - Allows students to browse the available food items, customize their orders, view pricing, and schedule their meals for pick-up during break times.
5. **Worker dashboard menu**:
   - Enables cafeteria workers to view incoming orders, update order statuses (e.g., in preparation, ready, delivered), and manage inventory.
6. **Profile**:
   - Lets users edit their personal details, change their password, and update preferences such as notification settings or favorite meals.
7. **Orders**:
   - Displays a detailed history of placed orders for students and allows them to track the status of active orders in real-time. Administrators and workers can use this section to manage and monitor order flow.
<div align= "right"><a href="#back-top">Back to top</a></div>



## Authors ✒️

- [**Mansour**](https://github.com/mansulol)
- [**Cynthia**](https://github.com/Cynthia300)
- [**Isaac**](https://github.com/IsaacRamosDaw)

<span id="thanks"></span>

## Thanks 🎁

- Thanks to my teacher [Tiburcio](https://github.com/tcrurav) for this experience
- Thanks to [Villanuevand](https://github.com/Villanuevand) for the template of this readme
- Thanks to all my classmate and partners in this prject group


⌨️ with ❤️ the best group of DAW2ºT
