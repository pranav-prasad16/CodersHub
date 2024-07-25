import React from 'react';

const blogs = [
  {
    title: "Getting Started with Python: A Beginner's Guide",
    introduction:
      "Python is one of the most popular programming languages today. Its simplicity and readability make it an excellent choice for beginners. In this blog post, we'll cover the basics to get you started with Python.",
    content: `
      Python is a versatile language used in web development, data science, artificial intelligence, and more. 
      To get started, you'll need to install Python from [python.org](https://www.python.org/downloads/).

      Basic Syntax:
      # This is a comment
      print("Hello, World!")  # This will print 'Hello, World!' to the console

      Variables and Data Types:
      x = 5           # Integer
      y = 3.14        # Float
      name = "Pranav" # String
      is_coding = True # Boolean
    `,
  },
  {
    title: 'Top 10 Coding Best Practices',
    introduction:
      'Writing clean, efficient, and maintainable code is crucial for any developer. Here are the top 10 coding best practices that every programmer should follow.',
    content: `
      1. Write Readable Code: Use meaningful variable names and add comments where necessary.
      2. Keep It Simple: Avoid overcomplicating your code. Simple code is easier to read and maintain.
      3. Use Version Control: Tools like Git help manage changes and collaborate with others.
      4. Write Tests: Ensure your code works as expected by writing unit tests.
      5. Follow Naming Conventions: Stick to the naming conventions of the language you're using.
      6. Refactor Regularly: Improve your code by refactoring it regularly.
      7. Avoid Hard-Coding Values: Use constants or configuration files instead.
      8. Optimize Performance: Write efficient algorithms and data structures.
      9. Handle Errors Gracefully: Use try-except blocks to manage errors.
      10. Keep Learning: Technology evolves rapidly, so stay updated with the latest trends.
    `,
  },
  {
    title: 'Understanding Object-Oriented Programming (OOP)',
    introduction:
      'Object-Oriented Programming (OOP) is a paradigm that uses objects and classes. It helps in organizing code into reusable and interconnected components.',
    content: `
      What is OOP?
      OOP revolves around four main principles: Encapsulation, Abstraction, Inheritance, and Polymorphism.

      Example in Python:
      class Dog:
          def __init__(self, name, age):
              self.name = name
              self.age = age

          def bark(self):
              return f"{self.name} is barking."

      dog1 = Dog("Buddy", 3)
      print(dog1.bark())  # Output: Buddy is barking.

      Benefits of OOP:
      - Modularity: Code is organized into distinct objects.
      - Reusability: Code can be reused through inheritance.
      - Scalability: Easy to manage and scale large applications.
    `,
  },
  {
    title: 'A Comprehensive Guide to Web Development',
    introduction:
      'Web development is a dynamic field with various technologies and tools. This guide will walk you through the essential aspects of web development.',
    content: `
      Front-End Development:
      - HTML: The structure of web pages.
      - CSS: Styling web pages.
      - JavaScript: Adding interactivity to web pages.

      Back-End Development:
      - Server: Manages requests and responses.
      - Database: Stores data.
      - APIs: Allow communication between different parts of an application.

      Full-Stack Development:
      Combines both front-end and back-end development. Popular stacks include MERN (MongoDB, Express.js, React, Node.js) and LAMP (Linux, Apache, MySQL, PHP).
    `,
  },
  {
    title: 'Exploring Machine Learning with Python',
    introduction:
      'Machine learning is a subset of artificial intelligence that enables systems to learn from data. Python offers powerful libraries for machine learning.',
    content: `
      Popular Libraries:
      - Scikit-Learn: For traditional machine learning algorithms.
      - TensorFlow and Keras: For deep learning.

      Example: Predicting House Prices
      from sklearn.datasets import load_boston
      from sklearn.model_selection import train_test_split
      from sklearn.linear_model import LinearRegression

      # Load data
      boston = load_boston()
      X = boston.data
      y = boston.target

      # Split data
      X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

      # Train model
      model = LinearRegression()
      model.fit(X_train, y_train)

      # Make predictions
      predictions = model.predict(X_test)
      print(predictions)
    `,
  },
];

const BlogPost = ({ title, introduction, content }) => (
  <div className="blog-post">
    <h2>{title}</h2>
    <p>{introduction}</p>
    <pre>{content}</pre>
  </div>
);

const Blogs = () => (
  <div className="container">
    <div className="blog">
      {blogs.map((post, index) => (
        <BlogPost
          key={index}
          title={post.title}
          introduction={post.introduction}
          content={post.content}
        />
      ))}
    </div>
  </div>
);

export default Blogs;
