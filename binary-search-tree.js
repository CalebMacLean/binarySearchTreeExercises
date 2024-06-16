class Node {
  constructor(val, left = null, right = null) {
    this.val = val;
    this.left = left;
    this.right = right;
  }
}

class BinarySearchTree {
  constructor(root = null) {
    this.root = root;
  }

  /** insert(val): insert a new node into the BST with value val.
   * Returns the tree. Uses iteration. */

  insert(val) {
    // Create Node
    const newNode = new Node(val);
    // Set newNode as root node if tree is empty, else find position for new node
    if(!this.root) {
      this.root = newNode;
    }
    else {
      // Store current node starting at the root node
      let curr = this.root;
      // Iterate through tree to find position until isPlaced is true
      while(true) {
        // If the new value < curr's val, go left
        if (val < curr.val) {
          // If there's no left child insert here
          if(!curr.left) {
            curr.left = newNode;
            break;
          }
          // If there is a left child, move to that node
          else {
            curr = curr.left;
          }
        }
        
        // If the new val > curr's val, go right
        if(val > curr.val) {
          // Insert if no right child
          if(!curr.right) {
            curr.right = newNode;
            break;
          }
          // If there is a child, move to that node
          else {
            curr = curr.right;
          }
        }
      }
    }

    // returns the tree
    return this;
  }

  /** insertRecursively(val): insert a new node into the BST with value val.
   * Returns the tree. Uses recursion. */

  insertRecursively(val, currNode=this.root) {
    // in case of empty tree make new node and set it as root
    if(!currNode) {
      this.root = new Node(val);
    }
    // Else recursively place new node from val
    else {
      // if val is smaller than currNode, go left
      if (val < currNode.val) {
        // if there is no left child, insert
        if(!currNode.left) {
          currNode.left = new Node(val);
          return this;
        }
        // if there is a child, continue down tree
        else {
          return this.insertRecursively(val, currNode.left);
        }
      }

      // if val is greater than currNode, go right
      if(val > currNode.val) {
        // if no right child, insert
        if(!currNode.right) {
          currNode.right = new Node(val);
          return this;
        }
        // if child, continue down tree
        else {
          return this.insertRecursively(val, currNode.right);
        }
      }
    }
    // return tree
    return this
  }

  /** find(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses iteration. */

  find(val) {
    // store current node in var, start at root
    let curr = this.root;
    // iterate through tree
    while(true) {
      // if no curr break
      if(!curr) {
        break;
      }
      // if match, return node
      if(curr.val === val) {
        return curr;
      }
      // if val smaller than curr val, go left
      if(curr.val > val) {
        curr = curr.left;
        continue;
      }
      // if val greater than curr val, go right
      if(curr.val < val) {
        curr = curr.right;
        continue;
      }
      // if none of the conditionals are met, break
      break;
    }
    // In case of no match return undefined
    return undefined;
  }

  /** findRecursively(val): search the tree for a node with value val.
   * return the node, if found; else undefined. Uses recursion. */

  findRecursively(val, currNode=this.root) {
    // Break Case
    if (!currNode) return undefined;
    // If val matches currNode's val, return node;
    if(val === currNode.val) return currNode;
    // If val is smaller than currNode's val, go left
    if(val < currNode.val) return this.findRecursively(val, currNode.left);
    // If val is greater than currNode's val, go right
    if(val > currNode.val) return this.findRecursively(val, currNode.right);
  }

  /** dfsPreOrder(): Traverse the array using pre-order DFS.
   * Return an array of visited nodes. */

  dfsPreOrder() {
    // current node starts at root
    let curr = this.root;
    // result an array that stores vistited nodes
    const result = [];

    // Traverse Function
    // Pre-Order: "myself, traverse left, traverse right"
    // Accepts a node and pushes visited nodes to the result array.
    function traverse(node) {
      // Myself
      result.push(node.val);
      // Traverse Left
      if(node.left) traverse(node.left);
      // Traverse Right
      if(node.right) traverse(node.right);
    }

    // If there is a root traverse tree
    if(curr) traverse(curr);

    // return populated results array
    return result;
  }

  /** dfsInOrder(): Traverse the array using in-order DFS.
   * Return an array of visited nodes. */

  dfsInOrder() {
    // current node starts at root
    let curr = this.root;
    // result array stores values of visited nodes
    let result = [];

    // Traverse Function
    // In Order: "traverse left, myself, traverse right"
    // Accepts a node and pushes visited nodes to result array
    function traverse(node) {
      // Traverse Left
      if(node.left) traverse(node.left);
      // Myself
      result.push(node.val);
      // Traverse Right
      if(node.right) traverse(node.right);
    }

    // If tree has root node, traverse
    if(curr) traverse(curr);

    // return result array with a populated or empty array 
    return result;
  }

  /** dfsPostOrder(): Traverse the array using post-order DFS.
   * Return an array of visited nodes. */

  dfsPostOrder() {
    // Current node starts at root node
    let curr = this.root;
    // Result array collects vals of visited nodes
    const result = [];

    // Traverse Function
    // Post Order: "traverse left, traverse right, myself";
    // Accepts a node and pushes visited node's values to the result array
    function traverse(node) {
      // Left
      if(node.left) traverse(node.left);
      // Right
      if(node.right) traverse(node.right);
      // Myself
      result.push(node.val);
    }

    // if tree isn't empty, traverse
    if(curr) traverse(curr);

    // return a populated or empty result array
    return result;
  }

  /** bfs(): Traverse the array using BFS.
   * Return an array of visited nodes. */

  bfs() {
    // result array stores visted node's values
    const result = [];
    // queue will access the curr node and neighbors and push them in order to the result array
    const queue = [];
    // if the tree is not empty put root node in queue
    if(this.root) queue.push(this.root);

    // iterate through tree while queue isn't empty
    while(queue.length > 0) {
      // access current node in queue
      let curr = queue.shift();
      // push current nodes val to the result array
      result.push(curr.val);
      // if there is a left child node, add to queue
      if(curr.left) queue.push(curr.left);
      // if there is a right child node, add to queue
      if(curr.right) queue.push(curr.right);
    }

    // return a populated or empty result array
    return result
  }

  /** Further Study!
   * remove(val): Removes a node in the BST with the value val.
   * Returns the removed node. */

  remove(val) {

  }

  /** Further Study!
   * isBalanced(): Returns true if the BST is balanced, false otherwise. */

  isBalanced() {

  }

  /** Further Study!
   * findSecondHighest(): Find the second highest value in the BST, if it exists.
   * Otherwise return undefined. */

  findSecondHighest() {
    
  }
}

module.exports = BinarySearchTree;
