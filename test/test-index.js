var reverseLinkedList = require('../reverse-linklist').reverseLinkedList;
var assert = require('assert');

function createLinkedList(len) {
    var head, last;
    for (var i = 0; i < len; ++i) {
        var node = Object.create({
            getNext: function () {
                return this.next;
            },
            setNext: function (next) {
                this.next = next;
            },
            trace: function () {
                var node = this;
                while (!!node) {
                    console.log(node.value);
                    node = node.next;
                }
            }
        });
        head = head || node;
        if (last) {
            last.next = node;
            last = node;
        } else {
            last = head;
        }
        node.value = i + 1;
    }
    return head;
}

describe('reverseLinkedList', function () {
    describe('property next', function () {
        it('normal linked list', function () {
            var link = createLinkedList(10);
            var linkR = reverseLinkedList(link);
            var head = linkR;
            for (var i = 0; i < 10; ++i) {
                assert.deepEqual(head.value, 10 - i);
                head = head.next;
            }
            assert.equal(null, head);
        });
        it('empty linked list', function () {
            assert.equal(null, reverseLinkedList(null));
        });
    });
    describe('function next', function () {
        it('normal linked list', function () {
            var link = createLinkedList(10);
            var linkR = reverseLinkedList(link, {
                getNextKey: 'getNext',
                setNextKey: 'setNext'
            });
            var head = linkR;
            for (var i = 0; i < 10; ++i) {
                assert.deepEqual(head.value, 10 - i);
                head = head.getNext();
            }
            assert.equal(null, head);
        });
        it('empty linked list', function () {
            assert.equal(null, reverseLinkedList(null, {
                getNextKey: 'getNext',
                setNextKey: 'setNext'
            }));
        });
    });
});