import React, { useState } from 'react';

class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
    this.insertCounter = 0; // Track the number of inserts to alternate left/right
  }

  // Insert node into binary tree with alternating logic
  insert(value) {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
    } else {
      this.insertNode(this.root, newNode);
    }

    this.insertCounter++; // Increment the counter after every insert
  }

  insertNode(node, newNode) {
    if (this.insertCounter % 2 === 0) {
      // Even count: Insert on the left
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode); // Recurse on the left subtree
      }
    } else {
      // Odd count: Insert on the right
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode); // Recurse on the right subtree
      }
    }
  }

  // Get tree data in-order traversal
  getInOrderData(node) {
    if (!node) return [];
    return [
      ...this.getInOrderData(node.left),
      node.value,
      ...this.getInOrderData(node.right),
    ];
  }
}

const BinaryTreeVisualizer = () => {
  const [tree] = useState(new BinaryTree());
  const [inputValue, setInputValue] = useState('');
  const [treeData, setTreeData] = useState([]);

  // Handle inserting a new value
  const handleInsert = () => {
    if (inputValue.trim() !== '') {
      tree.insert(inputValue);
      setTreeData(tree.getInOrderData(tree.root)); // Get in-order traversal data for display
      setInputValue('');
    }
  };

  // Render the binary tree visually
  const renderTree = (node) => {
    if (!node) return null;

    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ margin: '10px' }}>
          <div style={{ textAlign: 'center', fontWeight: 'bold' }}>{node.value}</div>
          <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {renderTree(node.left)}
            {renderTree(node.right)}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>Binary Tree Visualizer</h2>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter user"
      />
      <button onClick={handleInsert}>Insert</button>

      <div style={{ marginTop: '20px' }}>
        <h3>In-Order Traversal of Tree: {treeData.join(', ')}</h3>
      </div>

      <div>
        <h3>Tree Visualization:</h3>
        <div>{renderTree(tree.root)}</div>
      </div>
    </div>
  );
};

export default BinaryTreeVisualizer;
