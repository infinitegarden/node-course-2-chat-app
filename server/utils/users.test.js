const expect = require('expect');

const {Users} = require('./users');

describe ('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [{
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        }, {
            id: '2',
            name: 'Jen',
            room: 'React Course'
        }, {
            id: '3',
            name: 'Julie',
            room: 'Node Course'
            
        }]
    });

    it('should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Fancy Pants',
            room: 'My Room Name'
        };
        var resUser = users.addUser(user.id, user.name, user.room);
        expect (users.users).toEqual([user]);
    });

    it('should remove a user', () => {
        var initialNumUsers = users.users.length;
        var user = users.removeUser('1');
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        expect(users.users.filter((user) => user.id === '1').length).toBe(0);
        expect(users.users.length).toBe(initialNumUsers - 1);
    });

    it('should not remove a user', () => {
        var initialNumUsers = users.users.length;
        var user = users.removeUser('6');
        expect(user).toNotExist();
        expect(users.users.length).toBe(initialNumUsers);
    });

    it('should find user', () => {
        var userId = '1';
        var user = users.getUser(userId);
        expect(user).toEqual({
            id: '1',
            name: 'Mike',
            room: 'Node Course'
        });
        expect (user.id).toBe(userId);
    });

    it('should not find user', () => {
        var userId = '6';
        var user = users.getUser(userId);
        expect(user).toBe(undefined);
        expect(user).toNotExist();
    });
    
    it('should return names for node course', () => {
        var userList = users.getUserList('Node Course');
        
        expect (userList).toEqual(['Mike', 'Julie']);
    });
    it('should return names for React course', () => {
        var userList = users.getUserList('React Course');
        
        expect (userList).toEqual(['Jen']);
    });
});