const express = require("express");
const cors = require("cors");
const app = express();

console.log("CORS enabled version");

app.use(cors());
const PORT = process.env.PORT || 3000;

// ===== NODE CLASS =====
class Node {
    constructor(data) {
        this.data = data;
        this.next = null;
    }
}

// ===== STACK (Linked List) =====
class Stack {
    constructor() {
        this.top = null;
    }

    push(val) {
        let n = new Node(val);
        n.next = this.top;
        this.top = n;
        return "Inserted into Stack";
    }

    pop() {
        if (!this.top) return "Stack is empty";
        this.top = this.top.next;
        return "Deleted from Stack";
    }

    print() {
        if (!this.top) return "Stack is empty";
        let temp = this.top;
        let res = "";
        while (temp) {
            res += temp.data + " ";
            temp = temp.next;
        }
        return res;
    }
}

// ===== QUEUE (Linked List) =====
class Queue {
    constructor() {
        this.front = this.rear = null;
    }

    enqueue(val) {
        let n = new Node(val);
        if (!this.rear) {
            this.front = this.rear = n;
        } else {
            this.rear.next = n;
            this.rear = n;
        }
        return "Inserted into Queue";
    }

    dequeue() {
        if (!this.front) return "Queue is empty";
        this.front = this.front.next;
        if (!this.front) this.rear = null;
        return "Deleted from Queue";
    }

    print() {
        if (!this.front) return "Queue is empty";
        let temp = this.front;
        let res = "";
        while (temp) {
            res += temp.data + " ";
            temp = temp.next;
        }
        return res;
    }
}

// ===== LINKED LIST =====
class LinkedList {
    constructor() {
        this.head = null;
    }

    insert(val) {
        let n = new Node(val);
        if (!this.head) {
            this.head = n;
            return "Inserted into List";
        }
        let temp = this.head;
        while (temp.next) temp = temp.next;
        temp.next = n;
        return "Inserted into List";
    }

    deleteAtPos(pos) {
        if (!this.head) return "List is empty";

        if (pos === 1) {
            this.head = this.head.next;
            return "Deleted from position 1";
        }

        let temp = this.head;
        for (let i = 1; i < pos - 1 && temp.next; i++) {
            temp = temp.next;
        }

        if (!temp.next) return "Invalid position";

        temp.next = temp.next.next;
        return `Deleted from position ${pos}`;
    }

    print() {
        if (!this.head) return "List is empty";
        let temp = this.head;
        let res = "";
        while (temp) {
            res += temp.data + " ";
            temp = temp.next;
        }
        return res;
    }
}

// ===== OBJECTS =====
const stack = new Stack();
const queue = new Queue();
const list = new LinkedList();

// ===== MAIN ROUTE (NESTED SWITCH) =====
app.get("/operate", (req, res) => {
    let type = parseInt(req.query.type);   // 1 stack, 2 queue, 3 list
    let op = parseInt(req.query.op);       // 1 insert, 2 delete, 3 print
    let value = parseInt(req.query.value);
    let pos = parseInt(req.query.pos);

    let response = "";

    switch (type) {

        // ===== STACK =====
        case 1:
            switch (op) {
                case 1:
                    response = stack.push(value);
                    break;
                case 2:
                    response = stack.pop();
                    break;
                case 3:
                    response = stack.print();
                    break;
                default:
                    response = "Invalid operation";
            }
            break;

        // ===== QUEUE =====
        case 2:
            switch (op) {
                case 1:
                    response = queue.enqueue(value);
                    break;
                case 2:
                    response = queue.dequeue();
                    break;
                case 3:
                    response = queue.print();
                    break;
                default:
                    response = "Invalid operation";
            }
            break;

        // ===== LINKED LIST =====
        case 3:
            switch (op) {
                case 1:
                    response = list.insert(value);
                    break;
                case 2:
                    response = list.deleteAtPos(pos);
                    break;
                case 3:
                    response = list.print();
                    break;
                default:
                    response = "Invalid operation";
            }
            break;

        default:
            response = "Invalid data structure";
    }

    res.send(response);
});

// ===== START SERVER =====
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});