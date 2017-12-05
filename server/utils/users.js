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

    getRoomList() {
        // var roomsArray = this.users.map((user) => user.room.toLowerCase());
        var roomsArray = this.users.map((user) => user.room);
        
        // var uniqueRooms = Array.from(new Set(roomsArray));
        var uniqueRooms = this.getUniqueArrayCaseInsensitive(roomsArray);
        return uniqueRooms;
    }

    getUniqueArrayCaseInsensitive(inputArray) {
        return inputArray.reduce((result, element) => {
            var normalize = function(x) { return typeof x === 'string' ? x.toLowerCase() : x; };
        
            var normalizedElement = normalize(element);
            if (result.every(otherElement => normalize(otherElement) !== normalizedElement))
            result.push(element);
        
            return result;
        }, []);
    }

}

module.exports = {Users};
