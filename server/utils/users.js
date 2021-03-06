[{
    id: '/#123qfDS',
    name: 'ASDF',
    room: 'Room name'
}]

// addUser(id, name, room)

// removeUser(id)

// getUser(id, room)

// getUserList(room)

class Users {
    constructor () {
        this.users = [];
    }
    addUser(id, name, room) {
        var user = {id, name, room}
        this.users.push(user);
        return user;
    }

    removeUser(id) {
        var user = this.getUser(id);
        if (user) {
            var index = this.users.indexOf(user);
            this.users.splice(index, 1);

            // OR:
            // this.users = this.users.filter((user) => user.id !== id);
        } 
        return user;
    }

    getUser(id) {
        return this.users.filter((user) => user.id === id)[0];
    }

    getUserByName(name) {
        return this.users.filter((user) => user.name === name)[0];
    }

    getUserList(room) {
        var users = this.users.filter((user) => user.room.toLowerCase() === room.toLowerCase());
        var namesArray = users.map((user) => user.name);
        return namesArray;
    }


}

module.exports = {Users};

// class Person {
//     constructor (name, age) {
//         this.name = name;
//         this.age = age;
//     }

//     getUserDescription() {
//         return `${this.name} is ${this.age} year(s) old.`;
//     }
// }

// var me = new Person('mename', 23);
// var description = me.getUserDescription();
// console.log(description);
