# Course Assignment: Social Media Prototype

## Description

This project leverages API functionality to create a prototype for a social media application (SOME). The objective was to develop a working prototype that includes essential features such as user registration, login, creating posts, editing posts, deleting posts, and retrieving posts—all accomplished without the use of frameworks or UI libraries. The project was completed over the course of one week.

## Key Features of the Prototype
<details>
  <summary><strong>Click to read more</strong></summary>

- **User Registration:** Allows new users to create accounts.
- **User Login:** Enables existing users to log in with an authentication token.
- **Create Post:** Authenticated users can create new posts.
- **Edit Post:** Users can modify their existing posts.
- **Delete Post:** Functionality to remove posts.
- **Get Posts:** Users can read posts from the community.
</details>

## How to Start the Project
To get started with this project, follow these steps:

1. **Clone the Repository:**
   First, clone the repository to your local machine using the following command:
   ```bash
   git clone https://github.com/EPetrineLynghaug/Fed2-js2.git
   ```
2. **Navigate to the Project Directory:**
Change into the project directory by running:  
command:
   ```bash
    cd Fed2-js2
  ```

3. **Install Dependencies:**
Install the necessary dependencies with:
command:
```bash
   npm install
  ``` 

4. **Run the Development Server:**
Start the development server using:  
command:
   ```bash
    npm run dev
  ```

5. **Build for Production:**
When you are ready to deploy the project, you can build it for production with:  
command:
```bash
   npm run build
```

6.	Preview the Production Build:
To preview the production build locally, run:
command:
   ```bash
    npm run preview
  ```

## Planning
<details>
  <summary><strong>Click to read more</strong></summary>

The planning phase involved using GitHub Projects to create a task list, organizing tasks, and breaking them down into smaller, manageable components to enhance workflow efficiency.
</details>

## Development Choices and Solutions
<details>
  <summary><strong>Click to read more</strong></summary>

During development, I chose to retrieve user data from `localStorage` to minimize server requests, resulting in faster data access and improved user experience. Regular expressions (Regex) were utilized for validation purposes, and I opted to write the post card logic in JavaScript to maintain readability and modularity. Instead of a lengthy file, smaller, reusable functions were created. Additionally, I used `document.createElement` for generating HTML elements to explore different methodologies.
</details>

## CSS
<details>
  <summary><strong>Click to read more</strong></summary>

Some CSS was integrated to differentiate posts visually and gain better control over the layout. The current styling is prototype-level and will not be used in the final product. Placeholder images were implemented in JavaScript to address issues with excessively large images. Future styling will focus on creating a more engaging design.
</details>

## Documentation
<details>
  <summary><strong>Click to read more</strong></summary>

I utilized JSDoc for documenting the code and ESLint for error-checking, both of which proved to be invaluable for maintaining code quality and consistency.
</details>

## Bugs
<details>
  <summary><strong>Click to read more</strong></summary>

One significant challenge encountered was related to asynchronous operations. If a function was executed before the router fully loaded, the application would crash without error messages, complicating the debugging process. This highlighted the importance of managing asynchronous code effectively.
</details>

## Future Enhancements
<details>
  <summary><strong>Click to read more</strong></summary>

Several additional pages and features were planned but not implemented in this prototype. These will be revisited as the project transitions from prototype to a fully-fledged product, including styled buttons that are ready for integration in future iterations.
</details>

## Conclusion

This project has been an enriching experience, allowing me to deepen my understanding of JavaScript and API interactions while adhering to best practices in software development. I look forward to expanding on this prototype and transforming it into a social media application.
