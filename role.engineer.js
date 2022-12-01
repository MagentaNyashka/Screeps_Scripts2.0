var roleEngineer = {
    run: function(creep) {
        if(creep.memory.working && creep.store[RESOURCE_ENERGY] == 0){
            creep.memory.working = false;
            creep.say('harvest');
        }
        if(!creep.memory.working && creep.store.getFreeCapacity() == 0){
            creep.memory.working = true;
            creep.say('transfer');
        }
        if(creep.memory.working){
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(
                        structure.structureType == STRUCTURE_TOWER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            var damaged = creep.room.find(FIND_CREEPS, {
                filter: (creep) => {
                    return(creep.hits < creep.maxHits);
                }
            });
            if(damaged.lenght != 0){
                if(creep.heal(damaged[0] == ERR_NOT_IN_RANGE)){
                    creep.moveTo(damaged[0], {visualizePathStyle: {stroke: '#00ff00'}});
                }
            }
            if(towers.lenght != 0){
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.transfer(towers[1], RESOURCE_ENERGY) != ERR_FULL){
                    creep.moveTo(towers[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
                if(creep.transfer(towers[1], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE && creep.transfer(towers[1], RESOURCE_ENERGY) != ERR_FULL){
                    creep.moveTo(towers[1], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else{
            var sources = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return(
                        structure.structureType == STRUCTURE_STORAGE) &&
                        structure.store.getCapacity(RESOURCE_ENERGY) > 0;
                    }
                });
            if(creep.withdraw(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};
module.exports = roleEngineer;