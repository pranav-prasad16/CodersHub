import React from 'react';

const blogs = [
  {
    title: 'Understanding Data Structures: Arrays and Linked Lists',
    introduction:
      'Data structures are essential for efficient problem-solving in programming. This blog post explains two fundamental data structures: arrays and linked lists.',
    content: `
      Arrays:
      - Arrays are a collection of elements stored in contiguous memory locations.
      - They provide fast access to elements using an index.
      - Example in Python:
        arr = [1, 2, 3, 4, 5]
        print(arr[2])  # Output: 3

      Linked Lists:
      - A linked list consists of nodes where each node contains a value and a reference to the next node.
      - It allows for efficient insertion and deletion of elements.
      - Example in Python:
        class Node:
            def __init__(self, value):
                self.value = value
                self.next = None

        class LinkedList:
            def __init__(self):
                self.head = None

            def append(self, value):
                new_node = Node(value)
                if not self.head:
                    self.head = new_node
                else:
                    current = self.head
                    while current.next:
                        current = current.next
                    current.next = new_node
    `,
  },
  {
    title: 'Top 5 Algorithms Every Programmer Should Know',
    introduction:
      'Understanding key algorithms is crucial for solving complex problems efficiently. Here are five fundamental algorithms every programmer should be familiar with.',
    content: `
      1. Sorting Algorithms:
         - Bubble Sort, Merge Sort, Quick Sort
      2. Searching Algorithms:
         - Binary Search
      3. Graph Algorithms:
         - Depth-First Search (DFS), Breadth-First Search (BFS)
      4. Dynamic Programming:
         - Knapsack Problem, Longest Common Subsequence
      5. Greedy Algorithms:
         - Activity Selection Problem, Huffman Coding
    `,
  },
  {
    title: 'Introduction to Complexity Analysis: Time and Space Complexity',
    introduction:
      'Complexity analysis helps in understanding the efficiency of algorithms. This blog post introduces time and space complexity and how to analyze them.',
    content: `
      Time Complexity:
      - Measures the amount of time an algorithm takes to run as a function of the input size.
      - Common complexities: O(1), O(log n), O(n), O(n log n), O(n^2)

      Space Complexity:
      - Measures the amount of memory an algorithm uses as a function of the input size.
      - Common complexities: O(1), O(n), O(n^2)

      Example Analysis:
      - Linear Search: Time Complexity O(n), Space Complexity O(1)
      - Merge Sort: Time Complexity O(n log n), Space Complexity O(n)
    `,
  },
  {
    title: 'Mastering Recursion: Techniques and Examples',
    introduction:
      'Recursion is a powerful technique in programming where a function calls itself. Learn how to use recursion effectively with these techniques and examples.',
    content: `
      What is Recursion?
      - A function that calls itself to solve smaller instances of the same problem.

      Techniques:
      - Base Case: Define a stopping condition to avoid infinite recursion.
      - Recursive Case: Break down the problem into smaller instances.

      Example: Factorial Calculation
      def factorial(n):
          if n == 0:
              return 1
          else:
              return n * factorial(n - 1)

      Example: Fibonacci Sequence
      def fibonacci(n):
          if n <= 1:
              return n
          else:
              return fibonacci(n - 1) + fibonacci(n - 2)
    `,
  },
];

const BlogPost = ({ title, introduction, content }) => (
  <div className="feature-item box-blogs">
    <h3>{title}</h3>
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
