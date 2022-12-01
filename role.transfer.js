var roleTransfer = {
    run: function(creep) {
        var St_power_to_spawn_from_storage = 1;
        if(creep.memory.transferring && creep.store.getFreeCapacity() == 800 && creep.ticksToLive > 200){
            creep.memory.transferring = false;
        }
        if(!creep.memory.transferring && creep.store[RESOURCE_POWER] != 0){
            creep.memory.transferring = true;
        }
        if(creep.memory.transferring){
            var mainRoom = 'E27N39'
            var mainRoomName = '[room E27N39]'
            if(St_power_to_spawn_from_storage == 1){
                if(creep.room == mainRoomName){
                    var targets = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(
                                structure.structureType == STRUCTURE_POWER_SPAWN);
                            }
                    });
                    if(creep.transfer(targets, RESOURCE_POWER) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    /*
                    if(creep.transfer(targets, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE){
                        creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    */
                    
                }
                else{
                    const exitDir = Game.map.findExit(creep.room, mainRoom);
                    const exit = creep.pos.findClosestByRange(exitDir);
                    creep.moveTo(exit, {visualizePathStyle: {stroke: '#800080'}});
                }
            }
        }
        else{
            //!!!!!
            const anotherRoomName = 'E26N40'
            const RoomName = '[room E26N40]'
            //!!!!!
            if(St_power_to_spawn_from_storage == 1){
                var spawnsP = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(
                            structure.structureType == STRUCTURE_POWER_SPAWN);
                        }
                });
                var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(
                            structure.structureType == STRUCTURE_TERMINAL);
                        }
                });
                var structures = creep.pos.findClosestByRange(targets);
                if(spawnsP != 0){
                    if(creep.withdraw(structures, RESOURCE_POWER, 10) == ERR_NOT_IN_RANGE){
                        creep.moveTo(structures, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    /*
                    if(spawnsP.store.getFreeCapacity(RESOURCE_ENERGY) >= 600){
                        if(creep.withdraw(structures, RESOURCE_ENERGY, 600) == ERR_NOT_IN_RANGE){
                            creep.moveTo(structures, {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    */
                }
            }
        }
    }
};
module.exports = roleTransfer;