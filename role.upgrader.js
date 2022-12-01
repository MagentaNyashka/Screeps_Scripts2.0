/*
var roleUpgrader = {

    run: function(creep) {
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('harvest');
        }
        if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
            creep.memory.upgrading = true;
            creep.say('upgrade');
        }

        if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleUpgrader;
*/
var boostTime = 0;
var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.transferring && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.transferring = false;
        }
        if(!creep.memory.transferring && creep.store.getFreeCapacity() == 0) {
            creep.memory.transferring = true;
        }

        if(creep.memory.transferring && creep.room.controller.ticksToDowngrade <= 199990) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#00ffff'}});
            }
        }   
        else {
            if(creep.room == '[room E26N39]'){
                var boostLab = Game.getObjectById('62e46fcabac167e54855a804');
                if(!creep.memory.boosted && boostLab.store[RESOURCE_CATALYZED_GHODIUM_ACID] != 0 && boostLab.store[RESOURCE_ENERGY] != 0){
                    if(!creep.pos.inRangeTo(boostLab, 1)){
                        creep.moveTo(boostLab, {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                    else{
                        if(boostTime != 5){
                            boostTime = boostTime + 1;
                        }
                        else{
                            creep.memory.boosted = true;
                            boostTime = 0;
                        }
                    }
                    
                }
                else{
                    var link = creep.room.find(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(structure.structureType == STRUCTURE_LINK);
                        }
                    });
                    var links = creep.pos.findClosestByRange(link);
                    if(link.length != 0){
                        var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                            filter: (structure) => {
                                return(structure.structureType == STRUCTURE_LINK);
                            }
                        });
                    }
                    else{
                        var sources = creep.room.find(FIND_SOURCES);
                        if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || creep.harvest(sources[0]) == ERR_NOT_ENOUGH_ENERGY) {
                            creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                        }
                    }
                    if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(sources, {visualizePathStyle: {stroke: '#00ffff'}});
                    }
                }
            }
            /*
I see you
You see me
How pleasant
This feeling
The moment
You hold me
I missed you
I'm sorry
I've given
What I have
I showed you
I'm growing
The ashes
Fall slowly
As your voice
Consoles me
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
We're swaying
To drum beats
In motion
I'm feeling
My patience
Controlling
The question
I won't speak
We're telling
The stories
Our laughter
He knows me
We're leaving
We're talking
You're closer
It's calming
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
The night will hold us close
And the stars will guide us home
I've been waiting for this moment
We're finally alone
I turn to ask the question
So anxious, my thoughts
Your lips were soft like winter
In your passion, I was lost
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
As the hours pass
I will let you know
That I need to ask
Before I'm alone
How it feels to rest
On your patient lips
To eternal bliss
I'm so glad to know
            */
            else{
                var link = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return(structure.structureType == STRUCTURE_LINK);
                    }
                });
                var links = creep.pos.findClosestByRange(link);
                if(link.length != 0){
                    var sources = creep.pos.findClosestByRange(FIND_STRUCTURES, {
                        filter: (structure) => {
                            return(structure.structureType == STRUCTURE_LINK);
                        }
                    });
                }
                else{
                    var sources = creep.room.find(FIND_SOURCES);
                    if(creep.harvest(sources[0]) == ERR_NOT_IN_RANGE || creep.harvest(sources[0]) == ERR_NOT_ENOUGH_ENERGY) {
                        creep.moveTo(sources[0], {visualizePathStyle: {stroke: '#ffffff'}});
                    }
                }
                if(creep.withdraw(sources, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sources, {visualizePathStyle: {stroke: '#00ffff'}});
                }
            }
        }
    }
};

module.exports = roleUpgrader;