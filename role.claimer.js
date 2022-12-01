var roleClaimer = {
    run: function(creep) {
        anotherRoomName = 'E28N38';
        RoomName = '[room E28N38]'
        if(creep.room != RoomName) {
            const exitDir = Game.map.findExit(creep.room, anotherRoomName);
            const exit = creep.pos.findClosestByRange(exitDir);
            creep.moveTo(exit, {visualizePathStyle: {stroke: '#800080'}});
        }
        else {
            if(creep.room.controller) {
                if(creep.claimController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
        }

    }
};
module.exports = roleClaimer;