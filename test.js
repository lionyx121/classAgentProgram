class node {
    constructor(val = null, next = null) {
        this.val = val
        this.next = next
    }
}

let node1 = new node(1)
let node2 = new node(2)
let node3 = new node(3)
let node4 = new node(4)
node1.next = node2
node2.next = node3
node3.next = node4

function myReverse(nodes){
    let pre = null
    let node = nodes
    let current = null
    while (node) { 
        current = JSON.parse(JSON.stringify(node))
        current.next = pre
        pre = current
        node = node.next
    }
    return current
}

let res = myReverse(node1)
console.log(res)