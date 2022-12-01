var roleHealer = {

    /** @param {Creep} creep **/
    run: function(creep) {
        var damaged = creep.room.find(FIND_CREEPS, {
            filter: (creep) => {
                return(creep.hits < creep.hitsMax);
            }
        });
        if(damaged.length){
            if(creep.heal(damaged[0]) == ERR_NOT_IN_RANGE){
                creep.moveTo(damaged[0], {visualizePathStyle: {stroke: '#ff0000'}});
            }
        }
        else {
            flags = creep.room.find(FIND_FLAGS);
            creep.moveTo(flags[0]);
        }
    }
};

module.exports = roleHealer;