class TrieNode {
    isValidWord: boolean = false;
    parent: TrieNode | null = null;
    leftSiblingKey: string = "";
    rightSiblingKey: string = "";
    leftmostChildKey: string = "";
    rightmostChildKey: string = "";
    children = new Map<string, TrieNode>();

    getSiblingKey(left: boolean): string {
        return (left ? this.leftSiblingKey : this.rightSiblingKey);
    }

    getChildKey(left: boolean): string {
        return (left ? this.leftmostChildKey : this.rightmostChildKey);
    }
}

export class Trie {
    root: TrieNode = new TrieNode();
    prefixNode: TrieNode | null = null;
    suggestion: string[] = [];

    getPrefix(prefix: string, forceCreation: boolean): TrieNode {
        // Retrives the specified prefix, creating it if needed.

        let key: string;
        let node: TrieNode | undefined;
        let currentNode = this.root;
        this.suggestion = [];

        for (const character of prefix) {
            let nextNode = currentNode.children.get(character);
            this.suggestion.push(character);

            if (!nextNode) {
                if (forceCreation) {
                    nextNode = new TrieNode()
                    nextNode.parent = currentNode

                    // Attach the new node to the current node
                    currentNode.children.set(character, nextNode);

                    key = currentNode.rightmostChildKey
                    node = currentNode.children.get(key)
                    
                    // If this is not the first child
                    if (node) {
                        // Connect to the left sibling
                        node.rightSiblingKey = character;
                        nextNode.leftSiblingKey = key;
                    } else {
                        // Make the new node the leftmost child
                        currentNode.leftmostChildKey = character;
                    }

                    currentNode.rightmostChildKey = character;
                } else {
                    // Return an empty node, when a user enters invalid prefix
                    // to prevent creating dead leaves
                    return new TrieNode();
                }
            }
            
            currentNode = nextNode;
        }

        return currentNode;
    }

    loadWords(sortedWords: Array<string>): void {
        for (const word of sortedWords) {
            this.getPrefix(word, true).isValidWord = true;
        }
    }

    getSuggestion(prefix: string, forward: boolean): string {
       let key: string;
       let node: TrieNode | undefined;
       let currentNode = this.getPrefix(prefix, false);

        // If in the middle of an iteration
        if (this.prefixNode) {
            while (true) {
                key = currentNode.getSiblingKey(!forward);
                node = currentNode.parent?.children.get(key);

                // If there is a sibling to the right
                if (node) {
                    // Move to the right sibling's leftmost leaf
                    currentNode = node;
                    this.suggestion.pop();
                    this.suggestion.push(key);

                    key = currentNode.getChildKey(forward);
                    node = currentNode.children.get(key);
                    while (node) {
                        currentNode = node;
                        this.suggestion.push(key);

                        key = currentNode.getChildKey(forward);
                        node = currentNode.children.get(key);
                    }

                    break; // display suggestion
                } 
                
                // Move to the parent. It is guaranteed to be non-null. It could
                // be null if `currentNode` was the root, which is only possible
                // if `currentNode` was also the prefix node. However, in such
                // cases `prefixNode` is `null`, and can't enter this loop due
                // the outer check, neither can it originate from the previous
                // iteration since `currentNode === prefixNode` breaks the loop.
                // Another possibility for the parent to be null is when
                // `getPrefix` returns `currentNode` that is an invalid prefix.
                // However, an invalid prefix could only be entered by the user,
                // meaning that `prefixNode` would be null, and `currentNode`
                // would not be able to enter this loop.
                currentNode = currentNode.parent!;
                this.suggestion.pop();

                if (currentNode === this.prefixNode) {
                    // Reset the `prefixNode`, as if the user just finished
                    // typing and is about to start the first iteration.
                    this.prefixNode = null;
                    break; // display suggestion
                }
                
                if (currentNode.isValidWord) {
                    break; // display suggestion
                }
            }
        } else if (currentNode.children.size > 0) {
            // Set the current node to be the prefix
            this.prefixNode = currentNode;

            // Move to the leftmost leaf
            key = currentNode.getChildKey(forward);
            node = currentNode.children.get(key);
            while (node) {
                currentNode = node;
                this.suggestion.push(key);

                key = currentNode.getChildKey(forward);
                node = currentNode.children.get(key);
            }
        } else {
            // If there are no children, the prefix is invalid, and shall be
            // returned as is
            return prefix;
        }

        return this.suggestion.join("");
    }
}