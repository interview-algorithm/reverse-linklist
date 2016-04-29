'use strict';
/**
 *
 * |---|  |---|  |---|  |---|
 * |-1-|->|-2-|->|-3-|->|-4-|
 * |---|  |---|  |---|  |---|
 * 
 * @param  {object} head
 * @param  {object} options
 * @return {object}
 */
export const reverseLinkedList = (head, options) => {
    const opts = Object.assign({
        getNextKey: 'next',
        setNextKey: 'next'
    }, options);

    const getNext = node => {
        if (!node) {
            return node;
        }

        let next = node[opts.getNextKey];
        if ('function' === typeof next) {
            return next.call(node);
        } else {
            return next;
        }
    };

    const setNext = (node, child) => {
        if (!node) {
            return;
        }
        let next = node[opts.setNextKey];
        if ('function' === typeof next) {
            next.call(node, child);
        } else {
            node[opts.setNextKey] = child;
        }
    };

    let left = null;
    let right = head;

    while (1) {
        let tmp = getNext(right);
        setNext(right, left);
        left = right;
        if (tmp) {
            right = tmp;
        } else {
            break;
        }
    }
    return right;
};