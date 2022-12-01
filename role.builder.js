var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('harvest');
        }
        if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
            creep.memory.building = true;
            creep.say('build');
        }
        if(creep.memory.building) {
            var targets = creep.room.find(FIND_CONSTRUCTION_SITES
                /*
                , {
                filter: (structure) => {
                    return(
                        structure.structureType == STRUCTURE_OBSERVER
                    );
                }
            }
            */
            );
            var closestTarget = creep.pos.findClosestByRange(targets);
                if(targets.length == 0){
                    flags = creep.room.find(FIND_FLAGS);
                    creep.moveTo(flags[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    
                }
            
            if(targets.length != 0) {
                if(creep.build(closestTarget) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(closestTarget, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE || creep.harvest(sources[0], RESOURCE_ENERGY) == ERR_NOT_ENOUGH_ENERGY){
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleBuilder;